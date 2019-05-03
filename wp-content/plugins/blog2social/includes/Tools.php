<?php

class B2S_Tools {

    public static function showNotice() {
        return (defined("B2S_PLUGIN_NOTICE") || !defined("B2S_PLUGIN_TOKEN")) ? true : false;
    }

    public static function getToken($data = array()) {
        return B2S_Api_Post::post(B2S_PLUGIN_API_ENDPOINT, $data, true);
    }

    public static function setUserDetails() {
        delete_option('B2S_PLUGIN_USER_VERSION_' . B2S_PLUGIN_BLOG_USER_ID);
        delete_option('B2S_PLUGIN_PRIVACY_POLICY_USER_ACCEPT_' . B2S_PLUGIN_BLOG_USER_ID);
        $version = json_decode(B2S_Api_Post::post(B2S_PLUGIN_API_ENDPOINT, array('action' => 'getUserDetails', 'token' => B2S_PLUGIN_TOKEN, 'version' => B2S_PLUGIN_VERSION), true));
        $tokenInfo['B2S_PLUGIN_USER_VERSION'] = (isset($version->version) ? $version->version : 0);
        $tokenInfo['B2S_PLUGIN_VERSION'] = B2S_PLUGIN_VERSION;
        if (!defined("B2S_PLUGIN_USER_VERSION")) {
            define('B2S_PLUGIN_USER_VERSION', $tokenInfo['B2S_PLUGIN_USER_VERSION']);
        }
        if (isset($version->trial) && $version->trial != "") {
            $tokenInfo['B2S_PLUGIN_TRAIL_END'] = $version->trial;

            if (!defined("B2S_PLUGIN_TRAIL_END")) {
                define('B2S_PLUGIN_TRAIL_END', $tokenInfo['B2S_PLUGIN_TRAIL_END']);
            }
        }
        if (!isset($version->version)) {
            define('B2S_PLUGIN_NOTICE', 'CONNECTION');
        } else {
            $tokenInfo['B2S_PLUGIN_USER_VERSION_NEXT_REQUEST'] = time() + 3600;
            update_option('B2S_PLUGIN_USER_VERSION_' . B2S_PLUGIN_BLOG_USER_ID, $tokenInfo);
        }

        if (isset($version->show_privacy_policy) && !empty($version->show_privacy_policy)) {
            update_option('B2S_PLUGIN_PRIVACY_POLICY_USER_ACCEPT_' . B2S_PLUGIN_BLOG_USER_ID, $version->show_privacy_policy);
        }
    }

    public static function checkUserBlogUrl() {
        $check = false;
        $blogUrl = get_option('home');
        global $wpdb;
        $sql = "SELECT token,state_url FROM b2s_user WHERE blog_user_id = %d";
        $result = $wpdb->get_results($wpdb->prepare($sql, B2S_PLUGIN_BLOG_USER_ID));
        if (is_array($result) && !empty($result) && isset($result[0]->token)) {
            if (isset($result[0]->state_url) && (int) $result[0]->state_url != 1) {
                $checkBlogUrl = json_decode(B2S_Api_Post::post(B2S_PLUGIN_API_ENDPOINT, array('action' => 'getBlogUrl', 'token' => $result[0]->token, 'blog_url' => strtolower($blogUrl), 'state_url' => (int) $result[0]->state_url)));
                if (isset($checkBlogUrl->result) && (int) $checkBlogUrl->result == 1) {
                    if (isset($checkBlogUrl->update) && (int) $checkBlogUrl->update == 1) {
                        $wpdb->update('b2s_user', array('state_url' => "1"), array('blog_user_id' => B2S_PLUGIN_BLOG_USER_ID), array('%d'), array('%d'));
                    }
                    $check = true;
                }
            } else {
                $check = true;
            }
        }
        define("B2S_PLUGIN_NOTICE_SITE_URL", $check);
    }

    public static function getRandomBestTimeSettings() {
        $lang = substr(B2S_LANGUAGE, 0, 2);
        $defaultTimes = unserialize(B2S_PLUGIN_SCHED_DEFAULT_TIMES);
        $allowPage = unserialize(B2S_PLUGIN_NETWORK_ALLOW_PAGE);
        $allowGroup = unserialize(B2S_PLUGIN_NETWORK_ALLOW_GROUP);
        $userTimes = array();
        if (is_array($defaultTimes) && !empty($defaultTimes)) {
            $slug = ($lang == 'en') ? 'h:i A' : 'H:i';
            foreach ($defaultTimes as $k => $v) {
                if (is_array($v) && !empty($v)) {
                    $endProfile = $v[1];
                    $getTimeForPage = in_array($k, $allowPage) ? true : false;
                    $getTimeForGroup = in_array($k, $allowGroup) ? true : false;
                    if ($getTimeForPage) {
                        $endProfile = date("H:i", strtotime('-30 minutes', strtotime($endProfile . ':00')));   //-30min
                    }
                    if ($getTimeForGroup) {
                        $endProfile = date("H:i", strtotime('-30 minutes', strtotime($endProfile . ':00')));   //-30min
                    }
                    $endProfile = (strpos($endProfile, ':') === false) ? $endProfile . ':00' : $endProfile;
                    $startProfle = (strpos($v[0], ':') === false) ? $v[0] . ':00' : $v[0];
                    $dateTime = date('Y-m-d ' . B2S_Util::getRandomTime($startProfle, $endProfile) . ':00');
                    //Profile
                    $userTimes[$k][0] = date($slug, strtotime($dateTime));
                    //Page
                    $dateTime = ($getTimeForPage) ? strtotime('+30 minutes', strtotime($dateTime)) : strtotime($dateTime);
                    $userTimes[$k][1] = ($getTimeForPage) ? date($slug, $dateTime) : "";
                    //Group
                    $dateTime = strtotime('+30 minutes', $dateTime);
                    $userTimes[$k][2] = ($getTimeForGroup) ? date($slug, $dateTime) : "";
                }
            }
        }
        return $userTimes;
    }

    public static function getSupportLink($type = 'howto') {
        $lang = substr(B2S_LANGUAGE, 0, 2);
        if ($type == 'howto') {
            return 'https://blog2social.com/' . (($lang == 'en') ? 'en/howto' : 'de/anleitung');
        }
        if ($type == 'faq') {
            return 'https://service.blog2social.com/support?url=' . get_option('home') . '&token=' . B2S_PLUGIN_TOKEN;
        }
        if ($type == 'faq_direct') {
            return 'https://www.blog2social.com/' . (($lang == 'en') ? 'en' : 'de') . "/faq/";
        }
        if ($type == 'affiliate') {
            $affiliateId = self::getAffiliateId();
            return 'https://service.blog2social.com/' . (((int) $affiliateId != 0) ? '?aid=' . $affiliateId : '');
        }
        if ($type == 'feature') {
            return 'https://blog2social.com/' . (($lang == 'en') ? 'en/features' : 'de/funktionen');
        }
        if ($type == 'trial') {
            return 'https://service.blog2social.com/' . (($lang == 'en') ? 'en/trial' : 'de/trial');
        }
        if ($type == 'contact') {
            return 'https://service.blog2social.com/' . (($lang == 'en') ? 'en/trial' : 'de/trial');
        }
        if ($type == 'term') {
            return 'https://www.blog2social.com/' . (($lang == 'en') ? 'en/terms' : 'de/agb');
        }
        if ($type == 'privacy_policy') {
            return 'https://www.adenion.de/' . (($lang == 'en') ? 'privacy-policy' : 'datenschutz');
        }

        //TOS Twitter 032018
        //BTN: More information
        if ($type == 'network_tos_faq_032018') {
            return (($lang == 'en') ? 'https://www.blog2social.com/en/faq/content/3/127/en/twitter-terms-of-service-update-february-2018-common-questions.html' : 'https://www.blog2social.com/de/faq/content/3/127/de/twitter-aenderung-der-allgemeinen-geschaeftsbedingungen-update-februar-2018-haeufig-gestellte-fragen.html');
        }
        //BTN: More Information about these changes. 
        if ($type == 'network_tos_faq_news_032018') {
            return (($lang == 'en') ? 'https://www.blog2social.com/en/faq/news/34/en/version-47-twitter-terms-of-service-update.html' : 'https://www.blog2social.com/de/faq/news/30/de/version-47-twitter-update-der-allgemeinen-geschaeftsbedingungen.html');
        }
        //BTN: Learn more about this
        if ($type == 'network_tos_blog_032018') {
            return (($lang == 'en') ? 'https://www.blog2social.com/en/blog/how-new-twitter-rules-impact-your-social-media-marketing' : 'https://www.blog2social.com/de/blog/neue-twitter-regeln-social-media-marketing');
        }
    }

    public static function getAffiliateId() {
        return (defined("B2S_PLUGIN_AFFILIATE_ID")) ? B2S_PLUGIN_AFFILIATE_ID : 0;
    }

}

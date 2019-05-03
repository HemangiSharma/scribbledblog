<?php

class B2S_Ship_Save {

    public $postData;

    public function __construct() {
        $this->postData = array();
    }

    private function getNetworkDetailsId($network_id, $network_type, $network_auth_id, $network_display_name) {
        global $wpdb;

        //special case xing groups  contains network_display_name
        if ($network_id == 8 && $network_type == 2) {
            $networkDetailsIdSelect = $wpdb->get_col($wpdb->prepare("SELECT postNetworkDetails.id FROM b2s_posts_network_details AS postNetworkDetails WHERE postNetworkDetails.network_auth_id = %s AND postNetworkDetails.network_display_name = %s", $network_auth_id, trim($network_display_name)));
        } else {
            $networkDetailsIdSelect = $wpdb->get_col($wpdb->prepare("SELECT postNetworkDetails.id FROM b2s_posts_network_details AS postNetworkDetails WHERE postNetworkDetails.network_auth_id = %s", $network_auth_id));
        }
        if (isset($networkDetailsIdSelect[0])) {
            return (int) $networkDetailsIdSelect[0];
        } else {
            $wpdb->insert('b2s_posts_network_details', array(
                'network_id' => (int) $network_id,
                'network_type' => (int) $network_type,
                'network_auth_id' => (int) $network_auth_id,
                'network_display_name' => $network_display_name), array('%d', '%d', '%d', '%s'));
            return $wpdb->insert_id;
        }
    }

    private function lookupNetworkDetailsId($network_auth_id) {
        global $wpdb;
        $networkDetailsIdSelect = $wpdb->get_col($wpdb->prepare("SELECT postNetworkDetails.id FROM b2s_posts_network_details AS postNetworkDetails WHERE postNetworkDetails.network_auth_id = %s", $network_auth_id));
        if (isset($networkDetailsIdSelect[0])) {
            return (int) $networkDetailsIdSelect[0];
        }
        return 0;
    }

    public function savePublishDetails($data, $relayData = array()) {
        global $wpdb;
        $networkDetailsId = $this->getNetworkDetailsId($data['network_id'], $data['network_type'], $data['network_auth_id'], $data['network_display_name']);

        //unset($data['network_id']);
        unset($data['network_type']);
        unset($data['network_display_name']);

        if (!empty($relayData) && is_array($relayData)) {
            $data['relay_data'] = $relayData;
            $data['post_for_relay'] = 1;
        }
        $postData = array(
            'post_id' => $data['post_id'],
            'blog_user_id' => $data['blog_user_id'],
            'user_timezone' => $data['user_timezone'],
            'publish_date' => $data['publish_date'],
            'post_for_relay' => ((isset($data['post_for_relay']) && (int) $data['post_for_relay'] == 1) ? 1 : 0),
            'network_details_id' => $networkDetailsId
        );
        $wpdb->insert('b2s_posts', $postData, array('%d', '%d', '%d', '%s', '%d', '%d'));
        B2S_Rating::trigger();

        $data['internal_post_id'] = $wpdb->insert_id;
        $this->postData['token'] = $data['token'];
        $this->postData["blog_user_id"] = $data["blog_user_id"];
        $this->postData["post_id"] = $data["post_id"];
        $this->postData["default_titel"] = $data["default_titel"];
        $this->postData["no_cache"] = (int) $data["no_cache"];
        $this->postData["lang"] = $data["lang"];
        $this->postData['user_timezone'] = $data['user_timezone'];

        unset($data['token']);
        unset($data['blog_user_id']);
        unset($data['post_id']);
        unset($data['default_titel']);
        unset($data['no_cache']);
        unset($data['lang']);
        unset($data['user_timezone']);
        unset($data['publish_date']);

        $this->postData['post'][] = $data;
    }

    public function postPublish() {
        global $wpdb;
        $content = array();
        $this->postData['action'] = 'sentToNetwork';
        $postData = $this->postData['post'];
        $this->postData['post'] = serialize($this->postData['post']);
        $result = json_decode(B2S_Api_Post::post(B2S_PLUGIN_API_ENDPOINT, $this->postData));

        foreach ($postData as $k => $v) {
            $found = false;
            $networkId = (isset($v['network_id']) && (int) $v['network_id'] > 0) ? (int) $v['network_id'] : 0;
            if (isset($result->data) && is_array($result->data)) {
                foreach ($result->data as $key => $post) {
                    if (isset($post->internal_post_id) && (int) $post->internal_post_id == (int) $v['internal_post_id']) {
                        $data = array('publish_link' => $post->publishUrl, 'publish_error_code' => isset($post->error_code) ? $post->error_code : '');
                        $where = array('id' => $post->internal_post_id);
                        $wpdb->update('b2s_posts', $data, $where, array('%s', '%s'), array('%d'));
                        $errorCode = isset($post->error_code) ? $post->error_code : '';

                        //since V4.8.0 relay posts
                        $printDelayDates = array();
                        if (empty($errorCode) && isset($v['relay_data']) && !empty($v['relay_data']) && is_array($v['relay_data']) && isset($v['relay_data']['auth']) && isset($v['relay_data']['delay'])) {
                            $userTimeZone = (isset($this->postData['user_timezone'])) ? $this->postData['user_timezone'] : 0;
                            $sched_date = date('Y-m-d H:i:00', current_time('timestamp'));
                            $sched_date_utc = date('Y-m-d H:i:00', strtotime(B2S_Util::getUTCForDate($sched_date, $userTimeZone * (-1))));
                            $schedData = array('user_timezone' => $userTimeZone, 'sched_date' => $sched_date, 'sched_date_utc' => $sched_date_utc, 'post_id' => $this->postData['post_id'], 'blog_user_id' => $this->postData['blog_user_id']);
                            $printDelayDates = $this->saveRelayDetails((int) $v['internal_post_id'], $v['relay_data'], $schedData);
                        }

                        $content[] = array('networkAuthId' => $post->network_auth_id, 'html' => $this->getItemHtml($networkId, $errorCode, $post->publishUrl, $printDelayDates, true));
                        $found = true;
                    }
                }
            }
//DEFAULT ERROR
            if ($found == false) {
                $content[] = array('networkAuthId' => $v['network_auth_id'], 'html' => $this->getItemHtml($networkId, 'DEFAULT', '', '', true));
            }
        }
        return $content;
    }

    //save & print
    public function saveRelayDetails($relay_primary_post_id = 0, $relayData = array(), $schedData = array()) {
        global $wpdb;
        $printSchedDate = array();
        if ($relay_primary_post_id > 0) {
            foreach ($relayData['auth'] as $key => $auth) {
                if (isset($relayData['delay'][$key]) && !empty($relayData['delay'][$key])) {
                    $networkDetailsId = $this->lookupNetworkDetailsId($auth);
                    if ($networkDetailsId > 0) {
                        $sched_date = date('Y-m-d H:i:s', strtotime("+" . $relayData['delay'][$key] . " minutes", strtotime($schedData['sched_date'])));
                        $sched_date_utc = date('Y-m-d H:i:s', strtotime("+" . $relayData['delay'][$key] . " minutes", strtotime($schedData['sched_date_utc'])));

                        $wpdb->insert('b2s_posts', array(
                            'post_id' => $schedData['post_id'],
                            'blog_user_id' => $schedData['blog_user_id'],
                            'user_timezone' => $schedData['user_timezone'],
                            'sched_type' => 4, // replay, retweet
                            'sched_date' => $sched_date,
                            'sched_date_utc' => $sched_date_utc,
                            'network_details_id' => $networkDetailsId,
                            'relay_primary_post_id' => $relay_primary_post_id,
                            'relay_delay_min' => (int) $relayData['delay'][$key],
                            'hook_action' => 1), array('%d', '%d', '%s', '%d', '%s', '%s', '%d', '%d', '%d', '%d'));

                        $printSchedDate[] = array('date' => $sched_date, 'relay' => true);
                    }
                }
            }
        }
        return $printSchedDate;
    }

    public function saveSchedDetails($data, $schedData, $relayData = array()) {
        global $wpdb;

        $shipdays = array();
        $serializeData = $data;
        $networkDetailsId = $this->getNetworkDetailsId($data['network_id'], $data['network_type'], $data['network_auth_id'], $data['network_display_name']);

        unset($serializeData['network_type']);
        unset($serializeData['network_display_name']);
        unset($serializeData['token']);
        unset($serializeData['blog_user_id']);
        unset($serializeData['post_id']);
        unset($serializeData['image']);

        $printSchedDate = array();
        //mode: once schedule
        if ($schedData['releaseSelect'] == 1 && is_array($schedData['date']) && isset($schedData['date'][0]) && !empty($schedData['date'][0]) && isset($schedData['time'][0]) && !empty($schedData['time'][0])) {
            foreach ($schedData['date'] as $key => $date) {
                if (isset($schedData['time'][$key]) && !empty($schedData['time'][$key])) {
                    //custom sched content
                    //image
                    if (isset($schedData['sched_image_url'][$key]) && !empty($schedData['sched_image_url'][$key])) {
                        $serializeData['image_url'] = $schedData['sched_image_url'][$key];
                        $data['image_url'] = $schedData['sched_image_url'][$key];
                    }
                    //content
                    if (isset($schedData['sched_content'][$key]) && !empty($schedData['sched_content'][$key])) {
                        $serializeData['content'] = $schedData['sched_content'][$key];
                    }
                    //Update - calendar edit function
                    if (isset($data['sched_details_id'])) {
                        $wpdb->update('b2s_posts_sched_details', array(
                            'sched_data' => serialize($serializeData),
                            'image_url' => $data['image_url']
                                ), array("id" => $data['sched_details_id']), array('%s', '%s', '%d'));
                        $schedDetailsId = $data['sched_details_id'];
                        //new entry insert
                    } else {
                        $wpdb->insert('b2s_posts_sched_details', array('sched_data' => serialize($serializeData), 'image_url' => $data['image_url']), array('%s', '%s'));
                        $schedDetailsId = $wpdb->insert_id;
                    }

                    $sendTime = strtotime($date . ' ' . $schedData['time'][$key]);
                    $shipdays[] = array('sched_details_id' => $schedDetailsId, 'sched_date' => date('Y-m-d H:i:00', $sendTime), 'sched_date_utc' => date('Y-m-d H:i:00', strtotime(B2S_Util::getUTCForDate($date . ' ' . $schedData['time'][$key], $schedData['user_timezone'] * (-1)))));
                    $printSchedDate[] = array('date' => date('Y-m-d H:i:s', $sendTime));
                    if ($schedData['saveSetting']) {
                        $this->saveUserDefaultSettings(date('H:i', $sendTime), $data['network_id'], $data['network_type']);
                    }
                }
            }
        } else {
            //mode: recurrently schedule
            if (isset($schedData['interval_select']) && is_array($schedData['interval_select']) && isset($schedData['interval_select'][0])) {
                $dayOfWeeks = array(1 => 'mo', 2 => 'di', 3 => 'mi', 4 => 'do', 5 => 'fr', 6 => 'sa', 7 => 'so');

                //new entry insert
                $wpdb->insert('b2s_posts_sched_details', array('sched_data' => serialize($serializeData), 'image_url' => $data['image_url']), array('%s', '%s'));
                $schedDetailsId = $wpdb->insert_id;

                foreach ($schedData['interval_select'] as $cycle => $mode) {
                    //interval:weekly
                    if ((int) $mode == 0) {
                        foreach ($dayOfWeeks as $dayNumber => $dayName) {
                            if (isset($schedData[$dayName][$cycle]) && $schedData[$dayName][$cycle] == 1) {
                                for ($weeks = 1; $weeks <= $schedData['weeks'][$cycle]; $weeks++) {
                                    $startTime = (isset($schedData['date'][$cycle]) && isset($schedData['time'][$cycle])) ? $schedData['date'][$cycle] : $data['publish_date'];
                                    $startDay = date('N', strtotime($startTime));
                                    $maxDaysSched = $schedData['weeks'][$cycle] * 7 + $startDay;
                                    if ($dayNumber < $startDay) {
                                        if ($schedData['weeks'][$cycle] == 1) {
                                            $sendDay = 7 - $startDay + $dayNumber;
                                        } else {
                                            $sendDay = 7 - $startDay + $dayNumber + (7 * ($weeks - 1));
                                        }
                                    } else if ($dayNumber == $startDay) {
                                        $sendDay = (7 * ($weeks - 1));
                                    } else {
                                        $sendDay = $dayNumber - $startDay + (7 * ($weeks - 1));
                                    }
                                    if ($schedData['weeks'][$cycle] == 1 || $sendDay <= $maxDaysSched) {
                                        $schedTime = date('Y-m-d', strtotime("+$sendDay days", strtotime($startTime)));
                                        $tempSchedDateTime = date('Y-m-d H:i:00', strtotime($schedTime . ' ' . $schedData['time'][$cycle]));
                                        $sched_date_utc = date('Y-m-d H:i:00', strtotime(B2S_Util::getUTCForDate($tempSchedDateTime, $schedData['user_timezone'] * (-1))));
                                        if ($tempSchedDateTime >= $data['publish_date']) {
                                            $shipdays[] = array('sched_date' => $tempSchedDateTime, 'sched_date_utc' => $sched_date_utc, 'sched_details_id' => $schedDetailsId);
                                            $printSchedDate[] = array('date' => $tempSchedDateTime);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //interval:monthly
                    if ((int) $mode == 1) {
                        if (isset($schedData['duration_month'][$cycle]) && isset($schedData['select_day'][$cycle]) && isset($schedData['date'][$cycle]) && isset($schedData['time'][$cycle])) {
                            $result = $this->createMonthlyIntervalDates($schedData['duration_month'][$cycle], $schedData['select_day'][$cycle], $schedData['date'][$cycle], $schedData['time'][$cycle]);
                            if (is_array($result) && !empty($result)) {
                                foreach ($result as $key => $date) { //Y-m-d none utc
                                    $sched_date_time = date('Y-m-d H:i:00', strtotime($date . ' ' . $schedData['time'][$cycle]));
                                    $sched_date_time_utc = date('Y-m-d H:i:00', strtotime(B2S_Util::getUTCForDate($sched_date_time, $schedData['user_timezone'] * (-1))));
                                    $shipdays[] = array('sched_date' => $sched_date_time, 'sched_date_utc' => $sched_date_time_utc, 'sched_details_id' => $schedDetailsId);
                                    $printSchedDate[] = array('date' => $sched_date_time);
                                }
                            }
                        }
                    }
                    //interval: own period
                    if ((int) $mode == 2) {
                        if (isset($schedData['duration_time'][$cycle]) && isset($schedData['select_timespan'][$cycle]) && isset($schedData['date'][$cycle]) && isset($schedData['time'][$cycle])) {
                            $result = $this->createCustomIntervalDates($schedData['duration_time'][$cycle], $schedData['select_timespan'][$cycle], $schedData['date'][$cycle]);
                            if (is_array($result) && !empty($result)) {
                                foreach ($result as $key => $date) { //Y-m-d none utc
                                    $sched_date_time = date('Y-m-d H:i:00', strtotime($date . ' ' . $schedData['time'][$cycle]));
                                    $sched_date_time_utc = date('Y-m-d H:i:00', strtotime(B2S_Util::getUTCForDate($sched_date_time, $schedData['user_timezone'] * (-1))));
                                    $shipdays[] = array('sched_date' => $sched_date_time, 'sched_date_utc' => $sched_date_time_utc, 'sched_details_id' => $schedDetailsId);
                                    $printSchedDate[] = array('date' => $sched_date_time);
                                }
                            }
                        }
                    }
                }
            }
        }

        foreach ($shipdays as $k => $schedDate) {
            if (isset($data['b2s_id']) && $data['b2s_id'] > 0) {
                $wpdb->update('b2s_posts', array(
                    'post_id' => $data['post_id'],
                    'blog_user_id' => $data['blog_user_id'],
                    'user_timezone' => $schedData['user_timezone'],
                    'publish_date' => "0000-00-00 00:00:00",
                    'sched_details_id' => $schedDate['sched_details_id'],
                    'sched_type' => $schedData['releaseSelect'],
                    'sched_date' => $schedDate['sched_date'],
                    'sched_date_utc' => $schedDate['sched_date_utc'],
                    'network_details_id' => $networkDetailsId,
                    'hook_action' => 5
                        ), array("id" => $data['b2s_id']), array('%d', '%d', '%s', '%s', '%d', '%d', '%s', '%s', '%d', '%d'));
            } else {
                $wpdb->insert('b2s_posts', array(
                    'post_id' => $data['post_id'],
                    'blog_user_id' => $data['blog_user_id'],
                    'user_timezone' => $schedData['user_timezone'],
                    'publish_date' => "0000-00-00 00:00:00",
                    'sched_details_id' => $schedDate['sched_details_id'],
                    'sched_type' => $schedData['releaseSelect'],
                    'sched_date' => $schedDate['sched_date'],
                    'sched_date_utc' => $schedDate['sched_date_utc'],
                    'network_details_id' => $networkDetailsId,
                    'post_for_relay' => ((!empty($relayData) && is_array($relayData)) ? 1 : 0),
                    'hook_action' => 1
                        ), array('%d', '%d', '%s', '%s', '%d', '%d', '%s', '%s', '%d', '%d', '%d'));

                //since V4.8.0 relay posts
                if (!empty($relayData) && is_array($relayData)) {
                    $internal_post_id = $wpdb->insert_id;
                    $relaySchedData = array('user_timezone' => $schedData['user_timezone'], 'sched_date' => $schedDate['sched_date'], 'sched_date_utc' => $schedDate['sched_date_utc'], 'post_id' => $data['post_id'], 'blog_user_id' => $data['blog_user_id']);
                    $relayResult = $this->saveRelayDetails((int) $internal_post_id, $relayData, $relaySchedData);
                    $printSchedDate = array_merge($printSchedDate, $relayResult);
                }

                B2S_Rating::trigger();
            }
        }

        return array('networkAuthId' => $data['network_auth_id'], 'html' => $this->getItemHtml($serializeData['network_id'], '', '', $printSchedDate));
    }

    public function getItemHtml($network_id = 0, $error = "", $link = "", $schedDate = array(), $directPost = false) {
        $html = "";
        if (empty($error)) {
            if ($directPost) {
                $html = '<br><span class="text-success"><i class="glyphicon glyphicon-ok-circle"></i> ' . __('published', 'blog2social');
                $html .=!empty($link) ? ': <a href="' . $link . '" target="_blank">' . __('view social media post', 'blog2social') . '</a>' : '';
                $html .='</span>';
            }
            if (is_array($schedDate) && !empty($schedDate)) {
                $dateFormat = get_option('date_format');
                $timeFormat = get_option('time_format');
                sort($schedDate);
                foreach ($schedDate as $k => $v) {
                    $schedDateTime = date_i18n($dateFormat . ' ' . $timeFormat, strtotime($v['date']));
                    $isRelay = (isset($v['relay'])) ? " - " . __('Retweet', 'blog2social') : '';
                    $html .= '<br><span class="text-success"><i class="glyphicon glyphicon-time"></i> ' . __('scheduled on', 'blog2social') . ': ' . $schedDateTime . $isRelay . '</span>';
                }
            }
        } else {
            $errorText = unserialize(B2S_PLUGIN_NETWORK_ERROR);
            $error = isset($errorText[$error]) ? $error : 'DEFAULT';
            $add = '';
//special case: reddit RATE_LIMIT
            if ($network_id == 15 && $error == 'RATE_LIMIT') {
                $link = (strtolower(substr(B2S_LANGUAGE, 0, 2)) == 'de') ? 'https://www.blog2social.com/de/faq/content/9/115/de/reddit-du-hast-das-veroeffentlichungs_limit-mit-deinem-account-kurzzeitig-erreicht.html' : 'https://www.blog2social.com/en/faq/content/9/115/en/reddit-you-have-temporarily-reached-the-publication-limit-with-your-account.html';
                $add = ' ' . __('Please see', 'blog2social') . ' <a target="_blank" href="' . $link . '">' . __('FAQ', 'blog2social') . '</a>';
            }

            $html .= '<br><span class="text-danger"><i class="glyphicon glyphicon-remove-circle glyphicon-danger"></i> ' . $errorText[$error] . $add . '</span>';
        }
        return $html;
    }

    private function saveUserDefaultSettings($schedTime, $networkId, $networkType) {
        global $wpdb;
        $settingsId = $wpdb->get_var($wpdb->prepare("SELECT id FROM b2s_post_sched_settings WHERE blog_user_id= %d AND network_id=%d AND network_type=%d", B2S_PLUGIN_BLOG_USER_ID, (int) $networkId, (int) $networkType));
        if ((int) $settingsId > 0) {
            $wpdb->update('b2s_post_sched_settings', array('sched_time' => $schedTime), array('id' => $settingsId), array('%s'), array('%d'));
        } else {
            $wpdb->insert('b2s_post_sched_settings', array('blog_user_id' => B2S_PLUGIN_BLOG_USER_ID, 'network_id' => $networkId, 'network_type' => (int) $networkType, 'sched_time' => $schedTime), array('%d', '%d', '%d', '%s'));
        }
    }

    //monthly
    public function createMonthlyIntervalDates($duration_month = 0, $select_day = 0, $date = "", $time = "") {
        $dates = array();
        $startDateTime = strtotime($date . ' ' . $time);
        $allowEndofMonth = ((int) $select_day == 0) ? true : false;
        $select_day = $allowEndofMonth ? 31 : sprintf("%02d", $select_day);
        $selectDateTime = strtotime(date('Y-m', $startDateTime) . '-' . $select_day . ' ' . $time);

        $addMonth = ($selectDateTime < $startDateTime) ? 1 : 0;

        for ($i = 1; $i <= $duration_month; $i++) {
            $cDate = date('Y-m', strtotime(date('Y-m', $startDateTime) . " +" . $addMonth . " month"));
            if (checkdate((int) date('m', strtotime($cDate)), (int) $select_day, (int) date('Y', strtotime($cDate)))) {
                $dates[] = $cDate . "-" . $select_day;
            } else {
                //set last day of month
                if ($allowEndofMonth) {
                    $dates[] = date("Y-m-t", strtotime($cDate . "-01"));
                }
            }
            $addMonth++;
        }
        return $dates;
    }

    //own period
    public function createCustomIntervalDates($duration_time = 0, $select_timespan = 0, $date = "") {
        $dates = array();
        $dates[] = date('Y-m-d', strtotime($date));  //add start date
        $cTimespan = $select_timespan;
        for ($i = 1; $i < $duration_time; $i++) {
            $dates[] = date('Y-m-d', strtotime($date . " +" . $cTimespan . " day"));
            $cTimespan += $select_timespan;
        }
        return $dates;
    }

}

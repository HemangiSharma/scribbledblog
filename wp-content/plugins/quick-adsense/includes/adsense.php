<?php
/*Begin Scripts */
add_action('admin_footer', 'quick_adsense_adstxt_adsense_admin_notice_admin_footer');
function quick_adsense_adstxt_adsense_admin_notice_admin_footer() {
	echo '<script type="text/javascript">';
	echo "jQuery(document).ready(function() {";
		echo "jQuery('.quick_adsense_adstxt_adsense_notice').on('click', '.notice-dismiss', function() {";
			echo "jQuery.post(";
				echo "jQuery('#quick_adsense_adstxt_adsense_admin_notice_ajax').val(), {";
					echo "'action': 'quick_adsense_adstxt_adsense_admin_notice_dismiss',";
					echo "'quick_adsense_adstxt_adsense_admin_notice_nonce': jQuery('#quick_adsense_adstxt_adsense_admin_notice_nonce').val(),";
				echo "}, function(response) { }";
			echo ");";
		echo "});";
	echo "});";
	echo '</script>';
}
/*End Scripts */

/* Begin Admin Notice */
add_action('init', 'quick_adsense_adstxt_adsense_admin_notice_reactivate');
function quick_adsense_adstxt_adsense_admin_notice_reactivate() {
	if(isset($_GET['quick_adsense_adstxt_adsense_reset'])) {
		delete_option('quick_adsense_adstxt_adsense_admin_notice_dismissed');
		delete_transient('quick_adsense_adstxt_adsense_autocheck_content');
		wp_redirect(esc_url(admin_url('/admin.php?page=quick-adsense')));
	}
}

add_action('admin_notices', 'quick_adsense_adstxt_adsense_admin_notice');
function quick_adsense_adstxt_adsense_admin_notice($isAjax = false) {	
	if(current_user_can('manage_options')) {
		if(!get_option('quick_adsense_adstxt_adsense_admin_notice_dismissed')) {
			$adstxtNewAdsenseEntries = get_transient('quick_adsense_adstxt_adsense_autocheck_content');
			if($adstxtNewAdsenseEntries == '###CHECKED###') {
			} else {
				if(!isset($adstxtNewAdsenseEntries) || ($adstxtNewAdsenseEntries === false)) {
					$adstxtNewAdsenseEntries = quick_adsense_adstxt_adsense_get_status();
				}
				if($adstxtNewAdsenseEntries !== false) {
					set_transient('quick_adsense_adstxt_adsense_autocheck_content', $adstxtNewAdsenseEntries, DAY_IN_SECONDS);
					echo '<div class="notice notice-error quick_adsense_adstxt_adsense_notice is-dismissible" style="padding: 15px;">';
						echo '<p><b>Quick Adsense</b> had detected that your ads.txt file does not have all your Google Adsense Publisher IDs.<br />This will severely impact your adsense earnings and your immediate attention is required.</p>';
						echo '<p>Your recommended google entries for ads.txt is as given below.<br />You can manually copy this to your ads.txt file or ';
							$screen = get_current_screen();
							if(!$isAjax && $screen->id != 'toplevel_page_quick-adsense') {
								echo '<a href="'.esc_url(admin_url('/admin.php?page=quick-adsense#quick_adsense_adstxt_adsense_auto_update')).'">CLICK HERE</a>';
							} else {
								echo '<a href="javascript:;" onclick="quick_adsense_adstxt_adsense_auto_update()">CLICK HERE</a>';
							}
						echo ' to instruct Quick Adsense to try and add the entries automatically.</p>';
						echo '<p><code style="display: block; padding: 2px 10px;">'.implode("<br />", $adstxtNewAdsenseEntries).'</code></p>';
						echo '<p><small><i><b>We recommend you not to dismiss this notice for continued daily ads.txt monitoring.  This notice will stop appearing automatically once Quick Adsense detects correct entries in ads.txt (rechecked daily).</b></i></small></p>';
						echo '<div class="clear"></div>';
						echo '<input type="hidden" id="quick_adsense_adstxt_adsense_admin_notice_nonce" name="quick_adsense_adstxt_adsense_admin_notice_nonce" value="'.wp_create_nonce('quick-adsense-adstxt-adsense-admin-notice').'" />';
						echo '<input type="hidden" id="quick_adsense_adstxt_adsense_admin_notice_ajax" name="quick_adsense_adstxt_adsense_admin_notice_ajax" value="'.admin_url('admin-ajax.php').'" />';
						if($isAjax) {
							echo '<button type="button" class="notice-dismiss" onclick="javascript:jQuery(this).parent().remove()"><span class="screen-reader-text">Dismiss this notice.</span></button>';
						}
					echo '</div>';
				} else {
					set_transient('quick_adsense_adstxt_adsense_autocheck_content', '###CHECKED###', DAY_IN_SECONDS);
				}
			}
		}
	}
}

add_action('wp_ajax_quick_adsense_adstxt_adsense_admin_notice_check', 'quick_adsense_adstxt_adsense_admin_notice_check');
function quick_adsense_adstxt_adsense_admin_notice_check() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	delete_transient('quick_adsense_adstxt_adsense_autocheck_content');
	$adminNotice = quick_adsense_adstxt_adsense_admin_notice(true);
	if(isset($adminNotice) && ($adminNotice != '')) {
		echo '###SUCCESS###';
		echo $adminNotice;
		echo quick_adsense_vi_admin_notice_admin_footer();
	}
	die();
}

add_action('wp_ajax_quick_adsense_adstxt_adsense_admin_notice_dismiss', 'quick_adsense_adstxt_adsense_admin_notice_dismiss');
function quick_adsense_adstxt_adsense_admin_notice_dismiss() {
	check_ajax_referer('quick-adsense-adstxt-adsense-admin-notice', 'quick_adsense_adstxt_adsense_admin_notice_nonce');	
	update_option('quick_adsense_adstxt_adsense_admin_notice_dismissed', 'true');
	die();
}
/* End Admin Notice */

/* Begin Auto Update Ads.txt (Adsense) */
add_action('wp_ajax_quick_adsense_adstxt_adsense_auto_update', 'quick_adsense_adstxt_adsense_auto_update');
function quick_adsense_adstxt_adsense_auto_update() {
	check_ajax_referer('quick-adsense-adstxt-adsense-admin-notice', 'quick_adsense_adstxt_adsense_admin_notice_nonce');
	$adstxtNewAdsenseEntries = quick_adsense_adstxt_adsense_get_status();
	if($adstxtNewAdsenseEntries !== false) {
		$adstxtContent = quick_adsense_adstxt_get_content();
		$adstxtContentData = array_filter(explode("\n", trim($adstxtContent)), 'trim');
		$adstxtUpdatedContent = array_filter(array_merge($adstxtContentData, $adstxtNewAdsenseEntries), 'trim');
	}

	if(isset($adstxtUpdatedContent) && is_array($adstxtUpdatedContent) && (count($adstxtUpdatedContent) > 0)) {
		$adstxtUpdatedContent = implode("\n", $adstxtUpdatedContent);
		if(quick_adsense_adstxt_update_content($adstxtUpdatedContent)) {
			echo '###SUCCESS###';
		} else {
			echo quick_adsense_adstxt_updation_failed_message($adstxtUpdatedContent);
		}
	}
	die();
}
/* End Auto Update Ads.txt (Adsense) */

/* Begin ads.txt Adsense Check */
function quick_adsense_adstxt_adsense_get_status() {
	if(quick_adsense_adstxt_file_exists()) {
		$adsensePublisherIds = quick_adsense_adstxt_adsense_get_publisherids();
		$adstxtContent = quick_adsense_adstxt_get_content();
		$adstxtContentData = array_filter(explode("\n", trim($adstxtContent)), 'trim');
		$adstxtExistingAdsenseEntries = array();
		foreach($adstxtContentData as $line) {
			if(strpos($line, 'google.com') !== false) {
				$adstxtExistingAdsenseEntries[] = $line;
			}
		}
		
		$adstxtNewAdsenseEntries = array();
		if(count($adstxtExistingAdsenseEntries) == 0) {
			if(is_array($adsensePublisherIds) && (count($adsensePublisherIds) > 0)) {
				foreach($adsensePublisherIds as $adsensePublisherId) {
					$adstxtNewAdsenseEntries[] = 'google.com, '.$adsensePublisherId.', DIRECT, f08c47fec0942fa0';
				}
			}
		} else {
			if(is_array($adsensePublisherIds) && (count($adsensePublisherIds) > 0)) {
				foreach($adsensePublisherIds as $adsensePublisherId) {
					$entryExists = false;
					foreach($adstxtExistingAdsenseEntries as $adstxtExistingAdsenseEntry) {
						if(strpos($adstxtExistingAdsenseEntry, $adsensePublisherId) !== false) {
							$entryExists = true;
						}
					}
					if($entryExists == false) {
						$adstxtNewAdsenseEntries[] = 'google.com, '.$adsensePublisherId.', DIRECT, f08c47fec0942fa0';
					}
				}
			}
		}
	}
	if(isset($adstxtNewAdsenseEntries) && count($adstxtNewAdsenseEntries) > 0) {
		return $adstxtNewAdsenseEntries;
	}
	return false;
}
/* End ads.txt Adsense Check */

/* Begin Extract Publisher Ids from Ads */
function quick_adsense_adstxt_adsense_get_publisherids() {
	$adsensePublisherIds = array();
	
	$settings = get_option('quick_adsense_settings');
	if(isset($settings) && is_array($settings)) {
		for($i = 1; $i <= 10; $i++) {
			if(isset($settings['onpost_ad_'.$i.'_content']) && ($settings['onpost_ad_'.$i.'_content'] != '')) {
				$temp = quick_adsense_adstxt_adsense_extract_publisherids($settings['onpost_ad_'.$i.'_content']);
				if($temp !== false) {
					$adsensePublisherIds = array_merge($adsensePublisherIds, $temp);
				}
			}
			
			if(isset($settings['widget_ad_'.$i.'_content']) && ($settings['widget_ad_'.$i.'_content'] != '')) {
				$temp = quick_adsense_adstxt_adsense_extract_publisherids($settings['widget_ad_'.$i.'_content']);
				if($temp !== false) {
					$adsensePublisherIds = array_merge($adsensePublisherIds, $temp);
				}
			}
		}
	}

	$adsensePublisherIds = array_unique($adsensePublisherIds);
	
	if(count($adsensePublisherIds) > 0) {
		return $adsensePublisherIds;
	}
	return false;
}

function quick_adsense_adstxt_adsense_extract_publisherids($adCode) {
	$publisherIds = array();
	if(isset($adCode) && ($adCode != '')) {
		if(preg_match('/googlesyndication.com/', $adCode)) {
			if(preg_match('/data-ad-client=/', $adCode)) { //ASYNS AD CODE
				$adCodeParts = explode('data-ad-client', $adCode);
			} else {
				$adCodeParts = explode('google_ad_client', $adCode); //ORDINARY AD CODE
			}
			if(isset($adCodeParts[1]) && ($adCodeParts[1] != '')) {
				preg_match('#"([a-zA-Z0-9-\s]+)"#', stripslashes($adCodeParts[1]), $matches);
				if(isset($matches[1]) && ($matches[1] != '')) {
					$publisherIds[] = str_replace(array('"', ' ', 'ca-'), array(''), $matches[1]);
				}
			}
		}
	}
	
	if(count($publisherIds) > 0) {
		return $publisherIds;
	}
	return false;
}
/* End Extract Publisher Ids from Ads */

/* Begin Common Functions */
function quick_adsense_adstxt_file_exists() {
	if(file_exists(trailingslashit(get_home_path()).'ads.txt')) {
		return true;
	}
	return false;
}

function quick_adsense_adstxt_get_content() {
	if(quick_adsense_adstxt_file_exists()) {
		return @file_get_contents(trailingslashit(get_home_path()).'ads.txt');
	}
	return '';
}

function quick_adsense_adstxt_update_content($content) {
	delete_transient('quick_adsense_adstxt_adsense_autocheck_content');
	if(get_filesystem_method() === 'direct') {
		$creds = request_filesystem_credentials(site_url().'/wp-admin/', '', false, false, array());
		if(!WP_Filesystem($creds)) {
			return false;
		}
		global $wp_filesystem;
		if(!$wp_filesystem->put_contents(trailingslashit(get_home_path()).'ads.txt', $content, FS_CHMOD_FILE)) {
			return false;
		}
	} else {
		return false;
	}
	return true;
}

function quick_adsense_adstxt_updation_failed_message($content) {
	$output = '<div class="quick_adsense_popup_content_wrapper">';
		$output .= '<p>Auto Creation / Updation of ads.txt failed due to access permission restrictions on the server.</p>';
		$output .= '<p>You have to manually upload the file using your Host\'s File manager or your favourite FTP program</p>';
		$output .= '<p>ads.txt should be located in the root of your server. After manually uploading the file click <a href="'.site_url().'/ads.txt">here</a> to check if its accessible from the correct location</p>';
		$output .= '<textarea style="display: none;" id="quick_adsense_adstxt_content">'.$content.'</textarea>';
		$output .= '<p><a onclick="quick_adsense_adstxt_content_download()" class="button button-primary" href="javascript:;">Download ads.txt</a></p>';
	$output .= '</div>';
	return $output;
}
/* End Common Functions */
?>
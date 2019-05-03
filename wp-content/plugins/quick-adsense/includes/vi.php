<?php
/*Begin Vi Admin Notice */
add_action('admin_footer', 'quick_adsense_vi_admin_notice_admin_footer');
function quick_adsense_vi_admin_notice_admin_footer() {
	echo '<script type="text/javascript">';
	echo "jQuery(document).ready(function() {";
		echo "jQuery('.quick_adsense_notice').on('click', '.notice-dismiss', function() {";
			echo "jQuery.post(";
				echo "jQuery('#quick_adsense_admin_notice_ajax').val(), {";
					echo "'action': 'quick_adsense_vi_admin_notice_dismiss',";
					echo "'quick_adsense_admin_notice_nonce': jQuery('#quick_adsense_admin_notice_nonce').val(),";
				echo "}, function(response) { }";
			echo ");";
		echo "});";
	echo "});";
	echo '</script>';
}

add_action('admin_notices', 'quick_adsense_vi_admin_notices');
function quick_adsense_vi_admin_notices() {	
	if(current_user_can('manage_options')) {
		$userId = get_current_user_id();
		$screen = get_current_screen();
		//delete_user_meta($userId, 'quick_adsense_2_1_admin_notice_dismissed');
		if(!get_user_meta($userId, 'quick_adsense_2_1_admin_notice_dismissed', true)) {
			echo '<div class="notice notice-success quick_adsense_notice is-dismissible" '.((quick_adsense_vi_api_is_loggedin() && ($screen->id != 'toplevel_page_quick-adsense'))?'style="display: none;"':'').'>';
				echo '<div id="quick_adsense_notice_container">';
					echo '<img id="quick_adsense_notice_vi_logo" src="'.plugins_url('/images/vi-big-logo.png', __FILE__).'" />';
					echo '<p class="quick_adsense_notice_title_para">Thank you for updating Quick Adsense!</p>';
					echo '<p class="quick_adsense_notice_content_para">This update features <b>vi stories</b> from video intelligence - a video player that supplies both content and video advertising. Watch a <a href="http://demo.vi.ai/ViewsterBlog_Nintendo.html">demo</a>.</p>';
					echo '<p class="quick_adsense_notice_content_para"> To begin earning sign up to vi stories and place the ad live now! Read the <a href="https://www.vi.ai/frequently-asked-questions-vi-stories-for-wordpress/?utm_source=WordPress&utm_medium=Plugin%20FAQ&utm_campaign=Quick%20Adsense" target="_blank">FAQ</a>.</p>';
					echo '<p class="quick_adsense_notice_info_para">Click the \'Monetize Now\' button to activate vi stories. You\'ll agree to share your domain, affiliate ID and email with video intelligence, and begin your journey to video publisher.</p>';
					if($screen->id != 'toplevel_page_quick-adsense') {
						echo '<a id="quick_adsense_notice_monetize_button" href="'.esc_url(admin_url('/admin.php?page=quick-adsense#vi-remote-signup')).'">Monetize Now</a>';
					} else {
						echo '<a id="quick_adsense_notice_monetize_button" href="javascript:;" onclick="jQuery(\'#quick_adsense_vi_signup\').click()">Monetize Now</a>';
					}
				echo '</div>';				
				echo '<div class="clear"></div>';
				echo '<input type="hidden" id="quick_adsense_admin_notice_nonce" name="quick_adsense_admin_notice_nonce" value="'.wp_create_nonce('quick-adsense-admin-notice').'" />';
				echo '<input type="hidden" id="quick_adsense_admin_notice_ajax" name="quick_adsense_admin_notice_ajax" value="'.admin_url('admin-ajax.php').'" />';
				echo '<style type="text/css">';
					echo '.quick_adsense_notice { padding: 15px; border-left: 4px solid #000; }';
					echo '.quick_adsense_notice #quick_adsense_notice_container { font-size: 14px; font-family: Arial; line-height: 18px; color: #232323; }';
					echo '.quick_adsense_notice #quick_adsense_notice_container #quick_adsense_notice_vi_logo { float: right; margin: 13px 20px 0 20px; }';
					echo '.quick_adsense_notice #quick_adsense_notice_container .quick_adsense_notice_title_para { font-size: 16px; line-height: 18px; margin: 0 0 10px; }';
					echo '.quick_adsense_notice #quick_adsense_notice_container .quick_adsense_notice_content_para { font-size: 14px; line-height: 18px; margin: 0; }';
					echo '.quick_adsense_notice #quick_adsense_notice_container .quick_adsense_notice_info_para { font-size: 13px; font-style: italic; line-height: 18px; margin: 20px 100px 0 0;float: left;width: calc(100% - 265px); }';
					echo '.quick_adsense_notice #quick_adsense_notice_container #quick_adsense_notice_monetize_button { font-size: 16px; color: #000; line-height: 18px; margin: 17px 0 0; background: #fff200; padding: 12px 20px 10px; text-decoration: none; box-shadow: 0px 1px 0px 0px #000000; border: 1px solid #f0e400; border-radius: 3px; display: inline-block; float: left; font-weight: 600; }';
					echo '@media only screen and (max-width: 992px) {';
						echo '.quick_adsense_notice #quick_adsense_notice_container #quick_adsense_notice_vi_logo { clear: both; float: none; margin: 0 0 10px; }';
						echo '.quick_adsense_notice #quick_adsense_notice_container .quick_adsense_notice_info_para { width: 100%; float: none; clear: both; margin: 10px 0 0; }';
					echo '}';
				echo '</style>';
			echo '</div>';
		}
	}
}

add_action('wp_ajax_quick_adsense_vi_admin_notice_dismiss', 'quick_adsense_vi_admin_notice_dismiss');
function quick_adsense_vi_admin_notice_dismiss() {
	check_ajax_referer('quick-adsense-admin-notice', 'quick_adsense_admin_notice_nonce');	
	$userId = get_current_user_id();
	update_user_meta($userId, 'quick_adsense_2_1_admin_notice_dismissed', 'true');
	die();
}

function quick_adsense_vi_admin_notice_reactivate() {
	$userId = get_current_user_id();
	delete_user_meta($userId, 'quick_adsense_2_1_admin_notice_dismissed');
}
/*End Vi Admin Notice */

function quick_adsense_vi_plugin_card_content($isLoggedin = false, $isAjaxRequest = false) {
	if(!$isLoggedin) {
		echo '<div class="quick_adsense_vi_block_header">Start earning with <a href="https://www.vi.ai/publisher-video-monetization/?aid=WP_quickadsense&utm_source=Wordpress&utm_medium=wp_quickadsense">vi stories</a></div>';
		echo '<div class="quick_adsense_vi_block_content" '.(($isAjaxRequest)?'style="opacity: 0;"':'').'>';
			echo '<p>With <strong>vi stories</strong> you’ll see video ads that are matched to your site’s content straight away. It increases time on site, and commands a higher CPM than display advertising. A few days after activation you’ll begin to receive revenue from advertising.</p>';
			echo '<ul>';
				echo '<li>The set up takes only a few minutes</li>';
				echo '<li>Up to 10x higher CPM than traditional display advertising</li>';
				echo '<li>Users spend longer on your site thanks to professional video content</li>';
				echo '<li>The video player is customizable to match your site</li>';
			echo '</ul>';
			echo '<p>Install it now to increase time-on-page, and your revenue thanks to high CPMs.</p>';
		echo '</div>';
		echo '<div class="quick_adsense_vi_block_footer" '.(($isAjaxRequest)?'style="opacity: 0;"':'').'>';
			echo '<span>By clicking sign up you agree to send your current domain, email and affiliate ID to video intelligence & Quick AdSense.</span>';
			echo '<a id="quick_adsense_vi_login" href="javascript:;" class="button button-secondary">Log In</a>';
			echo '<a id="quick_adsense_vi_signup" href="javascript:;" class="button button-primary">Sign Up</a>';
			echo '<div class="clear"></div>';
		echo '</div>';
	} else {
		$dashboardURL = quick_adsense_vi_api_get_dashboardurl();
		echo '<div class="quick_adsense_vi_block_header">Monetization with vi stories</div>';
		echo '<div class="quick_adsense_vi_block_content" '.(($isAjaxRequest)?'style="opacity: 0;"':'').'>';
			echo '<div id="quick_adsense_vi_earnings_wrapper">';
				echo '<div class="quick_adsense_ajaxloader"></div>';
			echo '</div>';
		echo '</div>';
		echo '<div class="quick_adsense_vi_block_footer" '.(($isAjaxRequest)?'style="opacity: 0;"':'').'>';
			echo '<a id="quick_adsense_vi_dashboard" href="'.$dashboardURL.'" target="_blank" class="button button-primary alignleft">Publisher Dashboard</a>';
			echo '<a id="quick_adsense_vi_customize_adcode" href="javascript:;" class="button button-primary alignleft">Configure vi Code</a>';
			echo '<a id="quick_adsense_vi_logout" href="javascript:;" class="button button-secondary">Log Out</a>';			
			echo '<div class="clear"></div>';
		echo '</div>';
	}
	if(quick_adsense_vi_api_get_vi_code() !== false) {
		echo '<input id="quick_adsense_vi_embedcode_status" type="hidden" value="Configured" />';
	} else {
		echo '<input id="quick_adsense_vi_embedcode_status" type="hidden" value="NotConfigured" />';
	}
}

add_action('wp_ajax_quick_adsense_vi_get_chart', 'quick_adsense_vi_get_chart');
function quick_adsense_vi_get_chart() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	$revenueData = quick_adsense_vi_api_get_revenue_data();
	if(isset($revenueData) && is_array($revenueData)) {
		echo '###SUCCESS###';
		echo '<div id="quick_adsense_vi_earnings">';
			echo '<p>Below you can see your current revenues.</p>';
			echo '<span id="quick_adsense_vi_earnings_label">Total Earnings</span>';
			echo '<span id="quick_adsense_vi_earnings_value">$'.$revenueData['netRevenue'].'</span>';
		echo '</div>';
		echo '<div id="quick_adsense_vi_chart_wrapper">';
			echo '<canvas id="quick_adsense_vi_chart" width="1377" height="180"></canvas>';
			echo '<textarea id="quick_adsense_vi_chart_data" style="display: none;">[';
			if(isset($revenueData['mtdReport']) && is_array($revenueData['mtdReport']) & (count($revenueData['mtdReport']) > 0)) {
				$isFirstItem = true;
				foreach($revenueData['mtdReport'] as $reportData) {
					if(!$isFirstItem) {
						echo ',';
					}
					$date = DateTime::createFromFormat('d-m-Y', $reportData['date']);
					echo '{"x": "'.$date->format('m/d/Y').'", "y": "'.$reportData['revenue'].'"}';
					$isFirstItem = false;;
				}
			} else {
				echo '{"x": "'.date('m/d/Y').'", "y": "0.00"}';
			}				
			echo ']</textarea>';
		echo '</div>';
		echo '<div class="clear"></div>';
	} else {
		echo '<p class="viError">There was an error processing your request, our team was notified.<br />Try clearing your browser cache, log out and log in again.</p>';
		echo '<div id="quick_adsense_vi_earnings_wrapper">';
			echo '<div id="quick_adsense_vi_earnings">';
				echo '<span id="quick_adsense_vi_earnings_label">Total Earnings</span>';
				echo '<span id="quick_adsense_vi_earnings_value"><img src="'.plugins_url('/images/vi-no-data.jpg', __FILE__).'"></span>';
			echo '</div>';
			echo '<div id="quick_adsense_vi_chart_wrapper">';
				echo '<img width="348" height="139" src="'.plugins_url('/images/vi-empty-graph.jpg', __FILE__).'">';
			echo '</div>';
			echo '<div class="clear"></div>';
		echo '</div>';
	}
	die();
}

/* Begin Signup Form */
add_action('wp_ajax_quick_adsense_vi_signup_form_get_content', 'quick_adsense_vi_signup_form_get_content');
function quick_adsense_vi_signup_form_get_content() {	
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	$signupURL = quick_adsense_vi_api_get_signupurl();
	if(($signupURL != false) && ($signupURL != '')) {
		echo '<div class="quick_adsense_popup_content_wrapper">';
			echo '<iframe src="'.$signupURL.'?aid=WP_quickadsense&utm_source=Wordpress&utm_medium=WP_quickadsense&utm_campaign=white&utm_content=WP_quickadsense&email='.get_bloginfo('admin_email').'&domain='.quick_adsense_get_domain_name_from_url(get_bloginfo('url')).'" style="width: 100%; max-width: 870px; min-height: 554px;"></iframe>';
			echo '<script type="text/javascript">';
				echo 'jQuery(".ui-dialog-buttonset").find("button").first().remove();';
				echo 'jQuery(".ui-dialog-buttonset").find("button").first().find("span:nth-child(2)").hide().after("<span class=\'ui-button-text\'>Close</span>");';
			echo '</script>';
		echo '</div>';
	} else {
		echo '<div class="quick_adsense_popup_content_wrapper">';
			echo '<p> There was an error processing your request. Please try again later.</p>';
		echo '</div>';
	}
	die();
}

function quick_adsense_get_domain_name_from_url($url){
    $pieces = parse_url($url);
    $domain = isset($pieces['host']) ? $pieces['host'] : '';
    if(preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)){
        return $regs['domain'];
    }
    return false;
}
/* End Signup Form */

/* Begin Login Form */
add_action('wp_ajax_quick_adsense_vi_login_form_get_content', 'quick_adsense_vi_login_form_get_content');
function quick_adsense_vi_login_form_get_content() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	echo '<div class="quick_adsense_popup_content_wrapper">';
		echo '<div class="quick_adsense_vi_loginform_wrapper">';
			quick_adsense_vi_login_form_get_controls();
		echo '</div>';
		echo '<script type="text/javascript">';
			echo 'jQuery(".ui-dialog-buttonset").find("button").first().find("span:nth-child(2)").hide().after("<span class=\'ui-button-text\'>Login</span>");';
			echo 'jQuery(".ui-dialog-buttonset").find("button").first().find("span:nth-child(1)").attr("class", "ui-button-icon-primary ui-icon ui-icon-key");';
		echo '</script>';
	echo '</div>';
	die();
}

add_action('wp_ajax_quick_adsense_vi_login_form_save_action', 'quick_adsense_vi_login_form_save_action');
function quick_adsense_vi_login_form_save_action() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	if(isset($_POST['quick_adsense_vi_login_username']) && ($_POST['quick_adsense_vi_login_username'] != '') && isset($_POST['quick_adsense_vi_login_password']) && ($_POST['quick_adsense_vi_login_password'] != '')) {
		$token = quick_adsense_vi_api_login($_POST['quick_adsense_vi_login_username'], $_POST['quick_adsense_vi_login_password']);
		if(is_array($token) && (isset($token['status'])) && ($token['status'] == 'error')) {
			quick_adsense_vi_login_form_get_controls();
			if($token['errorCode'] == 'WIVI008') {
				echo '<p class="quick_adsense_vi_login_error">'.$token['message'].'</p>';
			} else {
				echo '<p class="quick_adsense_vi_login_error">Error Code: '.$token['errorCode'].'<br />Please contact support or try again later!'.'</p>';
			}
		} else {
			echo '###SUCCESS###';
			quick_adsense_vi_plugin_card_content(true, true);
		}		
	}
	die();
}

function quick_adsense_vi_login_form_get_controls() {
	echo '<div style="margin: 15px 0; padding: 5px; border: 1px solid #999999; border-radius: 5px; position: relative;">';
		echo '<label style="font-weight: bold; position: absolute; left: 15px; top: -10px; background: #FFFFFF; color: #111111; padding: 0px 10px;">Login</label>';
		echo '<div style="margin: 10px 0 10px; padding: 0 10px; position: relative;">';
			echo '<p>Please log in with the received credentials to complete the integration:</p>';
			echo '<p>';
				echo quickadsense_get_control('text', 'Email', 'quick_adsense_vi_login_username', 'quick_adsense_vi_login_username');
			echo '</p>';
			echo '<p>';
				echo quickadsense_get_control('password', 'Password', 'quick_adsense_vi_login_password', 'quick_adsense_vi_login_password');
			echo '</p>';
		echo '</div>';
	echo '</div>';
} 
/* End Login Form */

/* Begin Logout */
add_action('wp_ajax_quick_adsense_vi_logout_action', 'quick_adsense_vi_logout_action');
function quick_adsense_vi_logout_action() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	quick_adsense_vi_api_logout();
	echo '###SUCCESS###';
	quick_adsense_vi_plugin_card_content(false, true);
	die();
}
/* End Logout */

/* Begin Configure vi Code */
add_action('wp_ajax_quick_adsense_vi_customize_adcode_form_get_content', 'quick_adsense_vi_customize_adcode_form_get_content');
function quick_adsense_vi_customize_adcode_form_get_content() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	$vicodeSettings = get_option('quick_adsense_vi_code_settings');
	echo '<div style="margin: 15px 0; padding: 5px; border: 1px solid #999999; border-radius: 5px; position: relative;">';
		echo '<label style="font-weight: bold; position: absolute; left: 15px; top: -10px; background: #FFFFFF; color: #111111; padding: 0px 10px;">vi stories: customize your video player</label>';
		echo '<div style="margin: 10px 0 10px; padding: 0 10px; position: relative;">';
			echo '<div class="quick_adsense_popup_content_wrapper">';
				echo '<p>Use this form to customize the look of the video unit. Use the same parameters as your WordPress theme for a natural look on your site.<br />You can use <b>vi stories</b> for <i>Ad - Beginning of Post</i> and <i>Ad - Middle of Post</i></p>';
				echo '<div class="quick_adsense_vi_popup_right_column">';
					echo '<img style="margin: 0 auto; display: block;" src="'.plugins_url('/images/advertisement-preview.png', __FILE__).'" />';
				echo '</div>';
				echo '<div class="quick_adsense_vi_popup_left_column">';
					echo '<p id="quick_adsense_vi_customize_adcode_keywords_required_error" style="display: none;" class="viError">Keywords contains invalid characters, Some required fields are missing</p>';
					echo '<p id="quick_adsense_vi_customize_adcode_keywords_error" style="display: none;" class="viError">Keywords contains invalid characters</p>';
					echo '<p id="quick_adsense_vi_customize_adcode_required_error" style="display: none;" class="viError">Some required fields are missing</p>';
					$adUnitOptions = array(
						array('text' => 'vi stories', 'value' => 'NATIVE_VIDEO_UNIT'),
					);
					echo '<p>';
						echo quickadsense_get_control('select', 'Ad Unit*', 'quick_adsense_vi_code_settings_ad_unit_type', 'quick_adsense_vi_code_settings_ad_unit_type', ((isset($vicodeSettings['ad_unit_type']))?$vicodeSettings['ad_unit_type']:''), $adUnitOptions);
						echo '<small></small><span class="tooltipWrapper"><span class="tooltip">- vi stories (video advertising + video content)</span></span><small></small>';
					echo '</p>';
					echo '<p>';
						echo quickadsense_get_control('textarea', 'Keywords', 'quick_adsense_vi_code_settings_keywords', 'quick_adsense_vi_code_settings_keywords', ((isset($vicodeSettings['keywords']))?$vicodeSettings['keywords']:''), null, 'input widefat', '', 'Max length 200 chars. a-z, A-Z, numbers, dashes, umlauts and accents are allowed.');
						echo '<small></small><span class="tooltipWrapper"><span class="tooltip">Comma separated values describing the content of the page e.g. \'cooking, grilling, pulled pork\'</span></span><small></small>';
					echo '</p>';
					echo '<p>';
						echo quickadsense_get_control('select', 'IAB Category*', 'quick_adsense_vi_code_settings_iab_category_parent', 'quick_adsense_vi_code_settings_iab_category_parent', ((isset($vicodeSettings['iab_category_parent']))?$vicodeSettings['iab_category_parent']:''), quick_adsense_vi_get_constant_iab_parent_categories());
						echo '<small></small><a class="textTip" target="_blank" href="'.quick_adsense_vi_api_get_iabCategoriesURL().'">See Complete List</a><small></small>';
					echo '</p>';
					echo '<p>';
						echo quickadsense_get_control('select', '&nbsp;', 'quick_adsense_vi_code_settings_iab_category_child', 'quick_adsense_vi_code_settings_iab_category_child', ((isset($vicodeSettings['iab_category_child']))?$vicodeSettings['iab_category_child']:''), quick_adsense_vi_get_constant_iab_child_categories());
						echo '<small></small>';
					echo '</p>';
					$languages = quick_adsense_vi_api_get_languages();			
					$languageOptions = array(
						array('text' => 'Select language', 'value' => 'select'),
					);
					if($languages != false) {
						foreach($languages as $key => $value) {
							$languageOptions[] = array('text' => $value, 'value' => $key);
						}
					}
					echo '<p>';
						echo quickadsense_get_control('select', 'Language', 'quick_adsense_vi_code_settings_language', 'quick_adsense_vi_code_settings_language', ((isset($vicodeSettings['language']))?$vicodeSettings['language']:''), $languageOptions);
						echo '<small></small>';
					echo '</p>';
					echo '<p>';
						echo quickadsense_get_control('text', 'Native Background color', 'quick_adsense_vi_code_settings_native_bg_color', 'quick_adsense_vi_code_settings_native_bg_color', ((isset($vicodeSettings['native_bg_color']))?$vicodeSettings['native_bg_color']:''), null, 'input widefat', '', 'Select color');
						echo '<small></small>';
					echo '</p>';
					echo '<p>';
						echo quickadsense_get_control('text', 'Native Text color', 'quick_adsense_vi_code_settings_native_text_color', 'quick_adsense_vi_code_settings_native_text_color', ((isset($vicodeSettings['native_text_color']))?$vicodeSettings['native_text_color']:''), null, 'input widefat', '', 'Select color');
						echo '<small></small>';
					echo '</p>';
					echo '<p>';
						echo quickadsense_get_control('select', 'Native Text Font Family', 'quick_adsense_vi_code_settings_font_family', 'quick_adsense_vi_code_settings_font_family', ((isset($vicodeSettings['font_family']))?$vicodeSettings['font_family']:''), quick_adsense_vi_get_constant_fonts());
						echo '<small></small>';
					echo '</p>';
					echo '<p>';
						echo quickadsense_get_control('select', 'Native Text Font Size', 'quick_adsense_vi_code_settings_font_size', 'quick_adsense_vi_code_settings_font_size', ((isset($vicodeSettings['font_size']))?$vicodeSettings['font_size']:''), quick_adsense_vi_get_constant_font_sizes());
						echo '<small></small>';
					echo '</p>';
					echo '<p class="quick_adsense_vi_delay_notice">vi Ad Changes might take some time to take into effect</p>';
				echo '</div>';
				echo '<div class="clear"></div>';
			echo '</div>';
		echo '</div>';
	echo '</div>';
	echo '<div style="margin: 15px 0; padding: 5px; border: 1px solid #999999; border-radius: 5px; position: relative;">';
		echo '<label style="font-weight: bold; position: absolute; left: 15px; top: -10px; background: #FFFFFF; color: #111111; padding: 0px 10px;">vi stories: GDPR Compliance</label>';
		echo '<div style="margin: 10px 0 10px; padding: 0 10px; position: relative;">';
			echo '<p>Enable GDPR Compliance confirmation notice on your site for visitors from EU.<br />If you disable this option make sure you are using a data usage authorization system on your website to remain GDPR complaint.</p>';
			$gdprComplainceOptions = array(
				array('text' => 'Status : Do not Show GDPR Authorization Popup', 'value' => 'false'),
				array('text' => 'Status : Show GDPR Authorization Popup', 'value' => 'true')
			);
			echo quickadsense_get_control('select', '', 'quick_adsense_vi_code_settings_show_gdpr_authorization', 'quick_adsense_vi_code_settings_show_gdpr_authorization', ((isset($vicodeSettings['show_gdpr_authorization']))?$vicodeSettings['show_gdpr_authorization']:''), $gdprComplainceOptions);
		echo '</div>';
	echo '</div>';
	echo '<script type="text/javascript">';
		echo 'jQuery(".ui-dialog-buttonset").find("button").first().find("span:nth-child(2)").hide().after("<span class=\'ui-button-text\' style=\'background: #0085ba; border-color: #0073aa #006799 #006799; color: #fff; padding-left: 1em;\'>Save changes</span>");';
		echo 'jQuery(".ui-dialog-buttonset").find("button").first().find("span:nth-child(1)").hide();';
		echo 'quick_adsense_vi_code_iab_category_parent_change();';
		echo 'jQuery("#quick_adsense_vi_code_settings_native_bg_color").minicolors();';
		echo 'jQuery("#quick_adsense_vi_code_settings_native_text_color").minicolors();';
	echo '</script>';
	die();
}

add_action('wp_ajax_quick_adsense_vi_customize_adcode_form_save_action', 'quick_adsense_vi_customize_adcode_form_save_action');
function quick_adsense_vi_customize_adcode_form_save_action() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');	
	$vicodeSettings = array();
	$vicodeSettings['ad_unit_type'] = ((isset($_POST['quick_adsense_vi_code_settings_ad_unit_type']))?$_POST['quick_adsense_vi_code_settings_ad_unit_type']:'');
	$vicodeSettings['keywords'] = ((isset($_POST['quick_adsense_vi_code_settings_keywords']))?$_POST['quick_adsense_vi_code_settings_keywords']:'');
	$vicodeSettings['iab_category_parent'] = ((isset($_POST['quick_adsense_vi_code_settings_iab_category_parent']))?$_POST['quick_adsense_vi_code_settings_iab_category_parent']:'');
	$vicodeSettings['iab_category_child'] = ((isset($_POST['quick_adsense_vi_code_settings_iab_category_child']))?$_POST['quick_adsense_vi_code_settings_iab_category_child']:'');
	$vicodeSettings['language'] = ((isset($_POST['quick_adsense_vi_code_settings_language']))?$_POST['quick_adsense_vi_code_settings_language']:'');
	$vicodeSettings['native_bg_color'] = ((isset($_POST['quick_adsense_vi_code_settings_native_bg_color']))?$_POST['quick_adsense_vi_code_settings_native_bg_color']:'');
	$vicodeSettings['native_text_color'] = ((isset($_POST['quick_adsense_vi_code_settings_native_text_color']))?$_POST['quick_adsense_vi_code_settings_native_text_color']:'');
	$vicodeSettings['font_family'] = ((isset($_POST['quick_adsense_vi_code_settings_font_family']))?$_POST['quick_adsense_vi_code_settings_font_family']:'');
	$vicodeSettings['font_size'] = ((isset($_POST['quick_adsense_vi_code_settings_font_size']))?$_POST['quick_adsense_vi_code_settings_font_size']:'');
	
	$vicodeSettings['show_gdpr_authorization'] = ((isset($_POST['quick_adsense_vi_code_settings_show_gdpr_authorization']))?$_POST['quick_adsense_vi_code_settings_show_gdpr_authorization']:'');
	update_option('quick_adsense_vi_code_settings', $vicodeSettings);
	$viCodeStatus = quick_adsense_vi_api_set_vi_code($vicodeSettings);
	if(is_array($viCodeStatus) && (isset($viCodeStatus['status'])) && ($viCodeStatus['status'] == 'error')) {
		if($viCodeStatus['errorCode'] == 'WIVI108') {
			echo '###FAIL###';
			echo '<p class="viError">'.$viCodeStatus['message'].'</p>';
		} else {
			echo '###FAIL###';
			echo '<p class="viError">There was an error processing your request, our team was notified.<br />Try clearing your browser cache, log out and log in again.</p>';
			echo '<p style="font-size: 10px; margin: 0;">'.$viCodeStatus['errorCode'].': '.$viCodeStatus['message'].'</p>';
		}
	} else {
		echo '###SUCCESS###';
	}
	die();
}

function quick_adsense_vi_customize_adcode_get_settings() {
	$vicodeSettings = get_option('quick_adsense_vi_code_settings');
	
	$output = '';
	if(isset($vicodeSettings) && is_array($vicodeSettings)) {
		$output .= '<p class="quick_adsense_vi_code_data_wrapper">';
		if(isset($vicodeSettings['ad_unit_type']) && ($vicodeSettings['ad_unit_type'] != '') && ($vicodeSettings['ad_unit_type'] != 'select')) {
			$output .= '<label>Ad Unit:</label><b>vi stories</b>';
		}
		
		if(isset($vicodeSettings['keywords']) && ($vicodeSettings['keywords'] != '')) {
			$output .= '<label>Keywords:</label><b>'.$vicodeSettings['keywords'].'</b>';
		}
		
		if(isset($vicodeSettings['iab_category_child']) && ($vicodeSettings['iab_category_child'] != '') && ($vicodeSettings['iab_category_child'] != 'select')) {
			$IABChildCategories = quick_adsense_vi_get_constant_iab_child_categories();
			foreach($IABChildCategories as $IABChildCategoryItem) {
				if($vicodeSettings['iab_category_child'] == $IABChildCategoryItem['value']) {
					$output .= '<label>IAB Category:</label><b>'.$IABChildCategoryItem['text'].'</b>';
				}
			}
		}

		$languages = quick_adsense_vi_api_get_languages();
		if(isset($vicodeSettings['language']) && ($vicodeSettings['language'] != '') && ($vicodeSettings['language'] != 'select')) {
			if($languages != false) {
				foreach($languages as $key => $value) {
					if($vicodeSettings['language'] == $key) {
						$output .= '<label>Language:</label><b>'.$value.'</b>';
					}
				}
			}
		}
		
		if(isset($vicodeSettings['native_bg_color']) && ($vicodeSettings['native_bg_color'] != '')) {
			$output .= '<label>Native Background color:</label><b>'.$vicodeSettings['native_bg_color'].'</b>';
		}
		
		if(isset($vicodeSettings['native_text_color']) && ($vicodeSettings['native_text_color'] != '')) {
			$output .= '<label>Native Text color:</label><b>'.$vicodeSettings['native_text_color'].'</b>';
		}
		
		if(isset($vicodeSettings['font_family']) && ($vicodeSettings['font_family'] != '') && ($vicodeSettings['font_family'] != 'select')) {
			$fontFamily = quick_adsense_vi_get_constant_fonts();
			foreach($fontFamily as $fontFamilyItem) {
				if($vicodeSettings['font_family'] == $fontFamilyItem['value']) {
					$output .= '<label>Native Text Font Family:</label><b>'.$fontFamilyItem['text'].'</b>';
				}
			}
		}
		
		if(isset($vicodeSettings['font_size']) && ($vicodeSettings['font_size'] != '') && ($vicodeSettings['font_size'] != 'select')) {
			$fontSize = quick_adsense_vi_get_constant_font_sizes();	
			foreach($fontSize as $fontSizeItem) {
				if($vicodeSettings['font_size'] == $fontSizeItem['value']) {
					$output .= '<label>Native Text Font Size:</label><b>'.$fontSizeItem['text'].'</b>';
				}
			}
		}
		
		if(isset($vicodeSettings['optional_1']) && ($vicodeSettings['optional_1'] != '')) {
			$output .= '<label>Optional 1:</label><b>'.$vicodeSettings['optional_1'].'</b>';
		}
		if(isset($vicodeSettings['optional_2']) && ($vicodeSettings['optional_2'] != '')) {
			$output .= '<label>Optional 2:</label><b>'.$vicodeSettings['optional_1'].'</b>';
		}
		if(isset($vicodeSettings['optional_3']) && ($vicodeSettings['optional_3'] != '')) {
			$output .= '<label>Optional 3:</label><b>'.$vicodeSettings['optional_1'].'</b>';
		}
		$output .= '</p>';
	}
	return $output;
}
/* End Configure vi Code */

/* Begin ads.txt */
add_action('wp_ajax_quick_adsense_vi_update_adstxt', 'quick_adsense_vi_update_adstxt');
function quick_adsense_vi_update_adstxt() {
	check_ajax_referer('quick-adsense', 'quick_adsense_nonce');
	$adstxtContent = quick_adsense_adstxt_get_content();
	$adstxtContentData = array_filter(explode("\n", trim($adstxtContent)), 'trim');
	$viEntry = quick_adsense_vi_api_get_adstxt_content();
	if(strpos(str_replace(array("\r", "\n", " "), '', $adstxtContent), str_replace(array("\r", "\n", " "), '', $viEntry)) !== false) {
		die();
	} else {
		$updatedAdstxtContent = '';
		if(strpos($adstxtContent, '# 41b5eef6') !== false) {
			foreach($adstxtContentData as $line) {
				if(strpos($line, '# 41b5eef6') !== false) {
					
				} else {
					$updatedAdstxtContent .= str_replace(array("\r", "\n", " "), '', $line)."\r\n";
				}
			}
			$updatedAdstxtContent .= $viEntry;
		} else {
			$updatedAdstxtContent .= $adstxtContent."\r\n".$viEntry;
		}
		
		$adsTxtExists = quick_adsense_adstxt_file_exists();		
		if(quick_adsense_adstxt_update_content($updatedAdstxtContent)) {
			echo '###SUCCESS###';
			
			if(!$adsTxtExists) {
				echo '<div class="notice notice-warning quick_adsense_adsstxt_notice is-dismissible" style="padding: 5px 15px;">';
					echo '<div style="font-size: 14px; font-family: Arial; line-height: 18px; color: #232323;">';
						echo '<p><b>Quick AdSense has created ads.txt file in the root folder of your web site.</b></p>';
						echo '<p>Without this file vi can\'t sell your inventory.<br />If you happen to use another plugin and Google AdSense, please make sure that Google AdSense Publisher ID is added into the ads.txt file. Otherwise, Google might stop delivering ads into that plugin.<br /><br />Check <a href="https://www.vi.ai/faq-ads-txt/?utm_source=Wordpress&utm_medium=wp_quickadsense" target="_blank">FAQ</a> for more information on ads.txt project.</p>';
					echo '</div>';
					echo '<button type="button" class="notice-dismiss" onclick="javascript:jQuery(this).parent().remove()"><span class="screen-reader-text">Dismiss this notice.</span></button>';
				echo '</div>';	
			} else {
				echo '<div class="notice notice-warning quick_adsense_adsstxt_notice is-dismissible" style="padding: 5px 15px;">';
					echo '<div style="float: left; max-width: 875px; font-size: 14px; font-family: Arial; line-height: 18px; color: #232323;">';
						echo '<p><b>ADS.TXT has been added</b></p>';
						echo '<p>Quick Adsense has updated your ads.txt file with lines that declare video intelligence as a legitimate seller of your inventory and enables you to make more money through video intelligence. Read the <a target="_blank" href="https://www.vi.ai/frequently-asked-questions-vi-stories-for-wordpress/?aid=WP_quickadsense&utm_source=Wordpress&utm_medium=wp_quickadsense">FAQ</a>.</p>';
					echo '</div>';
					echo '<img style="float: right; margin-right: 20px; margin-top: 13px;" src="'.plugins_url('/images/vi-big-logo.png', __FILE__).'" />';
					echo '<div class="clear"></div>';
					echo '<button type="button" class="notice-dismiss" onclick="javascript:jQuery(this).parent().remove()"><span class="screen-reader-text">Dismiss this notice.</span></button>';
				echo '</div>';
			}
		} else {
			echo '###FAIL###';
			echo '<div class="notice notice-error quick_adsense_adsstxt_notice is-dismissible" style="padding: 5px 15px;">';
				echo '<div style="float: left; max-width: 875px; font-size: 14px; font-family: Arial; line-height: 18px; color: #232323;">';
					echo '<p><b>ADS.TXT couldn’t be added</b></p>';
					echo '<p>Important note: Quick Adsense hasn’t been able to update your ads.txt file. Please make sure that you enter the following lines manually:</p>';
					echo '<p><code style="display: block;">'.trim(str_replace(array("\r\n", "\r", "\n"), "<br />", $viEntry)).'</code><br />Only by doing so, you\'ll be able to make more money through video intelligence (vi.ai).</p>';
				echo '</div>';
				echo '<img style="float: right; margin-right: 20px; margin-top: 13px;" src="'.plugins_url('/images/vi-big-logo.png', __FILE__).'" />';
				echo '<div class="clear"></div>';
				echo '<button type="button" class="notice-dismiss" onclick="javascript:jQuery(this).parent().remove()"><span class="screen-reader-text">Dismiss this notice.</span></button>';
			echo '</div>';
		}
	}
	die();
}
/* End ads.txt */
?>
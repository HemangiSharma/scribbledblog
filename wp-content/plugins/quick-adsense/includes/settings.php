<?php
add_action('plugin_action_links_quick-adsense/quick-adsense.php', 'quick_adsense_action_links');
function quick_adsense_action_links($links) {
	$links = array_merge(
		array('<a href="'.esc_url(admin_url('/admin.php?page=quick-adsense')).'">Settings</a>'),
		$links
	);
	return $links;
}

add_action('admin_menu', 'quick_adsense_add_menu');
function quick_adsense_add_menu() {
	add_menu_page('Quick Adsense Options', 'Quick Adsense', 'manage_options', 'quick-adsense', 'quick_adsense_settings_page');
}

add_action('admin_enqueue_scripts', 'quick_adsense_admin_enqueue_scripts');
function quick_adsense_admin_enqueue_scripts($hook) {
		if($hook != 'toplevel_page_quick-adsense') {
            return;
        }
		wp_register_script('quick-adsense-minicolors', plugins_url('/js/jquery.minicolors.js', __FILE__), array('jquery', 'jquery-ui-core'));
		wp_enqueue_script('quick-adsense-minicolors');
		wp_register_script('quick-adsense-chart-js', plugins_url('/js/Chart.bundle.min.js', __FILE__), array('jquery', 'jquery-ui-core', 'jquery-ui-accordion', 'jquery-ui-dialog'));
		wp_enqueue_script('quick-adsense-chart-js');
		wp_register_style('quick-adsense-jquery-ui', 'https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
		wp_enqueue_style('quick-adsense-jquery-ui');
        wp_enqueue_style('quick_adsense_admin_css', plugins_url('/css/admin.css', __FILE__));
		wp_enqueue_script('quick_adsense_admin_js', plugins_url('/js/admin.js', __FILE__), array('jquery', 'jquery-ui-core', 'jquery-ui-tabs'));
}

add_action('admin_init', 'quick_adsense_admin_init');
function quick_adsense_admin_init() {
	register_setting('quick_adsense_settings', 'quick_adsense_settings', 'quick_adsense_validate');
	add_settings_section('quick_adsense_vi', '', 'quick_adsense_vi_plugin_card', 'quick-adsense-vi');
    add_settings_section('quick_adsense_general', '', 'quick_adsense_general_content', 'quick-adsense-general');
	add_settings_section('quick_adsense_onpost', '', 'quick_adsense_onpost_content', 'quick-adsense-onpost');
	add_settings_section('quick_adsense_widgets', '', 'quick_adsense_widgets_content', 'quick-adsense-widgets');
	add_settings_section('quick_adsense_header_footer_codes', '', 'quick_adsense_header_footer_codes_plugin_card', 'quick-adsense-header-footer-codes');
}

function quick_adsense_settings_page() { ?>
    <div class="wrap">
		<h2 id="quick_adsense_title">Quick Adsense Setting <span style="font-size: 14px;">(Version 2.4)</span></h2>
		<form id="quick_adsense_settings_form" method="post" action="options.php" name="wp_auto_commenter_form" style="display: none;">
			<?php settings_fields('quick_adsense_settings'); ?>
			<div id="quick_adsense_settings_tabs">
				<ul>
					<li><a href="#tabs-settings">Settings</a></li>
					<li><a href="#tabs-header-footer-codes">Header / Footer Codes</a></li>
					<li><a href="#tabs-vi"> Monetization with vi stories </a></li>
				</ul>
				<div id="tabs-settings">
					<div id="quick_adsense_top_sections_wrapper">
						<?php do_settings_sections('quick-adsense-general'); ?>
					</div>
					<div id="quick_adsense_bottom_sections_wrapper">
						<div id="quick_adsense_bottom_left_section_wrapper">
							<?php do_settings_sections('quick-adsense-onpost'); ?>
						</div>
						<div id="quick_adsense_bottom_right_section_wrapper">
							<?php do_settings_sections('quick-adsense-widgets'); ?>
						</div>
						<div class="clear"></div>
					</div>
					<?php submit_button('Save Changes'); ?>
				</div>
				<div id="tabs-header-footer-codes">
					<?php do_settings_sections('quick-adsense-header-footer-codes'); ?>
					<?php submit_button('Save Changes'); ?>
				</div>
				<div id="tabs-vi">
					<?php do_settings_sections('quick-adsense-vi'); ?>
				</div>
			</div>		
		</form>
		<input type="hidden" id="quick_adsense_admin_ajax" name="quick_adsense_admin_ajax" value="<?php echo admin_url('admin-ajax.php'); ?>" />
		<input type="hidden" id="quick_adsense_nonce" name="quick_adsense_nonce" value="<?php echo wp_create_nonce('quick-adsense'); ?>" />
		<script type="text/javascript">
		jQuery(document).ready(function() {
			jQuery("#quick_adsense_settings_tabs").tabs();
		});
		</script>
    </div>
<?php
}

function quick_adsense_header_footer_codes_plugin_card() {
	$settings = get_option('quick_adsense_settings');
	echo '<div id="quick_adsense_top_sections_wrapper">';
		echo '<div class="quick_adsense_block">';
			echo '<div class="quick_adsense_block_labels">';
				echo '<span>Header<br />Embed Code</span>';
			echo '</div>';
			echo '<div class="quick_adsense_block_controls">';
				echo quickadsense_get_control('textarea-big', '', 'quick_adsense_settings_header_embed_code', 'quick_adsense_settings[header_embed_code]', ((isset($settings['header_embed_code']))?$settings['header_embed_code']:''));
			echo '</div>';
			echo '<div class="clear"></div>';
			echo '<div class="quick_adsense_block_labels">';
				echo '<span>Footer<br />Embed Code</span>';
			echo '</div>';
			echo '<div class="quick_adsense_block_controls">';
				echo quickadsense_get_control('textarea-big', '', 'quick_adsense_settings_footer_embed_code', 'quick_adsense_settings[footer_embed_code]', ((isset($settings['footer_embed_code']))?$settings['footer_embed_code']:''));
			echo '</div>';
			echo '<div class="clear"></div>';
		echo '</div>';
	echo '</div>';
}

function quick_adsense_vi_plugin_card() {
	echo '<div class="quick_adsense_vi_block">';
			if(quick_adsense_vi_api_is_loggedin()) {
				quick_adsense_vi_plugin_card_content(true);				
			} else {
				quick_adsense_vi_plugin_card_content(false);
			}
	echo '</div>';
}

function quick_adsense_general_content() {	
	$settings = get_option('quick_adsense_settings');
	echo '<div class="quick_adsense_block">';
		echo '<div class="quick_adsense_block_labels">';
			echo '<span>Options</span>';
		echo '</div>';
		echo '<div class="quick_adsense_block_controls">';
			echo '<a id="quick_adsense_settings_reset_to_default" href="javascript:;">Reset to Default Settings</a>';
		echo '</div>';
		echo '<div class="clear"></div>';

		echo '<div class="quick_adsense_block_labels">';
			echo 'Adsense';
		echo '</div>';
		echo '<div class="quick_adsense_block_controls">';
			echo 'Place up to';
			$maxAdsCount = array();
			for($i = 0; $i <= 10; $i++) {
				$maxAdsCount[] = array('text' => $i, 'value' => $i);
			}
			echo quickadsense_get_control('select', '', 'quick_adsense_settings_max_ads_per_page', 'quick_adsense_settings[max_ads_per_page]', ((isset($settings['max_ads_per_page']))?$settings['max_ads_per_page']:''),  $maxAdsCount, 'input', 'margin: -2px 10px 0 40px;');
			echo 'Ads on a page';
		echo '</div>';
		echo '<div class="clear"></div>';
		echo '<div class="clear"></div>';
		echo '<div class="quick_adsense_block_labels">';
			echo 'Assign position<br />(Default)';
		echo '</div>';
		echo '<div class="quick_adsense_block_controls">';
			$adPositions = array(
				array('text' => 'Random Ads', 'value' => '0')
			);
			$viSupportedAdPosition = array(
				array('text' => 'Random Ads', 'value' => '0'),
				array('text' => 'vi stories', 'value' => '100'),
			);
			for($i = 1; $i <= 10; $i++) {
				$adPositions[] = array('text' => 'Ads'.$i, 'value' => $i);
				$viSupportedAdPosition[] = array('text' => 'Ads'.$i, 'value' => $i);
			}
			
			$elementCount = array();
			for($i = 1; $i <= 50; $i++) {
				$elementCount[] = array('text' => $i, 'value' => $i);
			}
			echo '<p>';
				echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_position_beginning_of_post', 'quick_adsense_settings[enable_position_beginning_of_post]', ((isset($settings['enable_position_beginning_of_post']))?$settings['enable_position_beginning_of_post']:''),  null, 'input', '');
				echo quickadsense_get_control('select', '', 'quick_adsense_settings_ad_beginning_of_post', 'quick_adsense_settings[ad_beginning_of_post]', ((isset($settings['ad_beginning_of_post']))?$settings['ad_beginning_of_post']:''),  $viSupportedAdPosition, 'input quick_adsense_vi_supported_ad_position', 'margin: -2px 10px 0 20px;');
				echo '<b style="width: 120px; display: inline-block;">Beginning of Post</b>';
				echo '<span style="color: #FF2800;">NEW: vi stories</span>';
			echo '</p>';
			echo '<p>';
				echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_position_middle_of_post', 'quick_adsense_settings[enable_position_middle_of_post]', ((isset($settings['enable_position_middle_of_post']))?$settings['enable_position_middle_of_post']:''),  null, 'input', '');
				echo quickadsense_get_control('select', '', 'quick_adsense_settings_ad_middle_of_post', 'quick_adsense_settings[ad_middle_of_post]', ((isset($settings['ad_middle_of_post']))?$settings['ad_middle_of_post']:''),  $viSupportedAdPosition, 'input quick_adsense_vi_supported_ad_position', 'margin: -2px 10px 0 20px;');
				echo '<b style="width: 120px; display: inline-block;">Middle of Post</b>';
				echo '<span style="color: #FF2800;">NEW: vi stories</span>';
			echo '</p>';
			echo '<p>';
				echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_position_end_of_post', 'quick_adsense_settings[enable_position_end_of_post]', ((isset($settings['enable_position_end_of_post']))?$settings['enable_position_end_of_post']:''),  null, 'input', '');
				echo quickadsense_get_control('select', '', 'quick_adsense_settings_ad_end_of_post', 'quick_adsense_settings[ad_end_of_post]', ((isset($settings['ad_end_of_post']))?$settings['ad_end_of_post']:''),  $adPositions, 'input', 'margin: -2px 10px 0 20px;');
				echo '<b>End of Post</b>';
			echo '</p>';
			echo '<div class="clear"></div>';
			echo '<p>';
				echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_position_after_more_tag', 'quick_adsense_settings[enable_position_after_more_tag]', ((isset($settings['enable_position_after_more_tag']))?$settings['enable_position_after_more_tag']:''),  null, 'input', '');
				echo quickadsense_get_control('select', '', 'quick_adsense_settings_ad_after_more_tag', 'quick_adsense_settings[ad_after_more_tag]', ((isset($settings['ad_after_more_tag']))?$settings['ad_after_more_tag']:''),  $adPositions, 'input', 'margin: -2px 10px 0 20px;');
				echo 'right after <b>the &lt;!--more--&gt; tag</b>';
			echo '</p>';
			echo '<p>';
				echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_position_before_last_para', 'quick_adsense_settings[enable_position_before_last_para]', ((isset($settings['enable_position_before_last_para']))?$settings['enable_position_before_last_para']:''),  null, 'input', '');
				echo quickadsense_get_control('select', '', 'quick_adsense_settings_ad_before_last_para', 'quick_adsense_settings[ad_before_last_para]', ((isset($settings['ad_before_last_para']))?$settings['ad_before_last_para']:''),  $adPositions, 'input', 'margin: -2px 10px 0 20px;');
				echo 'right before <b>the last Paragraph</b>';
			echo '</p>';
			echo '<div class="clear"></div>';
			for($i = 1; $i <= 3; $i++) {
				echo '<p>';
					echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_position_after_para_option_'.$i, 'quick_adsense_settings[enable_position_after_para_option_'.$i.']', ((isset($settings['enable_position_after_para_option_'.$i]))?$settings['enable_position_after_para_option_'.$i]:''),  null, 'input', '');
					echo quickadsense_get_control('select', '', 'quick_adsense_settings_ad_after_para_option_'.$i, 'quick_adsense_settings[ad_after_para_option_'.$i.']', ((isset($settings['ad_after_para_option_'.$i]))?$settings['ad_after_para_option_'.$i]:''),  $adPositions, 'input', 'margin: -2px 10px 0 20px;');
					echo '<span style="width: 110px;display: inline-block;"><b>after Paragraph</b></span>';
					echo quickadsense_get_control('select', '', 'quick_adsense_settings_position_after_para_option_'.$i, 'quick_adsense_settings[position_after_para_option_'.$i.']', ((isset($settings['position_after_para_option_'.$i]))?$settings['position_after_para_option_'.$i]:''),  $elementCount, 'input', 'margin: -2px 10px 0 10px;');
					echo 'repeat';
					echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_jump_position_after_para_option_'.$i, 'quick_adsense_settings[enable_jump_position_after_para_option_'.$i.']', ((isset($settings['enable_jump_position_after_para_option_'.$i]))?$settings['enable_jump_position_after_para_option_'.$i]:''),  null, 'input', 'margin: -1px 10px 0;');
					echo '<b>to End of Post</b> if fewer paragraphs are found';
				echo '</p>';
			}
			echo '<div class="clear"></div>';
			for($i = 1; $i <= 1; $i++) {
				echo '<p>';
					echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_position_after_image_option_'.$i, 'quick_adsense_settings[enable_position_after_image_option_'.$i.']', ((isset($settings['enable_position_after_image_option_'.$i]))?$settings['enable_position_after_image_option_'.$i]:''),  null, 'input', '');
					echo quickadsense_get_control('select', '', 'quick_adsense_settings_ad_after_image_option_'.$i, 'quick_adsense_settings[ad_after_image_option_'.$i.']', ((isset($settings['ad_after_image_option_'.$i]))?$settings['ad_after_image_option_'.$i]:''),  $adPositions, 'input', 'margin: -2px 10px 0 20px;');
					echo '<span style="width: 110px;display: inline-block;">after Image</span>';
					echo quickadsense_get_control('select', '', 'quick_adsense_settings_position_after_image_option_'.$i, 'quick_adsense_settings[position_after_image_option_'.$i.']', ((isset($settings['position_after_image_option_'.$i]))?$settings['position_after_image_option_'.$i]:''),  $elementCount, 'input', 'margin: -2px 10px 0 10px;');
					echo 'repeat';
					echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_enable_jump_position_after_image_option_'.$i, 'quick_adsense_settings[enable_jump_position_after_image_option_'.$i.']', ((isset($settings['enable_jump_position_after_image_option_'.$i]))?$settings['enable_jump_position_after_image_option_'.$i]:''),  null, 'input', 'margin: -1px 10px 0;');
					echo 'after <b>Image\'s outer &lt;div&gt; wp-caption</b> if any';
				echo '</p>';
			}
		echo '</div>';
		echo '<div class="clear"></div>';
	echo '</div>';
	
	echo '<div class="quick_adsense_block">';
		echo '<div class="quick_adsense_block_labels">';
			echo 'Appearance';
		echo '</div>';
		echo '<div class="quick_adsense_block_controls">';
			echo '<p>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_enable_on_posts_label">Posts</b>', 'quick_adsense_settings_enable_on_posts', 'quick_adsense_settings[enable_on_posts]', ((isset($settings['enable_on_posts']))?$settings['enable_on_posts']:''),  null, 'input', 'margin: -1px 10px 0 0;').'</span>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_enable_on_pages_label">Pages</b>', 'quick_adsense_settings_enable_on_pages', 'quick_adsense_settings[enable_on_pages]', ((isset($settings['enable_on_pages']))?$settings['enable_on_pages']:''),  null, 'input', 'margin: -1px 10px 0 15px;').'</span>';
			echo '</p>';
			echo '<p>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_enable_on_homepage_label">Homepage</b>', 'quick_adsense_settings_enable_on_homepage', 'quick_adsense_settings[enable_on_homepage]', ((isset($settings['enable_on_homepage']))?$settings['enable_on_homepage']:''),  null, 'input', 'margin: -1px 10px 0 0;').'</span>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_enable_on_categories_label">Categories</b>', 'quick_adsense_settings_enable_on_categories', 'quick_adsense_settings[enable_on_categories]', ((isset($settings['enable_on_categories']))?$settings['enable_on_categories']:''),  null, 'input', 'margin: -1px 10px 0 15px;').'</span>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_enable_on_archives_label">Archives</b>', 'quick_adsense_settings_enable_on_archives', 'quick_adsense_settings[enable_on_archives]', ((isset($settings['enable_on_archives']))?$settings['enable_on_archives']:''),  null, 'input', 'margin: -1px 10px 0 15px;').'</span>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_enable_on_tags_label">Tags</b>', 'quick_adsense_settings_enable_on_tags', 'quick_adsense_settings[enable_on_tags]', ((isset($settings['enable_on_tags']))?$settings['enable_on_tags']:''),  null, 'input', 'margin: -1px 10px 0 15px;').'</span>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_enable_all_possible_ads_label">Place all possible Ads on these pages</b>', 'quick_adsense_settings_enable_all_possible_ads', 'quick_adsense_settings[enable_all_possible_ads]', ((isset($settings['enable_all_possible_ads']))?$settings['enable_all_possible_ads']:''),  null, 'input', 'margin: -1px 10px 0 35px;').'</span>';
			echo '</p>';
			echo '<p>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_disable_widgets_on_homepage_label">Disable AdsWidget on Homepage</b>', 'quick_adsense_settings_disable_widgets_on_homepage', 'quick_adsense_settings[disable_widgets_on_homepage]', ((isset($settings['disable_widgets_on_homepage']))?$settings['disable_widgets_on_homepage']:''),  null, 'input', 'margin: -1px 10px 0 0;').'</span>';
			echo '</p>';
			echo '<p>';
				echo '<span>'.quickadsense_get_control('checkbox', '<b id="quick_adsense_settings_disable_for_loggedin_users_label">Hide Ads when user is logged in to Wordpress</b>', 'quick_adsense_settings_disable_for_loggedin_users', 'quick_adsense_settings[disable_for_loggedin_users]', ((isset($settings['disable_for_loggedin_users']))?$settings['disable_for_loggedin_users']:''),  null, 'input', 'margin: -1px 10px 0 0;').'</span>';
			echo '</p>';
		echo '</div>';
		echo '<div class="clear"></div>';
	echo '</div>';
	
	echo '<div class="quick_adsense_block">';
		echo '<div class="quick_adsense_block_labels">';
			echo 'Quicktag';
		echo '</div>';
		echo '<div class="quick_adsense_block_controls">';
			echo '<p>';
				echo quickadsense_get_control('checkbox', '<b>Show Quicktag Buttons on the HTML Edit Post SubPanel</b>', 'quick_adsense_settings_enable_quicktag_buttons', 'quick_adsense_settings[enable_quicktag_buttons]', ((isset($settings['enable_quicktag_buttons']))?$settings['enable_quicktag_buttons']:''),  null, 'input', 'margin: -1px 10px 0 0;');
			echo '</p>';
			echo '<p>';
				echo quickadsense_get_control('checkbox', 'Hide <b>&lt;!--RndAds--&gt;</b> from Quicktag Buttons', 'quick_adsense_settings_disable_randomads_quicktag_button', 'quick_adsense_settings[disable_randomads_quicktag_button]', ((isset($settings['disable_randomads_quicktag_button']))?$settings['disable_randomads_quicktag_button']:''),  null, 'input', 'margin: -1px 10px 0 0;');
			echo '</p>';
			echo '<p>';
				echo quickadsense_get_control('checkbox', 'Hide <b>&lt;!--NoAds--&gt;</b>, <b>&lt;!--OffDef--&gt;</b>, <b>&lt;!--OffWidget--&gt;</b> from Quicktag Buttons', 'quick_adsense_settings_disable_disablead_quicktag_buttons', 'quick_adsense_settings[disable_disablead_quicktag_buttons]', ((isset($settings['disable_disablead_quicktag_buttons']))?$settings['disable_disablead_quicktag_buttons']:''),  null, 'input', 'margin: -1px 10px 0 0;');
			echo '</p>';
			echo '<p>';
				echo quickadsense_get_control('checkbox', 'Hide <b>&lt;!--OffBegin--&gt;</b>, <b>&lt;!--OffMiddle--&gt;</b>, <b>&lt;!--OffEnd--&gt;</b>, <b>&lt;!--OffAfMore--&gt;</b>, <b>&lt;!--OffBfLastPara--&gt;</b> from Quicktag Buttons', 'quick_adsense_settings_disable_positionad_quicktag_buttons', 'quick_adsense_settings[disable_positionad_quicktag_buttons]', ((isset($settings['disable_positionad_quicktag_buttons']))?$settings['disable_positionad_quicktag_buttons']:''),  null, 'input', 'margin: -1px 10px 0 0;');
			echo '</p>';
			echo '<div class="clear"></div>';
			echo 'Insert Ads into a post, on-the-fly:';
			echo '<ol>';
				echo '<li>Insert <b>&lt;!--Ads1--&gt;</b>, <b>&lt;!--Ads2--&gt;</b> etc. into a post to show the <b>Particular Ads</b> at specific location.</li>';
				echo '<li>Insert <b>&lt;!--RndAds--&gt;</b> (or more) into a post to show the <b>Random Ads</b> at specific location.</li>';
			echo '</ol>';
			echo '<div class="clear"></div>';
			echo 'Disable Ads in a post, on-the-fly:';
			echo '<ol>';
				echo '<li>Insert <b><!--NoAds--></b> to disable all Ads in a post <i>(does not affect Ads on Sidebar)</i>.</li>';
				echo '<li>Insert <b><!--OffDef--></b> to disable the default positioned Ads, and use <!--Ads1-->, <!--Ads2-->, etc. to insert Ad <i>(does not affect Ads on Sidebar)</i>.</li>';
				echo '<li>Insert <b><!--OffWidget--></b> to disable all Ads on Sidebar.</li>';
				echo '<li>Insert <b><!--OffBegin--></b>, <b><!--OffMiddle--></b>, <b><!--OffEnd--></b> to <b>disable Ads at Beginning</b>, <b>Middle or End of Post</b>.</li>';
				echo '<li>Insert <b><!--OffAfMore--></b>, <b><!--OffBfLastPara--></b> to <b>disable Ads right after the <!--more--> tag</b>, or <b>right before the last Paragraph</b>.</li>';
			echo '</ol>';
			echo '<div class="clear"></div>';
			echo '<i>Tags can be inserted into a post via the additional Quicktag Buttons at the HTML Edit Post SubPanel.</i>';
		echo '</div>';
		echo '<div class="clear"></div>';
	echo '</div>';
	
	echo '<div id="quick_adsense_block_bottom" class="quick_adsense_block">';
		echo '<div class="quick_adsense_block_labels">';
			echo '<span>Adsense Codes</span>';
		echo '</div>';
		echo '<div class="clear"></div>';
		echo '<p>Paste up to 10 Ads codes on Post Body as assigned above, and up to 10 Ads codes on Sidebar Widget. Ads codes provided must not be identical, repeated codes may result the Ads not being display correctly. Ads will never displays more than once in a page.</p>';
	echo '</div>';
}

function quick_adsense_onpost_content() {
	$settings = get_option('quick_adsense_settings');
	$alignmentOptions = array(		
		array('text' => 'Left', 'value' => '1'),
		array('text' => 'Center', 'value' => '2'),
		array('text' => 'Right', 'value' => '3'),
		array('text' => 'None', 'value' => '4')
	);
	$marginOptions = array();
	for($i = 1; $i <= 50; $i++) {
		$marginOptions[] = array('text' => $i, 'value' => $i);
	}
	echo '<h2>Ads on Post Body</h2>';
	echo '<div id="quick_adsense_onpost_content_controls_wrapper">';
		echo '<div id="quick_adsense_onpost_content_global_controls_wrapper" style="visibility: hidden;">';			
			echo '<p class="quick_adsense_onpost_adunits_styling_controls">';
				echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_onpost_enable_global_style', 'quick_adsense_settings[onpost_enable_global_style]', ((isset($settings['onpost_enable_global_style']))?$settings['onpost_enable_global_style']:''),  null, 'input', 'margin: -3px 10px 0 0;');
				echo '<span>Use for all</span>';
				echo '<wbr />Alignment';
				echo quickadsense_get_control('select', '', 'quick_adsense_settings_onpost_global_alignment', 'quick_adsense_settings[onpost_global_alignment]', ((isset($settings['onpost_global_alignment']))?$settings['onpost_global_alignment']:''),  $alignmentOptions, 'input', 'margin: -6px 20px 0 10px; width: 73px;');
				echo '<wbr />margin';
				echo quickadsense_get_control('number', '', 'quick_adsense_settings_onpost_global_margin', 'quick_adsense_settings[onpost_global_margin]', ((isset($settings['onpost_global_margin']))?$settings['onpost_global_margin']:''),  $marginOptions, 'input', 'margin: -1px 10px 0 10px; width: 62px;');
				echo 'px';
			echo '</p>';
		echo '</div>';

		echo '<div id="quick_adsense_onpost_content_adunits_wrapper">';
			echo '<div id="quick_adsense_onpost_content_adunits_initial_wrapper">';	
				for($i = 1; $i <= 3; $i++) {
					echo '<div id="quick_adsense_onpost_adunits_control_'.$i.'" class="quick_adsense_onpost_adunits_control_wrapper">';
						echo '<div class="quick_adsense_onpost_adunits_label">Ads'.$i.'</div>';
						echo '<div class="quick_adsense_onpost_adunits_control">';
							echo quickadsense_get_control('textarea', '', 'quick_adsense_settings_onpost_ad_'.$i.'_content', 'quick_adsense_settings[onpost_ad_'.$i.'_content]', ((isset($settings['onpost_ad_'.$i.'_content']))?$settings['onpost_ad_'.$i.'_content']:''),  null, 'input', 'display: block; margin: 0 0 10px 0', 'Enter Code');
							echo '<p class="quick_adsense_onpost_adunits_styling_controls">';
								echo 'Alignment';
								echo quickadsense_get_control('select', '', 'quick_adsense_settings_onpost_ad_'.$i.'_alignment', 'quick_adsense_settings[onpost_ad_'.$i.'_alignment]', ((isset($settings['onpost_ad_'.$i.'_alignment']))?$settings['onpost_ad_'.$i.'_alignment']:''),  $alignmentOptions, 'input', 'margin: -2px 20px 0 10px;');
								echo '<wbr />margin';
								echo quickadsense_get_control('number', '', 'quick_adsense_settings_onpost_ad_'.$i.'_margin', 'quick_adsense_settings[onpost_ad_'.$i.'_margin]', ((isset($settings['onpost_ad_'.$i.'_margin']))?$settings['onpost_ad_'.$i.'_margin']:''),  $marginOptions, 'input', 'margin: -2px 10px 0 10px; width: 52px;');
								echo 'px';
							echo '</p>';
						echo '</div>';
						echo '<div class="clear"></div>';
					echo '</div>';
				}
			echo '</div>';
			echo '<div id="quick_adsense_onpost_content_adunits_all_wrapper" style="display: none;">';	
				for($i = 4; $i <= 10; $i++) {
					echo '<div id="quick_adsense_onpost_adunits_control_'.$i.'" class="quick_adsense_onpost_adunits_control_wrapper">';
						echo '<div class="quick_adsense_onpost_adunits_label">Ads'.$i.'</div>';
						echo '<div class="quick_adsense_onpost_adunits_control">';
							echo quickadsense_get_control('textarea', '', 'quick_adsense_settings_onpost_ad_'.$i.'_content', 'quick_adsense_settings[onpost_ad_'.$i.'_content]', ((isset($settings['onpost_ad_'.$i.'_content']))?$settings['onpost_ad_'.$i.'_content']:''),  null, 'input', 'display: block; margin: 0 0 10px 0', 'Enter Code');
							echo '<p class="quick_adsense_onpost_adunits_styling_controls">';
								echo 'Alignment';
								echo quickadsense_get_control('select', '', 'quick_adsense_settings_onpost_ad_'.$i.'_alignment', 'quick_adsense_settings[onpost_ad_'.$i.'_alignment]', ((isset($settings['onpost_ad_'.$i.'_alignment']))?$settings['onpost_ad_'.$i.'_alignment']:''),  $alignmentOptions, 'input', 'margin: -2px 20px 0 10px;');
								echo '<wbr />margin';
								echo quickadsense_get_control('number', '', 'quick_adsense_settings_onpost_ad_'.$i.'_margin', 'quick_adsense_settings[onpost_ad_'.$i.'_margin]', ((isset($settings['onpost_ad_'.$i.'_margin']))?$settings['onpost_ad_'.$i.'_margin']:''),  $marginOptions, 'input', 'margin: -2px 10px 0 10px; width: 62px;');
								echo 'px';
							echo '</p>';
						echo '</div>';
						echo '<div class="clear"></div>';
					echo '</div>';
				}
			echo '</div>';
			echo '<a id="quick_adsense_onpost_content_adunits_showall_button" class="input button-secondary"><span class="dashicons dashicons-arrow-down"></span> <b>Show All</b></a>';
		echo '</div>';
	echo '</div>';
}

function quick_adsense_widgets_content() {
	$settings = get_option('quick_adsense_settings');
	$alignmentOptions = array(		
		array('text' => 'Left', 'value' => '1'),
		array('text' => 'Center', 'value' => '2'),
		array('text' => 'Right', 'value' => '3'),
		array('text' => 'None', 'value' => '4')
	);
	$marginOptions = array();
	for($i = 1; $i <= 50; $i++) {
		$marginOptions[] = array('text' => $i, 'value' => $i);
	}
	
	echo '<h2><a href="'.admin_url('widgets.php').'">Sidebar WIdget</a></h2>';
	echo '<div id="quick_adsense_widget_controls_wrapper">';
		echo '<div id="quick_adsense_widget_global_controls_wrapper" style="visibility: hidden;">';			
			echo '<p class="quick_adsense_widget_adunits_styling_controls">';
				echo quickadsense_get_control('checkbox', '', 'quick_adsense_settings_widget_enable_global_style', 'quick_adsense_settings[widget_enable_global_style]', ((isset($settings['widget_enable_global_style']))?$settings['widget_enable_global_style']:''),  null, 'input', 'margin: -3px 10px 0 0;');
				echo '<span>Use for all</span>';
				echo '<wbr />Alignment';
				echo quickadsense_get_control('select', '', 'quick_adsense_settings_widget_global_alignment', 'quick_adsense_settings[widget_global_alignment]', ((isset($settings['widget_global_alignment']))?$settings['widget_global_alignment']:''),  $alignmentOptions, 'input', 'margin: -6px 20px 0 10px; width: 73px;');
				echo '<wbr />margin';
				echo quickadsense_get_control('number', '', 'quick_adsense_settings_widget_global_margin', 'quick_adsense_settings[widget_global_margin]', ((isset($settings['widget_global_margin']))?$settings['widget_global_margin']:''),  $marginOptions, 'input', 'margin: -1px 10px 0 10px; width: 62px;');
				echo 'px';
			echo '</p>';
		echo '</div>';
		
		echo '<div id="quick_adsense_widget_adunits_wrapper">';			
			echo '<div id="quick_adsense_widget_adunits_initial_wrapper">';	
			for($i = 1; $i <= 3; $i++) {
				echo '<div id="quick_adsense_widget_adunits_control_'.$i.'" class="quick_adsense_widget_adunits_control_wrapper">';
					echo '<div class="quick_adsense_widget_adunits_label">AdsWidget'.$i.'</div>';
					echo '<div class="quick_adsense_widget_adunits_control">';
						echo quickadsense_get_control('textarea', '', 'quick_adsense_settings_widget_ad_'.$i.'_content', 'quick_adsense_settings[widget_ad_'.$i.'_content]', ((isset($settings['widget_ad_'.$i.'_content']))?$settings['widget_ad_'.$i.'_content']:''),  null, 'input', 'display: block; margin: 0 0 10px 0', 'Enter Code');
					echo '</div>';
					echo '<div class="clear"></div>';
				echo '</div>';
			}
			echo '</div>';
			echo '<div id="quick_adsense_widget_adunits_all_wrapper" style="display: none;">';	
				for($i = 4; $i <= 10; $i++) {
					echo '<div id="quick_adsense_widget_adunits_control_'.$i.'" class="quick_adsense_widget_adunits_control_wrapper">';
						echo '<div class="quick_adsense_widget_adunits_label">AdsWidget'.$i.'</div>';
						echo '<div class="quick_adsense_widget_adunits_control">';
							echo quickadsense_get_control('textarea', '', 'quick_adsense_settings_widget_ad_'.$i.'_content', 'quick_adsense_settings[widget_ad_'.$i.'_content]', ((isset($settings['widget_ad_'.$i.'_content']))?$settings['widget_ad_'.$i.'_content']:''),  null, 'input', 'display: block; margin: 0 0 10px 0', 'Enter Code');
						echo '</div>';
						echo '<div class="clear"></div>';
					echo '</div>';
				}
			echo '</div>';
			echo '<a id="quick_adsense_widget_adunits_showall_button" class="input button-secondary"><span class="dashicons dashicons-arrow-down"></span> <b>Show All</b></a>';
		echo '</div>';
	echo '</div>';
}

function quick_adsense_validate($input) {
	delete_transient('quick_adsense_adstxt_adsense_autocheck_content');
	return $input;
}
?>
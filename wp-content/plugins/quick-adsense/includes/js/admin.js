jQuery(document).ready(function() {
	jQuery('#quick_adsense_settings_reset_to_default').click(quick_adsense_settings_reset_to_default);	
	
	jQuery('#quick_adsense_settings_enable_position_beginning_of_post').click(quick_adsense_settings_enable_position_beginning_of_post);
	jQuery('#quick_adsense_settings_enable_position_middle_of_post').click(quick_adsense_settings_enable_position_middle_of_post);
	jQuery('#quick_adsense_settings_enable_position_end_of_post').click(quick_adsense_settings_enable_position_end_of_post);	
	jQuery('#quick_adsense_settings_enable_position_after_more_tag').click(quick_adsense_settings_enable_position_after_more_tag);	
	jQuery('#quick_adsense_settings_enable_position_before_last_para').click(quick_adsense_settings_enable_position_before_last_para);	
	jQuery('#quick_adsense_settings_enable_position_after_para_option_1').click(quick_adsense_settings_enable_position_after_para_option_1);	
	jQuery('#quick_adsense_settings_enable_position_after_para_option_2').click(quick_adsense_settings_enable_position_after_para_option_2);	
	jQuery('#quick_adsense_settings_enable_position_after_para_option_3').click(quick_adsense_settings_enable_position_after_para_option_3);	
	jQuery('#quick_adsense_settings_enable_position_after_image_option_1').click(quick_adsense_settings_enable_position_after_image_option_1);	
	jQuery('#quick_adsense_settings_enable_on_posts').click(quick_adsense_settings_enable_on_posts);
	jQuery('#quick_adsense_settings_enable_on_pages').click(quick_adsense_settings_enable_on_pages);	
	jQuery('#quick_adsense_settings_enable_on_homepage').click(quick_adsense_settings_enable_on_homepage);
	jQuery('#quick_adsense_settings_enable_on_categories').click(quick_adsense_settings_enable_on_categories);
	jQuery('#quick_adsense_settings_enable_on_archives').click(quick_adsense_settings_enable_on_archives);
	jQuery('#quick_adsense_settings_enable_on_tags').click(quick_adsense_settings_enable_on_tags);
	jQuery('#quick_adsense_settings_enable_all_possible_ads').click(quick_adsense_settings_enable_all_possible_ads);	
	jQuery('#quick_adsense_settings_disable_widgets_on_homepage').click(quick_adsense_settings_disable_widgets_on_homepage);	
	jQuery('#quick_adsense_settings_disable_for_loggedin_users').click(quick_adsense_settings_disable_for_loggedin_users);	
	jQuery('#quick_adsense_settings_enable_quicktag_buttons').click(quick_adsense_settings_enable_quicktag_buttons);	
	jQuery('#quick_adsense_settings_disable_randomads_quicktag_button').click(quick_adsense_settings_disable_randomads_quicktag_button);	
	jQuery('#quick_adsense_settings_disable_disablead_quicktag_buttons').click(quick_adsense_settings_disable_disablead_quicktag_buttons);	
	jQuery('#quick_adsense_settings_disable_positionad_quicktag_buttons').click(quick_adsense_settings_disable_positionad_quicktag_buttons);
	
	jQuery('#quick_adsense_settings_onpost_enable_global_style').click(quick_adsense_settings_onpost_enable_global_style);	
	jQuery('#quick_adsense_settings_onpost_global_alignment').click(quick_adsense_settings_onpost_enable_global_style);
	jQuery('#quick_adsense_settings_onpost_global_margin').click(quick_adsense_settings_onpost_enable_global_style);
	
	jQuery('#quick_adsense_settings_ad_beginning_of_post').change(function() {
		quick_adsense_vi_check_status(this);
		quick_adsense_settings_handle_vi_single_selection();
	});

	jQuery('#quick_adsense_settings_ad_middle_of_post').change(function() {
		quick_adsense_vi_check_status(this);
		quick_adsense_settings_handle_vi_single_selection();
	});
	
	quick_adsense_settings_enable_position_beginning_of_post();
	quick_adsense_settings_enable_position_middle_of_post();
	quick_adsense_settings_enable_position_end_of_post();
	quick_adsense_settings_enable_position_after_more_tag();
	quick_adsense_settings_enable_position_before_last_para();
	quick_adsense_settings_enable_position_after_para_option_1();
	quick_adsense_settings_enable_position_after_para_option_2();
	quick_adsense_settings_enable_position_after_para_option_3();
	quick_adsense_settings_enable_position_after_image_option_1();
	quick_adsense_settings_enable_on_posts();
	quick_adsense_settings_enable_on_pages();
	quick_adsense_settings_enable_on_homepage();
	quick_adsense_settings_enable_on_categories();
	quick_adsense_settings_enable_on_archives();
	quick_adsense_settings_enable_on_tags();
	quick_adsense_settings_enable_all_possible_ads();
	quick_adsense_settings_disable_widgets_on_homepage();
	quick_adsense_settings_disable_for_loggedin_users();
	quick_adsense_settings_enable_quicktag_buttons();
	quick_adsense_settings_disable_randomads_quicktag_button();
	quick_adsense_settings_disable_disablead_quicktag_buttons();
	quick_adsense_settings_disable_positionad_quicktag_buttons();
	quick_adsense_settings_onpost_enable_global_style();
	quick_adsense_settings_handle_vi_single_selection();
	
	jQuery('#quick_adsense_onpost_content_adunits_showall_button').click(function() {
		if(jQuery('#quick_adsense_onpost_content_adunits_showall_button').text() == ' Show All') {
			jQuery('#quick_adsense_onpost_content_adunits_all_wrapper').slideDown();
			jQuery('#quick_adsense_onpost_content_adunits_showall_button').html('<span class="dashicons dashicons-arrow-up"></span> <b>Show Less</b>');
		} else {
			jQuery('#quick_adsense_onpost_content_adunits_all_wrapper').slideUp();
			jQuery('#quick_adsense_onpost_content_adunits_showall_button').html('<span class="dashicons dashicons-arrow-down"></span> <b>Show All</b>');
		}
	});
	
	jQuery('#quick_adsense_widget_adunits_showall_button').click(function() {
		if(jQuery('#quick_adsense_widget_adunits_showall_button').text() == ' Show All') {
			jQuery('#quick_adsense_widget_adunits_all_wrapper').slideDown();
			jQuery('#quick_adsense_widget_adunits_showall_button').html('<span class="dashicons dashicons-arrow-up"></span> <b>Show Less</b>');
		} else {
			jQuery('#quick_adsense_widget_adunits_all_wrapper').slideUp();
			jQuery('#quick_adsense_widget_adunits_showall_button').html('<span class="dashicons dashicons-arrow-down"></span> <b>Show All</b>');
		}
	});

	jQuery('#quick_adsense_settings_form').submit(function() {
		jQuery('#quick_adsense_settings_form select').each(function() {
			if(jQuery(this).prop('disabled') == true) {
				jQuery(this).prop('disabled', false);
			}
		});
	});

	jQuery('#quick_adsense_settings_form').fadeIn();
	if(window.location.href.indexOf('#quick_adsense_adstxt_adsense_auto_update') > -1) {
		quick_adsense_adstxt_adsense_auto_update();
	}
});

function quick_adsense_adstxt_adsense_auto_update() {
	jQuery.post(
		jQuery('#quick_adsense_adstxt_adsense_admin_notice_ajax').val(), {
			'action': 'quick_adsense_adstxt_adsense_auto_update',
			'quick_adsense_adstxt_adsense_admin_notice_nonce': jQuery('#quick_adsense_adstxt_adsense_admin_notice_nonce').val(),
		}, function(response) {
			if(response != '###SUCCESS###') {
				jQuery(response).dialog({
					'modal': true,
					'resizable': false,
					'title': 'Ads.txt Auto Updation Failed',
					'width': jQuery("body").width() * 0.5,
					'maxWidth': jQuery("body").width() * 0.5,
					'maxHeight': jQuery("body").height() * 0.9,
					position: { my: 'center', at: 'center', of: window },
					open: function (event, ui) {
						jQuery('.ui-dialog').css({'z-index': 999999, 'max-width': '90%'});
						jQuery('.ui-widget-overlay').css({'z-index': 999998, 'opacity': 0.8, 'background': '#000000'});
					},
					buttons : {
						'Cancel': function() {
							jQuery(this).dialog("close");
						}
					},
					close: function() {
						jQuery(this).dialog('destroy');
					}
				});
			} else {
				jQuery('.quick_adsense_adstxt_adsense_notice').hide();
			}
		}
	);
}

function quick_adsense_settings_reset_to_default() {
	jQuery('#quick_adsense_settings_max_ads_per_page').val('3');
	
	jQuery('#quick_adsense_settings_enable_position_beginning_of_post').prop('checked', true);		
	jQuery('#quick_adsense_settings_ad_beginning_of_post').val('1');
	jQuery('#quick_adsense_settings_enable_position_middle_of_post').prop('checked', false);
	jQuery('#quick_adsense_settings_ad_middle_of_post').val('0');
	jQuery('#quick_adsense_settings_enable_position_end_of_post').prop('checked', true);
	jQuery('#quick_adsense_settings_ad_end_of_post').val('0');
	
	jQuery('#quick_adsense_settings_enable_position_after_more_tag').prop('checked', false);
	jQuery('#quick_adsense_settings_ad_after_more_tag').val('0');
	jQuery('#quick_adsense_settings_enable_position_before_last_para').prop('checked', false);
	jQuery('#quick_adsense_settings_ad_before_last_para').val('0');
	
	for(var i = 1; i <= 3; i++) {
		jQuery('#quick_adsense_settings_enable_position_after_para_option_'+i).prop('checked', false);
		jQuery('#quick_adsense_settings_ad_after_para_option_'+i).val('0');
		jQuery('#quick_adsense_settings_position_after_para_option_'+i).val('1');
		jQuery('#quick_adsense_settings_enable_jump_position_after_para_option_'+i).prop('checked', false);
	}
	
	for(var i = 1; i <= 1; i++) {
		jQuery('#quick_adsense_settings_enable_position_after_image_option_'+i).prop('checked', false);
		jQuery('#quick_adsense_settings_ad_after_image_option_'+i).val('0');
		jQuery('#quick_adsense_settings_position_after_image_option_'+i).val('1');
		jQuery('#quick_adsense_settings_enable_jump_position_after_image_option_'+i).prop('checked', false);
	}
	
	jQuery('#quick_adsense_settings_enable_on_posts').prop('checked', true);
	jQuery('#quick_adsense_settings_enable_on_pages').prop('checked', true);
	
	jQuery('#quick_adsense_settings_enable_on_homepage').prop('checked', false);
	jQuery('#quick_adsense_settings_enable_on_categories').prop('checked', false);
	jQuery('#quick_adsense_settings_enable_on_archives').prop('checked', false);
	jQuery('#quick_adsense_settings_enable_on_tags').prop('checked', false);
	jQuery('#quick_adsense_settings_enable_all_possible_ads').prop('checked', false);
	
	jQuery('#quick_adsense_settings_disable_widgets_on_homepage').prop('checked', false);
	
	jQuery('#quick_adsense_settings_disable_for_loggedin_users').prop('checked', false);
	
	jQuery('#quick_adsense_settings_enable_quicktag_buttons').prop('checked', true);
	jQuery('#quick_adsense_settings_disable_randomads_quicktag_button').prop('checked', false);
	jQuery('#quick_adsense_settings_disable_disablead_quicktag_buttons').prop('checked', false);
	jQuery('#quick_adsense_settings_disable_positionad_quicktag_buttons').prop('checked', false);
	
	jQuery('#quick_adsense_settings_onpost_enable_global_style').prop('checked', false);
	jQuery('#quick_adsense_settings_onpost_global_alignment').val('2');
	jQuery('#quick_adsense_settings_onpost_global_margin').val('10');
		
	for(var i = 1; i <= 10; i++) {
		jQuery('#quick_adsense_settings_onpost_ad_'+i+'_content').val('');
		jQuery('#quick_adsense_settings_onpost_ad_'+i+'_alignment').val('2');
		jQuery('#quick_adsense_settings_onpost_ad_'+i+'_margin').val('10');
		
		jQuery('#quick_adsense_settings_widget_ad_'+i+'_content').val('');
	}
	
	quick_adsense_settings_enable_position_beginning_of_post();
	quick_adsense_settings_enable_position_middle_of_post();
	quick_adsense_settings_enable_position_end_of_post();
	quick_adsense_settings_enable_position_after_more_tag();
	quick_adsense_settings_enable_position_before_last_para();
	quick_adsense_settings_enable_position_after_para_option_1();
	quick_adsense_settings_enable_position_after_para_option_2();
	quick_adsense_settings_enable_position_after_para_option_3();
	quick_adsense_settings_enable_position_after_image_option_1();
	quick_adsense_settings_enable_on_posts();
	quick_adsense_settings_enable_on_pages();
	quick_adsense_settings_enable_on_homepage();
	quick_adsense_settings_enable_on_categories();
	quick_adsense_settings_enable_on_archives();
	quick_adsense_settings_enable_on_tags();
	quick_adsense_settings_enable_all_possible_ads();
	quick_adsense_settings_disable_widgets_on_homepage();
	quick_adsense_settings_disable_for_loggedin_users();
	quick_adsense_settings_enable_quicktag_buttons();
	quick_adsense_settings_disable_randomads_quicktag_button();
	quick_adsense_settings_disable_disablead_quicktag_buttons();
	quick_adsense_settings_disable_positionad_quicktag_buttons();
	quick_adsense_settings_onpost_enable_global_style();
	quick_adsense_settings_handle_vi_single_selection();
}

function quick_adsense_settings_enable_position_beginning_of_post() {
	if(jQuery('#quick_adsense_settings_enable_position_beginning_of_post').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_beginning_of_post').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_beginning_of_post').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_beginning_of_post').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_beginning_of_post').parent().addClass('disabled');
	}
	quick_adsense_settings_handle_vi_single_selection();
}

function quick_adsense_settings_enable_position_middle_of_post() {
	if(jQuery('#quick_adsense_settings_enable_position_middle_of_post').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_middle_of_post').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_middle_of_post').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_middle_of_post').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_middle_of_post').parent().addClass('disabled');
	}
	quick_adsense_settings_handle_vi_single_selection();
}

function quick_adsense_settings_enable_position_end_of_post() {
	if(jQuery('#quick_adsense_settings_enable_position_end_of_post').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_end_of_post').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_end_of_post').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_end_of_post').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_end_of_post').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_position_after_more_tag() {
	if(jQuery('#quick_adsense_settings_enable_position_after_more_tag').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_after_more_tag').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_after_more_tag').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_after_more_tag').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_after_more_tag').parent().addClass('disabled');
	}
}
	
function quick_adsense_settings_enable_position_before_last_para() {
	if(jQuery('#quick_adsense_settings_enable_position_before_last_para').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_before_last_para').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_before_last_para').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_before_last_para').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_before_last_para').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_position_after_para_option_1() {
	if(jQuery('#quick_adsense_settings_enable_position_after_para_option_1').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_after_para_option_1').prop('disabled', false);
		jQuery('#quick_adsense_settings_position_after_para_option_1').prop('disabled', false);
		jQuery('#quick_adsense_settings_enable_jump_position_after_para_option_1').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_after_para_option_1').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_after_para_option_1').prop('disabled', true);
		jQuery('#quick_adsense_settings_position_after_para_option_1').prop('disabled', true);
		jQuery('#quick_adsense_settings_enable_jump_position_after_para_option_1').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_after_para_option_1').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_position_after_para_option_2() {
	if(jQuery('#quick_adsense_settings_enable_position_after_para_option_2').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_after_para_option_2').prop('disabled', false);
		jQuery('#quick_adsense_settings_position_after_para_option_2').prop('disabled', false);
		jQuery('#quick_adsense_settings_enable_jump_position_after_para_option_2').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_after_para_option_2').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_after_para_option_2').prop('disabled', true);
		jQuery('#quick_adsense_settings_position_after_para_option_2').prop('disabled', true);
		jQuery('#quick_adsense_settings_enable_jump_position_after_para_option_2').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_after_para_option_2').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_position_after_para_option_3() {
	if(jQuery('#quick_adsense_settings_enable_position_after_para_option_3').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_after_para_option_3').prop('disabled', false);
		jQuery('#quick_adsense_settings_position_after_para_option_3').prop('disabled', false);
		jQuery('#quick_adsense_settings_enable_jump_position_after_para_option_3').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_after_para_option_3').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_after_para_option_3').prop('disabled', true);
		jQuery('#quick_adsense_settings_position_after_para_option_3').prop('disabled', true);
		jQuery('#quick_adsense_settings_enable_jump_position_after_para_option_3').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_after_para_option_3').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_position_after_image_option_1() {
	if(jQuery('#quick_adsense_settings_enable_position_after_image_option_1').prop('checked') == true) {
		jQuery('#quick_adsense_settings_ad_after_image_option_1').prop('disabled', false);
		jQuery('#quick_adsense_settings_position_after_image_option_1').prop('disabled', false);
		jQuery('#quick_adsense_settings_enable_jump_position_after_image_option_1').prop('disabled', false);
		jQuery('#quick_adsense_settings_ad_after_image_option_1').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_ad_after_image_option_1').prop('disabled', true);
		jQuery('#quick_adsense_settings_position_after_image_option_1').prop('disabled', true);
		jQuery('#quick_adsense_settings_enable_jump_position_after_image_option_1').prop('disabled', true);
		jQuery('#quick_adsense_settings_ad_after_image_option_1').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_on_posts() {
	if(jQuery('#quick_adsense_settings_enable_on_posts').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_on_posts').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_on_posts').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_on_pages() {
	if(jQuery('#quick_adsense_settings_enable_on_pages').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_on_pages').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_on_pages').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_on_homepage() {
	if(jQuery('#quick_adsense_settings_enable_on_homepage').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_on_homepage').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_on_homepage').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_on_categories() {
	if(jQuery('#quick_adsense_settings_enable_on_categories').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_on_categories').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_on_categories').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_on_archives() {
	if(jQuery('#quick_adsense_settings_enable_on_archives').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_on_archives').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_on_archives').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_on_tags() {
	if(jQuery('#quick_adsense_settings_enable_on_tags').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_on_tags').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_on_tags').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_all_possible_ads() {
	if(jQuery('#quick_adsense_settings_enable_all_possible_ads').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_all_possible_ads').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_all_possible_ads').parent().addClass('disabled');
	}
}

function quick_adsense_settings_disable_widgets_on_homepage() {
	if(jQuery('#quick_adsense_settings_disable_widgets_on_homepage').prop('checked') == true) {
		jQuery('#quick_adsense_settings_disable_widgets_on_homepage').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_disable_widgets_on_homepage').parent().addClass('disabled');
	}
}

function quick_adsense_settings_disable_for_loggedin_users() {
	if(jQuery('#quick_adsense_settings_disable_for_loggedin_users').prop('checked') == true) {
		jQuery('#quick_adsense_settings_disable_for_loggedin_users').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_disable_for_loggedin_users').parent().addClass('disabled');
	}
}

function quick_adsense_settings_enable_quicktag_buttons() {
	if(jQuery('#quick_adsense_settings_enable_quicktag_buttons').prop('checked') == true) {
		jQuery('#quick_adsense_settings_enable_quicktag_buttons').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_enable_quicktag_buttons').parent().addClass('disabled');
	}
}

function quick_adsense_settings_disable_randomads_quicktag_button() {
	if(jQuery('#quick_adsense_settings_disable_randomads_quicktag_button').prop('checked') == true) {
		jQuery('#quick_adsense_settings_disable_randomads_quicktag_button').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_disable_randomads_quicktag_button').parent().addClass('disabled');
	}
}

function quick_adsense_settings_disable_disablead_quicktag_buttons() {
	if(jQuery('#quick_adsense_settings_disable_disablead_quicktag_buttons').prop('checked') == true) {
		jQuery('#quick_adsense_settings_disable_disablead_quicktag_buttons').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_disable_disablead_quicktag_buttons').parent().addClass('disabled');
	}
}

function quick_adsense_settings_disable_positionad_quicktag_buttons() {
	if(jQuery('#quick_adsense_settings_disable_positionad_quicktag_buttons').prop('checked') == true) {
		jQuery('#quick_adsense_settings_disable_positionad_quicktag_buttons').parent().removeClass('disabled');
	} else {
		jQuery('#quick_adsense_settings_disable_positionad_quicktag_buttons').parent().addClass('disabled');
	}
}

function quick_adsense_settings_onpost_enable_global_style() {
	if(jQuery('#quick_adsense_settings_onpost_enable_global_style').prop('checked') == true) {
		jQuery('#quick_adsense_settings_onpost_enable_global_style').parent().removeClass('disabled');
		jQuery('#quick_adsense_settings_onpost_global_alignment').prop('disabled', false);
		jQuery('#quick_adsense_settings_onpost_global_margin').prop('disabled', false);
		for(var i = 1; i <= 10; i++) {
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_alignment').val(jQuery('#quick_adsense_settings_onpost_global_alignment').val());
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_margin').val(jQuery('#quick_adsense_settings_onpost_global_margin').val());
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_alignment').prop('disabled', true);
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_margin').prop('disabled', true);
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_alignment').parent().addClass('disabled');
		}
	} else {
		jQuery('#quick_adsense_settings_onpost_enable_global_style').parent().addClass('disabled');
		jQuery('#quick_adsense_settings_onpost_global_alignment').prop('disabled', true);
		jQuery('#quick_adsense_settings_onpost_global_margin').prop('disabled', true);
		for(var i = 1; i <= 10; i++) {
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_alignment').prop('disabled', false);
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_margin').prop('disabled', false);
			jQuery('#quick_adsense_settings_onpost_ad_'+i+'_alignment').parent().removeClass('disabled');
		}
	}
}

function quick_adsense_settings_handle_vi_single_selection() {
	/*	
	Logic Table for vi Single Selection
									Beginning Enabled, Other		Beginning Enabled, vi		Beginning Disabled, Other		Beginning Disabled, vi
									
	Middle Enabled, Other			B1, M1							B1, M0						B0, M1							B0, M1, Random - B

	Middle Enabled, vi				B0, M1							------						B0, M1							B0, M1, Random - B
		
	Middle Disabled, Other			B1, M0							B1, M0						B0,	M0							B0, M0, Random B

	Middle Disabled, vi				B1, M0, Random - M				B1, M0, Random - M			B0,	M0, Random M				B0, M0, Random B, Random M
	*/
	if(jQuery('#quick_adsense_settings_enable_position_middle_of_post').prop('checked') == true) {
		if(jQuery('#quick_adsense_settings_ad_middle_of_post').val() != '100') {
			if(jQuery('#quick_adsense_settings_enable_position_beginning_of_post').prop('checked') == true) {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Enabled, Other + Beginning Enabled, Other = B1, M1
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', false);
				} else { //Middle Enabled, Other + Beginning Enabled, vi = B1, M0
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
				}
			} else {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Enabled, Other + Beginning Disabled, Other = B0, M1
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', false);
				} else { //Middle Enabled, Other + Beginning Disabled, vi = B0, M1, Random - B
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_beginning_of_post').val('0');
				}
			}
		} else {
			if(jQuery('#quick_adsense_settings_enable_position_beginning_of_post').prop('checked') == true) {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Enabled, vi + Beginning Enabled, Other = B0, M1
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', false);
				} else { //Middle Enabled, vi + Beginning Enabled, vi = ------
					// This state should never be reached - Error
					alert('Error');
				}
			} else {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Enabled, vi + Beginning Disabled, Other = B0, M1
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', false);
				} else { //Middle Enabled, vi + Beginning Disabled, vi = B0, M1, Random - B
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_beginning_of_post').val('0');
				}
			}
		}
	} else {
		if(jQuery('#quick_adsense_settings_ad_middle_of_post').val() != '100') {
			if(jQuery('#quick_adsense_settings_enable_position_beginning_of_post').prop('checked') == true) {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Disabled, Other + Beginning Enabled, Other = B1, M0
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
				} else { //Middle Disabled, Other + Beginning Enabled, vi = B1, M0
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
				}
			} else {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Disabled, Other + Beginning Disabled, Other = B0,	M0
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
				} else { //Middle Disabled, Other + Beginning Disabled, vi = B0, M0, Random B
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_beginning_of_post').val('0');
				}
			}
		} else {
			if(jQuery('#quick_adsense_settings_enable_position_beginning_of_post').prop('checked') == true) {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Enabled, vi + Beginning Enabled, Other = B1, M0, Random - M
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').val('0');
				} else { //Middle Enabled, vi + Beginning Enabled, vi = B1, M0, Random - M
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', false);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').val('0');
				}
			} else {
				if(jQuery('#quick_adsense_settings_ad_beginning_of_post').val() != '100') { //Middle Enabled, vi + Beginning Disabled, Other = B0,	M0, Random M
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').val('0');
				} else { //Middle Enabled, vi + Beginning Disabled, vi = B0, M0, Random B, Random M
					jQuery('#quick_adsense_settings_ad_beginning_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').children('option[value="100"]').prop('disabled', true);
					jQuery('#quick_adsense_settings_ad_middle_of_post').val('0');
				}
			}
		}
	}
}

jQuery(document).ready(function() {	
	quick_adsense_vi_signup_handler();	
	quick_adsense_vi_login_handler();
	quick_adsense_vi_logout_handler();
	quick_adsense_vi_customize_adcode();
	quick_adsense_vi_chart_draw();
	jQuery(window).resize(function() {
		quick_adsense_vi_chart_draw();
	});
	
	if(jQuery('#quick_adsense_vi_signup').length) {
		jQuery('.quick_adsense_notice').show();
		if(window.location.href.indexOf('#vi-remote-signup') > -1) {		
			jQuery('#quick_adsense_vi_signup').click();
		}
	} else {
		jQuery('.quick_adsense_notice').hide();
	}
});

function quick_adsense_vi_signup_handler() {
	quick_adsense_click_handler(
		'quick_adsense_vi_signup',
		'video intelligence: Signup',
		'870',
		'554',
		function() { },
		function() { },
		function() { }
	);
}

function quick_adsense_vi_login_handler() {
	quick_adsense_click_handler(
		'quick_adsense_vi_login',
		'video intelligence: Login',
		'540',
		'540',
		function() {
			jQuery('.ui-dialog-buttonset').find('button').first().unbind('click').click(function() {
				if((jQuery('#quick_adsense_vi_login_username').val() != '') && (jQuery('#quick_adsense_vi_login_password').val() != '')) {
					jQuery('.ui-dialog-buttonset').find('button').first().button('disable');
					jQuery('.ui-dialog-buttonset').find('button').last().button('disable');
					jQuery('.ui-dialog-titlebar').find('button').last().button('disable');
					var quick_adsense_vi_login_username = jQuery('#quick_adsense_vi_login_username').val();
					var quick_adsense_vi_login_password = jQuery('#quick_adsense_vi_login_password').val();
					jQuery('.ui-dialog-content').html('<div class="quick_adsense_ajaxloader"></div>');
					jQuery('.quick_adsense_ajaxloader').show();
					jQuery.post(
						jQuery('#quick_adsense_admin_ajax').val(), {
							'action': 'quick_adsense_vi_login_form_save_action',
							'quick_adsense_nonce': jQuery('#quick_adsense_nonce').val(),
							'quick_adsense_vi_login_username': quick_adsense_vi_login_username,
							'quick_adsense_vi_login_password': quick_adsense_vi_login_password,
						}, function(response) {
							if(response.indexOf('###SUCCESS###') !== -1) {
								jQuery.post(
									jQuery('#quick_adsense_admin_ajax').val(), {
										'action': 'quick_adsense_vi_update_adstxt',
										'quick_adsense_nonce': jQuery('#quick_adsense_nonce').val(),
									}, function(response) {
										if(response.indexOf('###SUCCESS###') !== -1) {
											jQuery('.wrap #quick_adsense_title').after(response.replace('###SUCCESS###', ''));
											jQuery.post(
												jQuery('#quick_adsense_admin_ajax').val(), {
													'action': 'quick_adsense_adstxt_adsense_admin_notice_check',
													'quick_adsense_nonce': jQuery('#quick_adsense_nonce').val(),
												}, function(innerResponse) {
													if(response.indexOf('###SUCCESS###') !== -1) {
														jQuery('.wrap #quick_adsense_title').after(innerResponse.replace('###SUCCESS###', ''));
														
														
													}
												}
											);
										} else if(response.indexOf('###FAIL###') !== -1) {
											jQuery('.wrap #quick_adsense_title').after(response.replace('###FAIL###', ''));
										} else {
										}
									}
								);
								jQuery('.quick_adsense_vi_block .quick_adsense_vi_block_footer, .quick_adsense_vi_block .quick_adsense_vi_block_content').animate({'opacity': 0}, 1000);
								jQuery('.quick_adsense_vi_block').html(response.replace('###SUCCESS###', ''));
								quick_adsense_vi_logout_handler();
								quick_adsense_vi_customize_adcode();
								quick_adsense_vi_chart_draw();
								jQuery('.quick_adsense_vi_block .quick_adsense_vi_block_footer, .quick_adsense_vi_block .quick_adsense_vi_block_content').animate({'opacity': 1}, 1000);
								if(jQuery('.quick_adsense_notice')) {
									jQuery('.quick_adsense_notice').hide();
								}
								jQuery('.ui-dialog-titlebar').find('button').last().button('enable').click();								
							} else {
								jQuery('.ui-dialog-buttonset').find('button').first().button('enable');
								jQuery('.ui-dialog-buttonset').find('button').last().button('enable');
								jQuery('.ui-dialog-titlebar').find('button').last().button('enable');
								jQuery('.ui-dialog-content').html(response);
								if(jQuery('.quick_adsense_notice')) {
									jQuery('.quick_adsense_notice').show();
								}
							}
						}
					);
				} else {
					jQuery('#quick_adsense_vi_login_username').css('border-color', '#dddddd');
					jQuery('#quick_adsense_vi_login_password').css('border-color', '#dddddd');
					if(jQuery('#quick_adsense_vi_login_username').val() == '') {
						jQuery('#quick_adsense_vi_login_username').css('border-color', '#ff0000');
					}
					if(jQuery('#quick_adsense_vi_login_password').val() == '') {
						jQuery('#quick_adsense_vi_login_password').css('border-color', '#ff0000');
					}
				}
			});
		},
		function() { },
		function() { }
	);
}

function quick_adsense_vi_logout_handler() {
	jQuery('#quick_adsense_vi_logout').click(function() {
		jQuery.post(
			jQuery('#quick_adsense_admin_ajax').val(), {
				'action': 'quick_adsense_vi_logout_action',
				'quick_adsense_nonce': jQuery('#quick_adsense_nonce').val(),
			}, function(response) {
				if(response.indexOf('###SUCCESS###') !== -1) {
					jQuery('.quick_adsense_vi_block').html(response.replace('###SUCCESS###', ''));
					quick_adsense_vi_signup_handler();	
					quick_adsense_vi_login_handler();
					if(jQuery('.quick_adsense_notice')) {
						jQuery('.quick_adsense_notice').show();
					}
				}
				jQuery('.quick_adsense_vi_block .quick_adsense_vi_block_footer, .quick_adsense_vi_block .quick_adsense_vi_block_content').animate({'opacity': 1}, 1000);
			}
		);
		jQuery('.quick_adsense_vi_block .quick_adsense_vi_block_footer, .quick_adsense_vi_block .quick_adsense_vi_block_content').animate({'opacity': 0}, 1000);
		
	});
}

function quick_adsense_vi_check_status(sender) {
	if((jQuery(sender).val() == '100') && (jQuery('#quick_adsense_vi_embedcode_status').val() == 'NotConfigured')) { // Vi Selected in Beginning Of Post
		jQuery("<p>Visit 'Monetization with vi stories' page to customize your ad unit</p>").dialog({
			'modal': true,
			'resizable': false,
			'title': 'Configure vi stories',
			position: { my: 'center', at: 'center', of: window },
			open: function (event, ui) {
				jQuery('.ui-dialog').css({'z-index': 999999, 'max-width': '90%'});
				jQuery('.ui-widget-overlay').css({'z-index': 999998, 'opacity': 0.8, 'background': '#000000'});
			},
			buttons : {
				'Ok': function() {
					jQuery('#quick_adsense_settings_tabs').tabs('option', 'active', 2);
					jQuery(this).dialog("close");
				}
			},
			close: function() {
				jQuery(this).dialog('destroy');
			}
		});
	}
}

function quick_adsense_vi_customize_adcode() {
	quick_adsense_click_handler(
		'quick_adsense_vi_customize_adcode',
		'video intelligence: Customize vi Code',
		jQuery("body").width() * 0.8,
		jQuery("body").height() * 0.8,
		function() {
			jQuery('#quick_adsense_vi_code_settings_keywords').attr('maxlength', '200');
			jQuery('#quick_adsense_vi_code_settings_optional_1').attr('maxlength', '200');
			jQuery('#quick_adsense_vi_code_settings_optional_2').attr('maxlength', '200');
			jQuery('#quick_adsense_vi_code_settings_optional_3').attr('maxlength', '200');
			jQuery('.ui-dialog-buttonset').find('button').first().unbind('click').click(function() {
				var keywordsRegex = /[ ,a-zA-Z0-9-’'‘\u00C6\u00D0\u018E\u018F\u0190\u0194\u0132\u014A\u0152\u1E9E\u00DE\u01F7\u021C\u00E6\u00F0\u01DD\u0259\u025B\u0263\u0133\u014B\u0153\u0138\u017F\u00DF\u00FE\u01BF\u021D\u0104\u0181\u00C7\u0110\u018A\u0118\u0126\u012E\u0198\u0141\u00D8\u01A0\u015E\u0218\u0162\u021A\u0166\u0172\u01AFY\u0328\u01B3\u0105\u0253\u00E7\u0111\u0257\u0119\u0127\u012F\u0199\u0142\u00F8\u01A1\u015F\u0219\u0163\u021B\u0167\u0173\u01B0y\u0328\u01B4\u00C1\u00C0\u00C2\u00C4\u01CD\u0102\u0100\u00C3\u00C5\u01FA\u0104\u00C6\u01FC\u01E2\u0181\u0106\u010A\u0108\u010C\u00C7\u010E\u1E0C\u0110\u018A\u00D0\u00C9\u00C8\u0116\u00CA\u00CB\u011A\u0114\u0112\u0118\u1EB8\u018E\u018F\u0190\u0120\u011C\u01E6\u011E\u0122\u0194\u00E1\u00E0\u00E2\u00E4\u01CE\u0103\u0101\u00E3\u00E5\u01FB\u0105\u00E6\u01FD\u01E3\u0253\u0107\u010B\u0109\u010D\u00E7\u010F\u1E0D\u0111\u0257\u00F0\u00E9\u00E8\u0117\u00EA\u00EB\u011B\u0115\u0113\u0119\u1EB9\u01DD\u0259\u025B\u0121\u011D\u01E7\u011F\u0123\u0263\u0124\u1E24\u0126I\u00CD\u00CC\u0130\u00CE\u00CF\u01CF\u012C\u012A\u0128\u012E\u1ECA\u0132\u0134\u0136\u0198\u0139\u013B\u0141\u013D\u013F\u02BCN\u0143N\u0308\u0147\u00D1\u0145\u014A\u00D3\u00D2\u00D4\u00D6\u01D1\u014E\u014C\u00D5\u0150\u1ECC\u00D8\u01FE\u01A0\u0152\u0125\u1E25\u0127\u0131\u00ED\u00ECi\u00EE\u00EF\u01D0\u012D\u012B\u0129\u012F\u1ECB\u0133\u0135\u0137\u0199\u0138\u013A\u013C\u0142\u013E\u0140\u0149\u0144n\u0308\u0148\u00F1\u0146\u014B\u00F3\u00F2\u00F4\u00F6\u01D2\u014F\u014D\u00F5\u0151\u1ECD\u00F8\u01FF\u01A1\u0153\u0154\u0158\u0156\u015A\u015C\u0160\u015E\u0218\u1E62\u1E9E\u0164\u0162\u1E6C\u0166\u00DE\u00DA\u00D9\u00DB\u00DC\u01D3\u016C\u016A\u0168\u0170\u016E\u0172\u1EE4\u01AF\u1E82\u1E80\u0174\u1E84\u01F7\u00DD\u1EF2\u0176\u0178\u0232\u1EF8\u01B3\u0179\u017B\u017D\u1E92\u0155\u0159\u0157\u017F\u015B\u015D\u0161\u015F\u0219\u1E63\u00DF\u0165\u0163\u1E6D\u0167\u00FE\u00FA\u00F9\u00FB\u00FC\u01D4\u016D\u016B\u0169\u0171\u016F\u0173\u1EE5\u01B0\u1E83\u1E81\u0175\u1E85\u01BF\u00FD\u1EF3\u0177\u00FF\u0233\u1EF9\u01B4\u017A\u017C\u017E\u1E93]/g;
				if(
				(jQuery('#quick_adsense_vi_code_settings_ad_unit_type').val() != 'select') && 
				(jQuery('#quick_adsense_vi_code_settings_iab_category_child').val() != 'select') && 
				(jQuery('#quick_adsense_vi_code_settings_language').val() != 'select') && 
				((jQuery('#quick_adsense_vi_code_settings_keywords').val() == '') || ((jQuery(jQuery('#quick_adsense_vi_code_settings_keywords').val().match(/./g)).not(jQuery('#quick_adsense_vi_code_settings_keywords').val().match(keywordsRegex)).get().length == 0) && (jQuery('#quick_adsense_vi_code_settings_keywords').val().length < 200)))
				) {
					jQuery('.ui-dialog-buttonset').find('button').first().button('disable');
					jQuery('.ui-dialog-buttonset').find('button').last().button('disable');
					jQuery('.ui-dialog-titlebar').find('button').last().button('disable');
					var quick_adsense_vi_code_settings_ad_unit_type = jQuery('#quick_adsense_vi_code_settings_ad_unit_type').val();
					var quick_adsense_vi_code_settings_keywords = jQuery('#quick_adsense_vi_code_settings_keywords').val();
					var quick_adsense_vi_code_settings_iab_category_parent = jQuery('#quick_adsense_vi_code_settings_iab_category_parent').val();
					var quick_adsense_vi_code_settings_iab_category_child = jQuery('#quick_adsense_vi_code_settings_iab_category_child').val();
					var quick_adsense_vi_code_settings_language = jQuery('#quick_adsense_vi_code_settings_language').val();
					var quick_adsense_vi_code_settings_native_bg_color = jQuery('#quick_adsense_vi_code_settings_native_bg_color').val();
					var quick_adsense_vi_code_settings_native_text_color = jQuery('#quick_adsense_vi_code_settings_native_text_color').val();
					var quick_adsense_vi_code_settings_font_family = jQuery('#quick_adsense_vi_code_settings_font_family').val();
					var quick_adsense_vi_code_settings_font_size = jQuery('#quick_adsense_vi_code_settings_font_size').val();
					var quick_adsense_vi_code_settings_show_gdpr_authorization = jQuery('#quick_adsense_vi_code_settings_show_gdpr_authorization').val();
					jQuery('.ui-dialog-content').html('<div class="quick_adsense_ajaxloader"></div>');
					jQuery('.quick_adsense_ajaxloader').show();
					jQuery.post(
						jQuery('#quick_adsense_admin_ajax').val(), {
							'action': 'quick_adsense_vi_customize_adcode_form_save_action',
							'quick_adsense_nonce': jQuery('#quick_adsense_nonce').val(),
							'quick_adsense_vi_code_settings_ad_unit_type': quick_adsense_vi_code_settings_ad_unit_type,
							'quick_adsense_vi_code_settings_keywords': quick_adsense_vi_code_settings_keywords,
							'quick_adsense_vi_code_settings_iab_category_parent': quick_adsense_vi_code_settings_iab_category_parent,
							'quick_adsense_vi_code_settings_iab_category_child': quick_adsense_vi_code_settings_iab_category_child,
							'quick_adsense_vi_code_settings_language': quick_adsense_vi_code_settings_language,
							'quick_adsense_vi_code_settings_native_bg_color': quick_adsense_vi_code_settings_native_bg_color,
							'quick_adsense_vi_code_settings_native_text_color': quick_adsense_vi_code_settings_native_text_color,
							'quick_adsense_vi_code_settings_font_family': quick_adsense_vi_code_settings_font_family,
							'quick_adsense_vi_code_settings_font_size': quick_adsense_vi_code_settings_font_size,
							'quick_adsense_vi_code_settings_show_gdpr_authorization': quick_adsense_vi_code_settings_show_gdpr_authorization,
						}, function(response) {
							if(response.indexOf('###SUCCESS###') !== -1) {
								jQuery('#quick_adsense_vi_embedcode_status').val('Configured');
								jQuery('.ui-dialog-titlebar').find('button').last().button('enable').click();
							} else {
								jQuery('#quick_adsense_vi_embedcode_status').val('NotConfigured');
								jQuery('.ui-dialog-buttonset').find('button').first().button('disable');
								jQuery('.ui-dialog-buttonset').find('button').last().button('enable');
								jQuery('.ui-dialog-titlebar').find('button').last().button('enable');
								jQuery('.ui-dialog-content').html(response.replace('###FAIL###', ''));								
							}
						}						
					);					
				} else {
					jQuery('#quick_adsense_vi_customize_adcode_keywords_required_error').hide();
					jQuery('#quick_adsense_vi_customize_adcode_keywords_error').hide();
					jQuery('#quick_adsense_vi_customize_adcode_required_error').hide();
					jQuery('#quick_adsense_vi_code_settings_ad_unit_type').css('border-color', '#dddddd');
					jQuery('#quick_adsense_vi_code_settings_iab_category_parent').css('border-color', '#dddddd');
					jQuery('#quick_adsense_vi_code_settings_iab_category_child').css('border-color', '#dddddd');
					jQuery('#quick_adsense_vi_code_settings_language').css('border-color', '#dddddd');
					jQuery('#quick_adsense_vi_code_settings_keywords').css('border-color', '#dddddd');
					var quick_adsense_vi_customize_adcode_keywords_error = false;
					var quick_adsense_vi_customize_adcode_required_error = false;
					if(jQuery('#quick_adsense_vi_code_settings_ad_unit_type').val() == 'select') {						
						jQuery('#quick_adsense_vi_code_settings_ad_unit_type').css('border-color', '#ff0000');
						quick_adsense_vi_customize_adcode_required_error = true;
					}
					if(jQuery('#quick_adsense_vi_code_settings_iab_category_parent').val() == 'select') {
						jQuery('#quick_adsense_vi_code_settings_iab_category_parent').css('border-color', '#ff0000');
						quick_adsense_vi_customize_adcode_required_error = true;
					}
					if(jQuery('#quick_adsense_vi_code_settings_iab_category_child').val() == 'select') {
						jQuery('#quick_adsense_vi_code_settings_iab_category_child').css('border-color', '#ff0000');
						quick_adsense_vi_customize_adcode_required_error = true;
					}
					if(jQuery('#quick_adsense_vi_code_settings_language').val() == 'select') {
						jQuery('#quick_adsense_vi_code_settings_language').css('border-color', '#ff0000');
						quick_adsense_vi_customize_adcode_required_error = true;
					}
					if(jQuery('#quick_adsense_vi_code_settings_keywords').val() != '') {
						if(jQuery('#quick_adsense_vi_code_settings_keywords').val().length > 200) {
							jQuery('#quick_adsense_vi_code_settings_keywords').css('border-color', '#ff0000');
							quick_adsense_vi_customize_adcode_keywords_error = true;
						}
						if(jQuery(jQuery('#quick_adsense_vi_code_settings_keywords').val().match(/./g)).not(jQuery('#quick_adsense_vi_code_settings_keywords').val().match(keywordsRegex)).get().length != 0) {
							jQuery('#quick_adsense_vi_code_settings_keywords').css('border-color', '#ff0000');
							quick_adsense_vi_customize_adcode_keywords_error = true;
						}
					}
					if(quick_adsense_vi_customize_adcode_keywords_error && quick_adsense_vi_customize_adcode_required_error) {
						jQuery('#quick_adsense_vi_customize_adcode_keywords_required_error').show();
					} else if(quick_adsense_vi_customize_adcode_keywords_error) {
						jQuery('#quick_adsense_vi_customize_adcode_keywords_error').show();
					} else if(quick_adsense_vi_customize_adcode_required_error) {
						jQuery('#quick_adsense_vi_customize_adcode_required_error').show();
					} else {}
				}
			});
		},
		function() { },
		function() { }
	);
}

function quick_adsense_vi_code_iab_category_parent_change() {
	jQuery('#quick_adsense_vi_code_settings_iab_category_parent').change(function() {
		var quick_adsense_vi_code_iab_category = jQuery(this).val();
		if(quick_adsense_vi_code_iab_category != 'select') {
			jQuery('#quick_adsense_vi_code_settings_iab_category_child').prop('disabled', true);
			jQuery('#quick_adsense_vi_code_settings_iab_category_child option').prop('disabled', true).hide();
			jQuery('#quick_adsense_vi_code_settings_iab_category_child option').each(function() {
				if((jQuery(this).attr('data-parent') == quick_adsense_vi_code_iab_category) || (jQuery(this).val() == 'select')) {
					jQuery(this).prop('disabled', false).show();
				}
			});
			if(jQuery('#quick_adsense_vi_code_settings_iab_category_child option:selected').prop('disabled') != false) {
				jQuery('#quick_adsense_vi_code_settings_iab_category_child').val('select');
			}
			jQuery('#quick_adsense_vi_code_settings_iab_category_child').prop('disabled', false);
		} else {
			jQuery('#quick_adsense_vi_code_settings_iab_category_child').prop('disabled', true);
			jQuery('#quick_adsense_vi_code_settings_iab_category_child').val('select');
		}
	});
	jQuery('#quick_adsense_vi_code_settings_iab_category_parent').change();
}

function quick_adsense_vi_chart_draw() {
	if(jQuery('#quick_adsense_vi_earnings_wrapper').length) {
		jQuery.post(
			jQuery('#quick_adsense_admin_ajax').val(), {
				'action': 'quick_adsense_vi_get_chart',
				'quick_adsense_nonce': jQuery('#quick_adsense_nonce').val(),
			}, function(response) {
				if(response.indexOf('###SUCCESS###') !== -1) {
					jQuery('#quick_adsense_vi_earnings_wrapper').html(response.replace('###SUCCESS###', ''));
					jQuery('#quick_adsense_vi_chart_wrapper canvas').attr('width', jQuery('#quick_adsense_vi_chart_wrapper').width()+'px');
					jQuery('#quick_adsense_vi_chart_wrapper canvas').attr('height', jQuery('#quick_adsense_vi_chart_wrapper').height()+'px');
					if(jQuery('#quick_adsense_vi_chart_data').length) {
						var ctx = document.getElementById("myChart");
						var quick_adsense_vi_chart = new Chart(jQuery('#quick_adsense_vi_chart'), {
							type: 'line',
							responsive: false,
							data: {
								datasets: [{
									data: JSON.parse(jQuery('#quick_adsense_vi_chart_data').val()),
									backgroundColor: '#EDF5FB',
									borderColor: '#186EAE',/*E8EBEF*/
									borderWidth: 1
								}]
							},
							options: {
								title: {
									display: false,
									backgroundColor: '#EDF5FB'
								},
								legend: {
									display: false,
								},
								scales: {
									xAxes: [{
										type: "time",
										display: true,
										scaleLabel: {
											display: false
										},
										gridLines: {
											display: false,
											drawTicks: false
										},
										ticks: {
											display: false
										}
									}],
									yAxes: [{
										display: true,
										scaleLabel: {
											display: false
										},
										gridLines: {
											display: true,
											drawTicks: false
										},
										ticks: {
											display: false
										}
									}]
								},
								tooltips: {
									displayColors: false,
									callbacks: {
										label: function(tooltipItem, data) {
											return '$ '+parseFloat(tooltipItem.yLabel).toFixed(2);
										},
										title: function(tooltipItem, data) {
											var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
											var dateParts = tooltipItem[0].xLabel.split('/');
											var date = new Date(dateParts[2], dateParts[0]-1, dateParts[1]);
											return monthNames[date.getMonth()]+' '+date.getDate();
										}
									}
								}
							}
						});
					}
				} else {
					jQuery('#quick_adsense_vi_earnings_wrapper').parent().html(response);
				}
				/*jQuery(window).resize();*/
			}
		);
	}
}

function quick_adsense_click_handler(target, title, width, height, openAction, UpdateAction, closeAction) {
	jQuery('#'+target).click(function() {
		jQuery('<div id="'+target+'_dialog"></div>').html('<div class="quick_adsense_ajaxloader"></div>').dialog({
			'modal': true,
			'resizable': false,
			'width': width,
			'maxWidth': width,
			'maxHeight': height,
			'title': title,
			position: { my: 'center', at: 'center', of: window },
			open: function (event, ui) {
				jQuery('.ui-dialog').css({'z-index': 999999, 'max-width': '90%'});
				jQuery('.ui-widget-overlay').css({'z-index': 999998, 'opacity': 0.8, 'background': '#000000'});
				jQuery('.ui-dialog-buttonpane button:contains("Update")').button('disable');
				jQuery.post(
					jQuery('#quick_adsense_admin_ajax').val(), {
						'action': target+'_form_get_content',
						'quick_adsense_nonce': jQuery('#quick_adsense_nonce').val()
					}, function(response) {
						jQuery('.quick_adsense_ajaxloader').hide();
						jQuery('.ui-dialog-content').html(response);
						jQuery('.ui-accordion .ui-accordion-content').css('max-height', (jQuery("body").height() * 0.45));
						jQuery('.ui-dialog-buttonpane button:contains("Update")').button('enable');
						openAction();
						jQuery('.ui-dialog').css({'position': 'fixed'});
						jQuery('#'+target+'_dialog').delay(500).dialog({position: { my: 'center', at: 'center', of: window }});
						
					}			
				);
			},
			buttons: {
				'Update': {
					text: 'Update',
					icons: { primary: "ui-icon-gear" },
					click: function() {
						if(UpdateAction() != 'false') {
							jQuery(this).dialog('close');
						}
					}
				},
				Cancel: {
					text: 'Cancel',
					icons: { primary: "ui-icon-cancel" },
					click: function() {
						if(closeAction() != 'false') {
							jQuery(this).dialog('close');
						}
					}
				}
			},
			close: function() {
				closeAction();
				jQuery(this).dialog('destroy');
			}
		})
	});
}
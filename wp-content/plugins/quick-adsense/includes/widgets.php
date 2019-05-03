<?php
add_action('widgets_init', 'quick_adsense_widgets_init');
function quick_adsense_widgets_init() {
	$settings = get_option('quick_adsense_settings');
	for($i = 1; $i <= 10; $i++) {
		if(isset($settings['widget_ad_'.$i.'_content']) && ($settings['widget_ad_'.$i.'_content'] != '')) {
			register_widget(new quickAdsenseAdWidget($i));
		}
	}
}

class quickAdsenseAdWidget extends WP_Widget {
	public function __construct($id) {
		parent::__construct(sanitize_title(str_replace(array('(',')'), '', 'AdsWidget'.$id.' (Quick Adsense)')), 'AdsWidget'.$id.' (Quick Adsense)', array('description' => 'Quick Adsense on Sidebar Widget'));
	}

	public function widget($args, $instance) {
		extract($args);
		$content = get_the_content();
		$settings = get_option('quick_adsense_settings');		
		if((strpos($content, "<!--OffAds-->") === false) && (strpos($content, "<!--OffWidget-->") === false) && !(is_home() && $settings['disable_widgets_on_homepage'])) {
			$widgetIndex = str_replace(array('AdsWidget', ' (Quick Adsense)'), '', $args['widget_name']);
			echo "\n"."<!-- Quick Adsense Wordpress Plugin: http://quickadsense.com/ -->"."\n";
			echo $before_widget;
				echo ((isset($settings['widget_ad_'.$widgetIndex.'_content']))?$settings['widget_ad_'.$widgetIndex.'_content']:'');
			echo $after_widget;
		}
	}

	public function update($new_opts, $old_opts) {
		return $new_opts;
	}

	public function form($instance) {
		echo '<p>There are no options for this widget.</p>';
	}
}
?>
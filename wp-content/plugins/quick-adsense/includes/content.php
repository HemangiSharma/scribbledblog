<?php
$quickAdsenseAdsDisplayed = 0;
$quickAdsenseAdsId = array();
$quickAdsenseBeginEnd = 0;

add_action('wp_head', 'quick_adsense_embed_wp_head');
function quick_adsense_embed_wp_head() {
	$settings = get_option('quick_adsense_settings');
	if(isset($settings['header_embed_code']) && ($settings['header_embed_code'] != '')) {
		echo $settings['header_embed_code'];
	}
}

add_action('wp_footer', 'quick_adsense_embed_wp_footer');
function quick_adsense_embed_wp_footer() {
	$settings = get_option('quick_adsense_settings');
	if(isset($settings['footer_embed_code']) && ($settings['footer_embed_code'] != '')) {
		echo $settings['footer_embed_code'];
	}
}

add_filter('the_content', 'quick_adsense_the_content');
function quick_adsense_the_content($content) {
	global $quickAdsenseAdsDisplayed;
	global $quickAdsenseAdsId;
	global $quickAdsenseBeginEnd;
	$settings = get_option('quick_adsense_settings');
	
	if(!quick_adsense_postads_isactive($settings, $content)) { 
		$content = quick_adsense_content_clean_tags($content);
		return $content; 
	}
	
	/* Begin Enforce Max Ads Per Page Rule */
	$quickAdsenseAdsToDisplay = $settings['max_ads_per_page'];
	if (strpos($content, '<!--OffWidget-->') === false) {
		for($i = 1; $i <= 10; $i++) {
			$widgetID = sanitize_title(str_replace(array('(', ')'), '', sprintf('AdsWidget%d (Quick Adsense)', $i)));
			$quickAdsenseAdsToDisplay -= (is_active_widget(true, $widgetID))?1:0;
		}		
	}
	if($quickAdsenseAdsDisplayed >= $quickAdsenseAdsToDisplay) {
		$content = quick_adsense_content_clean_tags($content);
		return $content;
	};
	/* End Enforce Max Ads Per Page Rule */

	/* Begin Check for Available Ad Blocks */
	if(!count($quickAdsenseAdsId)) {
		for($i = 1; $i <= 10; $i++) { 
			if(isset($settings['onpost_ad_'.$i.'_content']) && !empty($settings['onpost_ad_'.$i.'_content'])) {
				array_push($quickAdsenseAdsId, $i);
			}
		}
	}
	array_push($quickAdsenseAdsId, 100);	
	
	if(!count($quickAdsenseAdsId) ) {
		$content = quick_adsense_content_clean_tags($content);
		return $content;
	};
	/* End Check for Available Ad Blocks */

	/* Begin Insert StandIns for all Ad Blocks */
	$content = str_replace('<p></p>', '##QA-TP1##', $content);
	$content = str_replace('<p>&nbsp;</p>', '##QA-TP2##', $content);	
	$offdef = (strpos($content, '<!--OffDef-->') !== false);
	if(!$offdef) {
		$quickAdsenseAdsIdCus = array();
		$cusads = 'CusAds';
		$cusrnd = 'CusRnd';
		$cusadsvi = 'CusAdsVi';
		$cusrndvi = 'CusRndVi';
		
		$quickAdsenseEnablePositionAfterMoreTag = ((isset($settings['enable_position_after_more_tag']))?$settings['enable_position_after_more_tag']:'');
		$quickAdsenseAdAfterMoreTag = ((isset($settings['ad_after_more_tag']))?$settings['ad_after_more_tag']:'');	
		
		$quickAdsenseEnablePositionBeforeLastPara = ((isset($settings['enable_position_before_last_para']))?$settings['enable_position_before_last_para']:'');
		$quickAdsenseAdBeforeLastPara = ((isset($settings['ad_before_last_para']))?$settings['ad_before_last_para']:'');
		
		$quickAdsenseEnablePositionBeginningOfPost = ((isset($settings['enable_position_beginning_of_post']))?$settings['enable_position_beginning_of_post']:'');
		$quickAdsenseAdBeginningOfPost = ((isset($settings['ad_beginning_of_post']))?$settings['ad_beginning_of_post']:'');
		
		$quickAdsenseEnablePositionMiddleOfPost = ((isset($settings['enable_position_middle_of_post']))?$settings['enable_position_middle_of_post']:'');
		$quickAdsenseAdMiddleOfPost = ((isset($settings['ad_middle_of_post']))?$settings['ad_middle_of_post']:'');
		
		$quickAdsenseEnablePositionEndOfPost = ((isset($settings['enable_position_end_of_post']))?$settings['enable_position_end_of_post']:'');
		$quickAdsenseAdEndOfPost = ((isset($settings['ad_end_of_post']))?$settings['ad_end_of_post']:'');
		
		for($i = 1; $i <= 3; $i++) {
			$quickAdsenseEnablePositionAfterPara[$i] = ((isset($settings['enable_position_after_para_option_'.$i]))?$settings['enable_position_after_para_option_'.$i]:'');
			$quickAdsenseAdAfterPara[$i] = ((isset($settings['ad_after_para_option_'.$i]))?$settings['ad_after_para_option_'.$i]:'');
			$quickAdsensePositionAfterPara[$i] = ((isset($settings['position_after_para_option_'.$i]))?$settings['position_after_para_option_'.$i]:'');
			$quickAdsenseEnableJumpPositionAfterPara[$i] = ((isset($settings['enable_jump_position_after_para_option_'.$i]))?$settings['enable_jump_position_after_para_option_'.$i]:'');
		}
		
		for($i = 1; $i <= 1; $i++) {
			$quickAdsenseEnablePositionAfterImage = ((isset($settings['enable_position_after_image_option_'.$i]))?$settings['enable_position_after_image_option_'.$i]:'');
			$quickAdsenseAdAfterImage = ((isset($settings['ad_after_image_option_'.$i]))?$settings['ad_after_image_option_'.$i]:'');
			$quickAdsensePositionAfterImage = ((isset($settings['position_after_image_option_'.$i]))?$settings['position_after_image_option_'.$i]:'');
			$quickAdsenseEnableJumpPositionAfterImage = ((isset($settings['enable_jump_position_after_image_option_'.$i]))?$settings['enable_jump_position_after_image_option_'.$i]:'');
		}
		
		if($quickAdsenseAdBeginningOfPost == 0) {
			$quickAdsenseAdBeginningOfPostStandIn = $cusrndvi;
		} else {
			$quickAdsenseAdBeginningOfPostStandIn = $cusadsvi.$quickAdsenseAdBeginningOfPost;
			array_push($quickAdsenseAdsIdCus, $quickAdsenseAdBeginningOfPost);
		};		
		if($quickAdsenseAdAfterMoreTag == 0) {
			$quickAdsenseAdAfterMoreTagStandIn = $cusrnd;
		} else {
			$quickAdsenseAdAfterMoreTagStandIn = $cusads.$quickAdsenseAdAfterMoreTag;
			array_push($quickAdsenseAdsIdCus, $quickAdsenseAdAfterMoreTag);
		};		
		if($quickAdsenseAdMiddleOfPost == 0) {
			$quickAdsenseAdMiddleOfPostStandIn = $cusrndvi;
		} else {
			$quickAdsenseAdMiddleOfPostStandIn = $cusadsvi.$quickAdsenseAdMiddleOfPost;
			array_push($quickAdsenseAdsIdCus, $quickAdsenseAdMiddleOfPost);
		};
		if($quickAdsenseAdBeforeLastPara == 0) {
			$quickAdsenseAdBeforeLastParaStandIn = $cusrnd;
		} else {
			$quickAdsenseAdBeforeLastParaStandIn = $cusads.$quickAdsenseAdBeforeLastPara;
			array_push($quickAdsenseAdsIdCus, $quickAdsenseAdBeforeLastPara);
		};
		if($quickAdsenseAdEndOfPost == 0) {
			$quickAdsenseAdEndOfPostStandIn = $cusrnd;
		} else {
			$quickAdsenseAdEndOfPostStandIn = $cusads.$quickAdsenseAdEndOfPost;
			array_push($quickAdsenseAdsIdCus, $quickAdsenseAdEndOfPost);
		};	
		for($i = 1; $i <= 3; $i++) {
			if($quickAdsenseAdAfterPara[$i] == 0) {
				$quickAdsenseAdAfterParaStandIn[$i] = $cusrnd;
			} else {
				$quickAdsenseAdAfterParaStandIn[$i] = $cusads.$quickAdsenseAdAfterPara[$i];
				array_push($quickAdsenseAdsIdCus, $quickAdsenseAdAfterPara[$i]);
			};	
		}	
		if($quickAdsenseAdAfterImage == 0) {
			$quickAdsenseAdAfterImageStandIn = $cusrnd;
		} else {
			$quickAdsenseAdAfterImageStandIn = $cusads.$quickAdsenseAdAfterImage;
			array_push($quickAdsenseAdsIdCus, $quickAdsenseAdAfterImage);
		};	
		
		if($quickAdsenseEnablePositionMiddleOfPost && (strpos($content, '<!--OffMiddle-->') === false)) {
			if(substr_count(strtolower($content), '</p>') >= 2) {
				$quickAdsenseSelectedTag = "</p>";
				$content = str_replace("</P>", $quickAdsenseSelectedTag, $content);
				$quickAdsenseTempArray = explode($quickAdsenseSelectedTag, $content);			
				$j = 0;
				$k = strlen($content)/2;
				for($i = 0; $i < count($quickAdsenseTempArray); $i++) {
					$j += strlen($quickAdsenseTempArray[$i]) + 4;
					if($j > $k) {
						if(($k - ($j - strlen($quickAdsenseTempArray[$i]))) > ($j - $k) && $i+1 < count($quickAdsenseTempArray)) {
							$quickAdsenseTempArray[$i+1] = '<!--'.$quickAdsenseAdMiddleOfPostStandIn.'-->'.$quickAdsenseTempArray[$i+1];							
						} else {
							$quickAdsenseTempArray[$i] = '<!--'.$quickAdsenseAdMiddleOfPostStandIn.'-->'.$quickAdsenseTempArray[$i];
						}
						break;
					}
				}
				$content = implode($quickAdsenseSelectedTag, $quickAdsenseTempArray);
			}	
		}
		if($quickAdsenseEnablePositionAfterMoreTag && (strpos($content,'<!--OffAfMore-->') === false)) {
			$content = str_replace('<span id="more-'.get_the_ID().'"></span>', '<!--'.$quickAdsenseAdAfterMoreTagStandIn.'-->', $content);		
		}		
		if($quickAdsenseEnablePositionBeginningOfPost && (strpos($content,'<!--OffBegin-->') === false)) {
			$content = '<!--'.$quickAdsenseAdBeginningOfPostStandIn.'-->'.$content;
		}
		if($quickAdsenseEnablePositionEndOfPost && (strpos($content,'<!--OffEnd-->') === false)) {
			$content = $content.'<!--'.$quickAdsenseAdEndOfPostStandIn.'-->';
		}
		if($quickAdsenseEnablePositionBeforeLastPara && (strpos($content,'<!--OffBfLastPara-->') === false)){
			$quickAdsenseSelectedTag = "<p>";
			$content = str_replace("<P>", $quickAdsenseSelectedTag, $content);
			$quickAdsenseTempArray = explode($quickAdsenseSelectedTag, $content);
			if(count($quickAdsenseTempArray) > 2) {
				$content = implode($quickAdsenseSelectedTag, array_slice($quickAdsenseTempArray, 0, count($quickAdsenseTempArray)-1)).'<!--'.$quickAdsenseAdBeforeLastParaStandIn.'-->'.$quickAdsenseSelectedTag.$quickAdsenseTempArray[count($quickAdsenseTempArray)-1];
			}
		}
		for($i = 1; $i <= 3; $i++) {
			if($quickAdsenseEnablePositionAfterPara[$i]) {
				$quickAdsenseSelectedTag = "</p>";
				$content = str_replace("</P>", $quickAdsenseSelectedTag, $content);
				$quickAdsenseTempArray = explode($quickAdsenseSelectedTag, $content);
				if((int)$quickAdsensePositionAfterPara[$i] < count($quickAdsenseTempArray)) {
					$content = implode($quickAdsenseSelectedTag, array_slice($quickAdsenseTempArray, 0, $quickAdsensePositionAfterPara[$i])).$quickAdsenseSelectedTag.'<!--'.$quickAdsenseAdAfterParaStandIn[$i].'-->'.implode($quickAdsenseSelectedTag, array_slice($quickAdsenseTempArray, $quickAdsensePositionAfterPara[$i]));
				} elseif ($quickAdsenseEnableJumpPositionAfterPara[$i]) {
					$content = implode($quickAdsenseSelectedTag, $quickAdsenseTempArray).'<!--'.$quickAdsenseAdAfterParaStandIn[$i].'-->';
				}
			}
		}	
		if($quickAdsenseEnablePositionAfterImage) {
			$quickAdsenseSelectedTag = "<img";
			$j = ">";
			$k = "[/caption]";
			$l = "</a>";			
			$content = str_replace("<IMG", $quickAdsenseSelectedTag, $content);
			$content = str_replace("</A>", $l, $content);			
			$quickAdsenseTempArray = explode($quickAdsenseSelectedTag, $content);
			if((int)$quickAdsensePositionAfterImage < count($quickAdsenseTempArray)) {
				$m = explode($j, $quickAdsenseTempArray[$quickAdsensePositionAfterImage]);
				if(count($m) > 1) {
					$n = explode($k, $quickAdsenseTempArray[$quickAdsensePositionAfterImage]);
					$o = (count($n) > 1)?(strpos(strtolower($n[0]), '[caption ') === false):false ;
					$p = explode($l, $quickAdsenseTempArray[$quickAdsensePositionAfterImage]);
					$q = (count($p) > 1 )?(strpos(strtolower($p[0]), '<a href') === false):false ;					
					if($quickAdsenseEnableJumpPositionAfterImage && $o) {
						$quickAdsenseTempArray[$quickAdsensePositionAfterImage] = implode($k, array_slice($n, 0, 1)).$k."\r\n".'<!--'.$quickAdsenseAdAfterImageStandIn.'-->'."\r\n". implode($k, array_slice($n, 1));
					}else if ( $q ) {	
						$quickAdsenseTempArray[$quickAdsensePositionAfterImage] = implode($l, array_slice($p, 0, 1)).$l."\r\n".'<!--'.$quickAdsenseAdAfterImageStandIn.'-->'."\r\n". implode($l, array_slice($p, 1));
					}else{
						$quickAdsenseTempArray[$quickAdsensePositionAfterImage] = implode($j, array_slice($m, 0, 1)).$j."\r\n".'<!--'.$quickAdsenseAdAfterImageStandIn.'-->'."\r\n". implode($j, array_slice($m, 1));
					}
				}
				$content = implode($quickAdsenseSelectedTag, $quickAdsenseTempArray);
			}	
		}		
	}
	/* End Insert StandIns for all Ad Blocks */
	
	
	/* Begin Replace StandIns for all Ad Blocks */
	$content = '<!--EmptyClear-->'.$content."\n".'<div style="font-size: 0px; height: 0px; line-height: 0px; margin: 0; padding: 0; clear: both;"></div>';
	$content = quick_adsense_content_clean_tags($content, true);	
	$ismany = (!is_single() && !is_page());
	$showall = ((isset($settings['enable_all_possible_ads']))?$settings['enable_all_possible_ads']:'');

	if(!$offdef) {
		for($i = 1; $i <= count($quickAdsenseAdsIdCus); $i++) {
			if($showall || !$ismany || $quickAdsenseBeginEnd != $i) {
				if(((strpos($content, '<!--'.$cusadsvi.$quickAdsenseAdsIdCus[$i-1].'-->') !== false) || (strpos($content, '<!--'.$cusads.$quickAdsenseAdsIdCus[$i-1].'-->') !== false)) && in_array($quickAdsenseAdsIdCus[$i-1], $quickAdsenseAdsId)) {
					$content = quick_adsense_content_replace_ads($content, $cusadsvi.$quickAdsenseAdsIdCus[$i-1], $quickAdsenseAdsIdCus[$i-1]);
					$content = quick_adsense_content_replace_ads($content, $cusads.$quickAdsenseAdsIdCus[$i-1], $quickAdsenseAdsIdCus[$i-1]);
					$quickAdsenseAdsId = quick_adsense_content_del_element($quickAdsenseAdsId, array_search($quickAdsenseAdsIdCus[$i-1], $quickAdsenseAdsId)) ;
					$quickAdsenseAdsDisplayed += 1;
					if($quickAdsenseAdsDisplayed >= $quickAdsenseAdsToDisplay || !count($quickAdsenseAdsId)) {
						$content = quick_adsense_content_clean_tags($content);
						return $content;
					};
					$quickAdsenseBeginEnd = $i;
					if(!$showall && $ismany) {
						break;
					} 
				}
			}	
		}	
	}

	if($showall || !$ismany) {
		$j = 0;
		for($i = 1; $i <= count($quickAdsenseAdsId); $i++ ) {
			if(strpos($content, '<!--Ads'.$quickAdsenseAdsId[$j].'-->')!==false) {
				$content = quick_adsense_content_replace_ads($content, 'Ads'.$quickAdsenseAdsId[$j], $quickAdsenseAdsId[$j]);
				$quickAdsenseAdsId = quick_adsense_content_del_element($quickAdsenseAdsId, $j);
				$quickAdsenseAdsDisplayed += 1;
				if(($quickAdsenseAdsDisplayed >= $quickAdsenseAdsToDisplay) || !count($quickAdsenseAdsId)) {
					$content = quick_adsense_content_clean_tags($content);
					return $content;
				};
			} else {
				$j += 1;
			}
		}	
	}	

	if((strpos($content, '<!--'.$cusrndvi.'-->') !== false) && ($showall || !$ismany)) {
		$j = substr_count($content, '<!--'.$cusrndvi.'-->');
		for($i = count($quickAdsenseAdsId); $i <= $j-1; $i++) {
			array_push($quickAdsenseAdsId, -1);
		}
		shuffle($quickAdsenseAdsId);
		for($i = 1; $i <= $j; $i++) {
			$content = quick_adsense_content_replace_ads($content, $cusrndvi, $quickAdsenseAdsId[0]);
			$quickAdsenseAdsId = quick_adsense_content_del_element($quickAdsenseAdsId, 0) ;
			$quickAdsenseAdsDisplayed += 1;
			if(($quickAdsenseAdsDisplayed >= $quickAdsenseAdsToDisplay) || !count($quickAdsenseAdsId)) {
				$content = quick_adsense_content_clean_tags($content);
				return $content;
			};
		}
	}
	if((strpos($content, '<!--'.$cusrnd.'-->') !== false) && ($showall || !$ismany)) {
		$quickAdsenseAdsId = $quickAdsenseAdsId;
		if (($key = array_search('100', $quickAdsenseAdsId)) !== false) {
			unset($quickAdsenseAdsId[$key]);
		}
		$j = substr_count($content, '<!--'.$cusrnd.'-->');
		for($i = count($quickAdsenseAdsId); $i <= $j-1; $i++) {
			array_push($quickAdsenseAdsId, -1);
		}
		shuffle($quickAdsenseAdsId);
		for($i = 1; $i <= $j; $i++) {
			$content = quick_adsense_content_replace_ads($content, $cusrnd, $quickAdsenseAdsId[0]);
			$quickAdsenseAdsId = quick_adsense_content_del_element($quickAdsenseAdsId, 0) ;
			$quickAdsenseAdsDisplayed += 1;
			if(($quickAdsenseAdsDisplayed >= $quickAdsenseAdsToDisplay) || !count($quickAdsenseAdsId)) {
				$content = quick_adsense_content_clean_tags($content);
				return $content;
			};
		}
	}
	
	if(strpos($content, '<!--RndAds-->')!==false && ($showall || !$ismany)) {
		$quickAdsenseAdsIdTmp = array();
		shuffle($quickAdsenseAdsId);
		for($i = 1; $i <= ($quickAdsenseAdsToDisplay - $quickAdsenseAdsDisplayed); $i++) {
			if($i <= count($quickAdsenseAdsId)) {
				array_push($quickAdsenseAdsIdTmp, $quickAdsenseAdsId[$i-1]);
			}
		}
		$j = substr_count($content, '<!--RndAds-->');
 		for($i = count($quickAdsenseAdsIdTmp); $i <= $j-1; $i++) {
			array_push($quickAdsenseAdsIdTmp, -1);
		}
		shuffle($quickAdsenseAdsIdTmp);
		for($i = 1; $i <= $j; $i++) {
			$tmp = $quickAdsenseAdsIdTmp[0];
			$content = quick_adsense_content_replace_ads($content, 'RndAds', $quickAdsenseAdsIdTmp[0]);
			$quickAdsenseAdsIdTmp = quick_adsense_content_del_element($quickAdsenseAdsIdTmp, 0) ;
			if($tmp != -1) {
				$quickAdsenseAdsDisplayed += 1;
			};
			if($quickAdsenseAdsDisplayed >= $quickAdsenseAdsToDisplay || !count($quickAdsenseAdsIdTmp)) {
				$content = quick_adsense_content_clean_tags($content);
				return $content;
			};
		}
	}
	/* End Replace StandIns for all Ad Blocks */

	$content = quick_adsense_content_clean_tags($content);
	return $content;
}

function  quick_adsense_postads_isactive($settings, $content) {
	if(is_feed()) {
		return false;
	} else if(strpos($content, '<!--NoAds-->') !== false) {
		return false;
	} else if(strpos($content, '<!--OffAds-->') !== false) {
		return false;
	} else if(is_single() && !(isset($settings['enable_on_posts']))) {
		return false;
	} else if(is_page() && !(isset($settings['enable_on_pages']))) {
		return false;
	} else if(is_home() && !(isset($settings['enable_on_homepage']))) {
		return false;
	} else if(is_category() && !(isset($settings['enable_on_categories']))) {
		return false;
	} else if(is_archive() && !(isset($settings['enable_on_archives']))) {
		return false;
	} else if(is_tag() && !(isset($settings['enable_on_tags']))) {
		return false;
	} else if(is_user_logged_in() && (isset($settings['disable_for_loggedin_users']))) {
		return false;
	} else {
		return true;
	}
}

function quick_adsense_content_clean_tags($content, $trimonly = false) {
	global $quickAdsenseAdsDisplayed;
	global $quickAdsenseAdsId;
	global $quickAdsenseBeginEnd;
	$quicktags = array(
		'EmptyClear',
		'RndAds',
		'NoAds',
		'OffDef',
		'OffAds',
		'OffWidget',
		'OffBegin',
		'OffMiddle',
		'OffEnd',
		'OffBfMore',
		'OffAfLastPara',
		'CusRnd'
	);
	for($i = 1; $i <= 10; $i++) {
		array_push($quicktags, 'CusAds'.$i);
		array_push($quicktags, 'Ads'.$i);
	};
	foreach($quicktags as $quicktag) {
		if((strpos($content,'<!--'.$quicktag.'-->') !== false) || ($quicktag == 'EmptyClear')) {
			if($trimonly) {
				$content = str_replace('<p><!--'.$quicktag.'--></p>', '<!--'.$quicktag.'-->', $content);	
			} else {
				$content = str_replace(array('<p><!--'.$quicktag.'--></p>', '<!--'.$quicktag.'-->'), '', $content);	
				$content = str_replace("##QA-TP1##", "<p></p>", $content);
				$content = str_replace("##QA-TP2##", "<p>&nbsp;</p>", $content);
			}
		}
	}
	if(!$trimonly && (is_single() || is_page())) {
		$quickAdsenseAdsDisplayed = 0;
		$quickAdsenseAdsId = array();
		$quickAdsenseBeginEnd = 0;
	}	
	return $content;
}

function quick_adsense_content_replace_ads($content, $quicktag, $adIndex) {
	if(strpos($content, '<!--'.$quicktag.'-->') === false ) {
		return $content;
	}	
	$settings = get_option('quick_adsense_settings');
	$onpostAdStyles = array(
		'',
		'float: left; margin: %1$dpx %1$dpx %1$dpx 0;',
		'float: none; margin:%1$dpx 0 %1$dpx 0; text-align:center;',
		'float: right; margin:%1$dpx 0 %1$dpx %1$dpx;',
		'float: none; margin:0px;'
	);

	if(strpos($quicktag, 'Vi') !== false ) {
		if(($adIndex != -1) && ($adIndex != 100)) {
			$onpostAdAlignment = ((isset($settings['onpost_ad_'.$adIndex.'_alignment']))?$settings['onpost_ad_'.$adIndex.'_alignment']:'');
			$onpostAdMargin = ((isset($settings['onpost_ad_'.$adIndex.'_margin']))?$settings['onpost_ad_'.$adIndex.'_margin']:'');
			$onpostAdStyle = sprintf($onpostAdStyles[(int)$onpostAdAlignment], $onpostAdMargin);
			$onpostAdCode = ((isset($settings['onpost_ad_'.$adIndex.'_content']))?$settings['onpost_ad_'.$adIndex.'_content']:'');
			$onpostAdCode = "\n".'<!-- Quick Adsense Wordpress Plugin: http://quickadsense.com/ -->'."\n".'<div style="'.$onpostAdStyle.'">'."\n".$onpostAdCode."\n".'</div>'."\n";
		} else if($adIndex == 100) {
			$onpostAdCode = "\n".'<!-- Quick Adsense Wordpress Plugin: http://quickadsense.com/ -->'."\n".'<div style="float: none; margin: 10px auto; text-align: center;">'."\n".'<div id="quick_adsense_vi_ad">'.quick_adsense_vi_api_get_vi_code('quick_adsense_vi_code_settings').'</div>'."\n".'</div>'."\n";
		} else {
			$onpostAdCode = '';
		}
	} else {
		if(($adIndex != -1)) {
			$onpostAdAlignment = ((isset($settings['onpost_ad_'.$adIndex.'_alignment']))?$settings['onpost_ad_'.$adIndex.'_alignment']:'');
			$onpostAdMargin = ((isset($settings['onpost_ad_'.$adIndex.'_margin']))?$settings['onpost_ad_'.$adIndex.'_margin']:'');
			$onpostAdStyle = sprintf($onpostAdStyles[(int)$onpostAdAlignment], $onpostAdMargin);
			$onpostAdCode = ((isset($settings['onpost_ad_'.$adIndex.'_content']))?$settings['onpost_ad_'.$adIndex.'_content']:'');
			$onpostAdCode = "\n".'<!-- Quick Adsense Wordpress Plugin: http://quickadsense.com/ -->'."\n".'<div style="'.$onpostAdStyle.'">'."\n".$onpostAdCode."\n".'</div>'."\n";
		} else {
			$onpostAdCode = '';
		}
	}
	$content = explode('<!--'.$quicktag.'-->', $content, 2);	
	return $content[0].$onpostAdCode.$content[1];
}

function quick_adsense_content_del_element($quickAdsenseTempArray, $idx) {
	$copy = array();
	for($i=0; $i<count($quickAdsenseTempArray) ;$i++) {
		if($idx != $i) {
			array_push($copy, $quickAdsenseTempArray[$i]);
		}
	}	
	return $copy;
}
?>
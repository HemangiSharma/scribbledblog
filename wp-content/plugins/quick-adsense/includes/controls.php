<?php
if(!function_exists('quickadsense_get_control')) {
	function quickadsense_get_control($type, $label, $id, $name, $value = '',  $data = null, $class = 'input widefat', $style = '', $placeholder = '') {
		$output = '';
		switch($type) {
			case 'hidden':
				$output .= '<input type="text" id="'.$id.'" name="'.$name.'" value="'.$value.'" style="display: none;" />';
				break;
			case 'text':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label>';
				}
				$output .= '<input type="text" id="'.$id.'" name="'.$name.'" value="'.$value.'" class="multilanguage-input '.$class.'" style="'.$style.'" placeholder="'.$placeholder.'" />';
				break;
			case 'password':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label>';
				}
				$output .= '<input type="password" id="'.$id.'" name="'.$name.'" value="'.$value.'" class="multilanguage-input '.$class.'" style="'.$style.'" placeholder="'.$placeholder.'" />';
				break;
			case 'number':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label>';
				}
				$output .= '<input type="number" id="'.$id.'" name="'.$name.'" value="'.$value.'" class="multilanguage-input '.$class.'" style="'.$style.'" placeholder="'.$placeholder.'" />';
				break;
			case 'checkbox':
				$output .= '<input type="checkbox" id="'.$id.'" name="'.$name.'" value="1" class="input" '.checked($value, 1, false).'  style="'.$style.'" />';
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label>';
				}	
				break;	
			case 'textarea':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label><br />';
				}
				$output .= '<textarea id="'.$id.'" name="'.$name.'" class="multilanguage-input '.$class.'" class="multilanguage-input '.$class.'" style="height: 100px; '.$style.'"  placeholder="'.$placeholder.'">'.$value.'</textarea>';			
				break;
			case 'textarea-big':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label><br />';
				}
				$output .= '<textarea id="'.$id.'" name="'.$name.'" class="multilanguage-input '.$class.'" class="multilanguage-input '.$class.'" style="height: 300px; '.$style.'"  placeholder="'.$placeholder.'">'.$value.'</textarea>';			
				break;
			case 'select':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label>';
				}
				$output .= '<select id="'.$id.'" name="'.$name.'" class="'.$class.'" style="'.$style.'" >';
				if($data) {
					foreach($data as $option) {
						$metadata = '';
						if(isset($option['metadata']) && is_array($option['metadata'])) {
							foreach($option['metadata'] as $key => $metavalue) {
								$metadata .= 'data-'.$key.'="'.$metavalue.'"';
							}
						}
						$output .= '<option '.$metadata.' value="'.$option['value'].'" '.selected($value, $option['value'], false).'>'.$option['text'].'</option>';
					}
				}
				$output .= '</select>';
				break;
			case 'upload':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label><br />';
				}
				$output .= '<input type="text" id="'.$id.'" name="'.$name.'" value="'.$value.'" class="'.$class.'" class="width: 74%;" style="'.$style.'" />';
				$output .= '<input type="button" value="Upload Image" class="boates_uploader_button" id="upload_image_button" class="width: 25%;" />';
				break;
			case 'multiselect':
				if($label != '') {
					$output .= '<label for="'.$name.'">'.$label.'</label><br />';
				}
				$output .= '<select id="'.$id.'" name="'.$name.'" class="'.$class.'" multiple="multiple" class="height: 220px" style="'.$style.'" >';
				if($data) {
					foreach($data as $option) {
						if(is_array($value) && in_array($option['value'], $value)) {
							$output .= '<option value="'.$option['value'].'" selected="selected">'.$option['text'].'</option>';
						} else {
							$output .= '<option value="'.$option['value'].'">'.$option['text'].'</option>';
						}
					}
				}
				$output .= '</select>';
				break;
		}
		return $output;
	}
}
?>
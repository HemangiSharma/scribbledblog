<?php
/**
 * bfastmag_General_Repeater class file.
 *
 * @package WordPress
 * @subpackage bfastmag
 */

if ( ! class_exists( 'WP_Customize_Control' ) ) {
	return null;
}

/**
 * Class bfastmag_General_Repeater
 */
class bfastmag_General_Repeater extends WP_Customize_Control {

	/**
	 * Repeater id.
	 *
	 * @var string
	 */
	public $id;

	/**
	 * Box title.
	 *
	 * @var array|string|void
	 */
	private $boxtitle = array();

	/**
	 * Flag has icon control.
	 *
	 * @var bool|mixed
	 */
	private $customizer_repeater_icon_control = false;

	/**
	 * Flag has link control.
	 *
	 * @var bool|mixed
	 */
	private $customizer_repeater_link_control = false;

	/**
	 * bfastmag_General_Repeater constructor.
	 *
	 * @param WP_Customize_Manager $manager WordPress manager.
	 * @param string               $id Control id.
	 * @param array                $args Arguments.
	 */
	public function __construct( $manager, $id, $args = array() ) {
		parent::__construct( $manager, $id, $args );
		/*Get options from customizer.php*/
		$this->boxtitle   = __( 'bfastmag','bfastmag' );

		if ( ! empty( $args['bfastmag_icon_control'] ) ) {
			$this->customizer_repeater_icon_control = $args['bfastmag_icon_control'];
		}

		if ( ! empty( $args['bfastmag_link_control'] ) ) {
			$this->customizer_repeater_link_control = $args['bfastmag_link_control'];
		}

		if ( ! empty( $args['id'] ) ) {
			$this->id = $id;
		}
	}

	/**
	 * Enqueue resources for the control
	 */
	public function enqueue() {
		wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/assets/css/font-awesome.min.css','4.6.3' );
		wp_enqueue_style( 'customizer-repeater-admin-stylesheet', get_template_directory_uri() . '/assets/css/admin-style.css','1.0.0' );

		wp_enqueue_script( 'customizer-repeater-script', get_template_directory_uri() . '/inc/customizer/customizer-repeater/js/customizer_repeater.js', array( 'jquery', 'jquery-ui-draggable' ), '1.0.1', true );
		wp_enqueue_script( 'customizer-repeater-fontawesome-iconpicker', get_template_directory_uri() . '/inc/customizer/customizer-repeater/js/fontawesome-iconpicker.min.js', array( 'jquery' ), '1.0.0', true );
		wp_enqueue_style( 'customizer-repeater-fontawesome-iconpicker-script', get_template_directory_uri() . '/inc/customizer/customizer-repeater/css/fontawesome-iconpicker.min.css' );
	}

	/**
	 * The function to render the controler
	 */
	public function render_content() {
		/*Get default options*/
		$this_default = json_decode( $this->setting->default );
		/*Get values (json format)*/
		$values = $this->value();
		/*Decode values*/
		$json = json_decode( $values );
		if ( ! is_array( $json ) ) {
			$json = array( $values );
		} ?>

		
		<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
		<div class="bfastmag_general_control_repeater bfastmag_general_control_droppable">
			<?php
			if ( ( count( $json ) == 1 && '' === $json[0] ) || empty( $json ) ) {
				if ( ! empty( $this_default ) ) {
					$this->iterate_array( $this_default ); ?>
					<input type="hidden"
						   id="customizer-repeater-<?php echo $this->id; ?>-colector" <?php $this->link(); ?>
						   class="customizer-repeater-colector"
						   value="<?php echo esc_textarea( json_encode( $this_default ) ); ?>"/>
					<?php
				} else {
					$this->iterate_array(); ?>

					<input type="hidden"
						   id="customizer-repeater-<?php echo $this->id; ?>-colector" <?php $this->link(); ?>
						   class="bfastmag_repeater_colector"/>
					<?php
				}
			} else {
				$this->iterate_array( $json ); ?>
				<input type="hidden" id="customizer-repeater-<?php echo $this->id; ?>-colector" <?php $this->link(); ?>
					   class="bfastmag_repeater_colector" value="<?php echo esc_textarea( $this->value() ); ?>"/>
				<?php
			} ?>
		</div>
		<button type="button" class="button add_field bfastmag_general_control_new_field">
			<?php esc_html_e( 'Add new field', 'bfastmag' ); ?>
		</button>
		<?php
	}

	/**
	 * Function to iterate through input and display repeater boxes.
	 *
	 * @param array $array Array to iterate through.
	 */
	private function iterate_array( $array = array() ) {
		/*Counter that helps checking if the box is first and should have the delete button disabled*/
		$it = 0;
		if ( ! empty( $array ) ) {
			foreach ( $array as $icon ) {  ?>
				<div class="bfastmag_general_control_repeater_container bfastmag_draggable">
					<div class="bfastmag-customize-control-title">
						<?php 
	if ( ! empty( $icon->icon_value ) ) {
							$box_title = $icon->icon_value;
						}else{
							$box_title = $this->boxtitle;
						}
						echo esc_html( $box_title ); 

						?>
					</div>
					<div class="bfastmag-box-content-hidden">
						<?php
						$choice = '';
						$image_url = '';
						$icon_value = '';
						$title = '';
						$subtitle = '';
						$text = '';
						$link = '';
						$shortcode = '';
						$repeater = '';
						$color = '';
						if ( ! empty( $icon->id ) ) {
							$id = $icon->id;
						}

						if ( ! empty( $icon->icon_value ) ) {
							$icon_value = $icon->icon_value;
						}


						if ( ! empty( $icon->link ) ) {
							$link = $icon->link;
						}

						if ( $this->customizer_repeater_icon_control == true ) {
							$this->icon_picker_control( $icon_value, $choice );
						}

						if ( $this->customizer_repeater_link_control ) {
							$this->input_control(array(
								'label' => __( 'Link','bfastmag' ),
								'class' => 'bfastmag_link_control',
								'sanitize_callback' => 'esc_url',
							), $link);
						} ?>

						<input type="hidden" class="bfastmag_box_id" value="<?php if ( ! empty( $id ) ) {
							echo esc_attr( $id );
} ?>">
						<button type="button" class="bfastmag_general_control_remove_field button" <?php if ( $it == 0 ) {
							echo 'style="display:none;"';
} ?>>
							<?php esc_html_e( 'Delete field', 'bfastmag' ); ?>
						</button>

					</div>
				</div>

				<?php
				$it++;
			}// End foreach().
		} else { ?>
			<div class="bfastmag_general_control_repeater_container">
				<div class="bfastmag-customize-control-title">
					<?php echo esc_html( $this->boxtitle ); ?>
				</div>
				<div class="bfastmag-box-content-hidden">
					<?php
					if ( $this->customizer_repeater_icon_control == true ) {
						$this->icon_picker_control();
					}

					if ( $this->customizer_repeater_link_control == true ) {
						$this->input_control( array(
							'label' => __( 'Link', 'bfastmag' ),
							'class' => 'bfastmag_link_control',
						) );
					} ?>
					<input type="hidden" class="bfastmag_box_id">
					<button type="button" class="bfastmag_general_control_remove_field button" style="display:none;">
						<?php esc_html_e( 'Delete field', 'bfastmag' ); ?>
					</button>
				</div>
			</div>
			<?php
		}// End if().
	}

	/**
	 * Function to display input field in control.
	 *
	 * @param array  $options Field options.
	 * @param string $value Input value.
	 */
	private function input_control( $options, $value = '' ) {
	?>
		<span class="customize-control-title"><?php echo $options['label']; ?></span>
		<input type="text" value="<?php echo ( ! empty( $options['sanitize_callback'] ) ?  call_user_func_array( $options['sanitize_callback'], array( $value ) ) : esc_attr( $value ) ); ?>" class="<?php echo esc_attr( $options['class'] ); ?>" placeholder="<?php echo $options['label']; ?>"/>
		<?php
	}

	/**
	 * Function to display iconpicker in repeater.
	 *
	 * @param string $value Input value.
	 * @param string $show Flag to display or not.
	 */
	private function icon_picker_control( $value = '', $show = '' ) {
	?>
		<div class="social-repeater-general-control-icon" <?php if ( $show === 'customizer_repeater_image' || $show === 'customizer_repeater_none' ) { echo 'style="display:none;"'; } ?>>
			<span class="customize-control-title">
				<?php esc_html_e( 'Icon','bfastmag' ); ?>
			</span>
			<div class="input-group icp-container">
				<input data-placement="bottomRight" class="icp icp-auto" value="<?php if ( ! empty( $value ) ) { echo esc_attr( $value );} ?>" type="text">
				<span class="input-group-addon"></span>
			</div>
		</div>
		<?php
	}
}

<?php
/**
 * Admin Class
 *
 * Handles the admin functionality of plugin
 *
 * @package WP Blog and Widget
 * @since 1.3.2
 */

if ( !defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Wpbaw_Admin {
	
	function __construct() {
		
		// Action to add admin menu
		add_action( 'admin_menu', array($this, 'wpbawh_register_menu'), 12 );
		
		// Init Processes
		add_action( 'admin_init', array($this, 'wpbawh_admin_init_process') );
	}

	/**
	 * Function to add menu
	 * 
	 * @package WP Blog and Widget
	 * @since 1.3.2
	 */
	function wpbawh_register_menu() {
		
		// Plugin features menu
		add_submenu_page( 'edit.php?post_type='.WPBAW_POST_TYPE, __('Upgrade to PRO - WP Blog and Widget', 'wp-blog-and-widgets'), '<span style="color:#2ECC71">'.__('Upgrade to PRO', 'wp-blog-and-widgets').'</span>', 'edit_posts', 'wpbawh-premium', array($this, 'wpbawh_premium_page') );
		
		// Hire Us menu
		add_submenu_page( 'edit.php?post_type='.WPBAW_POST_TYPE, __('Hire Us', 'wp-blog-and-widgets'), '<span style="color:#2ECC71">'.__('Hire Us', 'wp-blog-and-widgets').'</span>', 'edit_posts', 'wpbawh-hireus', array($this, 'wpbawh_hireus_page') );
	}

	/**
	 * Getting Started Page Html
	 * 
	 * @package WP Blog and Widget
	 * @since 1.3.2
	 */
	function wpbawh_premium_page() {
		
		include_once( WPBAW_DIR . '/admin/settings/premium.php' );		
	}

	/**
	 * Getting Started Page Html
	 * 
	 * @package WP Blog and Widget
	 * @since 1.3.2
	 */
	function wpbawh_hireus_page() {		
		include_once( WPBAW_DIR . '/admin/settings/hire-us.php' );
	}

	/**
	 * Function to notification transient
	 * 
	 * @package WP Blog and Widget
	 * @since 1.3.2
	 */
	function wpbawh_admin_init_process() {
		// If plugin notice is dismissed
	    if( isset($_GET['message']) && $_GET['message'] == 'wpbawh-plugin-notice' ) {
	    	set_transient( 'wpbawh_install_notice', true, 604800 );
	    }
	}
}

$wpbaw_Admin = new Wpbaw_Admin();
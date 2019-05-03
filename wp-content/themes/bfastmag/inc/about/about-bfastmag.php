<?php //   About WP bfastFast Blog

// Add About WP bFast Blog
function bfastmag_about_page() {
	add_theme_page( esc_html__( 'About BfastMag', 'bfastmag' ), esc_html__( 'About Bfastmag Blog', 'bfastmag' ), 'edit_theme_options', 'about-bfastmag', 'bfastmag_about_page_output' );
}
add_action( 'admin_menu', 'bfastmag_about_page' );

// Render About Bfast Blog HTML
function bfastmag_about_page_output() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Welcome to BfastMag!', 'bfastmag' ); ?></h1>
		<p class="welcome-text">
			<?php esc_html_e( 'Our best Ultra Fast Blog magazine WordPress theme, bfastmag! Get the best experience using bfastmag and that is why we have created this page with all the necessary informations for you. ThemePacific team hopes that you will enjoy using bfastmag, as much as we enjoy creating it.', 'bfastmag' ); ?>
		</p>

		<!-- Tabs -->
		<?php $active_tab = isset( $_GET[ 'tab' ] ) ? $_GET[ 'tab' ] : 'bfastmag_tab_1'; ?>  

		<div class="nav-tab-wrapper">
			<a href="?page=about-bfastmag&tab=bfastmag_tab_1" class="nav-tab <?php echo $active_tab == 'bfastmag_tab_1' ? 'nav-tab-active' : ''; ?>">
				<?php esc_html_e( 'Getting Started', 'bfastmag' ); ?>
			</a>
			<a href="?page=about-bfastmag&tab=bfastmag_tab_2" class="nav-tab <?php echo $active_tab == 'bfastmag_tab_2' ? 'nav-tab-active' : ''; ?>">
				<?php esc_html_e( 'Recommended Plugins', 'bfastmag' ); ?>
			</a>
			<a href="?page=about-bfastmag&tab=bfastmag_tab_3" class="nav-tab <?php echo $active_tab == 'bfastmag_tab_3' ? 'nav-tab-active' : ''; ?>">
				<?php esc_html_e( 'Support', 'bfastmag' ); ?>
			</a>
			<a href="?page=about-bfastmag&tab=bfastmag_tab_4" class="nav-tab <?php echo $active_tab == 'bfastmag_tab_4' ? 'nav-tab-active' : ''; ?>">
				<?php esc_html_e( 'Free vs Pro', 'bfastmag' ); ?>
			</a>
		</div>

		<!-- Tab Content -->
		<?php if ( $active_tab == 'bfastmag_tab_1' ) : ?>

			<div class="three-columns-wrap">

				<br>

				<div class="column-wdith-3">
					<h3><?php esc_html_e( 'Theme Documentation', 'bfastmag' ); ?></h3>
					<p>
						<?php esc_html_e( 'We are Highly recommending you to begin with this, read the full theme documentation to understand the basics and even more details about how to use our theme.', 'bfastmag' ); ?>
					</p>
					<a target="_blank" href="<?php echo esc_url('http://docs.themepacific.com/bfastmag/'); ?>" class="button button-primary"><?php esc_html_e( 'Read Documentation', 'bfastmag' ); ?></a>
				</div>

				<div class="column-wdith-3">
					<h3><?php esc_html_e( 'Demo Content', 'bfastmag' ); ?></h3>
					<p>
						<?php esc_html_e( 'If you are a WordPress beginner it\'s highly recomended to install the Demo Content. This file includes: Menus, Posts, Pages, Widgets, etc. Read More about demo import in the ', 'bfastmag' ); ?>
						<a href="<?php echo esc_url('http://docs.themepacific.com/bfastmag/'); ?>" target="_blank"><?php esc_html_e( 'Theme Documentation.', 'bfastmag' ); ?></a>
					</p>
					<a target="_blank" target="_blank" href="<?php echo esc_url('http://docs.themepacific.com/bfastmag/'); ?>" class="button button-primary"><?php esc_html_e( 'Download Import File', 'bfastmag' ); ?></a>
				</div>

				<div class="column-wdith-3">
					<h3><?php esc_html_e( 'Theme Customizer', 'bfastmag' ); ?></h3>
					<p>
						<?php esc_html_e( 'Using the WordPress Customizer you can easily customize every aspect of the theme. After reading the Theme Documentation we recommend you to open the Theme Customizer and play with some options.', 'bfastmag' ); ?>
					</p>
					<a target="_blank" href="<?php echo esc_url( wp_customize_url() );?>" class="button button-primary"><?php esc_html_e( 'Customize Your Site', 'bfastmag' ); ?></a>
				</div>

			</div>
			<div class="four-columns-wrap">

				<h2><?php esc_html_e( 'BfastMag Pro - Fastest Premium WP Theme', 'bfastmag' ); ?></h2>
				<p>
					<?php esc_html_e('BfastMag Pro is an Ultra Fast Responsive free WordPress theme for News, News Paper, Editorial Magazines, Tech blogs, Personal Blogs, Fashion blogs, Financial blogs and Photography, Photo gallery Blogs.','bfastmag');?>
					</p><p><?php
					esc_html_e( 'Theme is very responsive, highly customizable built with Bootstrap. It comes with the flat, minimalist, magazine style homepage Design with boxed layout, Featured Grid Slider, Multi Style Drop-down Menu.', 'bfastmag' ); ?>
					<a target="_blank" href="https://themepacific.com/bfastmag/7595/"><?php esc_html_e( 'BfastMag Pro Theme', 'bfastmag' ); ?></a>
					<?php esc_html_e( 'More details in the theme Documentation.', 'bfastmag' ); ?>
				</p>
				<div class="theme">
								<a href="https://themepacific.com/">
									<div class="theme-screenshot">
										<img src="<?php echo get_template_directory_uri() . '/assets/images/bfastmag.jpg'; ?>" alt="">
									</div>

									</a><div class="theme-id-container"><a href="https://themepacific.com/">
										<h2 class="theme-name" id="newsmagz_pro-name">
										<?php esc_html_e( 'BfastMag Pro.', 'bfastmag' ); ?></h2>
										</a><div class="theme-actions"><a href="https://themepacific.com/bfastmag/7595/">
											</a><a class="button button-primary customize load-customize hide-if-no-customize" href="https://themepacific.com/bfastmag/7595/"><?php esc_html_e( 'Download Theme', 'bfastmag' ); ?></a>

										</div>
									</div>
								
							</div>
			</div>

		<?php elseif ( $active_tab == 'bfastmag_tab_2' ) : ?>
			
			<div class="three-columns-wrap">
				
				<br>
				<p><?php esc_html_e( 'Recommended Plugins are fully supported by BfastMag theme.', 'bfastmag' ); ?></p>
				<br>

				<?php

			
	 
					bfastmag_recommended_plugin( 'tiled-gallery-carousel-without-jetpack', 'jetpack-carousel', esc_html__( 'Tiled Gallery Carousel Without JetPack', 'bfastmag' ), esc_html__( 'Tiled Gallery with carousel will completely transform your galleries to new look and your users will love this.', 'bfastmag' ) );	
				 
					bfastmag_recommended_plugin( 'tp-postviews-count-popular-posts-widgets', 'tp_postviews', esc_html__( 'PostViews Count & Popular Posts Widgets', 'bfastmag' ), esc_html__( 'This Plugin based on Post Views will help sites to add post views and show Popular posts in Sidebar or anywhere. .', 'bfastmag' ) );		


					bfastmag_recommended_plugin( 'themepacific-review-lite', 'tpcrn_wpreview', esc_html__( ' WordPress Review', 'bfastmag' ), esc_html__( 'WordPress Review and User Rating Plugin (TP WP Reviews) will help sites to add reviews to get more users without affecting page load speed.  ', 'bfastmag' ) );
						// WooCommerce
				bfastmag_recommended_plugin( 'woocommerce', 'woocommerce', esc_html__( 'WooCommerce', 'bfastmag' ), esc_html__( 'WooCommerce is a powerful, extendable eCommerce plugin that helps you sell anything. Beautifully.', 'bfastmag' ) );

				?>


			</div>

		<?php elseif ( $active_tab == 'bfastmag_tab_3' ) : ?>

			<div class="three-columns-wrap">

				<br>

				<div class="column-wdith-3">
					<h3>
						<span class="dashicons dashicons-sos"></span>
						<?php esc_html_e( 'Forums', 'bfastmag' ); ?>
					</h3>
					<p>
						<?php esc_html_e( 'Use Our Dedicated Support forums to ask your questions. Before Posting Questions, try the forum search to get the answers.', 'bfastmag' ); ?>
						<hr>
						<a target="_blank" href="<?php echo esc_url('https://themepacific.com/support/forum/wordpress-theme-support/'); ?>"><?php esc_html_e( 'Go to Support Forums', 'bfastmag' ); ?></a>
					</p>
				</div>

				<div class="column-wdith-3">
					<h3>
						<span class="dashicons dashicons-book"></span>
						<?php esc_html_e( 'Documentation', 'bfastmag' ); ?>
					</h3>
					<p>
						<?php esc_html_e( 'Need more details? Please check out Theme Documentation for detailed information.', 'bfastmag' ); ?>
						<hr>
						<a target="_blank" href="<?php echo esc_url('http://docs.themepacific.com/bfastmag/'); ?>"><?php esc_html_e( 'Read Full Documentation', 'bfastmag' ); ?></a>
					</p>
				</div>

				<div class="column-wdith-3">
					<h3>
						<span class="dashicons dashicons-admin-tools"></span>
						<?php esc_html_e( 'Changelog', 'bfastmag' ); ?>
					</h3>
					<p>
						<?php esc_html_e( 'Stay always up to date, check for fixes, updates and some new feauters you should not miss.', 'bfastmag' ); ?>
						<hr>
						<a target="_blank" href="<?php echo esc_url('https://themepacific.com/bfastmag/7595/'); ?>"><?php esc_html_e( 'See Changelog', 'bfastmag' ); ?></a>
					</p>
				</div>
				<div class="column-wdith-3">
					<h3>
						<span class="dashicons dashicons-star-filled"></span>
						<?php esc_html_e( 'Rating', 'bfastmag' ); ?>
					</h3>
					<p>
						<?php esc_html_e( 'Are you enjoying bfastmag?
Rate our theme on WordPress.org. We\'d really appreciate it! 

', 'bfastmag' ); ?><p><span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span></p>
						<hr>
						<a target="_blank" href="<?php echo esc_url('https://wordpress.org/support/view/theme-reviews/bfastmag#postform/'); ?>"><?php esc_html_e( 'Post Review', 'bfastmag' ); ?></a>
					</p>
				</div>


			</div>

		<?php elseif ( $active_tab == 'bfastmag_tab_4' ) : ?>

			<br><br>
			<div class="features_table">
				<table class="free-vs-pro form-table">
					<thead>
						<tr>
							<th>
								<a href="<?php echo esc_url('https://themepacific.com/bfastmag/7595/'); ?>" target="_blank" class="button button-primary button-hero">
									<?php esc_html_e( 'Get BfastMag Pro', 'bfastmag' ); ?>
								</a>

							</th>
							<th>
								<?php esc_html_e( 'Free', 'bfastmag' ); ?>
							</th>
							<th>
								<?php esc_html_e( 'Premium', 'bfastmag' ); ?>
							</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td class="feature">Use in unlimited domains</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Super Mega Menu</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Drag and Drop Page Builder</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Responsive layout</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Widgetized footer</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Documentation</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">All Custom Widgets</td>
							<td class="compare-icon">Limited</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Advanced Control Panel (WP Customizer)</td>
							<td class="compare-icon">Limited</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Infinite Scroll for Single Posts</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">HomePage Drag &amp; Drop Organizer</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Breaking News Ticker</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Unlimted Theme Skins</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Unlimited Background patterns (Upload yours)</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">800+ Google Fonts &amp; Colors</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">RTL (Right to left Language Support)</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Localization (Global Translation Support)</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Theme Update Alert</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">One Click Demo Installer</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Access to support forums</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature">Sample data (XML files)</td>
							<td class="compare-icon"><span class="dashicons-before dashicons-no"></span></td>
							<td class="compare-icon"><span class="dashicons-before dashicons-yes"></span></td>
						</tr>
						<tr>
							<td class="feature" colspan="3">
								<center>And Lot More</center>
							</td>
						</tr>
						<tr>
							<td>
								<a href="https://themepacific.com/bfastmag/7595/" target="_blank" class="button button-primary button-hero">
								Get BfastMag Pro                    </a>

							</td>

						</tr>
					</tbody>
				</table>
			</div>

		<?php endif; ?>

	</div><!-- /.wrap -->
	<?php
} // end bfastmag_about_page_output

// Check if plugin is installed
function bfastmag_check_installed_plugin( $slug, $filename ) {
	return file_exists( ABSPATH . 'wp-content/plugins/' . $slug . '/' . $filename . '.php' ) ? true : false;
}

// Generate Recommended Plugin HTML
function bfastmag_recommended_plugin( $slug, $filename, $name, $description) {

	if ( $slug === 'facebook-pagelike-widget' ) {
		$size = '128x128';
	} else {
		$size = '256x256';
	}

	?>

	<div class="plugin-card">
		<div class="name column-name">
			<h3>
				<?php echo esc_html( $name ); ?>
				<img src="<?php echo esc_url('https://ps.w.org/'. $slug .'/assets/icon-'. $size .'.png') ?>" class="plugin-icon" alt="">
			</h3>
		</div>
		<div class="action-links">
			<?php if ( bfastmag_check_installed_plugin( $slug, $filename ) ) : ?>
				<button type="button" class="button button-disabled" disabled="disabled"><?php esc_html_e( 'Installed', 'bfastmag' ); ?></button>
			<?php else : ?>
				<a class="install-now button-primary" href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin='. $slug ), 'install-plugin_'. $slug ) ); ?>" >
					<?php esc_html_e( 'Install Now', 'bfastmag' ); ?>
				</a>							
			<?php endif; ?>
		</div>
		<div class="desc column-description">
			<p><?php echo esc_html( $description ); ?></p>
		</div>
	</div>

	<?php
}

// enqueue ui CSS/JS
function bfastmag_enqueue_about_page_scripts($hook) {

	if ( 'appearance_page_about-bfastmag' != $hook ) {
		return;
	}

	// enqueue CSS
	wp_enqueue_style( 'bfastmag-about-page-css', get_theme_file_uri( '/inc/about/css/about-bfastmag-page.css' ) );

}
add_action( 'admin_enqueue_scripts', 'bfastmag_enqueue_about_page_scripts' );
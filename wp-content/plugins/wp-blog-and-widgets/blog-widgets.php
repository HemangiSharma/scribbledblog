<?php
class wpbaw_Blog_Widget extends WP_Widget {

    function __construct() {

        $widget_ops = array('classname' => 'SP_Blog_Widget', 'description' => __('Displayed Latest Blog post  in a sidebar', 'wp-blog-and-widgets') );
        $control_ops = array( 'width' => 350, 'height' => 450, 'id_base' => 'sp_blog_widget' );
        parent::__construct( 'sp_blog_widget', __('Latest Blog Widget', 'wp-blog-and-widgets'), $widget_ops, $control_ops );
    }

    function form($instance) {
        $defaults = array(
        'limit'             => 5,
        'title'             => '',
        "date"              => "false", 
        'show_category'     => "false",
		'show_thunb'        => "false",
        'category'          => 0,
        );

        $instance = wp_parse_args( (array) $instance, $defaults );
        $title = isset($instance['title']) ? esc_attr($instance['title']) : '';
        $num_items = isset($instance['num_items']) ? absint($instance['num_items']) : 5;
    ?>
      <p><label for="<?php echo $this->get_field_id('title'); ?>"> <?php echo _e( 'Title:', 'wp-blog-and-widgets' ); ?> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></label></p>
      <p><label for="<?php echo $this->get_field_id('num_items'); ?>"><?php echo _e( 'Number of Items: ', 'wp-blog-and-widgets' ); ?>  <input class="widefat" id="<?php echo $this->get_field_id('num_items'); ?>" name="<?php echo $this->get_field_name('num_items'); ?>" type="text" value="<?php echo esc_attr($num_items); ?>" /></label></p>
            <p>
            <input id="<?php echo $this->get_field_id( 'date' ); ?>" name="<?php echo $this->get_field_name( 'date' ); ?>" type="checkbox"<?php checked( $instance['date'], 1 ); ?> />
            <label for="<?php echo $this->get_field_id( 'date' ); ?>"><?php _e( 'Display Date', 'blog' ); ?></label>
        </p>
        <p>
            <input id="<?php echo $this->get_field_id( 'show_category' ); ?>" name="<?php echo $this->get_field_name( 'show_category' ); ?>" type="checkbox"<?php checked( $instance['show_category'], 1 ); ?> />
            <label for="<?php echo $this->get_field_id( 'show_category' ); ?>"><?php _e( 'Display Category', 'blog' ); ?></label>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'category' ); ?>"><?php _e( 'Category:', 'blog' ); ?></label>
            <?php
                $dropdown_args = array( 'taxonomy' => 'blog-category', 'class' => 'widefat', 'show_option_all' => __( 'All', 'blog' ), 'id' => $this->get_field_id( 'category' ), 'name' => $this->get_field_name( 'category' ), 'selected' => $instance['category'] );
                wp_dropdown_categories( $dropdown_args );
            ?>
        </p>
		<p>
            <input id="<?php echo $this->get_field_id( 'show_thunb' ); ?>" name="<?php echo $this->get_field_name( 'show_thunb' ); ?>" type="checkbox"<?php checked( $instance['show_thunb'], 1 ); ?> />
            <label for="<?php echo $this->get_field_id( 'show_thunb' ); ?>"><?php _e( 'Display Thumbnail', 'blog' ); ?></label>
        </p>
    <?php
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['title'] = $new_instance['title'];
        $instance['num_items'] = $new_instance['num_items'];
        $instance['date'] = (bool) esc_attr( $new_instance['date'] );
        $instance['show_category'] = (bool) esc_attr( $new_instance['show_category'] );
		 $instance['show_thunb'] = (bool) esc_attr( $new_instance['show_thunb'] );
        $instance['category']      = intval( $new_instance['category'] ); 
        return $instance;
    }
    function widget($news_args, $instance) {
        extract($news_args, EXTR_SKIP);

        $current_post_name = get_query_var('name');

        $title = empty($instance['title']) ? '' : apply_filters('widget_title', $instance['title']);
        $num_items = empty($instance['num_items']) ? '5' : apply_filters('widget_title', $instance['num_items']);
        if ( isset( $instance['date'] ) && ( 1 == $instance['date'] ) ) { $date = "true"; } else { $date = "false"; }
        if ( isset( $instance['show_category'] ) && ( 1 == $instance['show_category'] ) ) { $show_category = "true"; } else { $show_category = "false"; }
		if ( isset( $instance['show_thunb'] ) && ( 1 == $instance['show_thunb'] ) ) { $show_thunb = "true"; } else { $show_thunb = "false"; }
        if ( isset( $instance['category'] ) && is_numeric( $instance['category'] ) ) $category = intval( $instance['category'] );
        $postcount = 0;

        echo $before_widget;

?>
             <h4 class="widget-title"><?php echo $title ?></h4>
            <!--visual-columns-->
            <?php 
			$no_p = '';
			if($date == "false" && $show_category == "false"){ 
                $no_p = "no_p";
                }?>
            <div class="recent-blog-items <?php echo $no_p?>">
                <ul>
            <?php // setup the query
            $news_args = array( 'suppress_filters' => true,
                           'posts_per_page' => $num_items,
                           'post_type' => 'blog_post',
                           'order' => 'DESC'
                         );

            if($category != 0){
                $news_args['tax_query'] = array( array( 'taxonomy' => 'blog-category', 'field' => 'id', 'terms' => $category) );
            }
            $cust_loop = new WP_Query($news_args);
			global $post;
             $post_count = $cust_loop->post_count;
          $count = 0;
            if ($cust_loop->have_posts()) : while ($cust_loop->have_posts()) : $cust_loop->the_post(); $postcount++;
                    $count++;
               $terms = get_the_terms( $post->ID, 'blog-category' );
                    $blog_links = array();
                    if($terms){

                    foreach ( $terms as $term ) {
                        $term_link = get_term_link( $term );
                        $blog_links[] = '<a href="' . esc_url( $term_link ) . '">'.$term->name.'</a>';
                    }
                }
                    $cate_name = join( ", ", $blog_links );
					
                    ?>
                    <li class="blog_li">
					
					<?php if( $show_thunb == 'false') { ?>
                       <a class="blogpost-title" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
                        <?php if($date == "true" ||  $show_category == "true"){ ?>
						<div class="widget-date-cat">
						<?php echo ($date == "true")? get_the_date() : "" ;?>
                        <?php echo ($date == "true" && $show_category == "true" && $cate_name != '') ? " , " : "";?>
                        <?php echo ($show_category == 'true' && $cate_name != '') ? $cate_name : ""?>
						</div>
					<?php } } else { ?>
						
						<div class="blog_thumb_left">
							<a class="li-link-thumb" href="<?php the_permalink(); ?>"><?php the_post_thumbnail(array(80, 80)); ?> </a> 
						 </div>
						 <div class="blog_thumb_right">
							<a class="li-link-custom" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
							<?php if($date == "true" ||  $show_category == "true"){ ?>
						<div class="widget-date-cat" style="margin-bottom:5px;">
						<?php echo ($date == "true")? get_the_date() : "" ;?>
                        <?php echo ($date == "true" && $show_category == "true" && $cate_name != '') ? " , " : "";?>
                        <?php echo ($show_category == 'true' && $cate_name != '') ? $cate_name : ""?>
						</div>
						<?php }?>
						 </div>
                    <?php } ?>
					</li>
            <?php endwhile;
            endif;
             wp_reset_query(); ?>

                </ul>
            </div>
<?php
        echo $after_widget;
    }
}

/* Register the widget */
function wpbaw_blog_widget_load_widgets() {
    register_widget( 'wpbaw_Blog_Widget' );
}

/* Load the widget */
add_action( 'widgets_init', 'wpbaw_blog_widget_load_widgets' );
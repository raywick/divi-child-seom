<?php
function dt_enqueue_styles() {
    $parenthandle = 'divi-style'; 
    $theme = wp_get_theme();
    wp_enqueue_style( $parenthandle, get_template_directory_uri() . '/style.css', 
        array(), // if the parent theme code has a dependency, copy it to here
        $theme->parent()->get('Version')
    );
    wp_enqueue_style( 'child-style', get_stylesheet_uri(),
        array( $parenthandle ),
        $theme->get('Version') 
    );
}
add_action( 'wp_enqueue_scripts', 'dt_enqueue_styles' );

//----------------------------------------------------------------------------------------------------------------------
//                                           ADMIN DASHBOARD SETTINGS SECTION
//----------------------------------------------------------------------------------------------------------------------
/************* Add Filter per Author to Pages list ****************/
add_filter( 'pre_get_posts', 'rudr_filter_media_by_author' );

function rudr_filter_media_by_author( $query ) {
	
    global $pagenow;
    
    if ( 'upload.php' !== $pagenow || ! current_user_can( 'edit_others_posts' ) ) {
        return;
    }
    
    $author_id = isset( $_GET['author'] ) ? intval( $_GET['author'] ) : '';
    
    if ( $author_id ) {
        $query->set( 'author', $author_id );
    }
    
    return;
}

add_action( 'restrict_manage_posts', 'rudr_filter_media_by_author_dropdown' );

function rudr_filter_media_by_author_dropdown() {
	
    if ( ! current_user_can( 'edit_others_posts' ) ) {
        return;
    }
    
    $author_id = isset( $_GET['author'] ) ? intval( $_GET['author'] ) : '';
    
    wp_dropdown_users(
        array(
            'role__in' => array( 
                'administrator', 
                'editor', 
                'author',
                'contributor',
                'freelancer',
                'emprendedor',
                'negocio'
            ),
            'name' => 'author',
            'show_option_all' => 'Todos los Usuarios',
            'selected' => $author_id,
            'class' => 'chosen-select'
        )
    );
    
    return;
}

//***************************** Avoid generating default image sizes and multiple unused images ********************************//
add_filter( 'intermediate_image_sizes', 'remove_default_img_sizes', 10, 1);

function remove_default_img_sizes( $sizes ) {
  $targets = ['thumbnail', 'medium', 'medium_large', 'large', '1536x1536', '2048x2048'];

  foreach($sizes as $size_index=>$size) {
    if(in_array($size, $targets)) {
      unset($sizes[$size_index]);
    }
  }

  return $sizes;
}

//***************************** Share Function ********************************//
// Include share-code.php to wp-footer of shareable-page.php 
include_once get_stylesheet_directory() . '/share-code.php';
// Enqueue custom javascript and css for the "Share Function"
function enqueue_share_section_code() {
    // Only enqueue the stylesheet if the current page uses the "shareable-page.php" template
    if ( is_page_template( 'shareable-page.php' ) ) {
        wp_enqueue_script( 'share-function-script', get_stylesheet_directory_uri() . '/assets/js/share-functionality.js', array('jquery'), false, true);
        wp_enqueue_style( 'share-function-styles', get_stylesheet_directory_uri() . '/assets/css/share-functionality.css', array(), false, 'all');
    }
}
add_action( 'wp_enqueue_scripts', 'enqueue_share_section_code' );

//-------------------------- Test Mobile Exit Intent ----------------------------//
function enqueue_exit_mobile_code () {
	wp_enqueue_script( 'exit-mobile-script', get_stylesheet_directory_uri() . '/assets/js/exit-mobile.js', array(), false, 'all');
}
add_action( 'wp_enqueue_scripts', 'enqueue_exit_mobile_code' );
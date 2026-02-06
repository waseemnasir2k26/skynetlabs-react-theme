<?php
/**
 * Skynetlabs React Theme - Functions
 *
 * Orchestrator: requires all modular PHP includes and enqueues React app.
 *
 * @package SkynetLabs
 * @version 2025.2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Theme version constant
define( 'SKYNETLABS_VERSION', '2025.2.0' );
define( 'SKYNETLABS_DIR', get_template_directory() );
define( 'SKYNETLABS_URI', get_template_directory_uri() );

// ============================================
// MODULAR PHP INCLUDES
// ============================================
require_once SKYNETLABS_DIR . '/inc/post-types.php';
require_once SKYNETLABS_DIR . '/inc/taxonomies.php';
require_once SKYNETLABS_DIR . '/inc/meta-boxes.php';
require_once SKYNETLABS_DIR . '/inc/customizer.php';
require_once SKYNETLABS_DIR . '/inc/icons.php';
require_once SKYNETLABS_DIR . '/inc/lead-capture.php';
require_once SKYNETLABS_DIR . '/inc/ajax-handlers.php';
require_once SKYNETLABS_DIR . '/inc/rest-api.php';
require_once SKYNETLABS_DIR . '/inc/rest-api-extensions.php';
require_once SKYNETLABS_DIR . '/inc/chatgpt-handler.php';
require_once SKYNETLABS_DIR . '/inc/admin-page.php';
require_once SKYNETLABS_DIR . '/inc/security.php';
require_once SKYNETLABS_DIR . '/inc/seo.php';

// ============================================
// THEME SETUP
// ============================================
function skynetlabs_theme_setup() {
    global $content_width;
    if ( ! isset( $content_width ) ) {
        $content_width = 1200;
    }

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'skynetlabs' ),
        'footer'  => __( 'Footer Menu', 'skynetlabs' ),
    ) );

    add_image_size( 'portfolio-large', 1200, 800, true );
    add_image_size( 'portfolio-thumb', 600, 400, true );
    add_image_size( 'service-icon', 300, 300, true );
}
add_action( 'after_setup_theme', 'skynetlabs_theme_setup' );

// ============================================
// SPA ROUTING - Force all frontend to index.php
// ============================================
function skynetlabs_spa_template( $template ) {
    if ( is_admin() || wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
        return $template;
    }

    // Let WordPress handle wp-login, wp-admin, feeds, sitemaps
    if ( is_feed() || is_robots() || is_trackback() ) {
        return $template;
    }

    return SKYNETLABS_DIR . '/index.php';
}
add_filter( 'template_include', 'skynetlabs_spa_template', 99 );

// ============================================
// ENQUEUE REACT APP
// ============================================
function skynetlabs_enqueue_react_app() {
    if ( is_admin() ) {
        return;
    }

    $dev_mode = defined( 'SKYNETLABS_DEV' ) && SKYNETLABS_DEV;

    if ( $dev_mode ) {
        // Development: Load from Vite dev server
        wp_enqueue_script(
            'skynetlabs-vite-client',
            'http://localhost:5173/@vite/client',
            array(),
            null,
            false
        );
        wp_enqueue_script(
            'skynetlabs-react-app',
            'http://localhost:5173/src/main.jsx',
            array(),
            null,
            true
        );
    } else {
        // Production: Load from dist/ with manifest
        $manifest_path = SKYNETLABS_DIR . '/dist/.vite/manifest.json';

        if ( file_exists( $manifest_path ) ) {
            $manifest = json_decode( file_get_contents( $manifest_path ), true );

            // Main entry point
            if ( isset( $manifest['src/main.jsx'] ) ) {
                $entry = $manifest['src/main.jsx'];

                // Enqueue CSS files
                if ( isset( $entry['css'] ) ) {
                    foreach ( $entry['css'] as $i => $css_file ) {
                        wp_enqueue_style(
                            'skynetlabs-react-css-' . $i,
                            SKYNETLABS_URI . '/dist/' . $css_file,
                            array(),
                            SKYNETLABS_VERSION
                        );
                    }
                }

                // Enqueue JS
                wp_enqueue_script(
                    'skynetlabs-react-app',
                    SKYNETLABS_URI . '/dist/' . $entry['file'],
                    array(),
                    SKYNETLABS_VERSION,
                    true
                );

                // Add module type
                add_filter( 'script_loader_tag', function( $tag, $handle ) {
                    if ( in_array( $handle, array( 'skynetlabs-react-app', 'skynetlabs-vite-client' ) ) ) {
                        return str_replace( ' src', ' type="module" src', $tag );
                    }
                    return $tag;
                }, 10, 2 );
            }
        }
    }

    // Add module type for dev scripts too
    if ( $dev_mode ) {
        add_filter( 'script_loader_tag', function( $tag, $handle ) {
            if ( in_array( $handle, array( 'skynetlabs-react-app', 'skynetlabs-vite-client' ) ) ) {
                return str_replace( ' src', ' type="module" src', $tag );
            }
            return $tag;
        }, 10, 2 );
    }

    // Localize script - pass data to React
    wp_localize_script( 'skynetlabs-react-app', 'skynetlabsData', skynetlabs_get_localized_data() );
}
add_action( 'wp_enqueue_scripts', 'skynetlabs_enqueue_react_app' );

// ============================================
// LOCALIZED DATA FOR REACT
// ============================================
function skynetlabs_get_localized_data() {
    $menu_items = skynetlabs_get_mega_menu_data();

    return array(
        'ajaxUrl'     => admin_url( 'admin-ajax.php' ),
        'restUrl'     => rest_url( 'wp/v2/' ),
        'restNonce'   => wp_create_nonce( 'wp_rest' ),
        'nonce'       => wp_create_nonce( 'skynetlabs_nonce' ),
        'siteUrl'     => home_url(),
        'themePath'   => SKYNETLABS_URI,
        'siteName'    => get_bloginfo( 'name' ),
        'siteDesc'    => get_bloginfo( 'description' ),
        'email'       => get_theme_mod( 'skynetlabs_email', 'info@skynetjoe.com' ),
        'phone'       => get_theme_mod( 'skynetlabs_phone', '+92 300 1001957' ),
        'whatsapp'    => get_theme_mod( 'skynetlabs_whatsapp', '923001001957' ),
        'fiverr'      => get_theme_mod( 'skynetlabs_fiverr', 'https://www.fiverr.com/skynetjoellc' ),
        'logoUrl'     => skynetlabs_get_logo_url(),
        'megaMenu'    => $menu_items,
    );
}

function skynetlabs_get_logo_url() {
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    if ( $custom_logo_id ) {
        $image = wp_get_attachment_image_src( $custom_logo_id, 'full' );
        return $image ? $image[0] : '';
    }
    return '';
}

function skynetlabs_get_mega_menu_data() {
    return array(
        array(
            'title' => 'AUTOMATION',
            'items' => array(
                array( 'label' => 'n8n Workflows', 'slug' => 'n8n-automation' ),
                array( 'label' => 'GoHighLevel CRM', 'slug' => 'gohighlevel' ),
                array( 'label' => 'Zapier & Make', 'slug' => 'zapier-make' ),
                array( 'label' => 'Social Media Auto', 'slug' => 'social-media' ),
            ),
        ),
        array(
            'title' => 'AI CONTENT',
            'items' => array(
                array( 'label' => 'AI Video Creation', 'slug' => 'ai-video' ),
                array( 'label' => 'YouTube Automation', 'slug' => 'youtube' ),
                array( 'label' => 'TikTok Automation', 'slug' => 'tiktok' ),
                array( 'label' => 'Facebook Automation', 'slug' => 'facebook' ),
            ),
        ),
        array(
            'title' => 'DEVELOPMENT',
            'items' => array(
                array( 'label' => 'WordPress Sites', 'slug' => 'wordpress' ),
                array( 'label' => 'E-commerce Auto', 'slug' => 'ecommerce' ),
                array( 'label' => 'Vibe-Coded Sites', 'slug' => 'vibe-coded' ),
                array( 'label' => 'AI Chatbots', 'slug' => 'ai-chatbots' ),
            ),
        ),
        array(
            'title' => 'CONSULTING',
            'items' => array(
                array( 'label' => 'Business Systems', 'slug' => 'business-systems' ),
                array( 'label' => 'Strategy & Training', 'slug' => 'consultation' ),
                array( 'label' => 'Branding & Design', 'slug' => 'branding' ),
                array( 'label' => 'Content Creation', 'slug' => 'content' ),
            ),
        ),
    );
}

// ============================================
// WIDGETS
// ============================================
function skynetlabs_widgets_init() {
    register_sidebar( array(
        'name'          => 'Blog Sidebar',
        'id'            => 'blog-sidebar',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'skynetlabs_widgets_init' );

// ============================================
// ADMIN STYLES
// ============================================
function skynetlabs_admin_styles() {
    echo '<style>
        #adminmenu .dashicons-admin-tools:before { content: "\f107"; }
        #adminmenu .dashicons-portfolio:before { content: "\f322"; }
        #adminmenu .dashicons-star-filled:before { content: "\f155"; }
    </style>';
}
add_action( 'admin_head', 'skynetlabs_admin_styles' );

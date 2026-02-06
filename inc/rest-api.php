<?php
/**
 * Custom REST API Endpoints
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function skynetlabs_register_rest_routes() {
    register_rest_route( 'skynetlabs/v1', '/site-data', array(
        'methods'             => 'GET',
        'callback'            => 'skynetlabs_rest_site_data',
        'permission_callback' => '__return_true',
    ) );

    register_rest_route( 'skynetlabs/v1', '/services', array(
        'methods'             => 'GET',
        'callback'            => 'skynetlabs_rest_services',
        'permission_callback' => '__return_true',
    ) );

    register_rest_route( 'skynetlabs/v1', '/services/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods'             => 'GET',
        'callback'            => 'skynetlabs_rest_service_by_slug',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'skynetlabs_register_rest_routes' );

function skynetlabs_rest_site_data() {
    return rest_ensure_response( array(
        'name'        => get_bloginfo( 'name' ),
        'description' => get_bloginfo( 'description' ),
        'email'       => get_theme_mod( 'skynetlabs_email', 'info@skynetjoe.com' ),
        'phone'       => get_theme_mod( 'skynetlabs_phone', '+92 300 1001957' ),
        'whatsapp'    => get_theme_mod( 'skynetlabs_whatsapp', '923001001957' ),
        'fiverr'      => get_theme_mod( 'skynetlabs_fiverr', 'https://www.fiverr.com/skynetjoellc' ),
    ) );
}

function skynetlabs_rest_services( $request ) {
    $args = array(
        'post_type'      => 'service',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    );

    $category = $request->get_param( 'category' );
    if ( $category ) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'service_category',
                'field'    => 'slug',
                'terms'    => $category,
            ),
        );
    }

    $query = new WP_Query( $args );
    $services = array();

    foreach ( $query->posts as $post ) {
        $services[] = skynetlabs_format_service( $post );
    }

    return rest_ensure_response( $services );
}

function skynetlabs_rest_service_by_slug( $request ) {
    $slug = $request['slug'];

    $args = array(
        'post_type' => 'service',
        'name'      => $slug,
        'posts_per_page' => 1,
    );

    $query = new WP_Query( $args );

    if ( ! $query->have_posts() ) {
        return new WP_Error( 'not_found', 'Service not found', array( 'status' => 404 ) );
    }

    return rest_ensure_response( skynetlabs_format_service( $query->posts[0] ) );
}

function skynetlabs_format_service( $post ) {
    $thumb_id = get_post_thumbnail_id( $post->ID );
    $categories = wp_get_post_terms( $post->ID, 'service_category', array( 'fields' => 'all' ) );

    $features = get_post_meta( $post->ID, '_service_features', true );
    $use_cases = get_post_meta( $post->ID, '_service_use_cases', true );
    $faq = get_post_meta( $post->ID, '_service_faq', true );

    return array(
        'id'              => $post->ID,
        'title'           => $post->post_title,
        'slug'            => $post->post_name,
        'excerpt'         => get_the_excerpt( $post ),
        'content'         => apply_filters( 'the_content', $post->post_content ),
        'featured_image'  => $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'large' ) : '',
        'featured_image_thumb' => $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'portfolio-thumb' ) : '',
        'categories'      => array_map( function( $cat ) {
            return array( 'id' => $cat->term_id, 'name' => $cat->name, 'slug' => $cat->slug );
        }, $categories ),
        'starting_price'  => get_post_meta( $post->ID, '_service_starting_price', true ),
        'price_range'     => get_post_meta( $post->ID, '_service_price_range', true ),
        'tech_stack'      => get_post_meta( $post->ID, '_service_tech_stack', true ),
        'service_icon'    => get_post_meta( $post->ID, '_service_service_icon', true ),
        'delivery_time'   => get_post_meta( $post->ID, '_service_delivery_time', true ),
        'video_url'       => get_post_meta( $post->ID, '_service_video_url', true ),
        'features'        => $features ? array_filter( array_map( 'trim', explode( "\n", $features ) ) ) : array(),
        'use_cases'       => $use_cases ? array_filter( array_map( 'trim', explode( "\n", $use_cases ) ) ) : array(),
        'faq'             => skynetlabs_parse_faq( $faq ),
    );
}

function skynetlabs_parse_faq( $faq_string ) {
    if ( empty( $faq_string ) ) {
        return array();
    }
    $lines = array_filter( array_map( 'trim', explode( "\n", $faq_string ) ) );
    $faqs = array();
    foreach ( $lines as $line ) {
        $parts = explode( '|', $line, 2 );
        if ( count( $parts ) === 2 ) {
            $faqs[] = array( 'question' => trim( $parts[0] ), 'answer' => trim( $parts[1] ) );
        }
    }
    return $faqs;
}

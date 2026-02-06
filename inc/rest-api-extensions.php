<?php
/**
 * REST API Extensions - Expose custom meta fields to the WP REST API
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function skynetlabs_register_rest_fields() {

    // Service meta fields
    $service_fields = array(
        'starting_price', 'price_range', 'tech_stack', 'service_icon',
        'delivery_time', 'video_url', 'features', 'use_cases', 'faq',
    );

    foreach ( $service_fields as $field ) {
        register_rest_field( 'service', $field, array(
            'get_callback' => function( $object ) use ( $field ) {
                $value = get_post_meta( $object['id'], '_service_' . $field, true );
                if ( in_array( $field, array( 'features', 'use_cases' ) ) ) {
                    return $value ? array_filter( array_map( 'trim', explode( "\n", $value ) ) ) : array();
                }
                if ( $field === 'faq' ) {
                    return skynetlabs_parse_faq( $value );
                }
                return $value;
            },
            'schema' => null,
        ) );
    }

    // Featured image URL for services
    register_rest_field( 'service', 'featured_image_url', array(
        'get_callback' => function( $object ) {
            $thumb_id = get_post_thumbnail_id( $object['id'] );
            return $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'large' ) : '';
        },
    ) );

    // Service categories
    register_rest_field( 'service', 'service_categories', array(
        'get_callback' => function( $object ) {
            $terms = wp_get_post_terms( $object['id'], 'service_category' );
            return array_map( function( $term ) {
                return array( 'id' => $term->term_id, 'name' => $term->name, 'slug' => $term->slug );
            }, $terms );
        },
    ) );

    // Testimonial meta fields
    register_rest_field( 'testimonial', 'client_name', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'], '_testimonial_client_name', true );
        },
    ) );
    register_rest_field( 'testimonial', 'client_role', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'], '_testimonial_client_role', true );
        },
    ) );
    register_rest_field( 'testimonial', 'client_company', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'], '_testimonial_client_company', true );
        },
    ) );
    register_rest_field( 'testimonial', 'rating', array(
        'get_callback' => function( $object ) {
            return (int) get_post_meta( $object['id'], '_testimonial_rating', true );
        },
    ) );
    register_rest_field( 'testimonial', 'featured_image_url', array(
        'get_callback' => function( $object ) {
            $thumb_id = get_post_thumbnail_id( $object['id'] );
            return $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'portfolio-thumb' ) : '';
        },
    ) );

    // Portfolio meta fields
    register_rest_field( 'portfolio', 'client_name', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'], '_portfolio_client_name', true );
        },
    ) );
    register_rest_field( 'portfolio', 'project_url', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'], '_portfolio_project_url', true );
        },
    ) );
    register_rest_field( 'portfolio', 'tech_used', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'], '_portfolio_tech_used', true );
        },
    ) );
    register_rest_field( 'portfolio', 'results', array(
        'get_callback' => function( $object ) {
            return get_post_meta( $object['id'], '_portfolio_results', true );
        },
    ) );
    register_rest_field( 'portfolio', 'featured_image_url', array(
        'get_callback' => function( $object ) {
            $thumb_id = get_post_thumbnail_id( $object['id'] );
            return $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'large' ) : '';
        },
    ) );
    register_rest_field( 'portfolio', 'portfolio_categories', array(
        'get_callback' => function( $object ) {
            $terms = wp_get_post_terms( $object['id'], 'portfolio_category' );
            return array_map( function( $term ) {
                return array( 'id' => $term->term_id, 'name' => $term->name, 'slug' => $term->slug );
            }, $terms );
        },
    ) );
}
add_action( 'rest_api_init', 'skynetlabs_register_rest_fields' );

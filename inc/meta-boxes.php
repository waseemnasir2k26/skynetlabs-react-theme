<?php
/**
 * Service Details Meta Boxes
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function skynetlabs_register_meta_boxes() {
    add_meta_box(
        'service_details',
        'Service Details',
        'skynetlabs_service_details_callback',
        'service',
        'normal',
        'high'
    );

    add_meta_box(
        'testimonial_details',
        'Testimonial Details',
        'skynetlabs_testimonial_details_callback',
        'testimonial',
        'normal',
        'high'
    );

    add_meta_box(
        'portfolio_details',
        'Project Details',
        'skynetlabs_portfolio_details_callback',
        'portfolio',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'skynetlabs_register_meta_boxes' );

function skynetlabs_service_details_callback( $post ) {
    wp_nonce_field( 'skynetlabs_service_details', 'skynetlabs_service_nonce' );

    $fields = array(
        'starting_price'  => array( 'label' => 'Starting Price', 'type' => 'text', 'placeholder' => '$500' ),
        'price_range'     => array( 'label' => 'Price Range', 'type' => 'text', 'placeholder' => '$500 - $2,000' ),
        'tech_stack'      => array( 'label' => 'Tech Stack (comma separated)', 'type' => 'text', 'placeholder' => 'n8n, Make, Zapier' ),
        'service_icon'    => array( 'label' => 'Service Icon (emoji or class)', 'type' => 'text', 'placeholder' => 'e.g. workflow, video, chatbot' ),
        'delivery_time'   => array( 'label' => 'Delivery Time', 'type' => 'text', 'placeholder' => '3-5 days' ),
        'video_url'       => array( 'label' => 'Demo Video URL', 'type' => 'url', 'placeholder' => 'https://youtube.com/...' ),
        'features'        => array( 'label' => 'Key Features (one per line)', 'type' => 'textarea' ),
        'use_cases'       => array( 'label' => 'Use Cases (one per line)', 'type' => 'textarea' ),
        'faq'             => array( 'label' => 'FAQ (Q|A format, one per line)', 'type' => 'textarea' ),
    );

    echo '<table class="form-table">';
    foreach ( $fields as $key => $field ) {
        $value = get_post_meta( $post->ID, '_service_' . $key, true );
        echo '<tr><th><label for="service_' . $key . '">' . esc_html( $field['label'] ) . '</label></th><td>';
        if ( $field['type'] === 'textarea' ) {
            echo '<textarea id="service_' . $key . '" name="service_' . $key . '" rows="4" class="large-text">' . esc_textarea( $value ) . '</textarea>';
        } else {
            echo '<input type="' . esc_attr( $field['type'] ) . '" id="service_' . $key . '" name="service_' . $key . '" value="' . esc_attr( $value ) . '" class="regular-text" placeholder="' . esc_attr( $field['placeholder'] ?? '' ) . '">';
        }
        echo '</td></tr>';
    }
    echo '</table>';
}

function skynetlabs_testimonial_details_callback( $post ) {
    wp_nonce_field( 'skynetlabs_testimonial_details', 'skynetlabs_testimonial_nonce' );

    $client_name    = get_post_meta( $post->ID, '_testimonial_client_name', true );
    $client_role    = get_post_meta( $post->ID, '_testimonial_client_role', true );
    $client_company = get_post_meta( $post->ID, '_testimonial_client_company', true );
    $rating         = get_post_meta( $post->ID, '_testimonial_rating', true );

    echo '<table class="form-table">';
    echo '<tr><th><label>Client Name</label></th><td><input type="text" name="testimonial_client_name" value="' . esc_attr( $client_name ) . '" class="regular-text"></td></tr>';
    echo '<tr><th><label>Client Role</label></th><td><input type="text" name="testimonial_client_role" value="' . esc_attr( $client_role ) . '" class="regular-text"></td></tr>';
    echo '<tr><th><label>Company</label></th><td><input type="text" name="testimonial_client_company" value="' . esc_attr( $client_company ) . '" class="regular-text"></td></tr>';
    echo '<tr><th><label>Rating (1-5)</label></th><td><input type="number" name="testimonial_rating" value="' . esc_attr( $rating ) . '" min="1" max="5"></td></tr>';
    echo '</table>';
}

function skynetlabs_portfolio_details_callback( $post ) {
    wp_nonce_field( 'skynetlabs_portfolio_details', 'skynetlabs_portfolio_nonce' );

    $client_name = get_post_meta( $post->ID, '_portfolio_client_name', true );
    $project_url = get_post_meta( $post->ID, '_portfolio_project_url', true );
    $tech_used   = get_post_meta( $post->ID, '_portfolio_tech_used', true );
    $results     = get_post_meta( $post->ID, '_portfolio_results', true );

    echo '<table class="form-table">';
    echo '<tr><th><label>Client Name</label></th><td><input type="text" name="portfolio_client_name" value="' . esc_attr( $client_name ) . '" class="regular-text"></td></tr>';
    echo '<tr><th><label>Project URL</label></th><td><input type="url" name="portfolio_project_url" value="' . esc_attr( $project_url ) . '" class="regular-text"></td></tr>';
    echo '<tr><th><label>Technologies Used</label></th><td><input type="text" name="portfolio_tech_used" value="' . esc_attr( $tech_used ) . '" class="regular-text"></td></tr>';
    echo '<tr><th><label>Results / Impact</label></th><td><textarea name="portfolio_results" rows="3" class="large-text">' . esc_textarea( $results ) . '</textarea></td></tr>';
    echo '</table>';
}

// Save meta boxes
function skynetlabs_save_service_meta( $post_id ) {
    if ( ! isset( $_POST['skynetlabs_service_nonce'] ) || ! wp_verify_nonce( $_POST['skynetlabs_service_nonce'], 'skynetlabs_service_details' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    $fields = array( 'starting_price', 'price_range', 'tech_stack', 'service_icon', 'delivery_time', 'video_url', 'features', 'use_cases', 'faq' );
    foreach ( $fields as $field ) {
        if ( isset( $_POST[ 'service_' . $field ] ) ) {
            update_post_meta( $post_id, '_service_' . $field, sanitize_textarea_field( $_POST[ 'service_' . $field ] ) );
        }
    }
}
add_action( 'save_post_service', 'skynetlabs_save_service_meta' );

function skynetlabs_save_testimonial_meta( $post_id ) {
    if ( ! isset( $_POST['skynetlabs_testimonial_nonce'] ) || ! wp_verify_nonce( $_POST['skynetlabs_testimonial_nonce'], 'skynetlabs_testimonial_details' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    $fields = array( 'client_name', 'client_role', 'client_company', 'rating' );
    foreach ( $fields as $field ) {
        if ( isset( $_POST[ 'testimonial_' . $field ] ) ) {
            update_post_meta( $post_id, '_testimonial_' . $field, sanitize_text_field( $_POST[ 'testimonial_' . $field ] ) );
        }
    }
}
add_action( 'save_post_testimonial', 'skynetlabs_save_testimonial_meta' );

function skynetlabs_save_portfolio_meta( $post_id ) {
    if ( ! isset( $_POST['skynetlabs_portfolio_nonce'] ) || ! wp_verify_nonce( $_POST['skynetlabs_portfolio_nonce'], 'skynetlabs_portfolio_details' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    $text_fields = array( 'client_name', 'project_url', 'tech_used' );
    foreach ( $text_fields as $field ) {
        if ( isset( $_POST[ 'portfolio_' . $field ] ) ) {
            update_post_meta( $post_id, '_portfolio_' . $field, sanitize_text_field( $_POST[ 'portfolio_' . $field ] ) );
        }
    }
    if ( isset( $_POST['portfolio_results'] ) ) {
        update_post_meta( $post_id, '_portfolio_results', sanitize_textarea_field( $_POST['portfolio_results'] ) );
    }
}
add_action( 'save_post_portfolio', 'skynetlabs_save_portfolio_meta' );

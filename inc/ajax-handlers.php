<?php
/**
 * AJAX Handlers - Contact form, lead capture, chatbot
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Contact form handler
function skynetlabs_handle_contact_form() {
    check_ajax_referer( 'skynetlabs_nonce', 'nonce' );

    $name    = sanitize_text_field( $_POST['name'] ?? '' );
    $email   = sanitize_email( $_POST['email'] ?? '' );
    $phone   = sanitize_text_field( $_POST['phone'] ?? '' );
    $service = sanitize_text_field( $_POST['service'] ?? '' );
    $message = sanitize_textarea_field( $_POST['message'] ?? '' );

    if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
        wp_send_json_error( array( 'message' => 'Please fill in all required fields.' ) );
    }

    if ( ! is_email( $email ) ) {
        wp_send_json_error( array( 'message' => 'Please enter a valid email address.' ) );
    }

    // Save as lead
    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'skynet_leads',
        array(
            'name'       => $name,
            'email'      => $email,
            'phone'      => $phone,
            'source'     => 'contact_form',
            'score'      => 20,
            'status'     => 'new',
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        ),
        array( '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s' )
    );

    // Send email
    $to      = get_option( 'admin_email' );
    $subject = 'New Contact: ' . $name . ( $service ? ' - ' . $service : '' );
    $body    = "Name: $name\nEmail: $email\n";
    if ( $phone ) $body .= "Phone: $phone\n";
    if ( $service ) $body .= "Service Interest: $service\n";
    $body   .= "\nMessage:\n$message\n";
    $headers = array( 'Content-Type: text/plain; charset=UTF-8', "Reply-To: $name <$email>" );

    if ( wp_mail( $to, $subject, $body, $headers ) ) {
        wp_send_json_success( array( 'message' => 'Thank you! Your message has been sent successfully.' ) );
    } else {
        wp_send_json_success( array( 'message' => 'Thank you! We received your message and will get back to you soon.' ) );
    }
}
add_action( 'wp_ajax_skynetlabs_contact', 'skynetlabs_handle_contact_form' );
add_action( 'wp_ajax_nopriv_skynetlabs_contact', 'skynetlabs_handle_contact_form' );

// Lead capture handler
function skynetlabs_handle_lead_capture() {
    check_ajax_referer( 'skynetlabs_nonce', 'nonce' );

    $email = sanitize_email( $_POST['email'] ?? '' );
    $name  = sanitize_text_field( $_POST['name'] ?? '' );
    $source = sanitize_text_field( $_POST['source'] ?? 'modal' );

    if ( empty( $email ) || ! is_email( $email ) ) {
        wp_send_json_error( array( 'message' => 'Please enter a valid email address.' ) );
    }

    global $wpdb;
    $existing = $wpdb->get_var( $wpdb->prepare(
        "SELECT id FROM {$wpdb->prefix}skynet_leads WHERE email = %s",
        $email
    ) );

    if ( $existing ) {
        if ( $name ) {
            $wpdb->update( $wpdb->prefix . 'skynet_leads', array( 'name' => $name ), array( 'id' => $existing ) );
        }
        skynetlabs_record_lead_event( $existing, 'lead_capture_repeat', $source );
    } else {
        $wpdb->insert(
            $wpdb->prefix . 'skynet_leads',
            array(
                'name'       => $name,
                'email'      => $email,
                'source'     => $source,
                'score'      => 10,
                'status'     => 'new',
                'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            ),
            array( '%s', '%s', '%s', '%d', '%s', '%s' )
        );
    }

    wp_send_json_success( array( 'message' => 'Thanks! You\'re all set.' ) );
}
add_action( 'wp_ajax_skynetlabs_lead_capture', 'skynetlabs_handle_lead_capture' );
add_action( 'wp_ajax_nopriv_skynetlabs_lead_capture', 'skynetlabs_handle_lead_capture' );

// Lead event tracking
function skynetlabs_handle_lead_event() {
    check_ajax_referer( 'skynetlabs_nonce', 'nonce' );

    $session_id = sanitize_text_field( $_POST['session_id'] ?? '' );
    $event_type = sanitize_text_field( $_POST['event_type'] ?? '' );
    $event_data = sanitize_text_field( $_POST['event_data'] ?? '' );
    $page_url   = esc_url_raw( $_POST['page_url'] ?? '' );

    if ( empty( $event_type ) ) {
        wp_send_json_error();
    }

    global $wpdb;

    // Find or create session
    $session = $wpdb->get_row( $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}skynet_lead_sessions WHERE session_id = %s",
        $session_id
    ) );

    if ( ! $session ) {
        $wpdb->insert(
            $wpdb->prefix . 'skynet_lead_sessions',
            array( 'session_id' => $session_id, 'pages_viewed' => $page_url ),
            array( '%s', '%s' )
        );
    }

    if ( $session && $session->lead_id ) {
        skynetlabs_record_lead_event( $session->lead_id, $event_type, $event_data, $page_url );
    }

    wp_send_json_success();
}
add_action( 'wp_ajax_skynetlabs_lead_event', 'skynetlabs_handle_lead_event' );
add_action( 'wp_ajax_nopriv_skynetlabs_lead_event', 'skynetlabs_handle_lead_event' );

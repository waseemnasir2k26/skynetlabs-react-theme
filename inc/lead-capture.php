<?php
/**
 * Lead Capture System
 * Database tables, lead scoring, sessions, GDPR compliance
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Create tables on theme activation
function skynetlabs_create_lead_tables() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();

    $tables = array();

    $tables[] = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}skynet_leads (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) DEFAULT '',
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT '',
        company VARCHAR(255) DEFAULT '',
        source VARCHAR(100) DEFAULT 'website',
        score INT(11) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'new',
        ip_address VARCHAR(45) DEFAULT '',
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY email (email),
        KEY status (status),
        KEY score (score)
    ) $charset_collate;";

    $tables[] = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}skynet_lead_events (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        lead_id BIGINT(20) UNSIGNED NOT NULL,
        event_type VARCHAR(100) NOT NULL,
        event_data TEXT,
        page_url VARCHAR(500) DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY lead_id (lead_id),
        KEY event_type (event_type)
    ) $charset_collate;";

    $tables[] = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}skynet_lead_sessions (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        session_id VARCHAR(100) NOT NULL,
        lead_id BIGINT(20) UNSIGNED DEFAULT NULL,
        pages_viewed TEXT,
        first_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY session_id (session_id),
        KEY lead_id (lead_id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    foreach ( $tables as $sql ) {
        dbDelta( $sql );
    }
}
add_action( 'after_switch_theme', 'skynetlabs_create_lead_tables' );

// Lead scoring
function skynetlabs_update_lead_score( $lead_id, $event_type ) {
    global $wpdb;
    $table = $wpdb->prefix . 'skynet_leads';

    $scores = array(
        'page_view'      => 1,
        'service_view'   => 3,
        'pricing_view'   => 5,
        'contact_view'   => 5,
        'form_start'     => 10,
        'form_submit'    => 20,
        'chatbot_open'   => 5,
        'chatbot_message'=> 10,
        'tool_use'       => 8,
        'download'       => 15,
    );

    $points = isset( $scores[ $event_type ] ) ? $scores[ $event_type ] : 1;

    $wpdb->query( $wpdb->prepare(
        "UPDATE $table SET score = score + %d WHERE id = %d",
        $points,
        $lead_id
    ) );
}

// Record lead event
function skynetlabs_record_lead_event( $lead_id, $event_type, $event_data = '', $page_url = '' ) {
    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'skynet_lead_events',
        array(
            'lead_id'    => $lead_id,
            'event_type' => $event_type,
            'event_data' => is_array( $event_data ) ? wp_json_encode( $event_data ) : $event_data,
            'page_url'   => $page_url,
        ),
        array( '%d', '%s', '%s', '%s' )
    );

    skynetlabs_update_lead_score( $lead_id, $event_type );
}

// GDPR: Delete lead data
function skynetlabs_delete_lead_data( $email ) {
    global $wpdb;
    $lead = $wpdb->get_row( $wpdb->prepare(
        "SELECT id FROM {$wpdb->prefix}skynet_leads WHERE email = %s",
        $email
    ) );

    if ( $lead ) {
        $wpdb->delete( $wpdb->prefix . 'skynet_lead_events', array( 'lead_id' => $lead->id ) );
        $wpdb->delete( $wpdb->prefix . 'skynet_lead_sessions', array( 'lead_id' => $lead->id ) );
        $wpdb->delete( $wpdb->prefix . 'skynet_leads', array( 'id' => $lead->id ) );
    }
}

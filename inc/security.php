<?php
/**
 * Security Hardening
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Remove WordPress version
remove_action( 'wp_head', 'wp_generator' );

// Disable XML-RPC
add_filter( 'xmlrpc_enabled', '__return_false' );

// Remove unnecessary head links
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

// Disable emojis for performance
function skynetlabs_disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'skynetlabs_disable_emojis' );

// Remove oEmbed discovery
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );

// Disable author archives to prevent username enumeration
function skynetlabs_disable_author_archives() {
    if ( is_author() ) {
        wp_safe_redirect( home_url(), 301 );
        exit;
    }
}
add_action( 'template_redirect', 'skynetlabs_disable_author_archives' );

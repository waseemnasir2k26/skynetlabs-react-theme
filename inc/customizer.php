<?php
/**
 * Theme Customizer Settings
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function skynetlabs_customize_register( $wp_customize ) {

    // Contact Settings Section
    $wp_customize->add_section( 'skynetlabs_contact', array(
        'title'    => 'Contact Information',
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'skynetlabs_email', array(
        'default'           => 'info@skynetjoe.com',
        'sanitize_callback' => 'sanitize_email',
    ) );
    $wp_customize->add_control( 'skynetlabs_email', array(
        'label'   => 'Email Address',
        'section' => 'skynetlabs_contact',
        'type'    => 'email',
    ) );

    $wp_customize->add_setting( 'skynetlabs_phone', array(
        'default'           => '+92 300 1001957',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'skynetlabs_phone', array(
        'label'   => 'Phone Number',
        'section' => 'skynetlabs_contact',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'skynetlabs_whatsapp', array(
        'default'           => '923001001957',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'skynetlabs_whatsapp', array(
        'label'       => 'WhatsApp Number (without + or spaces)',
        'section'     => 'skynetlabs_contact',
        'type'        => 'text',
    ) );

    $wp_customize->add_setting( 'skynetlabs_fiverr', array(
        'default'           => 'https://www.fiverr.com/skynetjoellc',
        'sanitize_callback' => 'esc_url_raw',
    ) );
    $wp_customize->add_control( 'skynetlabs_fiverr', array(
        'label'   => 'Fiverr Profile URL',
        'section' => 'skynetlabs_contact',
        'type'    => 'url',
    ) );

    // Social Links Section
    $wp_customize->add_section( 'skynetlabs_social', array(
        'title'    => 'Social Links',
        'priority' => 35,
    ) );

    $socials = array( 'linkedin', 'twitter', 'youtube', 'github', 'instagram' );
    foreach ( $socials as $social ) {
        $wp_customize->add_setting( 'skynetlabs_' . $social, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ) );
        $wp_customize->add_control( 'skynetlabs_' . $social, array(
            'label'   => ucfirst( $social ) . ' URL',
            'section' => 'skynetlabs_social',
            'type'    => 'url',
        ) );
    }
}
add_action( 'customize_register', 'skynetlabs_customize_register' );

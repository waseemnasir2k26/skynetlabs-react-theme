<?php
/**
 * SEO - Server-side meta tags for crawlers (since React is client-rendered)
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function skynetlabs_seo_meta_tags() {
    // Parse current URL to determine page type
    $request_uri = $_SERVER['REQUEST_URI'] ?? '/';
    $path = trim( parse_url( $request_uri, PHP_URL_PATH ), '/' );
    $segments = explode( '/', $path );

    $site_name = get_bloginfo( 'name' );
    $site_desc = get_bloginfo( 'description' );
    $site_url  = home_url();

    $title       = $site_name . ' - AI Automation Agency';
    $description = $site_desc ?: 'AI Automation Specialist transforming businesses with 500+ automated workflows. Expert in n8n, Make, Zapier, GoHighLevel, AI Video, and more.';
    $og_image    = SKYNETLABS_URI . '/screenshot.png';
    $canonical   = home_url( $request_uri );

    // Service detail page
    if ( count( $segments ) >= 2 && $segments[0] === 'services' ) {
        $service_slug = $segments[1];
        $service = get_page_by_path( $service_slug, OBJECT, 'service' );
        if ( $service ) {
            $title       = $service->post_title . ' | ' . $site_name;
            $description = get_the_excerpt( $service ) ?: wp_trim_words( $service->post_content, 30 );
            $thumb_id    = get_post_thumbnail_id( $service->ID );
            if ( $thumb_id ) {
                $og_image = wp_get_attachment_image_url( $thumb_id, 'large' );
            }
        }
    } elseif ( $path === 'services' ) {
        $title = 'Services | ' . $site_name;
        $description = 'Explore our AI automation services including n8n workflows, GoHighLevel CRM, AI video creation, chatbot development, and more.';
    } elseif ( $path === 'portfolio' ) {
        $title = 'Portfolio | ' . $site_name;
        $description = 'View our portfolio of 500+ successful automation projects for clients worldwide.';
    } elseif ( $path === 'about' ) {
        $title = 'About Us | ' . $site_name;
    } elseif ( $path === 'contact' ) {
        $title = 'Contact Us | ' . $site_name;
    } elseif ( $path === 'pricing' ) {
        $title = 'Pricing | ' . $site_name;
    }

    // Output meta tags
    echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr( $description ) . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url( $og_image ) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url( $canonical ) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url( $og_image ) . '">' . "\n";
    echo '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url( $canonical ) . '">' . "\n";

    // JSON-LD
    $jsonld = array(
        '@context' => 'https://schema.org',
        '@type'    => 'ProfessionalService',
        'name'     => $site_name,
        'url'      => $site_url,
        'description' => $description,
        'email'    => get_theme_mod( 'skynetlabs_email', 'info@skynetjoe.com' ),
        'telephone' => get_theme_mod( 'skynetlabs_phone', '+92 300 1001957' ),
        'address'  => array(
            '@type'           => 'PostalAddress',
            'addressLocality' => 'Lahore',
            'addressCountry'  => 'PK',
        ),
    );

    echo '<script type="application/ld+json">' . wp_json_encode( $jsonld, JSON_UNESCAPED_SLASHES ) . '</script>' . "\n";

    // Prerender.io compatibility
    echo '<meta name="fragment" content="!">' . "\n";
}
add_action( 'wp_head', 'skynetlabs_seo_meta_tags', 1 );

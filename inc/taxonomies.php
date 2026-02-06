<?php
/**
 * Custom Taxonomies
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function skynetlabs_register_taxonomies() {

    register_taxonomy( 'service_category', 'service', array(
        'labels' => array(
            'name'          => 'Service Categories',
            'singular_name' => 'Service Category',
            'search_items'  => 'Search Categories',
            'all_items'     => 'All Categories',
            'edit_item'     => 'Edit Category',
            'update_item'   => 'Update Category',
            'add_new_item'  => 'Add New Category',
            'new_item_name' => 'New Category Name',
            'menu_name'     => 'Categories',
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'service-category' ),
    ) );

    register_taxonomy( 'portfolio_category', 'portfolio', array(
        'labels' => array(
            'name'          => 'Portfolio Categories',
            'singular_name' => 'Portfolio Category',
            'search_items'  => 'Search Categories',
            'all_items'     => 'All Categories',
            'edit_item'     => 'Edit Category',
            'update_item'   => 'Update Category',
            'add_new_item'  => 'Add New Category',
            'new_item_name' => 'New Category Name',
            'menu_name'     => 'Categories',
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'portfolio-category' ),
    ) );
}
add_action( 'init', 'skynetlabs_register_taxonomies' );

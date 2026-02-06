<?php
/**
 * Leads Dashboard Admin Page
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function skynetlabs_admin_menu() {
    add_menu_page(
        'Leads Dashboard',
        'Leads',
        'manage_options',
        'skynetlabs-leads',
        'skynetlabs_leads_page',
        'dashicons-groups',
        30
    );
}
add_action( 'admin_menu', 'skynetlabs_admin_menu' );

function skynetlabs_leads_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'skynet_leads';

    // Handle status update
    if ( isset( $_POST['update_lead_status'] ) ) {
        check_admin_referer( 'skynetlabs_update_lead' );
        $lead_id = intval( $_POST['lead_id'] );
        $status  = sanitize_text_field( $_POST['status'] );
        $wpdb->update( $table, array( 'status' => $status ), array( 'id' => $lead_id ) );
    }

    $leads = $wpdb->get_results( "SELECT * FROM $table ORDER BY created_at DESC LIMIT 50" );
    $total = $wpdb->get_var( "SELECT COUNT(*) FROM $table" );
    $new_count = $wpdb->get_var( "SELECT COUNT(*) FROM $table WHERE status = 'new'" );

    ?>
    <div class="wrap">
        <h1>Leads Dashboard</h1>
        <div style="display:flex;gap:20px;margin-bottom:20px;">
            <div style="background:#fff;padding:20px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);min-width:150px;">
                <h3 style="margin:0;color:#666;">Total Leads</h3>
                <p style="font-size:36px;font-weight:bold;margin:10px 0 0;color:#13b973;"><?php echo $total; ?></p>
            </div>
            <div style="background:#fff;padding:20px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);min-width:150px;">
                <h3 style="margin:0;color:#666;">New Leads</h3>
                <p style="font-size:36px;font-weight:bold;margin:10px 0 0;color:#ff4757;"><?php echo $new_count; ?></p>
            </div>
        </div>

        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Name</th><th>Email</th><th>Phone</th><th>Source</th><th>Score</th><th>Status</th><th>Date</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if ( $leads ) : foreach ( $leads as $lead ) : ?>
                <tr>
                    <td><strong><?php echo esc_html( $lead->name ?: '(unnamed)' ); ?></strong></td>
                    <td><a href="mailto:<?php echo esc_attr( $lead->email ); ?>"><?php echo esc_html( $lead->email ); ?></a></td>
                    <td><?php echo esc_html( $lead->phone ); ?></td>
                    <td><?php echo esc_html( $lead->source ); ?></td>
                    <td><span style="background:#13b973;color:#fff;padding:2px 8px;border-radius:12px;"><?php echo intval( $lead->score ); ?></span></td>
                    <td>
                        <form method="post" style="display:inline;">
                            <?php wp_nonce_field( 'skynetlabs_update_lead' ); ?>
                            <input type="hidden" name="lead_id" value="<?php echo $lead->id; ?>">
                            <select name="status" onchange="this.form.submit()">
                                <?php foreach ( array( 'new', 'contacted', 'qualified', 'proposal', 'won', 'lost' ) as $s ) : ?>
                                    <option value="<?php echo $s; ?>" <?php selected( $lead->status, $s ); ?>><?php echo ucfirst( $s ); ?></option>
                                <?php endforeach; ?>
                            </select>
                            <input type="hidden" name="update_lead_status" value="1">
                        </form>
                    </td>
                    <td><?php echo date( 'M j, Y', strtotime( $lead->created_at ) ); ?></td>
                    <td>
                        <?php if ( $lead->phone ) : ?>
                            <a href="https://wa.me/<?php echo preg_replace( '/[^0-9]/', '', $lead->phone ); ?>" target="_blank" class="button button-small">WhatsApp</a>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; else : ?>
                <tr><td colspan="8">No leads yet.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}

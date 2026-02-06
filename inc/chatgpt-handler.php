<?php
/**
 * ChatGPT API Handler - AI Agent Backend
 *
 * @package SkynetLabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Register AJAX handlers
add_action( 'wp_ajax_skynet_chatgpt_message', 'skynet_chatgpt_message_handler' );
add_action( 'wp_ajax_nopriv_skynet_chatgpt_message', 'skynet_chatgpt_message_handler' );
add_action( 'wp_ajax_skynet_get_contact_urls', 'skynet_get_contact_urls_handler' );
add_action( 'wp_ajax_nopriv_skynet_get_contact_urls', 'skynet_get_contact_urls_handler' );

function skynet_get_contact_urls_handler() {
    check_ajax_referer( 'skynetlabs_nonce', 'nonce' );

    $whatsapp = get_option( 'skynet_whatsapp_number', '+1234567890' );
    $fiverr = get_option( 'skynet_fiverr_link', 'https://www.fiverr.com/your-profile' );

    wp_send_json_success( array(
        'whatsapp' => 'https://wa.me/' . preg_replace( '/[^0-9]/', '', $whatsapp ),
        'fiverr' => $fiverr,
    ) );
}

function skynet_chatgpt_message_handler() {
    check_ajax_referer( 'skynetlabs_nonce', 'nonce' );

    $user_message = isset( $_POST['message'] ) ? sanitize_text_field( $_POST['message'] ) : '';
    $conversation_history = isset( $_POST['history'] ) ? json_decode( stripslashes( $_POST['history'] ), true ) : array();

    if ( empty( $user_message ) ) {
        wp_send_json_error( array( 'message' => 'No message provided' ) );
    }

    $api_key = get_option( 'skynet_chatgpt_api_key', '' );

    if ( empty( $api_key ) ) {
        wp_send_json_success( array(
            'message' => "I'd love to help, but my AI brain needs to be connected first.\n\nIn the meantime, let me connect you with our team! They can answer all your questions.\n\n**Ready to chat?**",
            'show_contact' => true,
        ) );
        return;
    }

    $system_prompt = skynet_get_system_prompt();

    $messages = array( array( 'role' => 'system', 'content' => $system_prompt ) );

    if ( ! empty( $conversation_history ) ) {
        $recent_history = array_slice( $conversation_history, -10 );
        foreach ( $recent_history as $msg ) {
            $messages[] = array( 'role' => $msg['role'], 'content' => $msg['content'] );
        }
    }

    $messages[] = array( 'role' => 'user', 'content' => $user_message );

    $response = skynet_call_chatgpt_api( $api_key, $messages );

    if ( is_wp_error( $response ) ) {
        wp_send_json_error( array( 'message' => $response->get_error_message() ) );
    }

    $show_contact = skynet_should_show_contact( $response['message'], $user_message );

    wp_send_json_success( array(
        'message'      => $response['message'],
        'show_contact' => $show_contact,
    ) );
}

function skynet_get_system_prompt() {
    $whatsapp = get_option( 'skynet_whatsapp_number', '+1234567890' );
    $fiverr = get_option( 'skynet_fiverr_link', 'https://www.fiverr.com/your-profile' );
    $email = get_option( 'skynet_email', 'info@skynetjoe.com' );

    return "You are \"Skynet AI\", a professional AI assistant for Skynetlabs - an AI automation agency.

YOUR PERSONALITY: Professional, knowledgeable, helpful. Direct and concise. Expert in AI automation and business systems.

CONTACT INFORMATION:
- WhatsApp: {$whatsapp}
- Fiverr: {$fiverr}
- Email: {$email}

SERVICES: n8n Workflow Automation ($500+), Make.com Automation ($400+), Zapier Automation ($300+), GoHighLevel CRM ($800-$2000), AI Video Creation ($1000-$3000), AI Content Creation ($600-$1500), WordPress Development ($800-$5000), AI Chatbot Development ($1000-$3000), Business Consulting ($150/hr), 1-on-1 Training ($100/hr).

GUIDELINES: Listen carefully, provide specific info, be concise (under 4 sentences when possible), ask clarifying questions, after 2-3 exchanges offer to connect via Fiverr or WhatsApp.";
}

function skynet_call_chatgpt_api( $api_key, $messages ) {
    $response = wp_remote_post( 'https://api.openai.com/v1/chat/completions', array(
        'headers' => array(
            'Content-Type'  => 'application/json',
            'Authorization' => 'Bearer ' . $api_key,
        ),
        'body'    => json_encode( array(
            'model'             => 'gpt-4o-mini',
            'messages'          => $messages,
            'max_tokens'        => 500,
            'temperature'       => 0.8,
            'frequency_penalty' => 0.3,
            'presence_penalty'  => 0.3,
        ) ),
        'timeout'   => 30,
        'sslverify' => true,
    ) );

    if ( is_wp_error( $response ) ) {
        return new WP_Error( 'api_error', 'Failed to connect to ChatGPT API.' );
    }

    $code = wp_remote_retrieve_response_code( $response );
    $data = json_decode( wp_remote_retrieve_body( $response ), true );

    if ( $code !== 200 ) {
        $msg = isset( $data['error']['message'] ) ? $data['error']['message'] : 'Unknown error';
        return new WP_Error( 'api_error', 'ChatGPT API Error: ' . $msg );
    }

    if ( ! isset( $data['choices'][0]['message']['content'] ) ) {
        return new WP_Error( 'api_error', 'Invalid response from ChatGPT.' );
    }

    return array( 'message' => trim( $data['choices'][0]['message']['content'] ) );
}

function skynet_should_show_contact( $bot_message, $user_message ) {
    $triggers = array( 'whatsapp', 'fiverr', 'contact', 'book', 'hire', 'get started', 'price', 'cost', 'how much', 'ready to', 'interested' );
    $combined = strtolower( $bot_message . ' ' . $user_message );
    foreach ( $triggers as $trigger ) {
        if ( strpos( $combined, $trigger ) !== false ) {
            return true;
        }
    }
    return false;
}

// AI Settings page
add_action( 'admin_menu', 'skynet_ai_settings_menu' );

function skynet_ai_settings_menu() {
    add_theme_page( 'Skynet AI Settings', 'AI Chatbot Settings', 'manage_options', 'skynet-ai-settings', 'skynet_ai_settings_page' );
}

function skynet_ai_settings_page() {
    if ( isset( $_POST['skynet_ai_settings_submit'] ) ) {
        check_admin_referer( 'skynet_ai_settings' );
        update_option( 'skynet_chatgpt_api_key', sanitize_text_field( $_POST['api_key'] ) );
        update_option( 'skynet_whatsapp_number', sanitize_text_field( $_POST['whatsapp'] ) );
        update_option( 'skynet_fiverr_link', esc_url_raw( $_POST['fiverr'] ) );
        update_option( 'skynet_email', sanitize_email( $_POST['email'] ) );
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }

    $api_key = get_option( 'skynet_chatgpt_api_key', '' );
    $whatsapp = get_option( 'skynet_whatsapp_number', '+1234567890' );
    $fiverr = get_option( 'skynet_fiverr_link', 'https://www.fiverr.com/your-profile' );
    $email = get_option( 'skynet_email', 'info@skynetjoe.com' );
    ?>
    <div class="wrap">
        <h1>Skynet AI Chatbot Settings</h1>
        <form method="post">
            <?php wp_nonce_field( 'skynet_ai_settings' ); ?>
            <table class="form-table">
                <tr><th><label for="api_key">ChatGPT API Key</label></th><td><input type="text" id="api_key" name="api_key" value="<?php echo esc_attr( $api_key ); ?>" class="regular-text" placeholder="sk-proj-..."><p class="description">Get from <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a></p></td></tr>
                <tr><th><label for="whatsapp">WhatsApp Number</label></th><td><input type="text" id="whatsapp" name="whatsapp" value="<?php echo esc_attr( $whatsapp ); ?>" class="regular-text"></td></tr>
                <tr><th><label for="fiverr">Fiverr Profile</label></th><td><input type="url" id="fiverr" name="fiverr" value="<?php echo esc_attr( $fiverr ); ?>" class="regular-text"></td></tr>
                <tr><th><label for="email">Contact Email</label></th><td><input type="email" id="email" name="email" value="<?php echo esc_attr( $email ); ?>" class="regular-text"></td></tr>
            </table>
            <p class="submit"><input type="submit" name="skynet_ai_settings_submit" class="button button-primary" value="Save Settings"></p>
        </form>
    </div>
    <?php
}

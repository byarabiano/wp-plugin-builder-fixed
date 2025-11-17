<?php
/**
 * Plugin Name: WP Plugin Builder Studio
 * Plugin URI:  https://yourwebsite.com
 * Description: منصة لبناء إضافات ووردبريس من داخل لوحة التحكم (نواة أساسية: REST API + Project manager + Admin page).
 * Version:     0.1.0
 * Author:      byarabiano
 * Text Domain: wp-plugin-builder
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/* ثابتات المسارات */
define( 'WPB_PATH', plugin_dir_path( __FILE__ ) );
define( 'WPB_URL',  plugin_dir_url( __FILE__ ) );
define( 'WPB_VERSION', '0.1.0' );

/* تحميل المحمّل */
require_once WPB_PATH . 'includes/class-loader.php';

/* تفعيل المحمّل */
add_action( 'plugins_loaded', function() {
    if ( class_exists('WPB_Loader') ) {
        new WPB_Loader();
    }
});

/* Activation / Deactivation hooks */
register_activation_hook( __FILE__, 'wpb_activate' );
function wpb_activate() {
    // هنا يمكن وضع إعدادات أولية إن احتجنا
    // على سبيل المثال إنشاء خيار افتراضي
    if ( false === get_option('wpb_projects_list') ) {
        update_option('wpb_projects_list', []);
    }
}

register_deactivation_hook( __FILE__, 'wpb_deactivate' );
function wpb_deactivate() {
    // تنظيف إن رغبت لاحقًا
}


function wpb_render_admin_page() {
    echo '<div id="wp-pb-root"></div>';
}


add_action('admin_enqueue_scripts', function($hook) {
    if ($hook !== 'toplevel_page_wp-plugin-builder') return;

    $base = plugin_dir_url(__FILE__) . 'admin/build/';
    $js = $base . 'admin.js';
    $css = $base . 'admin.css';

    if ( file_exists( plugin_dir_path(__FILE__) . 'admin/build/admin.js' ) ) {
        wp_enqueue_script('wpb-admin-js', $js, array(), filemtime( plugin_dir_path(__FILE__) . 'admin/build/admin.js' ), true);
    }
    if ( file_exists( plugin_dir_path(__FILE__) . 'admin/build/admin.css' ) ) {
        wp_enqueue_style('wpb-admin-css', $css, array(), filemtime( plugin_dir_path(__FILE__) . 'admin/build/admin.css' ));
    }
});

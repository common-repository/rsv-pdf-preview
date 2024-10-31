<?php
/*
Plugin Name: RSV PDF Preview
Description: Show sample preview of any pdf without creating new short version of pdf document
Version: 1.0
Author: Ravi & Suma
*/
if (!defined('WPINC')) {
    die;
}
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );


add_action('wp_enqueue_scripts','rsv_pdf_preview_includejs');

function rsv_pdf_preview_includejs() {
    wp_enqueue_script('jquery');
    wp_enqueue_script( 'rsv_pdfpreviewjs', plugins_url( '/js/pdf.js', __FILE__ ));
    wp_enqueue_script( 'rsv_pdfcustomjs', plugins_url( '/js/main.js', __FILE__ ));
    wp_enqueue_style( 'rsv_pdfcustomcss', plugins_url( '/css/style.css', __FILE__ ) );
}

add_shortcode('rsv_pdf_preview', 'rsv_pdf_preview_func');
function rsv_pdf_preview_func($atts){
    $a=shortcode_atts(array(
        'url' => '',
        'pages'=> '2',
        'show-custom-page'=>'false',
        'custom-message-title'=>'Fill the form',
        'custom-message-content'=>'to get full version of document',
        'title'=>'Asset Preview'
    ), $atts);

return '<div class="assetPreviewContainer" title="'.$a['title'].'" custom-message-title="'.$a['custom-message-title'].'" custom-message-content="'.$a['custom-message-content'].'" url="'.$a['url'].'" pages="'.$a['pages'].'" show-custom-page="'.$a['show-custom-page'].'">
        <div class="assetPreviewHeader">
            <h3>'.$a['title'].' <span>Total Pages:&nbsp; <span class="pagesCount"></span></span></h3>
        </div>
        <div class="pdf-render"></div>
    </div>';
}
?>
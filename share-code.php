<?php
// Add custom code to wp_footer for specific template
function my_custom_footer_code() {
    // Check if the current page uses the "shareable-page.php" template
    if ( is_page_template( 'shareable-page.php' ) ) {
        ?>
        <div class="et_pb_section et_pb_section_share showclick et_pb_with_background et_section_regular et_pb_section--fixed" >
            <div class="et_pb_row et_pb_row_share et_pb_equal_columns">
                <div class="et_pb_column et_pb_column_4_4 et_pb_column_share  et_pb_css_mix_blend_mode_passthrough et-last-child">

                    <div class="et_pb_module et_pb_icon et_pb_icon_close_share closebutton">
                        <span class="et_pb_icon_wrap "><span class="et-pb-icon"></span></span>
                    </div>

                    <div class="et_pb_module et_pb_text et_pb_text_share  et_pb_text_align_center et_pb_bg_layout_light">
                        <div class="et_pb_text_inner">
                            <p>Compartir en:</p>
                        </div>
                    </div>

                    <div class="et_pb_button_module_wrapper et_pb_button_facebook_wrapper et_pb_button_alignment_center et_pb_module ">
                        <a class="et_pb_button et_pb_button_facebook et_pb_custom_button et_pb_bg_layout_light share-button" data-platform="facebook" href="#" target="_blank" data-icon="&#xe093;">Facebook</a>
                    </div>

                    <div class="et_pb_button_module_wrapper et_pb_button_linkedin_wrapper et_pb_button_alignment_center et_pb_module">
                        <a class="et_pb_button et_pb_button_linkedin et_pb_custom_button et_pb_bg_layout_light share-button" data-platform="linkedin" href="#" target="_blank" data-icon="&#xe09d;">LinkedIn</a>
                    </div>

                    <div class="et_pb_button_module_wrapper et_pb_button_twitter_wrapper et_pb_button_alignment_center et_pb_module">
                        <a class="et_pb_button et_pb_button_twitter et_pb_custom_button et_pb_bg_layout_light share-button" data-platform="twitter" href="#" target="_blank" data-icon="&#xe094;">Twitter</a>
                    </div>

                    <div class="et_pb_button_module_wrapper et_pb_button_whatsapp_wrapper et_pb_button_alignment_center et_pb_module">
                        <a class="et_pb_button et_pb_button_whatsapp et_pb_custom_button et_pb_bg_layout_light share-button" data-platform="whatsapp" href="#" target="_blank" data-icon="&#xf232;">WhatsApp</a>
                    </div>

                    <div class="et_pb_button_module_wrapper et_pb_button_telegram_wrapper et_pb_button_alignment_center et_pb_module">
                        <a class="et_pb_button et_pb_button_telegram et_pb_custom_button et_pb_bg_layout_light share-button" data-platform="telegram" href="#" target="_blank" data-icon="&#xf3fe;">Telegram</a>
                    </div>

                    <div class="et_pb_button_module_wrapper et_pb_button_email_wrapper et_pb_button_alignment_center et_pb_module">
                        <a class="et_pb_button et_pb_button_email et_pb_custom_button et_pb_bg_layout_light share-button" data-platform="email" href="#" target="_blank" data-icon="&#xe076;">Email</a>
                    </div>

                    <div class="et_pb_button_module_wrapper et_pb_button_copylink_wrapper et_pb_button_alignment_center et_pb_module">
                        <a class="et_pb_button et_pb_button_copylink et_pb_custom_button et_pb_bg_layout_light share-button" data-platform="copy" href="#" data-icon="&#xf0c5;">Copiar Link</a>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
add_action( 'wp_footer', 'my_custom_footer_code' );
<?php
if (!defined('ABSPATH'))
    exit;

@include_once NEWSLETTER_INCLUDES_DIR . '/controls.php';
$controls = new NewsletterControls();
$module = NewsletterSubscription::instance();
$defaults = $module->get_default_options();

if (!$controls->is_action()) {
    $controls->data = $module->get_options();
} else {
    if ($controls->is_action('save')) {
        $controls->data['unsubscription_text'] = NewsletterModule::clean_url_tags($controls->data['unsubscription_text']);
        $controls->data['unsubscribed_text'] = NewsletterModule::clean_url_tags($controls->data['unsubscribed_text']);
        $controls->data['unsubscribed_message'] = NewsletterModule::clean_url_tags($controls->data['unsubscribed_message']);

        if (empty($controls->data['unsubscription_text'])) {
            $controls->data['unsubscription_text'] = $defaults['unsubscription_text'];
        }
        if (empty($controls->data['unsubscribed_text'])) {
            $controls->data['unsubscribed_text'] = $defaults['unsubscribed_text'];
        }
        if (empty($controls->data['unsubscribed_message'])) {
            $controls->data['unsubscribed_message'] = $defaults['unsubscribed_message'];
        }
        if (empty($controls->data['unsubscribed_subject'])) {
            $controls->data['unsubscribed_subject'] = $defaults['unsubscribed_subject'];
        }
        if (empty($controls->data['unsubscription_error_text'])) {
            $controls->data['unsubscription_error_text'] = $defaults['unsubscription_error_text'];
        }

        $module->merge_options($controls->data);
        $controls->data = $module->get_options();
        $controls->add_message_saved();
    }

    if ($controls->is_action('reset')) {
        $controls->data['unsubscription_text'] = $defaults['unsubscription_text'];
        $controls->data['unsubscribed_text'] = $defaults['unsubscribed_text'];
        $controls->data['unsubscribed_subject'] = $defaults['unsubscribed_subject'];
        $controls->data['unsubscribed_message'] = $defaults['unsubscribed_message'];
        $controls->data['unsubscription_error_text'] = $defaults['unsubscription_error_text'];
        $module->merge_options($controls->data);
        $controls->data = $module->get_options();
    }
}
?>

<div class="wrap" id="tnp-wrap">

    <?php include NEWSLETTER_DIR . '/tnp-header.php'; ?>

    <div id="tnp-heading">

        <h2><?php _e('Cancellation', 'newsletter')?></h2>
        <?php $controls->panel_help('https://www.thenewsletterplugin.com/documentation/cancellation')?>

    </div>

    <div id="tnp-body"> 

        <form method="post" action="">
            <?php $controls->init(); ?>
             <p>
                <?php $controls->button_save() ?>
                <?php $controls->button_reset() ?>
            </p>
            <div id="tabs">
                <ul>
                    <li><a href="#tabs-cancellation"><?php _e('Cancellation', 'newsletter') ?></a></li>
                    <li><a href="#tabs-reactivation"><?php _e('Reactivation', 'newsletter') ?></a></li>

                </ul>
                <div id="tabs-cancellation">
                    <table class="form-table">
                        <tr>
                            <th><?php _e('Cancellation message', 'newsletter') ?></th>
                            <td>
                                <?php $controls->wp_editor('unsubscription_text', array('editor_height'=>250)); ?>
                                <p class="description">
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <th><?php _e('Goodbye message', 'newsletter') ?></th>
                            <td>
                                <?php $controls->wp_editor('unsubscribed_text', array('editor_height'=>250)); ?>
                                <p class="description">
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <th><?php _e('Goodbye email', 'newsletter') ?></th>
                            <td>
                                <?php $controls->email('unsubscribed', 'wordpress', true, array('editor_height'=>250)); ?>
                                <p class="description">

                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th>Unsubscription error</th>
                            <td>
                                <?php $controls->wp_editor('unsubscription_error_text', array('editor_height'=>250)); ?>
                                <p class="description">
                                   
                                </p>
                            </td>
                        </tr>                       
                    </table>
                </div>
                
                <div id="tabs-reactivation">
                    <table class="form-table">
                        <tr>
                            <th><?php _e('Reactivated message', 'newsletter') ?></th>
                            <td>
                                <?php $controls->wp_editor('reactivated_text', array('editor_height'=>250)); ?>
                                <p class="description">
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <p>
                <?php $controls->button_save() ?>
                <?php $controls->button_reset() ?>
            </p>
        </form>
    </div>

    <?php include NEWSLETTER_DIR . '/tnp-footer.php'; ?>

</div>
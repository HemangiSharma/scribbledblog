<!--Info TOS Twitter 032018 - none multiple Accounts same content-->
<?php $b2sNetworkTosAccept = get_option('B2S_PLUGIN_NETWORK_TOS_ACCEPT_032018_USER_' . B2S_PLUGIN_BLOG_USER_ID); ?>
<input type="hidden" id="b2sNetworkTosAccept" value="<?php echo (($b2sNetworkTosAccept !== false || $showPrivacyPolicy !== false) ? 1 : 0); ?>">
<div class="modal fade" id="b2sNetworkTosAcceptModal" tabindex="-1" role="dialog" aria-labelledby="b2sNetworkTosAcceptModal" aria-hidden="true" data-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4><?php _e('Twitter terms of service update February 2018', 'blog2social'); ?></h4>
            </div>
            <?php _e('', 'blog2social'); ?>
            <div class="modal-body">
                <?php _e(' In February 2018 Twitter changed their terms of service (TOS) in order to prevent malicious activity and spam. Users are no longer allowed to post identical or substantially similar content to multiple accounts. Accordingly, social media tools are no longer permitted to enable users to send the same message to multiple Twitter accounts.', 'blog2social'); ?>
                <a href="<?php echo B2S_Tools::getSupportLink('network_tos_faq_news_032018'); ?>" target="_blank"><?php _e('More Information about these changes', 'blog2social'); ?></a>
                <br>
                <br>
                <strong><?php _e('What does this mean for your work with Blog2Social?', 'blog2social'); ?></strong>
                <br>
                <?php _e('Other social media tools simply no longer allow users to select multiple Twitter accounts. However, Blog2Social was originally built with individualization as the key feature in mind. So Blog2Social still lets you post to multiple Twitter accounts in accordance with the new Twitter rules. By adding individual comments, hashtags, selecting individual images, post formats and even changing meta tags, you can fully customize your Tweets for each Twitter account individually.', 'blog2social'); ?>
                <br>
                <?php _e('If you have scheduled identical or similar Twitter posts for multiple accounts, please make sure to either edit or delete them, according to Twitter’s rules. To do this, go to Blog2Social -> Posts  Sharing -> Calendar. By clicking the Twitter Icon on top of the page, you can filter all your posts so you only see your scheduled posts for Twitter. Clicking on a post will open a menu that lets you edit or delete the scheduled Tweet.', 'blog2social'); ?>   
                <br>
                <?php _e('Blog2Social also provides you with individual comment fields for each of your Tweets. This allows you to share your posts on all your Twitter accounts with individually tailored comments.', 'blog2social'); ?>
                <br>
                <br>
                <strong><?php _e('Please note that violating these rules can result in Twitter suspending your account. ', 'blog2social'); ?></strong>
                <br>
                <br>
                <div class="clearfix"></div>
                <div class="text-center">
                    <button type="button" id="b2s-network-tos-accept-btn" class="btn btn-primary"><?php _e("I understand and I will follow the Twitter TOS rules", "blog2social"); ?></button>
                </div>
            </div>
        </div>
    </div>
</div>
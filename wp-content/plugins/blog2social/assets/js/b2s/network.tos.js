jQuery.noConflict();
jQuery(window).on("load", function () {
    //TOS Twitter 032018
    var networkTos = jQuery('#b2sNetworkTosAccept').val()
    if (typeof networkTos !== typeof undefined && networkTos !== false) {
        if (networkTos == 0) {
            jQuery('#b2sNetworkTosAcceptModal').modal('show');
        }
    }
});

jQuery(document).on('click', '#b2s-network-tos-accept-btn', function () {
    jQuery.ajax({
        url: ajaxurl,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            'action': 'b2s_network_tos_accept',
        },
        success: function (data) {
            jQuery('#b2sNetworkTosAcceptModal').modal('hide');
        }
    });
    return false;
});
jQuery(document).on('heartbeat-send', function (e, data) {
    data['b2s_heartbeat'] = 'b2s_listener';
    data['b2s_heartbeat_action'] = 'b2s_auto_posting';
});

jQuery(window).on("load", function () {
    jQuery('#b2s-post-box-calendar-header').addClass('closed');
    jQuery('#b2s-post-box-calendar-header').hide();
    if (typeof wp.heartbeat == "undefined") {
        jQuery('#b2s-heartbeat-fail').show();
        jQuery('.b2s-loading-area').hide();
    } else {
        if (!b2sIsValidUrl(jQuery('#b2s-home-url').val())) {
            jQuery('#b2s-url-valid-warning').show();
        } else {
            jQuery('#b2s-url-valid-warning').hide();
        }
    }
    //TOS Twitter 032018
    jQuery('#b2s-network-tos-warning').show();

    if (jQuery('#b2s-post-meta-box-time-dropdown-publish').is(':checked')) {
        jQuery('#b2s-post-box-calendar-header').show();
        if (jQuery('#b2s-post-meta-box-version').val() == "0" && jQuery(this).val() == "publish") {
            jQuery('#b2s-post-meta-box-time-dropdown-publish').prop('checked', false);
        } else {
            if (jQuery('#b2s-post-meta-box-profil-dropdown').length == 0) {
                jQuery('.b2s-loading-area').show();
                jQuery.ajax({
                    url: ajaxurl,
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: {
                        'action': 'b2s_post_meta_box'
                    },
                    error: function () {
                        jQuery('.b2s-loading-area').hide();
                        jQuery('#b2s-server-connection-fail').show();
                        return false;
                    },
                    success: function (data) {
                        jQuery('.b2s-loading-area').hide();
                        if (data.result == true) {
                            if (data.content != '') {
                                jQuery('.b2s-loading-area').after(data.content);
                                var today = new Date();
                                if (today.getMinutes() >= 30) {
                                    today.setHours(today.getHours() + 1);
                                    today.setMinutes(0);
                                } else {
                                    today.setMinutes(30);
                                }
                                var setTodayDate = today.getFullYear() + '-' + (padDate(today.getMonth() + 1)) + '-' + padDate(today.getDate()) + ' ' + formatAMPM(today);
                                if (jQuery('#b2sUserLang').val() == 'de') {
                                    setTodayDate = padDate(today.getDate()) + '.' + (padDate(today.getMonth() + 1)) + '.' + today.getFullYear() + ' ' + padDate(today.getHours()) + ':' + padDate(today.getMinutes());
                                }
                                jQuery('#b2s-post-meta-box-sched-date-picker').val(setTodayDate);
                                jQuery('#b2s-post-meta-box-sched-date-picker').b2sdatepicker({'autoClose': true, 'toggleSelected': false, 'minutesStep': 15, 'minDate': today, 'startDate': today, 'todayButton': today});
                                jQuery('#b2s-post-meta-box-profil-dropdown [value="' + jQuery('#b2s-user-last-selected-profile-id').val() + '"]').prop('selected', true).trigger('change');

                            } else {
                                jQuery('#b2s-server-connection-fail').show();
                            }
                            wp.heartbeat.connectNow();
                        } else {
                            jQuery('#b2s-server-connection-fail').show();
                        }
                    }
                });
            }
        }
    }
});


jQuery(document).on('click', '.handlediv', function () {
    var id = jQuery(this).parent().attr('id');
    if (id == 'b2s-post-box-calendar-header') {
        if (!jQuery('#' + id).hasClass('closed')) {
            if (jQuery('.b2s-post-box-calendar-content').is(':empty')) {
                jQuery('#b2s-post-box-calendar-btn').trigger('click');
            }
        }
    }
    return true;
});


jQuery(document).on('click', '#b2s-meta-box-btn-customize', function () {
    var postStatus = jQuery('#b2s-post-status').val();
    if (postStatus != 'publish' && postStatus != 'future') {
        jQuery('#b2s-post-meta-box-state-no-publish-future-customize').show();
    } else {
        jQuery('#b2s-post-meta-box-state-no-publish-future-customize').hide();
        window.location.href = jQuery('#b2s-redirect-url-customize').val();
    }
});

jQuery(document).on('click', '#b2s-post-box-calendar-btn', function () {
    jQuery('#b2s-post-box-calendar-header').show();
    jQuery('#b2s-post-box-calendar-header').removeClass('closed');

    if (jQuery('.b2s-post-box-calendar-content').is(':empty')) {
        //Load First
        jQuery('.b2s-post-box-calendar-content').fullCalendar({
            editable: false,
            locale: jQuery('#b2sUserLang').val(),
            eventLimit: 2,
            contentHeight: 530,
            timeFormat: 'H:mm',
            eventSources: ajaxurl + '?action=b2s_get_calendar_events&filter_network_auth=all&filter_network=all',
            eventRender: function (event, element) {
                show = true;
                $header = jQuery("<div>").addClass("b2s-calendar-header");
                $isRelayPost = '';
                if (event.relay_primary_post_id > 0) {
                    $isRelayPost = ' (Retweet)';
                }
                $network_name = jQuery("<span>").text(event.author + $isRelayPost).addClass("network-name").css("display", "block");
                element.find(".fc-time").after($network_name);
                element.html(element.html());
                $parent = element.parent();
                $header.append(element.find(".fc-content"));
                element.append($header);
                $body = jQuery("<div>").addClass("b2s-calendar-body");
                $body.append(event.avatar);
                $body.append(element.find(".fc-title"));
                $body.append(jQuery("<br>"));
                var $em = jQuery("<em>").css("padding-top", "5px").css("display", "block");
                $em.append("<img src='" + jQuery('#b2sPluginUrl').val() + "assets/images/portale/" + event.network_id + "_flat.png' style='height: 16px;width: 16px;display: inline-block;padding-right: 2px;padding-left: 2px;' />")
                $em.append(event.network_name);
                $em.append(jQuery("<span>").text(": " + event.profile));
                $body.append($em);
                element.append($body);
            },
        });
    }

    var target = jQuery(this.hash);
    target = target.length ? target : jQuery('[name=' + this.hash.substr(1) + ']');
    if (target.length) {
        jQuery('html,body').animate({
            scrollTop: target.offset().top - 100
        }, 1000);
    }

    return false;


});




jQuery(document).on('click', '#b2s-post-meta-box-time-dropdown-publish', function () {
    jQuery('#b2s-post-box-calendar-header').show();
    if (jQuery('#b2s-post-meta-box-version').val() == "0" && jQuery(this).val() == "publish") {
        jQuery('#b2s-post-meta-box-time-dropdown-publish').prop('checked', false);
        jQuery('#b2s-post-meta-box-note-trial').show();
    } else {
        jQuery('#b2s-post-meta-box-note-trial').hide();
        if (jQuery('#b2s-post-meta-box-profil-dropdown').length == 0) {
            jQuery('.b2s-loading-area').show();
            jQuery.ajax({
                url: ajaxurl,
                type: "POST",
                dataType: "json",
                cache: false,
                data: {
                    'action': 'b2s_post_meta_box'
                },
                error: function () {
                    jQuery('.b2s-loading-area').hide();
                    jQuery('#b2s-server-connection-fail').show();
                    return false;
                },
                success: function (data) {
                    jQuery('.b2s-loading-area').hide();
                    if (data.result == true) {
                        if (data.content != '') {
                            jQuery('.b2s-loading-area').after(data.content);
                            var today = new Date();
                            if (today.getMinutes() >= 30) {
                                today.setHours(today.getHours() + 1);
                                today.setMinutes(0);
                            } else {
                                today.setMinutes(30);
                            }
                            var setTodayDate = today.getFullYear() + '-' + (padDate(today.getMonth() + 1)) + '-' + padDate(today.getDate()) + ' ' + formatAMPM(today);
                            if (jQuery('#b2sUserLang').val() == 'de') {
                                setTodayDate = padDate(today.getDate()) + '.' + (padDate(today.getMonth() + 1)) + '.' + today.getFullYear() + ' ' + padDate(today.getHours()) + ':' + padDate(today.getMinutes());
                            }
                            jQuery('#b2s-post-meta-box-sched-date-picker').val(setTodayDate);
                            jQuery('#b2s-post-meta-box-sched-date-picker').b2sdatepicker({'autoClose': true, 'toggleSelected': false, 'minutesStep': 15, 'minDate': today, 'startDate': today, 'todayButton': today});
                            jQuery('#b2s-post-meta-box-profil-dropdown [value="' + jQuery('#b2s-user-last-selected-profile-id').val() + '"]').prop('selected', true).trigger('change');

                        } else {
                            jQuery('#b2s-server-connection-fail').show();
                        }
                        wp.heartbeat.connectNow();
                    } else {
                        jQuery('#b2s-server-connection-fail').show();
                    }
                }
            });
        }
    }
});

jQuery(document).on('change', '.b2s-post-meta-box-sched-select', function () {
    if (jQuery(this).val() == '1') {
        if (jQuery('#b2s-post-meta-box-version').val() > 1) {
            jQuery('.b2s-post-meta-box-sched-once').show();
        } else {
            jQuery(this).val('0');
            jQuery('#b2s-post-meta-box-note-premium').show();
        }
    } else {
        jQuery('.b2s-post-meta-box-sched-once').hide();
    }
});


jQuery(document).on('click', '#publish', function () {
    //Check is Auto-Post-Import active
    if (jQuery('#b2sAutoPostImportIsActive').length > 0) {
        if (jQuery('#b2sAutoPostImportIsActive').val() == "1") {
            jQuery.ajax({
                url: ajaxurl,
                type: "POST",
                dataType: "json",
                cache: false,
                data: {
                    'action': 'b2s_lock_auto_post_import',
                    'userId': jQuery('#b2sBlogUserId').val()
                },
                success: function (data) {

                }
            });
        }
    }
});
jQuery(document).on('click', '.b2s-btn-close-meta-box', function () {
    jQuery('#' + jQuery(this).attr('data-area-id')).hide();
    return false;
});

jQuery(document).on('click', '.b2s-info-btn', function () {
    jQuery('html, body').animate({scrollTop: jQuery("body").offset().top}, 1);
    jQuery('#' + jQuery(this).attr('data-modal-target')).show();
});
jQuery(document).on('click', '.b2s-meta-box-modal-btn-close', function () {
    jQuery('#' + jQuery(this).attr('data-modal-target')).hide();
});

jQuery(document).on('change', '#b2s-post-meta-box-profil-dropdown', function () {
    var tos = false;
    if (jQuery('#b2s-post-meta-box-profil-data-' + jQuery(this).val()).val() == "") {
        jQuery('#b2s-post-meta-box-state-no-auth').show();
        tos = true;
    } else {
        jQuery('#b2s-post-meta-box-state-no-auth').hide();
        //TOS Twitter Check
        var len = jQuery('#b2s-post-meta-box-profil-dropdown-twitter').children('option[data-mandant-id="' + jQuery(this).val() + '"]').length;
        if (len >= 1) {
            jQuery('.b2s-meta-box-auto-post-twitter-profile').show();
            jQuery('#b2s-post-meta-box-profil-dropdown-twitter').prop('disabled', false);
            jQuery('#b2s-post-meta-box-profil-dropdown-twitter').show();
            jQuery('#b2s-post-meta-box-profil-dropdown-twitter option').attr("disabled", "disabled");
            jQuery('#b2s-post-meta-box-profil-dropdown-twitter option[data-mandant-id="' + jQuery(this).val() + '"]').attr("disabled", false);
            jQuery('#b2s-post-meta-box-profil-dropdown-twitter option[data-mandant-id="' + jQuery(this).val() + '"]:first').attr("selected", "selected");
        } else {
            tos = true;
        }

    }
    //TOS Twitter 032018
    if (tos) {
        jQuery('.b2s-meta-box-auto-post-twitter-profile').hide();
        jQuery('#b2s-post-meta-box-profil-dropdown-twitter').prop('disabled', 'disabled');
        jQuery('#b2s-post-meta-box-profil-dropdown-twitter').hide();
    }


});

function b2sIsValidUrl(str) {
    var pattern = new RegExp(/^(https?:\/\/)?[a-zA-Z0-99ÄÖÜöäü-]+([\-\.]{1}[a-zA-Z0-99ÄÖÜöäü-]+)*\.[a-zA-Z0-9-]{2,20}(:[0-9]{1,5})?(\/.*)?$/);
    if (!pattern.test(str)) {
        return false;
    }
    return true;
}

function padDate(n) {
    return ("0" + n).slice(-2);
}


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}






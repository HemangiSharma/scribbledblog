jQuery.noConflict();

jQuery(document).on('heartbeat-send', function (e, data) {
    data['b2s_heartbeat'] = 'b2s_listener';
});

jQuery.xhrPool = [];

jQuery(window).on("load", function () {
    init(true);
    imageSize();
    if (jQuery('.toggelbutton').is(':visible') && !jQuery("#b2s-wrapper").hasClass("toggled")) {
        jQuery('.btn-toggle-menu').trigger('click');
    }
});

jQuery(document).on('click', '.btn-toggle-menu', function () {
    if (jQuery('.toggelbutton').is(':visible')) {
        jQuery("#b2s-wrapper").toggleClass("toggled");
        if (jQuery("#b2s-wrapper").hasClass("toggled")) {
            jQuery(".sidebar-brand").hide();
            jQuery(".btn-toggle-glyphicon").removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
        } else {
            jQuery(".sidebar-brand").show();
            jQuery(".btn-toggle-glyphicon").removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right');
        }
    }
});

jQuery.sceditor.plugins.xhtml.allowedTags = ['h1', 'h2', 'p', 'br', 'i', 'b', 'a', 'img'];
jQuery.sceditor.command.set(
        "h1", {
            exec: function () {
                if (this.currentBlockNode() == undefined || this.currentBlockNode().nodeName != 'H1') {
                    this.wysiwygEditorInsertHtml('<h1>', '</h1>');
                } else {
                    jQuery(this.currentBlockNode()).replaceWith(this.currentBlockNode().innerText);
                }
            },
            txtExec: ["<h1>", "</h1>"],
            tooltip: "H1"
        });
jQuery.sceditor.command.set(
        "h2", {
            exec: function () {
                if (this.currentBlockNode() == undefined || this.currentBlockNode().nodeName != 'H2') {
                    this.wysiwygEditorInsertHtml('<h2>', '</h2>');
                } else {
                    jQuery(this.currentBlockNode()).replaceWith(this.currentBlockNode().innerText);
                }
            },
            txtExec: ["<h2>", "</h2>"], tooltip: "H2"});

jQuery.sceditor.command.set(
        "custom-image", {
            exec: function () {
                var me = this;
                if (typeof (b2s_is_calendar) != "undefined" && b2s_is_calendar)
                {
                    jQuery('.b2s-network-select-image-content').html("");
                    jQuery.ajax({
                        url: ajaxurl,
                        type: "POST",
                        cache: false,
                        async: false,
                        data: {
                            'action': 'b2s_get_image_modal',
                            'id': b2s_current_post_id,
                            'image_url': ''
                        },
                        success: function (data) {
                            jQuery(".b2s-network-select-image-content").html(data);
                        }
                    });
                }
                var networkAuthId = jQuery(this.getContentAreaContainer()).parents('.b2s-post-item-details').find('.b2s-post-item-details-network-display-name').attr('data-network-auth-id');
                jQuery('.b2s-image-change-this-network').attr('data-network-auth-id', networkAuthId);
                jQuery('.b2s-upload-image').attr('data-network-auth-id', networkAuthId);
                var content = "<img class='b2s-post-item-network-image-selected-account' height='22px' src='" + jQuery('.b2s-post-item-network-image[data-network-auth-id="' + networkAuthId + '"]').attr('src') + "' /> " + jQuery('.b2s-post-item-details-network-display-name[data-network-auth-id="' + networkAuthId + '"]').html();
                jQuery('.b2s-selected-network-for-image-info').html(content);
                jQuery('#b2s-network-select-image').modal('show');
                jQuery('#b2sInsertImageType').val("1");
                imageSize();

            },
            txtExec: function () {
                var networkAuthId = jQuery(this.getContentAreaContainer()).parents('.b2s-post-item-details').find('.b2s-post-item-details-network-display-name').attr('data-network-auth-id');
                jQuery('.b2s-image-change-this-network').attr('data-network-auth-id', networkAuthId);
                jQuery('.b2s-upload-image').attr('data-network-auth-id', networkAuthId);
                var content = "<img class='b2s-post-item-network-image-selected-account' height='22px' src='" + jQuery('.b2s-post-item-network-image[data-network-auth-id="' + networkAuthId + '"]').attr('src') + "' /> " + jQuery('.b2s-post-item-details-network-display-name[data-network-auth-id="' + networkAuthId + '"]').html();
                jQuery('.b2s-selected-network-for-image-info').html(content);
                jQuery('#b2s-network-select-image').modal('show');
                jQuery('#b2sInsertImageType').val("1");
                imageSize();
            }, tooltip: "Image"});


jQuery(document).on('click', '.b2s-toogle-calendar-btn', function () {

    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var networkId = jQuery(this).attr('data-network-id');
    var toogleBtnText = jQuery(this).attr('data-toogle-text-btn');
    var currentBtnText = jQuery(this).text();

    jQuery(this).text(toogleBtnText);
    jQuery(this).attr('data-toogle-text-btn', currentBtnText);

    //change to show
    var calendar = jQuery('.b2s-post-item-calendar-area[data-network-auth-id="' + networkAuthId + '"]');
    if (calendar.hasClass('hide')) {
        calendar.removeClass('hide');
        calendar.addClass('show');
        jQuery('.b2s-calendar-filter-area[data-network-auth-id="' + networkAuthId + '"]').removeClass('hide');

        if (calendar.is(':empty')) {
            b2s_cur_source_ship_calendar[0] = ajaxurl + '?action=b2s_get_calendar_events&filter_network_auth=all&filter_network=' + networkId;

            jQuery('.b2s-post-item-calendar-area[data-network-auth-id="' + networkAuthId + '"]').fullCalendar({
                editable: false,
                locale: b2s_calendar_locale,
                eventLimit: 2,
                contentHeight: 530,
                timeFormat: 'H:mm',
                eventSources: [b2s_cur_source_ship_calendar[0]],
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
                    $em.append("<img src='" + b2s_plugin_url + "assets/images/portale/" + event.network_id + "_flat.png' style='height: 16px;width: 16px;display: inline-block;padding-right: 2px;padding-left: 2px;' />")
                    $em.append(event.network_name);
                    $em.append(jQuery("<span>").text(": " + event.profile));
                    $body.append($em);
                    element.append($body);
                },
                dayRender: function (date, element) {
                    if (!jQuery(element[0]).hasClass('fc-past')) {
                        var date = jQuery(element[0]).attr('data-date');
                        var sel_element = jQuery(element[0]).closest('div').next('div').find('td[data-date="' + date + '"]');
                        $header = jQuery("<a>").html("+ <span class=\"hidden-sm hidden-xs\">" + jQuery("#b2sJSTextAddSchedule").val() + "</span>").addClass("b2s-calendar-add-schedule-btn").attr('href', '#').attr('data-network-auth-id', networkAuthId);
                        sel_element.append($header);
                    }
                }
            });
        } else {
            jQuery('.b2s-post-item-calendar-area[data-network-auth-id="' + networkAuthId + '"]').fullCalendar('refetchEvents');
        }

    } else {
        calendar.removeClass('show');
        calendar.addClass('hide');
        jQuery('.b2s-calendar-filter-area[data-network-auth-id="' + networkAuthId + '"]').addClass('hide');

    }

    return false;

});

jQuery(document).on('click', '.b2s-calendar-add-schedule-btn', function () {
    var selSchedDate = jQuery(this).parent('td').attr('data-date');
    var networkAuthId = jQuery(this).attr('data-network-auth-id');

    if (jQuery('#user_version').val() == 0) {
        jQuery('.b2s-post-item-details-release-input-date-select-reset[data-network-auth-id="' + networkAuthId + '"]').val('0');
        jQuery('#b2s-sched-post-modal').modal('show');
        return false;
    }

    if (jQuery('#b2sUserLang').val() == 'de') {
        selSchedDate = selSchedDate.substring(8, 10) + '.' + selSchedDate.substring(5, 7) + '.' + selSchedDate.substring(0, 4);
    }

    //isfirst
    if (!jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + networkAuthId + '"] option[value="1"]:selected').length > 0) {
        jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + networkAuthId + '"]').val('1').trigger("change");
        jQuery('.b2s-post-item-details-release-input-date[data-network-count="0"][data-network-auth-id="' + networkAuthId + '"]').val(selSchedDate);
    } else {
        //add
        var curSel = jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + networkAuthId + '"]').filter(':visible');
        if (curSel.length > 0) {
            curSel.trigger('click');
            netCountNext = parseInt(curSel.attr('data-network-count')) + 1;
            jQuery('.b2s-post-item-details-release-input-date[data-network-count="' + netCountNext + '"][data-network-auth-id="' + networkAuthId + '"]').val(selSchedDate);
        } else {
            //do not adding write to first
            jQuery('.b2s-post-item-details-release-input-date[data-network-count="0"][data-network-auth-id="' + networkAuthId + '"]').val(selSchedDate);
        }
    }
    return false;
});

jQuery(document).on('change', '.b2s-calendar-filter-network-sel', function () {
    var newSource = ajaxurl + '?action=b2s_get_calendar_events&filter_network_auth=all&filter_network=' + jQuery(this).val();
    var oldSource = ajaxurl + '?action=b2s_get_calendar_events&filter_network_auth=all&filter_network=' + jQuery(this).attr('data-last-sel');
    jQuery(this).attr('data-last-sel', jQuery(this).val());
    jQuery('.b2s-post-item-calendar-area[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').fullCalendar('removeEventSource', oldSource);
    jQuery('.b2s-post-item-calendar-area[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').fullCalendar('addEventSource', newSource);
    return false;
});


jQuery(document).on('click', '.b2s-get-settings-sched-time-default', function () {
    jQuery('.b2s-server-connection-fail').hide();
    jQuery.ajax({
        url: ajaxurl,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            'action': 'b2s_get_settings_sched_time_default',
        },
        error: function () {
            jQuery('.b2s-server-connection-fail').show();
            return false;
        },
        success: function (data) {
            if (data.result == true) {
                var tomorrow = new Date();
                if (jQuery('#b2sBlogPostSchedDate').length > 0) {
                    tomorrow.setTime(jQuery('#b2sBlogPostSchedDate').val());
                }
                tomorrow.setDate(tomorrow.getDate() + 1);
                var tomorrowMonth = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
                var tomorrowDate = ("0" + tomorrow.getDate()).slice(-2);
                var dateTomorrow = tomorrow.getFullYear() + "-" + tomorrowMonth + "-" + tomorrowDate;
                var today = new Date();
                if (jQuery('#b2sBlogPostSchedDate').length > 0) {
                    today.setTime(jQuery('#b2sBlogPostSchedDate').val());
                }

                var todayMonth = ("0" + (today.getMonth() + 1)).slice(-2);
                var todayDate = ("0" + today.getDate()).slice(-2);
                var dateToday = today.getFullYear() + "-" + todayMonth + "-" + todayDate;
                var lang = jQuery('#b2sUserLang').val();
                if (lang == "de") {
                    dateTomorrow = tomorrowDate + "." + tomorrowMonth + "." + tomorrow.getFullYear();
                    dateToday = todayDate + "." + todayMonth + "." + today.getFullYear();
                }

                jQuery.each(data.times, function (network_id, time) {
                    if (jQuery('.b2s-post-item[data-network-id="' + network_id + '"]').is(":visible")) {
                        time.forEach(function (network_type_time, count) {
                            if (network_type_time != "") {
                                jQuery('.b2s-post-item-details-release-input-date-select[data-network-id="' + network_id + '"][data-network-type="' + count + '"]').each(function () {
                                    if (jQuery(this).is(':not(:disabled)')) {
                                        var networkAuthId = jQuery(this).attr('data-network-auth-id');
                                        jQuery('.b2s-post-item-details-release-input-date-select[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"]').val('1').trigger("change");
                                        jQuery('.b2s-post-item-details-release-input-time[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"][data-network-count="0"]').val(network_type_time);
                                        var hours = network_type_time.substring(0, 2);
                                        if (lang == "de") {
                                            var timeparts = network_type_time.split(' ');
                                            if (timeparts[1] == 'AM') {
                                                hours = (timeparts[1] == 'AM') ? hours : (parseInt(hours) + 12);
                                            }
                                        }
                                        if (hours < today.getHours()) {
                                            jQuery('.b2s-post-item-details-release-input-date[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"][data-network-count="0"]').val(dateTomorrow);
                                        } else {
                                            jQuery('.b2s-post-item-details-release-input-date[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"][data-network-count="0"]').val(dateToday);
                                        }
                                    }
                                });
                                count++;
                            }
                        });
                    }
                });
            }
        }
    });
    return false;
});
jQuery(document).on('click', '.b2s-sidbar-network-auth-btn', function () {
    jQuery('#b2s-network-list-modal').modal('show');
    return false;
});
jQuery(document).on('click', '.change-meta-tag', function () {
    var attr = jQuery(this).attr('readonly');
    if (typeof attr !== typeof undefined && attr !== false) {
        jQuery('.meta-text').hide();
        var networkAuthId = jQuery(this).attr("data-network-auth-id");
        var postFormat = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').val();
        var networkId = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').attr("data-network-id");
        var isMetaChecked = false;
        if (networkId == "1" && jQuery('#isOgMetaChecked').val() == "1") {
            isMetaChecked = true;
        }
        if (networkId == "2" && jQuery('#isCardMetaChecked').val() == "1") {
            isMetaChecked = true;
        }

        var showDefault = true;
        if (postFormat == "0" && !isMetaChecked) { //isLinkPost
            showDefault = false;
            if (networkId == "1") {
                jQuery('.isOgMetaChecked').show();
            } else {
                jQuery('.isCardMetaChecked').show();
            }

        }
        if (showDefault) {
            jQuery('.isLinkPost').show();
        }


        jQuery('#b2s-info-change-meta-tag-modal').modal('show');
    }
    return false;
});
// Linkpost change Meta Tags title + desc
jQuery(document).on('keyup', '.change-meta-tag', function () {
    var currentText = jQuery(this).val();
    var metaTag = jQuery(this).attr('data-meta');
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var postFormat = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').val();
    var networkId = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').attr('data-network-id');
    if (typeof postFormat !== typeof undefined && postFormat !== false) {
        if (postFormat == "0") {  //if linkpost
            jQuery('.b2s-post-item-details-post-format[data-network-id=' + networkId + ']').each(function () {
                if (jQuery(this).val() == "0" && jQuery('.b2s-post-ship-item-post-format[data-network-auth-id=' + jQuery(this).attr('data-network-auth-id') + ']').is(":visible") && jQuery(this).attr('data-network-auth-id') != networkAuthId) { //other Linkpost by same network
                    //override this content with current content by keyup
                    jQuery('.' + metaTag + '[data-network-auth-id=' + jQuery(this).attr('data-network-auth-id') + ']').val(currentText);
                }
            });
        }
    }
    return false;
});
jQuery(document).on('click', '.b2s-get-settings-sched-time-user', function () {
    jQuery('.b2s-server-connection-fail').hide();
    jQuery.ajax({
        url: ajaxurl,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            'action': 'b2s_get_settings_sched_time_user',
        },
        error: function () {
            jQuery('.b2s-server-connection-fail').show();
            return false;
        },
        success: function (data) {
            if (data.result == true) {
                var tomorrow = new Date();
                if (jQuery('#b2sBlogPostSchedDate').length > 0) {
                    tomorrow.setTime(jQuery('#b2sBlogPostSchedDate').val());
                }

                tomorrow.setDate(tomorrow.getDate() + 1);
                var tomorrowMonth = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
                var tomorrowDate = ("0" + tomorrow.getDate()).slice(-2);
                var dateTomorrow = tomorrow.getFullYear() + "-" + tomorrowMonth + "-" + tomorrowDate;
                var today = new Date();
                if (jQuery('#b2sBlogPostSchedDate').length > 0) {
                    today.setTime(jQuery('#b2sBlogPostSchedDate').val());
                }

                var todayMonth = ("0" + (today.getMonth() + 1)).slice(-2);
                var todayDate = ("0" + today.getDate()).slice(-2);
                var dateToday = today.getFullYear() + "-" + todayMonth + "-" + todayDate;
                var lang = jQuery('#b2sUserLang').val();
                if (lang == "de") {
                    dateTomorrow = tomorrowDate + "." + tomorrowMonth + "." + tomorrow.getFullYear();
                    dateToday = todayDate + "." + todayMonth + "." + today.getFullYear();
                }

                jQuery.each(data.times, function (network_id, time) {
                    if (jQuery('.b2s-post-item[data-network-id="' + network_id + '"]').is(":visible")) {
                        time.forEach(function (network_type_time, count) {
                            if (network_type_time != "") {
                                jQuery('.b2s-post-item-details-release-input-date-select[data-network-id="' + network_id + '"][data-network-type="' + count + '"]').each(function () {
                                    if (jQuery(this).is(':not(:disabled)')) {
                                        var networkAuthId = jQuery(this).attr('data-network-auth-id');
                                        jQuery('.b2s-post-item-details-release-input-date-select[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"]').val('1').trigger("change");
                                        jQuery('.b2s-post-item-details-release-input-time[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"][data-network-count="0"]').val(network_type_time);
                                        var hours = network_type_time.substring(0, 2);
                                        if (lang == "de") {
                                            var timeparts = network_type_time.split(' ');
                                            if (timeparts[1] == 'AM') {
                                                hours = (timeparts[1] == 'AM') ? hours : (parseInt(hours) + 12);
                                            }
                                        }
                                        if (hours < today.getHours()) {
                                            jQuery('.b2s-post-item-details-release-input-date[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"][data-network-count="0"]').val(dateTomorrow);
                                        } else {
                                            jQuery('.b2s-post-item-details-release-input-date[data-network-id="' + network_id + '"][data-network-auth-id="' + networkAuthId + '"][data-network-type="' + count + '"][data-network-count="0"]').val(dateToday);
                                        }
                                    }
                                });
                                count++;
                            }
                        });
                    }
                });
            } else {
                jQuery('#b2s-network-no-sched-time-user').modal('show');
            }
        }
    });
    return false;
});
jQuery('#b2sPreFeatureModal').on('show.bs.modal', function () {
    jQuery('.b2s-post-item-details-release-input-date-select-reset').val('0');
});
jQuery(document).on('click', '.b2s-network-list-add-btn-profeature', function () {
    jQuery('#b2s-network-list-modal').modal('hide');
});
jQuery(document).on('click', '.b2s-post-item-details-release-area-sched-for-all', function () {
    var dataNetworkAuthId = jQuery(this).attr('data-network-auth-id');
    var dataNetworkCount = 0;
    var selMode = jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + dataNetworkAuthId + '"]').val();
    if (jQuery('.b2s-post-item-details-release-area-details-row[data-network-auth-id="' + dataNetworkAuthId + '"][data-network-count="1"]').is(":visible")) {
        dataNetworkCount = 1;
    }
    if (jQuery('.b2s-post-item-details-release-area-details-row[data-network-auth-id="' + dataNetworkAuthId + '"][data-network-count="2"]').is(":visible")) {
        dataNetworkCount = 2;
    }

    jQuery('.b2s-post-item-details-release-input-date-select').each(function () {
        if (jQuery(this).attr('data-network-auth-id') != dataNetworkAuthId && jQuery(this).has('option[value="' + jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + dataNetworkAuthId + '"]').val() + '"]').length > 0) {
            jQuery(this).val(jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + dataNetworkAuthId + '"]').val());
            //view elements
            releaseChoose(jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + dataNetworkAuthId + '"]').val(), jQuery(this).attr('data-network-auth-id'), dataNetworkCount);
            //view elements interval
            if (selMode == 2) {
                for (var i = 0; i <= dataNetworkCount; i++) {
                    var curInterval = jQuery('.b2s-post-item-details-release-input-interval-select[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val();
                    releaseChooseInterval(curInterval, '[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]', i);
                }
            }
        }
    });
    //set values
    for (var i = 0; i <= dataNetworkCount; i++) {
        jQuery('.b2s-post-item-details-release-input-time[data-network-count="' + i + '"]').val(jQuery('.b2s-post-item-details-release-input-time[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val());
        jQuery('.b2s-post-item-details-release-input-date[data-network-count="' + i + '"]').val(jQuery('.b2s-post-item-details-release-input-date[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val());
        if (selMode == 2) {
            var curInterval = jQuery('.b2s-post-item-details-release-input-interval-select[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val();
            jQuery('.b2s-post-item-details-release-input-interval-select[data-network-count="' + i + '"]').val(curInterval);
            if (curInterval == 0) {
                jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + i + '"]').val(jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val());
                jQuery('.b2s-post-item-details-release-input-lable-day-mo[data-network-count="' + i + '"]').prop('checked', jQuery('.b2s-post-item-details-release-input-lable-day-mo[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"').prop('checked'));
                jQuery('.b2s-post-item-details-release-input-lable-day-di[data-network-count="' + i + '"]').prop('checked', jQuery('.b2s-post-item-details-release-input-lable-day-di[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"').prop('checked'));
                jQuery('.b2s-post-item-details-release-input-lable-day-mi[data-network-count="' + i + '"]').prop('checked', jQuery('.b2s-post-item-details-release-input-lable-day-mi[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"').prop('checked'));
                jQuery('.b2s-post-item-details-release-input-lable-day-do[data-network-count="' + i + '"]').prop('checked', jQuery('.b2s-post-item-details-release-input-lable-day-do[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"').prop('checked'));
                jQuery('.b2s-post-item-details-release-input-lable-day-fr[data-network-count="' + i + '"]').prop('checked', jQuery('.b2s-post-item-details-release-input-lable-day-fr[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"').prop('checked'));
                jQuery('.b2s-post-item-details-release-input-lable-day-sa[data-network-count="' + i + '"]').prop('checked', jQuery('.b2s-post-item-details-release-input-lable-day-sa[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"').prop('checked'));
                jQuery('.b2s-post-item-details-release-input-lable-day-so[data-network-count="' + i + '"]').prop('checked', jQuery('.b2s-post-item-details-release-input-lable-day-so[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"').prop('checked'));
            }
            if (curInterval == 1) {
                jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + i + '"]').val(jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val());
                jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + i + '"]').val(jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val());
            }
            if (curInterval == 2) {
                jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + i + '"]').val(jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val());
                jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + i + '"]').val(jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + i + '"][data-network-auth-id="' + dataNetworkAuthId + '"]').val());
            }
        }
    }

    if (dataNetworkCount == 2) {
        jQuery('.b2s-post-item-details-release-input-add[data-network-count="0"]').hide();
        jQuery('.b2s-post-item-details-release-input-add[data-network-count="1"]').hide();
        jQuery('.b2s-post-item-details-release-input-hide[data-network-count="1"]').hide();
        jQuery('.b2s-post-item-details-release-input-hide[data-network-count="2"]').show();
    } else if (dataNetworkCount == 1) {
        jQuery('.b2s-post-item-details-release-input-add[data-network-count="0"]').hide();
        jQuery('.b2s-post-item-details-release-input-hide[data-network-count="1"]').show();
    }

    return false;
});
jQuery(document).on("click", ".b2s-user-network-settings-post-format", function () {
    jQuery('.b2s-settings-user-success').hide();
    jQuery('.b2s-settings-user-error').hide();
    jQuery('.b2s-server-connection-fail').hide();
    var networkId = jQuery(this).attr("data-network-id");
    var networkType = jQuery(this).attr("data-network-type");
    var postFormat = jQuery(this).val();
    var networkAuthId = jQuery(this).attr("data-network-auth-id");
    var postFormatType = jQuery(this).attr("data-post-format-type");
    jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').val(postFormat);
    //PostFormat
    if (jQuery('.b2s-post-ship-item-post-format-text[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').length > 0) {
        var postFormatText = JSON.parse(jQuery('.b2sNetworkSettingsPostFormatText').val());
        if (jQuery('#user_version').val() >= 2) {
            jQuery('.b2s-post-ship-item-post-format-text[data-network-auth-id="' + networkAuthId + '"]').html(postFormatText[postFormatType][postFormat]);
            jQuery('.b2s-post-item-details-post-format[data-network-auth-id="' + networkAuthId + '"]').val(postFormat);
        } else {
            jQuery('.b2s-post-ship-item-post-format-text[data-network-id="' + networkId + '"]').html(postFormatText[postFormatType][postFormat]);
            jQuery('.b2s-post-item-details-post-format[data-network-id="' + networkId + '"]').val(postFormat);
        }
    }

    //Edit Meta Tags
    var isMetaChecked = false;
    if (networkId == "1" && jQuery('#isOgMetaChecked').val() == "1") {
        isMetaChecked = true;
    }
    if (networkId == "2" && jQuery('#isCardMetaChecked').val() == "1") {
        isMetaChecked = true;
    }
    if (isMetaChecked && postFormat == '0' && jQuery('#user_version').val() > 0) { //If linkpost
        jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", false);
        jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", false);
        var dataMetaType = jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').attr("data-meta-type");
        if (dataMetaType == "og") {
            jQuery('#b2sChangeOgMeta').val("1");
        } else {
            jQuery('#b2sChangeCardMeta').val("1");
        }

        //Copy from further item meta tags by same network
        jQuery('.b2s-post-item-details-post-format[data-network-id=' + networkId + ']').each(function () {
            if (jQuery(this).val() == "0" && jQuery('.b2s-post-ship-item-post-format[data-network-auth-id=' + jQuery(this).attr('data-network-auth-id') + ']').is(":visible") && jQuery(this).attr('data-network-auth-id') != networkAuthId) { //other Linkpost by same network
                jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').attr('src', jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').attr('src'));
                jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                if (jQuery('.b2s-image-remove-btn[data-network-count="-1"][data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]:visible').length == 1) {
                    jQuery('.b2s-image-remove-btn[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="-1"]').show();
                } else {
                    jQuery('.b2s-image-remove-btn[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="-1"]').hide();
                }

                return true;
            }
        });
        jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').show();
        jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').trigger("click");
    } else {
        jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", true);
        jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", true);
        jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').hide();
    }

    jQuery('.b2s-user-network-settings-post-format[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').removeClass('b2s-settings-checked');
    jQuery(this).addClass('b2s-settings-checked');
    jQuery('#b2s-post-ship-item-post-format-modal').modal('hide');
    return false;
});
jQuery(document).on("click", ".b2s-post-ship-item-full-text", function () {
    jQuery('.b2s-server-connection-fail').hide();
    var curSchedCount = jQuery(this).attr('data-network-count');
    jQuery.ajax({
        url: ajaxurl,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            'action': 'b2s_ship_item_full_text',
            'postId': jQuery('#b2sPostId').val(),
            'userLang': jQuery('#b2sUserLang').val(),
            'networkAuthId': jQuery(this).attr('data-network-auth-id'),
        },
        error: function () {
            jQuery('.b2s-server-connection-fail').show();
            return false;
        },
        success: function (data) {
            if (data.result == true) {
                jQuery('.b2s-post-item-details-item-message-input[data-network-count="' + curSchedCount + '"][data-network-auth-id="' + data.networkAuthId + '"]').val(data.text);
                networkCount(data.networkAuthId);
            }
        }
    });
    return false;
});
jQuery(document).on("click", ".b2s-post-ship-item-message-delete", function () {
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var networkCountId = jQuery(this).attr('data-network-count');
    jQuery('.b2s-post-item-details-item-message-input[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').val("");
    initSceditor(networkAuthId);
    networkCount(networkAuthId);
    return false;
});
jQuery(document).on("click", ".b2s-post-ship-item-copy-original-text", function () {
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var networkCountId = jQuery(this).attr('data-network-count');
    jQuery('.b2s-post-item-details-item-message-input[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2s-post-item-details-item-message-input[data-network-count="-1"][data-network-auth-id="' + networkAuthId + '"]').val());
    networkCount(networkAuthId);
    return false;
});
jQuery(document).on("click", ".b2s-network-select-btn", function () {
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var networkId = jQuery(this).attr('data-network-id');
    var networkType = jQuery(this).attr('data-network-type');
    //doppelklick Schutz
    if (!jQuery(this).hasClass('b2s-network-select-btn-deactivate')) {
//aktiv?
        if (!jQuery(this).children().hasClass('active')) {
//schon vorhanden?
            if (jQuery('.b2s-post-item[data-network-auth-id="' + networkAuthId + '"]').length > 0 && !jQuery('.b2s-post-item[data-network-auth-id="' + networkAuthId + '"]').hasClass('b2s-post-item-connection-fail-dummy')) {
                activatePortal(networkAuthId);
                //PostFormat
                if (jQuery('.b2s-post-ship-item-post-format-text[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').length > 0) {
                    var postFormatText = JSON.parse(jQuery('.b2sNetworkSettingsPostFormatText').val());
                    var postFormatType = jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').attr('data-post-format-type');
                    if (jQuery('#user_version').val() >= 2) {
                        jQuery('.b2s-post-ship-item-post-format-text[data-network-auth-id="' + networkAuthId + '"]').html(postFormatText[postFormatType][jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').val()]);
                        jQuery('.b2s-post-item-details-post-format[data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').val());
                        //if linkpost then show btn meta tags
                        var isMetaChecked = false;
                        if (networkId == "1" && jQuery('#isOgMetaChecked').val() == "1") {
                            isMetaChecked = true;
                        }
                        if (networkId == "2" && jQuery('#isCardMetaChecked').val() == "1") {
                            isMetaChecked = true;
                        }
                        if (isMetaChecked && jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').val() == "0" && jQuery('#user_version').val() > 0) {
                            jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", false);
                            jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", false);
                            var dataMetaType = jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').attr("data-meta-type");
                            if (dataMetaType == "og") {
                                jQuery('#b2sChangeOgMeta').val("1");
                            } else {
                                jQuery('#b2sChangeCardMeta').val("1");
                            }

                            //Copy from further item meta tags by same network
                            jQuery('.b2s-post-item-details-post-format[data-network-id=' + networkId + ']').each(function () {
                                if (jQuery(this).val() == "0" && jQuery('.b2s-post-ship-item-post-format[data-network-auth-id=' + jQuery(this).attr('data-network-auth-id') + ']').is(":visible") && jQuery(this).attr('data-network-auth-id') != networkAuthId) { //other Linkpost by same network
                                    jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                                    jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                                    jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').attr('src', jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').attr('src'));
                                    jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + networkAuthId + '"]').val(jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                                    if (jQuery('.b2s-image-remove-btn[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').is(":visible")) {
                                        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"]').show();
                                        if (jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val() == 1) {
                                            jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"][data-network-count="-1"]').hide();
                                        }
                                    } else {
                                        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"]').hide();
                                    }

                                    return true;
                                }
                            });
                            jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').show();
                            jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').trigger("click");
                        } else {
                            jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", true);
                            jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + networkAuthId + '"]').prop("readonly", true);
                            jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').hide();
                        }
                    } else {
                        jQuery('.b2s-post-ship-item-post-format-text[data-network-id="' + networkId + '"]').html(postFormatText[postFormatType][jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').val()]);
                        jQuery('.b2s-post-item-details-post-format[data-network-id="' + networkId + '"]').val(jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + networkType + '"][data-network-id="' + networkId + '"]').val());
                    }
                }

                //Twitter TOS 032018 - protected multiple accounts with same content to same time
                //delete comment field one more
                if (networkId == 2) {
                    if (jQuery('.tw-textarea-input[data-network-id="' + networkId + '"]:visible').length == 1) {
                        jQuery('.tw-textarea-input[data-network-auth-id="' + networkAuthId + '"]').text(jQuery('#b2sTwitterOrginalPost').val());
                    } else {
                        jQuery('.tw-textarea-input[data-network-auth-id="' + networkAuthId + '"]').text("");
                    }
                }

            } else {
                jQuery(this).addClass('b2s-network-select-btn-deactivate');
                jQuery('.b2s-network-status-img-loading[data-network-auth-id="' + networkAuthId + '"]').show();
                jQuery('.b2s-empty-area').hide();
                loadingDummyShow(networkAuthId, jQuery(this).attr('data-network-id'));
                jQuery('.b2s-server-connection-fail').hide();
                var networkId = jQuery(this).attr('data-network-id');
                var legacyMode = jQuery('#isLegacyMode').val();
                if (legacyMode == "1") {
                    legacyMode = false; // loading is sync (stack)
                } else {
                    legacyMode = true; // loading is async (parallel)
                }
                jQuery.ajax({
                    url: ajaxurl,
                    type: "POST",
                    dataType: "json",
                    async: legacyMode,
                    cache: false,
                    data: {
                        'action': 'b2s_ship_item',
                        'networkAuthId': networkAuthId,
                        'networkType': jQuery(this).attr('data-network-type'),
                        'networkId': networkId,
                        'networkDisplayName': jQuery(this).attr('data-network-display-name'),
                        'userLang': jQuery('#b2sUserLang').val(),
                        'postId': jQuery('#b2sPostId').val(),
                        'relayCount': jQuery('#b2sRelayCount').val(),
                        'selSchedDate': jQuery('#selSchedDate').val()
                    },
                    beforeSend: function (jqXHR) { // before jQuery send the request we will push it to our array
                        jQuery.xhrPool.push(jqXHR);
                    },
                    complete: function (jqXHR) { // when some of the requests completed it will splice from the array
                        var index = jQuery.xhrPool.indexOf(jqXHR);
                        if (index > -1) {
                            jQuery.xhrPool.splice(index, 1);
                        }
                    },
                    error: function (jqXHR) {
                        var index = jQuery.xhrPool.indexOf(jqXHR);
                        if (index > -1) {
                            jQuery.xhrPool.splice(index, 1);
                        }
                        loadingDummyConnectionFail(networkAuthId, networkId);
                        jQuery('.b2s-network-status-img-loading[data-network-auth-id="' + networkAuthId + '"]').hide();
                        jQuery('.b2s-network-select-btn[data-network-auth-id="' + networkAuthId + '"]').removeClass('b2s-network-select-btn-deactivate');
                        jQuery('.b2s-server-connection-fail').show();
                        return true;
                    },
                    success: function (data) {
                        if (data != undefined) {
                            jQuery('.b2s-network-status-img-loading[data-network-auth-id="' + data.networkAuthId + '"]').hide();
                            jQuery('.b2s-network-select-btn[data-network-auth-id="' + data.networkAuthId + '"]').removeClass('b2s-network-select-btn-deactivate');
                            if (data.result == true) {
                                jQuery('.b2s-post-item-loading-dummy[data-network-auth-id="' + data.networkAuthId + '"]').remove();
                                var order = jQuery.parseJSON(jQuery('.b2s-network-navbar-order').val());
                                var pos = order.indexOf(data.networkAuthId.toString());
                                var add = false;
                                for (var i = pos; i >= 0; i--) {
                                    if (jQuery('.b2s-post-item[data-network-auth-id="' + order[i] + '"]').length > 0) {
                                        jQuery('.b2s-post-item[data-network-auth-id="' + order[i] + '"]').after(data.content);
                                        i = -1;
                                        add = true;
                                    }
                                }
                                if (add == false) {
                                    jQuery('.b2s-post-list').prepend(data.content);
                                }

                                activatePortal(data.networkAuthId);
                                var dateFormat = "yyyy-mm-dd";
                                var language = "en";
                                var showMeridian = true;
                                if (jQuery('#b2sUserLang').val() == "de") {
                                    dateFormat = "dd.mm.yyyy";
                                    language = "de";
                                    showMeridian = false;
                                }
                                var today = new Date();
                                if (jQuery('#b2sBlogPostSchedDate').length > 0) {
                                    today.setTime(jQuery('#b2sBlogPostSchedDate').val());
                                }

                                jQuery(".b2s-post-item-details-release-input-date").datepicker({
                                    format: dateFormat,
                                    language: language,
                                    maxViewMode: 2,
                                    todayHighlight: true,
                                    startDate: today,
                                    calendarWeeks: true,
                                    autoclose: true
                                });
                                jQuery('.b2s-post-item-details-release-input-time').timepicker({
                                    minuteStep: 15,
                                    appendWidgetTo: 'body',
                                    showSeconds: false,
                                    showMeridian: showMeridian,
                                    defaultTime: 'current',
                                    snapToStep: true
                                });
                                jQuery(".b2s-post-item-details-release-input-date").datepicker().on('changeDate', function (e) {
                                    checkSchedDateTime(jQuery(this).attr('data-network-auth-id'));
                                });
                                jQuery('.b2s-post-item-details-release-input-time').timepicker().on('changeTime.timepicker', function (e) {
                                    checkSchedDateTime(jQuery(this).attr('data-network-auth-id'));
                                });
                                //Check Text Limit
                                var textLimit = jQuery('.b2s-post-item-details-item-message-input[data-network-count="-1"][data-network-auth-id="' + data.networkAuthId + '"]').attr('data-network-text-limit');
                                if (textLimit != "0") {
                                    networkLimitAll(data.networkAuthId, data.networkId, textLimit);
                                } else {
                                    networkCount(data.networkAuthId);
                                }
                                jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + data.networkAuthId + '"]').trigger("change");
                                initSceditor(data.networkAuthId);
                                //Bild setzen
                                if (jQuery('#b2s_blog_default_image').val() != "") {
                                    if (jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').length > 0) {
                                        jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').attr('src', jQuery('#b2s_blog_default_image').val());
                                        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + data.networkAuthId + '"]').show();
                                    }
                                    jQuery('.b2s-image-url-hidden-field').val(jQuery('#b2s_blog_default_image').val());
                                }

                                //Time zone
                                jQuery('.b2s-settings-time-zone-text').html(jQuery('#user_timezone_text').val());
                                //PostFormat
                                if (jQuery('.b2s-post-ship-item-post-format-text[data-network-type="' + data.networkType + '"][data-network-id="' + data.networkId + '"]').length > 0) {
                                    var postFormatText = JSON.parse(jQuery('.b2sNetworkSettingsPostFormatText').val());
                                    var postFormatType = jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + data.networkType + '"][data-network-id="' + data.networkId + '"]').attr('data-post-format-type');
                                    if (jQuery('#user_version').val() >= 2) {

                                        jQuery('.b2s-post-ship-item-post-format-text[data-network-auth-id="' + data.networkAuthId + '"]').html(postFormatText[postFormatType][jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + data.networkType + '"][data-network-id="' + data.networkId + '"]').val()]);
                                        jQuery('.b2s-post-item-details-post-format[data-network-auth-id="' + data.networkAuthId + '"]').val(jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + data.networkType + '"][data-network-id="' + data.networkId + '"]').val());
                                        var isMetaChecked = false;
                                        if (data.networkId == "1" && jQuery('#isOgMetaChecked').val() == "1") {
                                            isMetaChecked = true;
                                        }
                                        if (data.networkId == "2" && jQuery('#isCardMetaChecked').val() == "1") {
                                            isMetaChecked = true;
                                        }

                                        if (isMetaChecked && jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + data.networkType + '"][data-network-id="' + data.networkId + '"]').val() == "0") {
                                            jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + data.networkAuthId + '"]').prop("readonly", false);
                                            jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + data.networkAuthId + '"]').prop("readonly", false);
                                            var dataMetaType = jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + data.networkAuthId + '"]').attr("data-meta-type");
                                            if (dataMetaType == "og") {
                                                jQuery('#b2sChangeOgMeta').val("1");
                                            } else {
                                                jQuery('#b2sChangeCardMeta').val("1");
                                            }

                                            //Copy from further item meta tags by same network
                                            jQuery('.b2s-post-item-details-post-format[data-network-id=' + data.networkId + ']').each(function () {
                                                if (jQuery(this).val() == "0" && jQuery('.b2s-post-ship-item-post-format[data-network-auth-id=' + jQuery(this).attr('data-network-auth-id') + ']').is(":visible") && jQuery(this).attr('data-network-auth-id') != data.networkAuthId) { //other Linkpost by same network
                                                    jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + data.networkAuthId + '"]').val(jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                                                    jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + data.networkAuthId + '"]').val(jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                                                    jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').attr('src', jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').attr('src'));
                                                    jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + data.networkAuthId + '"]').val(jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val());
                                                    if (jQuery('.b2s-image-remove-btn[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').is(":visible")) {
                                                        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + data.networkAuthId + '"]').show();
                                                    } else {
                                                        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + data.networkAuthId + '"]').hide();
                                                    }

                                                    return true;
                                                }
                                            });
                                            jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').show();
                                            jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').trigger("click");
                                        } else {
                                            jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + data.networkAuthId + '"]').prop("readonly", true);
                                            jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + data.networkAuthId + '"]').prop("readonly", true);
                                            jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + networkAuthId + '"]').hide();
                                        }

                                    } else {
                                        jQuery('.b2s-post-ship-item-post-format-text[data-network-id="' + data.networkId + '"]').html(postFormatText[postFormatType][jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + data.networkType + '"][data-network-id="' + data.networkId + '"]').val()]);
                                        jQuery('.b2s-post-item-details-post-format[data-network-id="' + data.networkId + '"]').val(jQuery('.b2sNetworkSettingsPostFormatCurrent[data-network-type="' + data.networkType + '"][data-network-id="' + data.networkId + '"]').val());
                                    }


                                    if (jQuery('#selSchedDate').val() != "") {
                                        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + data.networkAuthId + '"][data-network-count="-1"]').hide();
                                    }

                                    //Twitter TOS 032018 - protected multiple accounts with same content to same time
                                    //delete comment field one more
                                    if (data.networkId == 2) {
                                        if (jQuery('.tw-textarea-input[data-network-id="' + data.networkId + '"]:visible').length > 1) {
                                            var firstAuth = jQuery('.b2s-post-item[data-network-id="' + data.networkId + '"]:first').attr('data-network-auth-id');
                                            if (firstAuth != data.networkAuthId) {
                                                jQuery('.tw-textarea-input[data-network-auth-id="' + data.networkAuthId + '"]').text("");
                                            } else {
                                                if (jQuery('.tw-textarea-input[data-network-id="' + data.networkId + '"]:visible').length > 2) {
                                                    jQuery('.tw-textarea-input[data-network-auth-id="' + data.networkAuthId + '"]').text("");
                                                }
                                            }
                                        } else {
                                            //set original post
                                            jQuery('#b2sTwitterOrginalPost').val(jQuery('.tw-textarea-input[data-network-auth-id="' + data.networkAuthId + '"]').val());
                                        }
                                    }

                                }
                            }
                        }
                    }
                });
            }
        } else {
            deactivatePortal(networkAuthId);
        }
    }
    return false;
});
jQuery(document).on('click', '.b2s-post-item-details-url-image', function () {
    var networkAuthId = jQuery(this).attr("data-network-auth-id");
    var networkCountId = jQuery(this).attr("data-network-count");
    if (jQuery('.b2s-select-image-modal-open[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').is(":visible")) {

        var postFormat = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').val();
        var networkId = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').attr("data-network-id");
        var isMetaChecked = false;
        if (networkId == "1" && jQuery('#isOgMetaChecked').val() == "1") {
            isMetaChecked = true;
        }
        if (networkId == "2" && jQuery('#isCardMetaChecked').val() == "1") {
            isMetaChecked = true;
        }

        if (postFormat == "0" && (networkId == "1" || networkId == "2")) { //isLinkPost for Faceboo or Twitter
            jQuery('.meta-text').hide();
            if (!isMetaChecked) {
                if (networkId == "1") {
                    jQuery('.isOgMetaChecked').show();
                } else {
                    jQuery('.isCardMetaChecked').show();
                }
                jQuery('#b2s-info-change-meta-tag-modal').modal('show');
                return false;
            }
        }

        jQuery('.b2s-select-image-modal-open[data-network-count="' + networkCountId + '"][data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').trigger('click');
    }
    return false;
});
jQuery(document).on('click', '.b2s-submit-btn-scroll', function () {
    jQuery('.b2s-submit-btn').trigger('click');
});
jQuery(document).on('click', '.b2s-post-ship-item-post-format', function () {
    if (jQuery('#user_version').val() >= 1) {
        jQuery('.b2s-user-network-settings-post-format-area').hide();
        jQuery('.b2s-user-network-settings-post-format-area[data-network-type="' + jQuery(this).attr('data-network-type') + '"][data-network-id="' + jQuery(this).attr('data-network-id') + '"]').show();
        jQuery('#b2s-post-ship-item-post-format-network-title').html(jQuery('.b2s-user-network-settings-post-format-area[data-network-id="' + jQuery(this).attr('data-network-id') + '"]').attr('data-network-title'));
        if (jQuery('#user_version').val() >= 2) {
            jQuery('.b2s-user-network-settings-post-format[data-network-type="' + jQuery(this).attr('data-network-type') + '"][data-network-id="' + jQuery(this).attr('data-network-id') + '"]').removeClass('b2s-settings-checked');
            var currentPostFormat = jQuery('.b2s-post-item-details-post-format[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val();
            jQuery('.b2s-user-network-settings-post-format[data-network-type="' + jQuery(this).attr('data-network-type') + '"][data-network-id="' + jQuery(this).attr('data-network-id') + '"][data-post-format="' + currentPostFormat + '"]').addClass('b2s-settings-checked');
            jQuery('#b2s-post-ship-item-post-format-network-display-name').html(jQuery('.b2s-post-item-details-network-display-name[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').text().toUpperCase());
        }
        jQuery('.b2s-post-format-settings-info').hide();
        jQuery('.b2s-post-format-settings-info[data-network-id="' + jQuery(this).attr('data-network-id') + '"]').show();
        jQuery('#b2s-post-ship-item-post-format-modal').modal('show');
        jQuery('.b2s-user-network-settings-post-format').attr('data-network-auth-id', jQuery(this).attr('data-network-auth-id'));
    } else {
        jQuery('#b2sInfoFormatModal').modal('show');
    }
    return false;
});
jQuery(document).on('click', '.b2s-btn-trigger-post-ship-item-post-format', function () {
    jQuery('.b2s-post-ship-item-post-format[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').trigger('click');
    return false;
});
jQuery(document).on('click', '.b2s-post-item-details-release-input-days', function () {
    jQuery('.b2s-post-item-details-release-input-days[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').removeClass('error');
});
jQuery(document).on('change', '.b2s-post-item-details-release-input-time', function () {
    jQuery('.b2s-post-item-details-release-input-time[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').removeClass('error');
});
jQuery(document).on('change', '.b2s-post-item-details-release-input-date', function () {
    jQuery('.b2s-post-item-details-release-input-date[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').removeClass('error');
});
jQuery('.b2s-network-details-mandant-select').change(function () {
    hideDuplicateAuths();
    chooseMandant();
});
jQuery(document).on('change', '.b2s-post-item-details-item-group-select', function () {
    if (jQuery(this).attr('data-change-network-display-name') == 'true') {
        var label = jQuery(this.options[this.selectedIndex]).closest('optgroup').prop('label');
        jQuery('.b2s-post-item-details-network-display-name[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').html(label);
        jQuery('.b2s-post-ship-network-display-name[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val(label);
    }
    return false;
});
//select recurrent sched interval mode
jQuery(document).on('change', '.b2s-post-item-details-release-input-interval-select', function () {
    var interval = jQuery(this).val();
    var selectorInput = '[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]';
    var dataCount = jQuery(this).attr('data-network-count');
    releaseChooseInterval(interval, selectorInput, dataCount);
    return false;
});
//select shipping mode
jQuery(document).on('change', '.b2s-post-item-details-release-input-date-select', function () {
    var dataNetworkCount = 0;
    if (jQuery(this).val() == 0) {
        //TOS Twitter 032018 - none multiple accounts post same content to same time
        if (jQuery(this).attr('data-network-id') == 2) {
            jQuery('.b2s-network-tos-sched-warning[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
        }
    }
    if (jQuery(this).val() == 2) {
        if (jQuery(this).attr('data-user-version') == 0) {
            jQuery('#b2s-sched-post-modal').modal('show');
            return false;
        } else {
            //TOS Twitter 032018 - none multiple accounts post same content to same time
            if (jQuery(this).attr('data-network-id') == 2) {
                jQuery('.b2s-network-tos-sched-warning[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').show();
            }

            for (var i = 1; i <= 2; i++) {
                jQuery('.b2s-post-item-details-release-input-days[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + i + '"]').each(function () {
                    if (jQuery(this).prop('checked')) {
                        dataNetworkCount = 1;
                    }
                });
            }
            if (dataNetworkCount == 2) {
                jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').hide();
                jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="1"]').hide();
                jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="1"').hide();
                jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="2"').show();
            } else if (dataNetworkCount == 1) {
                jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').hide();
                jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="1"').show();
            }
        }
    }
    if (jQuery(this).val() == 1) {
        if (jQuery(this).attr('data-user-version') == 0) {
            jQuery('#b2s-sched-post-modal').modal('show');
            return false;
        } else {

            //TOS Twitter 032018 - none multiple accounts post same content to same time
            if (jQuery(this).attr('data-network-id') == 2) {
                jQuery('.b2s-network-tos-sched-warning[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
            } else {
                //set orginal edit content for customize sched content
                var content = jQuery('.b2s-post-item-details-item-message-input[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="-1"]').val();
                jQuery('.b2s-post-item-details-item-message-input[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val(content);
            }

            checkSchedDateTime(jQuery(this).attr('data-network-auth-id'));
            if (dataNetworkCount == 2) {
                jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').hide();
                jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="1"]').hide();
                jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="1"').hide();
                jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="2"').show();
            } else if (dataNetworkCount == 1) {
                jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').hide();
                jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="1"').show();
            }
        }
    }
    releaseChoose(jQuery(this).val(), jQuery(this).attr('data-network-auth-id'), dataNetworkCount);
});
jQuery(document).on('click', '#b2s-network-sched-post-info-ignore', function () {
    jQuery('#b2sSchedPostInfoIgnore').val("1");
    jQuery('.b2s-submit-btn').trigger("click");
    return false;
});
jQuery(document).on('click', '.b2s-re-share-btn', function () {
    jQuery(".b2s-settings-user-sched-time-area").show();
    jQuery('#b2s-sidebar-wrapper').show();
    jQuery('.b2s-post-item-info-area').show();
    jQuery('.b2s-post-item-details-message-info').show();
    jQuery('.b2s-post-item-details-edit-area').show();
    jQuery('.b2s-post-item-details-message-result').hide();
    jQuery('.b2s-post-item-details-message-result').html("");
    jQuery(".b2s-post-area").show();
    jQuery('.b2s-publish-area').show();
    jQuery('.b2s-footer-menu').show();
    window.scrollTo(0, 0);
    jQuery('.b2s-reporting-btn-area').hide();
    jQuery('#b2sSchedPostInfoIgnore').val("0");
    //Calendar close for resfresh
    jQuery('.b2s-toogle-calendar-btn').each(function () {
        if (!jQuery(this).hasClass('hide')) {
            var toogleBtnText = jQuery(this).attr('data-toogle-text-btn');
            var currentBtnText = jQuery(this).text();
            jQuery(this).text(toogleBtnText);
            jQuery(this).attr('data-toogle-text-btn', currentBtnText);
            var networkAuthId = jQuery(this).attr('data-network-auth-id');
            var calendar = jQuery('.b2s-post-item-calendar-area[data-network-auth-id="' + networkAuthId + '"]');
            calendar.removeClass('show');
            calendar.addClass('hide');
            jQuery('.b2s-calendar-filter-area[data-network-auth-id="' + networkAuthId + '"]').addClass('hide');
        }
    });
    return false;
});
jQuery(document).on('click', '.b2s-post-item-details-release-input-add', function () {
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var netCount = jQuery(this).attr('data-network-count');
    var netCountNext = parseInt(netCount) + 1;
    var curMode = jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + networkAuthId + '"]').val();
    jQuery(this).hide();
    jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCount + '"]').hide();
    jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-release-area-details-row[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-release-input-date[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-release-input-date[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
    jQuery('.b2s-post-item-details-release-input-time[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-release-input-time[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
    if (curMode == 1) {
        //since 4.9.0 custom content
        jQuery('.b2s-post-item-details-release-customize-sched-area-details-row[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
        jQuery('.b2s-post-item-details-item-message-input[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
    }

    //recurrently
    if (curMode == 2) {
        jQuery('.b2s-post-item-details-release-input-interval-select[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
        jQuery('.b2s-post-item-details-release-input-interval-select[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
        jQuery('.b2s-post-item-details-release-area-label-duration[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
        jQuery('.b2s-post-item-details-release-area-div-duration[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').val('1');
        jQuery('.b2s-post-item-details-release-area-label-day[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').show();
        jQuery('.b2s-post-item-details-release-input-days[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
        //since 4.9.0 custom content
        jQuery('.b2s-post-item-details-release-customize-sched-area-details-row[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountNext + '"]').hide();
    }

    return false;
});
jQuery(document).on('click', '.b2s-post-item-details-release-input-hide', function () {
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var netCount = jQuery(this).attr('data-network-count');
    var netCountBevor = parseInt(netCount) - 1;
    var selectorInput = '[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCount + '"]'
    jQuery('.b2s-post-item-details-release-area-details-row' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-input-hide[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountBevor + '"]').show();
    jQuery('.b2s-post-item-details-release-input-add[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + netCountBevor + '"]').show();
    //clean all fields
    jQuery('.b2s-post-item-details-release-input-date' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-time' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-weeks' + selectorInput).val('');
    jQuery('.b2s-post-item-details-release-input-weeks' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-days' + selectorInput).prop('checked', false);
    jQuery('.b2s-post-item-details-release-input-days' + selectorInput).prop('disabled', true);
    //since 4.9.0 custom content
    jQuery('.b2s-post-item-details-item-message-input' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-item-message-input' + selectorInput).removeClass('error');
    jQuery('.b2s-post-item-details-release-customize-sched-area-details-row' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).val("0");
    jQuery('.b2s-post-item-details-release-area-label-duration-month' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-area-div-duration-month' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-input-months' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-months' + selectorInput).val("1");
    jQuery('.b2s-post-item-details-release-area-label-select-day' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-input-select-day' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-select-day' + selectorInput).val("1");
    jQuery('.b2s-post-item-details-release-area-label-duration-time' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-area-div-duration-time' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-input-times' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-times' + selectorInput).val("1");
    jQuery('.b2s-post-item-details-release-area-label-select-timespan' + selectorInput).hide();
    jQuery('.b2s-post-item-details-release-input-select-timespan' + selectorInput).prop('disabled', true);
    jQuery('.b2s-post-item-details-release-input-select-timespan' + selectorInput).val("1");
    return false;
});
jQuery(document).on("keyup", ".complete_network_url", function () {
    var url = jQuery(this).val();
    jQuery(this).removeClass("error");
    if (url.length != "0") {
        if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
            url = "http://" + url;
            jQuery(this).val(url);
        }
    } else if (jQuery(this).hasClass("required_network_url")) {
        url = jQuery("#b2sDefault_url").val();
        jQuery(this).val(url);
    }
});
jQuery(document).on('click', '.scroll-to-top', function () {
    window.scrollTo(0, 0);
    return false;
});
jQuery(document).on('click', '.scroll-to-bottom', function () {
    window.scrollTo(0, document.body.scrollHeight);
    return false;
});
jQuery(document).on('click', '.b2s-post-item-details-preview-url-reload', function () {
    var re = new RegExp(/^(https?:\/\/)?[a-zA-Z0-99ÄÖÜöäü-]+([\-\.]{1}[a-zA-Z0-99ÄÖÜöäü-]+)*\.[a-zA-Z0-9-]{2,20}(:[0-9]{1,5})?(\/.*)?$/);
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var url = jQuery('.b2s-post-item-details-item-url-input[data-network-auth-id="' + networkAuthId + '"]').val();
    if (re.test(url)) {
        jQuery('.b2s-post-item-details-item-url-input[data-network-auth-id="' + networkAuthId + '"]').removeClass('error');
        jQuery(this).addClass('glyphicon-refresh-animate');
        jQuery('.b2s-server-connection-fail').hide();
        jQuery.ajax({
            url: ajaxurl,
            type: "POST",
            dataType: "json",
            cache: false,
            data: {
                'action': 'b2s_ship_item_reload_url',
                'networkId': jQuery(this).attr('data-network-id'),
                'networkAuthId': networkAuthId,
                'postId': jQuery('#b2sPostId').val(),
                'defaultUrl': jQuery('#b2sDefault_url').val(),
                'url': url
            },
            error: function () {
                jQuery('.b2s-server-connection-fail').show();
                return false;
            },
            success: function (data) {
                jQuery('.b2s-post-item-details-preview-url-reload[data-network-auth-id="' + data.networkAuthId + '"]').removeClass('glyphicon-refresh-animate');
                if (data.result == true) {
                    if (data.networkId == 1 || data.networkId == 2) {
                        jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + data.networkAuthId + '"]').val(data.title);
                        jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + data.networkAuthId + '"]').val(data.description);
                    } else {
                        jQuery('.b2s-post-item-details-preview-title[data-network-auth-id="' + data.networkAuthId + '"]').html(data.title);
                        jQuery('.b2s-post-item-details-preview-desc[data-network-auth-id="' + data.networkAuthId + '"]').html(data.description);
                    }

                    if (jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').attr('data-network-image-change') == '0') {
                        jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').attr('src', data.image);
                    }

                    if (jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').attr('data-network-image-change') == '1') {
                        if (data.image != "") {
                            jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').attr('src', data.image);
                        } else {
                            jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + data.networkAuthId + '"]').attr('src', jQuery('#b2sDefaultNoImage').val());
                        }
                    }
                }
            }

        });
    } else {
        jQuery('.b2s-post-item-details-item-url-input[data-network-auth-id="' + networkAuthId + '"]').addClass('error');
    }
});
jQuery(document).on('click', '.b2s-select-image-modal-open', function () {
    var metaType = jQuery(this).attr('data-meta-type');
    var authId = jQuery(this).attr('data-network-auth-id');
    var countId = jQuery(this).attr('data-network-count');
    var postFormat = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + authId + ']').val();
    var networkId = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + authId + ']').attr("data-network-id");
    var isMetaChecked = false;
    if (networkId == "1" && jQuery('#isOgMetaChecked').val() == "1") {
        isMetaChecked = true;
    }
    if (networkId == "2" && jQuery('#isCardMetaChecked').val() == "1") {
        isMetaChecked = true;
    }

    if (postFormat == "0" && (networkId == "1" || networkId == "2")) { //isLinkPost for Facebook or Twitter
        jQuery('.meta-text').hide();
        if (!isMetaChecked) {
            if (networkId == "1") {
                jQuery('.isOgMetaChecked').show();
            } else {
                jQuery('.isCardMetaChecked').show();
            }
            jQuery('#b2s-info-change-meta-tag-modal').modal('show');
            return false;
        }
    }

    jQuery('.b2s-image-change-this-network').attr('data-network-auth-id', authId).attr('data-network-count', countId);
    jQuery('.b2s-image-change-all-network').attr('data-network-count', countId);
    jQuery('.b2s-upload-image').attr('data-network-auth-id', authId).attr('data-network-count', countId);
    var content = "<img class='b2s-post-item-network-image-selected-account' height='22px' src='" + jQuery('.b2s-post-item-network-image[data-network-auth-id="' + authId + '"]').attr('src') + "' /> " + jQuery('.b2s-post-item-details-network-display-name[data-network-auth-id="' + authId + '"]').html();
    jQuery('.b2s-selected-network-for-image-info').html(content);
    jQuery('#b2sInsertImageType').val("0");
    if (typeof metaType !== 'undefined') {
        jQuery('.b2s-image-change-this-network').attr('data-meta-type', metaType);
    } else {
        jQuery('.b2s-image-change-this-network').attr('data-meta-type', "");
    }

    jQuery('#b2s-network-select-image').modal('show');
    imageSize();
    return false;
});
jQuery(document).on('click', '.b2s-image-remove-btn', function () {
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var networkCountId = jQuery(this).attr('data-network-count');
    var defaultImage = jQuery('#b2sDefaultNoImage').val();
    //default
    if (networkCountId == -1) {
        jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').attr('src', defaultImage);
        jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + networkAuthId + '"]').val("");
        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"]').hide();
    } else {
        //customize sched content
        jQuery('.b2s-post-item-details-url-image[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').attr('src', defaultImage);
        jQuery('.b2s-image-url-hidden-field[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').val("");
        jQuery('.b2s-image-remove-btn[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').hide();
    }

    //add check linkpost change meta tag image for this network
    var postFormat = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').val();
    var networkId = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').attr('data-network-id');
    if (typeof postFormat !== typeof undefined && postFormat !== false) {
        if (postFormat == "0") {  //if linkpost
            jQuery('.b2s-post-item-details-post-format[data-network-id=' + networkId + ']').each(function () {
                if (jQuery(this).val() == "0" && jQuery('.b2s-post-ship-item-post-format[data-network-auth-id=' + jQuery(this).attr('data-network-auth-id') + ']').is(":visible") && jQuery(this).attr('data-network-auth-id') != networkAuthId) { //other Linkpost by same network
                    //override this image with current image
                    jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').attr('src', defaultImage);
                    jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val("");
                    jQuery('.b2s-image-remove-btn[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
                }
            });
            //customize sched content
            jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').attr('src', defaultImage);
            jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + networkAuthId + '"]').val("");
            jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"]').hide();
        }
    }

    return false;
});
jQuery(document).on('click', '.b2s-image-change-this-network', function () {
    var networkAuthId = jQuery(this).attr('data-network-auth-id');
    var networkCountId = jQuery(this).attr('data-network-count');
    var currentImage = jQuery('input[name=image_url]:checked').val();
    if (jQuery('#b2sInsertImageType').val() == '1') { //HTML-Network
        var sceditor = jQuery('.b2s-post-item-details-item-message-input-allow-html[data-network-auth-id="' + networkAuthId + '"]').sceditor('instance');
        sceditor.insert("<br /><img src='" + currentImage + "'/><br />");
        jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + networkAuthId + '"]').val(currentImage); //Torial
    } else {
        //default
        if (networkCountId == -1) {
            jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').attr('src', currentImage);
            jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').removeClass('b2s-img-required');
            jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + networkAuthId + '"]').val(currentImage);
            jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"]').show();
        } else {
            //customize sched content
            jQuery('.b2s-post-item-details-url-image[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').attr('src', currentImage);
            jQuery('.b2s-post-item-details-url-image[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').removeClass('b2s-img-required');
            jQuery('.b2s-image-url-hidden-field[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').val(currentImage);
            jQuery('.b2s-image-remove-btn[data-network-count="' + networkCountId + '"][data-network-auth-id="' + networkAuthId + '"]').show();
        }

        if (jQuery(this).attr('data-meta-type') == "og") {
            jQuery('#b2sChangeOgMeta').val("1");
        }
        if (jQuery(this).attr('data-meta-type') == "card") {
            jQuery('#b2sChangeCardMeta').val("1");
        }

        //add check linkpost change meta tag image for this network
        var postFormat = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').val();
        var networkId = jQuery('.b2s-post-item-details-post-format[data-network-auth-id=' + networkAuthId + ']').attr('data-network-id');
        if (typeof postFormat !== typeof undefined && postFormat !== false) {
            if (postFormat == "0") {  //if linkpost
                jQuery('.b2s-post-item-details-post-format[data-network-id=' + networkId + ']').each(function () {
                    if (jQuery(this).val() == "0" && jQuery('.b2s-post-ship-item-post-format[data-network-auth-id=' + jQuery(this).attr('data-network-auth-id') + ']').is(":visible") && jQuery(this).attr('data-network-auth-id') != networkAuthId) { //other Linkpost by same network
                        //override this image with current image
                        jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').attr('src', currentImage);
                        jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').removeClass('b2s-img-required');
                        jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val(currentImage);
                        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').show();
                        if (networkCountId >= 0) {
                            jQuery('.b2s-image-remove-btn[data-network-count="-1"][data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
                        }
                    }
                });
                //customize sched content
                jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').attr('src', currentImage);
                jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + networkAuthId + '"]').removeClass('b2s-img-required');
                jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + networkAuthId + '"]').val(currentImage);
                jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"]').show();
                if (networkCountId >= 0) {
                    jQuery('.b2s-image-remove-btn[data-network-count="-1"][data-network-auth-id="' + networkAuthId + '"]').hide();
                }
            }
        }
    }
    jQuery('.b2s-upload-image-invalid-extension').hide();
    jQuery('.b2s-upload-image-no-permission').hide();
    jQuery('.b2s-upload-image-free-version-info').hide();
    jQuery('#b2s-network-select-image').modal('hide');
    return false;
});
jQuery(document).on('change', '.b2s-post-item-details-relay', function () {
    if (jQuery(this).attr('data-user-version') == 0) {
        jQuery(this).prop("checked", false);
        jQuery('#b2sInfoPostRelayModal').modal('show');
        return false;
    }
    jQuery('.b2s-post-item-relay-area-details-row[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
    if (jQuery(this).is(":checked")) {

        if (jQuery('#b2sRelayAccountData').val() != "") {
            jQuery('.b2s-post-item-relay-area-details-ul[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').show();
            jQuery('.b2s-post-item-relay-area-details-row[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').show();
            jQuery('.b2s-post-item-details-relay-area-label-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').show();
            jQuery('.b2s-post-item-details-relay-area-label-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').show();
            jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').show();
            jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').show();
            jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').removeAttr('disabled');
            jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').removeAttr('disabled');
            jQuery('.b2s-post-item-details-relay-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').show();
            //Relay Html Data
            if (jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').has('option').length == 0) {
                var optionData = window.atob(jQuery('#b2sRelayAccountData').val());
                jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="0"]').append(optionData);
            }

        } else {
            jQuery(this).prop("checked", false);
        }

    } else {
        jQuery('.b2s-post-item-relay-area-details-ul[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
        jQuery('.b2s-post-item-relay-area-details-row[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
        jQuery('.b2s-post-item-details-relay-area-label-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
        jQuery('.b2s-post-item-details-relay-area-label-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
        jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
        jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').prop('disabled', true);
        jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').prop('disabled', true);
        jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
        jQuery('.b2s-post-item-details-relay-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').hide();
    }
    return false;
});
jQuery(document).on('click', '.b2s-post-item-details-relay-input-add', function () {
    var netCount = jQuery(this).attr('data-network-count');
    var netCountNext = parseInt(netCount) + 1;
    jQuery(this).hide();
    jQuery('.b2s-post-item-relay-area-details-row[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-relay-area-label-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-relay-area-label-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
    jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').removeAttr('disabled');
    jQuery('.b2s-post-item-details-relay-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').show();
    jQuery('.b2s-post-item-details-relay-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').show();
    //Relay Html Data
    if (jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').has('option').length == 0) {
        var optionData = window.atob(jQuery('#b2sRelayAccountData').val());
        jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCountNext + '"]').append(optionData);
    }

    return false;
});
jQuery(document).on('click', '.b2s-post-item-details-relay-input-hide', function () {
    var netCount = jQuery(this).attr('data-network-count');
    jQuery('.b2s-post-item-relay-area-details-row[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').hide();
    jQuery('.b2s-post-item-details-relay-area-label-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').hide();
    jQuery('.b2s-post-item-details-relay-area-label-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').hide();
    jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').hide();
    jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').hide();
    jQuery('.b2s-post-item-details-relay-input-account[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').prop('disabled', true);
    jQuery('.b2s-post-item-details-relay-input-delay[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').prop('disabled', true);
    jQuery('.b2s-post-item-details-relay-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').hide()
    jQuery('.b2s-post-item-details-relay-input-hide[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + netCount + '"]').hide();
    if (netCount >= 1) {
        var before = netCount - 1;
        jQuery('.b2s-post-item-details-relay-input-add[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"][data-network-count="' + before + '"]').show();
    }

    return false;
});
jQuery(document).on('click', '.b2s-image-change-all-network', function () {
    jQuery('.b2s-post-item-details-item-message-input-allow-html').each(function () {
        var sce = jQuery(this).sceditor('instance');
        if (typeof sce !== 'undefined' && typeof sce.insert !== 'undefined') {
            if (sce.getBody().find(".b2s-post-item-details-image-html-src").length > 0) {
                sce.getBody().find(".b2s-post-item-details-image-html-src").attr('src', jQuery('input[name=image_url]:checked').val());
            } else {
                sce.insert("<br /><img class='b2s-post-item-details-image-html-src' src='" + jQuery('input[name=image_url]:checked').val() + "'/><br />");
            }
        }
    });
    jQuery('.b2s-post-item-details-url-image[data-network-image-change="1"]').attr('src', jQuery('input[name=image_url]:checked').val());
    jQuery('#b2s_blog_default_image').val(jQuery('input[name=image_url]:checked').val());
    jQuery('.b2s-post-item-details-url-image').removeClass('b2s-img-required');
    jQuery('.b2s-image-url-hidden-field').val(jQuery('input[name=image_url]:checked').val());
    jQuery('.b2s-image-remove-btn').show();
    var networkCountId = jQuery(this).attr('data-network-count');
    if (networkCountId >= 0) {
        jQuery('.b2s-image-remove-btn[data-network-count="-1"]').hide();
    }

    jQuery('.b2s-upload-image-invalid-extension').hide();
    jQuery('.b2s-upload-image-no-permission').hide();
    jQuery('.b2s-upload-image-free-version-info').hide();
    jQuery('.b2sChangeOgMeta').val("1");
    jQuery('.b2sChangeCardMeta').val("1");
    jQuery('#b2s-network-select-image').modal('hide');
    return false;
});
jQuery(document).on('click', '.b2s-upload-image', function () {
    if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {
        jQuery('#b2s-network-select-image').modal('hide');
        wpMedia = wp.media({
            title: jQuery('#b2s_wp_media_headline').val(),
            button: {
                text: jQuery('#b2s_wp_media_btn').val(),
            },
            multiple: false,
            library: {type: 'image'}
        });
        wpMedia.open();
        wpMedia.on('select', function () {
            var validExtensions = ['jpg', 'jpeg', 'png'];
            var attachment = wpMedia.state().get('selection').first().toJSON();
            var attachmenUrl = attachment.url;
            var attachmenUrlExt = attachmenUrl.substr(attachmenUrl.lastIndexOf('.') + 1);
            attachmenUrlExt = attachmenUrlExt.toLowerCase();
            if (jQuery.inArray(attachmenUrlExt, validExtensions) == -1) {
                jQuery('#b2s-network-select-image').modal('show');
                jQuery('.b2s-upload-image-invalid-extension').show();
                jQuery('#b2s-upload-image-invalid-extension-file-name').html('<span class="glyphicon glyphicon-ban-circle"></span> ' + attachment.name + '.' + attachmenUrlExt + '<br>');
                jQuery('.b2s-choose-image-no-image-info-text').hide();
                jQuery('.b2s-choose-image-no-image-extra-btn').hide();
                return false;
            }
            var count = parseInt(jQuery('.b2s-choose-image-count').val());
            count = count + 1;
            jQuery('.b2s-choose-image-count').val(count);
            var content = '<div class="b2s-image-item">' +
                    '<div class="b2s-image-item-thumb">' +
                    '<label for="b2s-image-count-' + count + '">' +
                    '<img class="img-thumbnail networkImage" alt="blogImage" src="' + attachment.url + '">' +
                    '</label>' +
                    '</div>' +
                    '<div class="b2s-image-item-caption text-center">' +
                    '<div class="b2s-image-item-caption-resolution clearfix small"></div>' +
                    '<input type="radio" value="' + attachment.url + '" class="checkNetworkImage" name="image_url" id="b2s-image-count-' + count + '">' +
                    '</div>' +
                    '</div>';
            jQuery('.b2s-image-choose-area').html(jQuery('.b2s-image-choose-area').html() + content);
            jQuery('.b2s-image-change-btn-area').show();
            jQuery('.b2s-choose-image-no-image-info-text').hide();
            jQuery('.b2s-choose-image-no-image-extra-btn').hide();
            jQuery('.b2s-upload-image-invalid-extension').hide();
            jQuery('input[name=image_url]:last').prop("checked", true);
            jQuery('#b2s-network-select-image').modal('show');
            imageSize();
        });
    } else {
        jQuery('.b2s-upload-image-no-permission').show();
    }
    return false;
});
jQuery(document).on('click', '.b2s-upload-image-free-version', function () {
    jQuery('.b2s-upload-image-free-version-info').show();
});
jQuery("#b2sNetworkSent").keypress(function (e) {
    if (e.keyCode == 13 && e.target.tagName == "INPUT")
        return false;
});
jQuery.validator.addMethod("checkUrl", function (value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
}, "Invalid Url");
jQuery.validator.addClassRules("b2s-post-item-details-item-url-input", {
    checkUrl: /^(https?:\/\/)?[a-zA-Z0-99ÄÖÜöäü-]+([\-\.]{1}[a-zA-Z0-99ÄÖÜöäü-]+)*\.[a-zA-Z0-9-]{2,20}(:[0-9]{1,5})?(\/.*)?$/
});
//Twitter TOS 032018 - protected multiple accounts with same content to same time
jQuery.validator.addMethod("unique", function (value, element, params) {
    var curNetworkAuthId = jQuery(element).attr('data-network-auth-id');
    var prefix = params;
    var selector = jQuery.validator.format("[name!='{0}'][unique='{1}']", element.name, prefix);
    var matches = new Array();
    //TOS Network Twitter 032018
    jQuery('.b2s-unique-content').hide();
    jQuery('.tw-textarea-input').removeClass('error');
    jQuery(selector).each(function (index, item) {
        //none disabled elements || ignore default content if curSchedMode=1
        if (!jQuery(item).is(':not(:disabled)') || !jQuery(item).is(':visible') || !jQuery('.b2s-post-item[data-network-auth-id="' + jQuery(item).attr('data-network-auth-id') + '"]').is(':visible') || (jQuery(item).attr('data-network-count') == -1 && jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + jQuery(item).attr('data-network-auth-id') + '"] option[value="1"]:selected').length > 0)) {
            return true;
        }
        if (jQuery.trim(value) == jQuery.trim(jQuery(item).val())) {
            jQuery('.b2s-unique-content[data-network-auth-id="' + jQuery(item).attr('data-network-auth-id') + '"]').show();
            jQuery('.tw-textarea-input[data-network-auth-id="' + jQuery(item).attr('data-network-auth-id') + '"]').addClass('error');
            matches.push(item);
        }
    });
    if (matches.length != 0) {
        jQuery('.b2s-unique-content[data-network-auth-id="' + curNetworkAuthId + '"]').show();
    }
    return matches.length == 0;
});
jQuery.validator.classRuleSettings.unique = {
    unique: true
};
jQuery.validator.addMethod("checkTags", function (value, element, test) {
    var allowed_tags = ['p', 'h1', 'h2', 'br', 'i', 'b', 'a', 'img'];
    var tags = value.match(/(<([^>]+)>)/ig);
    if (tags !== null && tags.length > 0) {
        if (jQuery(element).hasClass('b2s-post-item-details-item-message-input-allow-html')) {
            for (var i = 0; i < tags.length; i++) {
                var allowed_count = 0;
                for (var e = 0; e < allowed_tags.length; e++) {
                    var regex = new RegExp("<\s*(\/)?" + allowed_tags[e] + "(( [^>]*>)|[>])");
                    if (tags[i].match(regex) != null) {
                        allowed_count = 1;
                    }
                }
                if (allowed_count == 0) {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    return true;
});
jQuery.validator.addClassRules('b2s-post-item-details-item-message-input', {'checkTags': true});
jQuery.validator.addClassRules('b2s-post-item-details-release-input-date-select', {'checkSched': true});
jQuery.validator.addClassRules('b2s-post-item-details-item-title-input', {required: true});
jQuery.validator.addMethod('checkSched', function (value, element, rest) {
    if (jQuery(element).is(':not(:disabled)') && jQuery(element).val() != 0) {
        var networkAuthId = jQuery(element).attr('data-network-auth-id');
        if (jQuery('.b2s-post-item-details-release-input-time[data-network-auth-id="' + networkAuthId + '"]').val() == "") {
            jQuery('.b2s-post-item-details-release-input-time[data-network-auth-id="' + networkAuthId + '"]').addClass('error');
            return false;
        } else {
            jQuery('.b2s-post-item-details-release-input-time[data-network-auth-id="' + networkAuthId + '"]').removeClass('error');
        }
        if (jQuery(element).val() == 1) {
            if (jQuery('.b2s-post-item-details-release-input-date[data-network-auth-id="' + networkAuthId + '"]').val() == "") {
                jQuery('.b2s-post-item-details-release-input-date[data-network-auth-id="' + networkAuthId + '"]').addClass('error');
                return false;
            } else {
                jQuery('.b2s-post-item-details-release-input-date[data-network-auth-id="' + networkAuthId + '"]').removeClass('error');
            }

        } else {
            var maxCount = jQuery('.b2s-post-item-details-release-input-daySelect[data-network-auth-id="' + networkAuthId + '"]').length;
            jQuery('.b2s-post-item-details-release-input-days[data-network-auth-id="' + networkAuthId + '"]').removeClass('error');
            var daySelect = false;
            var daySelectErrorCount = 0;
            for (var count = 0; count < maxCount; count++) {
                if (jQuery('.b2s-post-item-details-release-input-lable-day-mo[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + count + '"]').is(':not(:disabled)')) {
                    daySelect = false;
                    jQuery('.b2s-post-item-details-release-input-days[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + count + '"]').each(function () {
                        if (jQuery(this).is(':checked')) {
                            daySelect = true;
                        }
                    });
                    if (daySelect === false) {
                        daySelectErrorCount += 1;
                        jQuery('.b2s-post-item-details-release-input-days[data-network-auth-id="' + networkAuthId + '"][data-network-count="' + count + '"]').addClass('error');
                    }
                }
            }
            if (daySelectErrorCount != 0) {
                return false;
            }
        }
    }
    return true;
});
jQuery("#b2sNetworkSent").validate({
    ignore: "",
    errorPlacement: function () {
        return false;
    },
    submitHandler: function (form) {
        if (checkNetworkSelected() == false) {
            return false;
        }
        if (checkPostSchedOnBlog() == false) {
            return false;
        }
        if (checkImageByImageNetworks() == false) {
            return false;
        }

        var userDate = new Date();
        var pubDate = userDate.getFullYear() + "-" + padDate(userDate.getMonth() + 1) + "-" + padDate(userDate.getDate()) + " " + padDate(userDate.getHours()) + ":" + padDate(userDate.getMinutes()) + ":" + padDate(userDate.getSeconds());
        jQuery('#publish_date').val(pubDate);
        jQuery(".b2s-loading-area").show();
        jQuery(".b2s-post-area").hide();
        jQuery(".b2s-settings-user-sched-time-area").hide();
        jQuery('#b2s-sidebar-wrapper').hide();
        jQuery('.b2s-post-item-info-area').hide();
        jQuery.xhrPool.abortAll();
        jQuery('.b2s-server-connection-fail').hide();
        jQuery.ajax({
            processData: false,
            url: ajaxurl,
            type: "POST",
            dataType: "json",
            cache: false,
            data: jQuery(form).serialize(),
            error: function () {
                jQuery('.b2s-server-connection-fail').show();
                return false;
            },
            success: function (data) {
                var content = data.content;
                jQuery(".b2s-loading-area").hide();
                for (var i = 0; i < content.length; i++) {
                    jQuery('.b2s-post-item-details-message-info[data-network-auth-id="' + content[i]['networkAuthId'] + '"]').hide();
                    jQuery('.b2s-post-item-details-edit-area[data-network-auth-id="' + content[i]['networkAuthId'] + '"]').hide();
                    jQuery('.b2s-post-item-details-message-result[data-network-auth-id="' + content[i]['networkAuthId'] + '"]').show();
                    jQuery('.b2s-post-item-details-message-result[data-network-auth-id="' + content[i]['networkAuthId'] + '"]').html(content[i]['html']);
                }
                jQuery(".b2s-post-area").show();
                jQuery('.b2s-publish-area').hide();
                jQuery('.b2s-footer-menu').hide();
                window.scrollTo(0, 0);
                jQuery('.b2s-empty-area').hide();
                jQuery('.b2s-reporting-btn-area').show();
                wp.heartbeat.connectNow();
            }
        });
        return false;
    }
});
jQuery('#b2s-network-list-modal').on('show.bs.modal', function (e) {
    jQuery('.b2s-network-list-modal-mandant').html(jQuery(".b2s-network-details-mandant-select option:selected").text());
});
jQuery(window).on("load", function () {
    var showMeridian = true;
    if (jQuery('#b2sUserLang').val() == 'de') {
        showMeridian = false;
    }
    jQuery('.b2s-settings-sched-item-input-time').timepicker({
        minuteStep: 30,
        appendWidgetTo: 'body',
        showSeconds: false,
        showMeridian: showMeridian,
        defaultTime: 'current'
    });
});
jQuery('#b2s-save-time-settings-btn-trigger').on('click', function () {
    jQuery('#b2s-save-time-settings-btn').trigger('click');
});
jQuery('#b2sSaveUserSettingsSchedTime').validate({
    ignore: "",
    errorPlacement: function () {
        return false;
    },
    submitHandler: function (form) {
        jQuery('#b2s-time-settings-modal').modal('hide');
        jQuery('.b2s-settings-user-success').hide();
        jQuery('.b2s-settings-user-error').hide();
        jQuery('.b2s-server-connection-fail').hide();
        jQuery.ajax({
            processData: false,
            url: ajaxurl,
            type: "POST",
            dataType: "json",
            cache: false,
            data: jQuery(form).serialize(),
            error: function () {
                jQuery('.b2s-server-connection-fail').show();
                return false;
            },
            success: function (data) {
                if (data.result == true) {
                    jQuery('.b2s-settings-user-success').show();
                } else {
                    jQuery('.b2s-settings-user-error').show();
                }
            }
        });
        return false;
    }
});
jQuery(document).on('click', '.b2s-loading-area-save-profile-change', function () {
    var selectedAuth = new Array();
    jQuery('.b2s-network-list.active').each(function () {
        selectedAuth.push(jQuery(this).parents('.b2s-network-select-btn').attr('data-network-auth-id'));
    });
    jQuery('.b2s-server-connection-fail').hide();
    jQuery.ajax({
        url: ajaxurl,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {
            'action': 'b2s_ship_navbar_save_settings',
            'mandantId': jQuery('.b2s-network-details-mandant-select').val(),
            'selectedAuth': selectedAuth
        },
        error: function () {
            jQuery('.b2s-server-connection-fail').show();
            return false;
        },
        success: function (data) {
            if (data.result == true) {
                jQuery('.b2s-ship-settings-save').show();
                window.scrollTo(0, 0);
                var mandantId = jQuery('.b2s-network-details-mandant-select').val();
                jQuery('.b2s-network-list').each(function () {
                    var jsonMandantIds = jQuery(this).parents('.b2s-sidbar-wrapper-nav-li').attr('data-mandant-id');
                    if (jsonMandantIds !== undefined) {
                        var jsonMandantIds = jQuery.parseJSON(jsonMandantIds);
                        if (jsonMandantIds.indexOf(mandantId) !== -1 && !jQuery(this).hasClass('active')) {
                            //remove
                            var newMandant = new Array();
                            jQuery(jsonMandantIds).each(function (index, item) {
                                if (item !== mandantId) {
                                    newMandant.push(item);
                                }
                            });
                            jQuery(this).parents('.b2s-sidbar-wrapper-nav-li').attr('data-mandant-id', JSON.stringify(newMandant));
                        } else if (jsonMandantIds.indexOf(mandantId) == -1 && jQuery(this).hasClass('active')) {
                            //add
                            jsonMandantIds.push(mandantId);
                            jQuery(this).parents('.b2s-sidbar-wrapper-nav-li').attr('data-mandant-id', JSON.stringify(jsonMandantIds));
                        }
                    }
                });
            }
        }
    });
});
window.addEventListener('message', function (e) {
    if (e.origin == jQuery('#b2sServerUrl').val()) {
        var data = JSON.parse(e.data);
        loginSuccess(data.networkId, data.networkType, data.displayName, data.networkAuthId, data.mandandId);
    }
});
jQuery.xhrPool.abortAll = function () { // our abort function
    jQuery(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });
    jQuery.xhrPool.length = 0
};
function loadingDummyShow(networkAuthId, networkId) {
    jQuery('.b2s-post-item-connection-fail-dummy[data-network-auth-id="' + networkAuthId + '"]').remove();
    var html = '<div class="b2s-post-item b2s-post-item-loading-dummy" data-network-auth-id="' + networkAuthId + '">'
            + '<div class="panel panel-group">'
            + '<div class="panel-body">'
            + '<div class="b2s-post-item-area">'
            + '<div class="b2s-post-item-details">'
            + '<div class="b2s-loader-impulse b2s-loader-impulse-md b2s-post-item-loading-impulse-area">'
            + '<img class="img-responsive" src="' + jQuery('#b2sPortalImagePath').val() + networkId + '_flat.png" alt="">'
            + '</div>'
            + '<div class="clearfix"></div>'
            + '<div class="text-center"><small>'
            + jQuery('#b2sJsTextLoading').val()
            + '</small></div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
    var order = jQuery.parseJSON(jQuery('.b2s-network-navbar-order').val());
    var pos = order.indexOf(networkAuthId.toString());
    var add = false;
    for (var i = pos; i >= 0; i--) {
        if (jQuery('.b2s-post-item[data-network-auth-id="' + order[i] + '"]').length > 0) {
            jQuery('.b2s-post-item[data-network-auth-id="' + order[i] + '"]').after(html);
            i = -1;
            add = true;
        }
    }
    if (add == false) {
        jQuery('.b2s-post-list').prepend(html);
    }
}

function loadingDummyConnectionFail(networkAuthId, networkId) {
    var html = '<div class="b2s-post-item b2s-post-item-connection-fail-dummy" data-network-auth-id="' + networkAuthId + '">'
            + '<div class="panel panel-group">'
            + '<div class="panel-body">'
            + '<div class="b2s-post-item-area">'
            + '<div class="b2s-post-item-details">'
            + '<div class="b2s-post-item-details-portal-img-area">'
            + '<img class="img-responsive" src="' + jQuery('#b2sPortalImagePath').val() + networkId + '_flat.png" alt="">'
            + '</div>'
            + '<div class="clearfix"></div>'
            + '<div class="text-center"><small>'
            + jQuery('#b2sJsTextConnectionFail').val()
            + '</small>'
            + '<br/>'
            + '<a class="btn btn-link btn-sm" target="_blank" href="' + jQuery('#b2sJsTextConnectionFailLink').val() + '">' + jQuery('#b2sJsTextConnectionFailLinkText').val() + '</a>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
    jQuery('.b2s-post-item-loading-dummy[data-network-auth-id="' + networkAuthId + '"]').replaceWith(html);
}

function init(firstrun) {
    var dateFormat = "yyyy-mm-dd";
    var language = "en";
    var showMeridian = true;
    if (jQuery('#b2sUserLang').val() == "de") {
        dateFormat = "dd.mm.yyyy";
        language = "de";
        showMeridian = false;
    }
    var today = new Date();
    if (jQuery('#b2sBlogPostSchedDate').length > 0) {
        today.setTime(jQuery('#b2sBlogPostSchedDate').val());
    }
    jQuery(".b2s-post-item-details-release-input-date").datepicker({
        format: dateFormat,
        language: language,
        maxViewMode: 2,
        todayHighlight: true,
        startDate: today,
        calendarWeeks: true,
        autoclose: true
    });
    jQuery('.b2s-post-item-details-release-input-time').timepicker({
        minuteStep: 15,
        appendWidgetTo: 'body',
        showSeconds: false,
        showMeridian: showMeridian,
        defaultTime: 'current',
        snapToStep: true
    });
    checkNetworkSelected();
    //imageCheck();
    if (firstrun == true) {
        jQuery(window).scroll(function () {
            submitArea();
        });
        jQuery('.b2s-post-item-details-release-input-date-select').each(function () {
            releaseChoose(jQuery(this).val(), jQuery(this).attr('data-network-auth-id'), 0);
        });
        hideDuplicateAuths();
        chooseMandant();
    }
}



function initSceditor(networkAuthId) {
    var sceditor = jQuery('.b2s-post-item-details-item-message-input-allow-html[data-network-auth-id="' + networkAuthId + '"]').sceditor('instance');
    if (typeof sceditor !== 'undefined' && typeof sceditor.destroy == 'function') {
        sceditor.destroy();
    }

    jQuery('.b2s-post-item-details-item-message-input-allow-html[data-network-auth-id="' + networkAuthId + '"]').sceditor({
        plugins: 'xhtml',
        toolbar: "h1,h2,bold,italic,link,unlink,custom-image|source",
        autoUpdate: true,
        emoticonsEnabled: false
    });
    var sceditor = jQuery('.b2s-post-item-details-item-message-input-allow-html[data-network-auth-id="' + networkAuthId + '"]').sceditor('instance');
    if (typeof sceditor !== 'undefined' && typeof sceditor.destroy == 'function') {
        sceditor.keyUp(function () {
            jQuery(this).parents('.b2s-post-item-details').find('.b2s-post-item-countChar').html(jQuery(this).prev('.b2s-post-item-details-item-message-input').sceditor('instance').getBody().text().length);
        });
        jQuery('.b2s-post-item-details-item-message-input-allow-html[data-network-auth-id="' + networkAuthId + '"]').next('.sceditor-container').find('textarea').on('keyup', function () {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = jQuery(this).val();
            jQuery(this).parents('.b2s-post-item-details').find('.b2s-post-item-countChar').html(tmp.innerText.length);
        });
    }


}

function submitArea() {
    if (jQuery('.b2s-publish-area').length > 0) {
        if (jQuery(window).scrollTop() + jQuery(window.top).height() >= jQuery('.b2s-publish-area').offset().top) {
            jQuery(".b2s-footer-menu").hide();
        } else {
            jQuery(".b2s-footer-menu").show();
        }
    }
}

function imageSize() {
    jQuery('.networkImage').each(function () {
        var width = this.naturalWidth;
        var height = this.naturalHeight;
        jQuery(this).parents('.b2s-image-item').find('.b2s-image-item-caption-resolution').html(width + 'x' + height);
        if (width == 0)
        {
            setTimeout(function () {
                imageSize();
            }, 50);
        }
    });
}

function navbarDeactivatePortal(reason) {
    if (reason == "image") {
        var portale = Array(6, 7, 12);
        for (var i = 0; i <= portale.length; i++) {
            jQuery('.b2s-network-select-btn[data-network-id="' + portale[i] + '"]').addClass('b2s-network-select-btn-deactivate');
            jQuery('.b2s-network-status-no-img[data-network-id="' + portale[i] + '"]').show();
        }
    }
}

function navbarActivatePortal(reason) {
    if (reason == "image") {
        var portale = Array(6, 7, 12);
        for (var i = 0; i <= portale.length; i++) {
            jQuery('.b2s-network-select-btn[data-network-id="' + portale[i] + '"]').removeClass('b2s-network-select-btn-deactivate');
            jQuery('.b2s-network-status-no-img[data-network-id="' + portale[i] + '"]').hide();
        }
    }
}

function deactivatePortal(networkAuthId) {
    var selector = '.b2s-post-item[data-network-auth-id="' + networkAuthId + '"]';
    jQuery(selector).hide();
    jQuery(selector).find('.form-control').each(function () {
        jQuery(this).attr("disabled", "disabled");
    });
    jQuery('.b2s-network-select-btn[data-network-auth-id="' + networkAuthId + '"]').children().removeClass('active').find('.b2s-network-status-img').addClass('b2s-network-hide');
    checkNetworkSelected();
    submitArea();
    return true;
}

function activatePortal(networkAuthId, check) {
    var selector = '.b2s-post-item[data-network-auth-id="' + networkAuthId + '"]';
    jQuery(selector).show();
    jQuery(selector).find('.form-control').each(function () {

        if (!jQuery(this).hasClass('b2s-post-item-details-item-message-input')) {
            jQuery(this).removeAttr("disabled", "disabled");
        }

        if ((jQuery(this).hasClass('b2s-post-item-details-release-input-weeks')) ||
                (jQuery(this).hasClass('b2s-post-item-details-release-input-date')) ||
                (jQuery(this).hasClass('b2s-post-item-details-release-input-time')) ||
                (jQuery(this).hasClass('b2s-post-item-details-release-input-days')) ||
                (jQuery(this).hasClass('b2s-post-item-details-relay-input-delay')) ||
                (jQuery(this).hasClass('b2s-post-item-details-relay-input-account'))) {
            if (!jQuery(this).is(':visible')) {
                jQuery(this).prop('disabled', true);
            }
        }
    });
    //Customize Content
    if (jQuery('.b2s-post-item-details-release-input-date-select[data-network-auth-id="' + networkAuthId + '"]').val() == 1) {
        jQuery('.b2s-image-remove-btn[data-network-auth-id="' + networkAuthId + '"][data-network-count="-1"]').hide();
        jQuery(selector).find('.b2s-post-item-details-item-message-input').each(function () {
            if (jQuery(this).is(':visible')) {
                jQuery(this).removeAttr("disabled", "disabled");
            }
        });
    } else {
        jQuery('.b2s-post-item-details-item-message-input[data-network-auth-id="' + networkAuthId + '"][data-network-count="-1"]').removeAttr("disabled", "disabled");
    }



    jQuery('.b2s-network-select-btn[data-network-auth-id="' + networkAuthId + '"]').children().addClass('active').find('.b2s-network-hide').removeClass('b2s-network-hide');
    checkNetworkSelected();
    submitArea();
}

function checkNetworkSelected() {
//überprüfen ob mindestens ein PostItem vorhanden und sichtbar ist
    var visible = false;
    jQuery('.b2s-post-list').find('.b2s-post-item').each(function () {
        if (jQuery(this).is(":visible")) {
            visible = true;
        }
    });
    if (jQuery('.b2s-post-list').text().trim() == "" || visible == false) {
        jQuery('.b2s-publish-area').hide();
        jQuery('.b2s-footer-menu').hide();
        jQuery('.b2s-empty-area').show();
        return false;
    } else {
        jQuery('.b2s-publish-area').show();
        if (jQuery('.b2s-publish-area').length > 0) {
            if (jQuery(window).scrollTop() + jQuery(window.top).height() < jQuery('.b2s-publish-area').offset().top) {
                jQuery('.b2s-footer-menu').show();
            }
        }
        jQuery('.b2s-empty-area').hide();
        return true;
    }
}

function checkPostSchedOnBlog() {
    if (jQuery('#b2sBlogPostSchedDate').length > 0) {
        if (jQuery('#b2sSchedPostInfoIgnore').val() == "0") {
            if (jQuery('.b2s-post-item-details-release-input-date-select option[value="0"]:selected').length > 0) {
                jQuery('#b2s-network-sched-post-info').modal("show");
                return false;
            }
        }
    }
    return true;
}

function checkImageByImageNetworks() {
    var result = true;
    jQuery('.b2sOnlyWithImage').each(function () {
        if (jQuery(this).is(":visible")) {
            if (jQuery('.b2s-image-url-hidden-field[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').val() == "") {
                if (!jQuery('#b2s-network-select-image').hasClass('in')) {
                    jQuery('.b2s-post-item-details-url-image[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"]').addClass('b2s-img-required');
                    jQuery('.b2s-image-change-this-network').attr('data-network-auth-id', jQuery(this).attr('data-network-auth-id'));
                    jQuery('.b2s-upload-image').attr('data-network-auth-id', jQuery(this).attr('data-network-auth-id'));
                    jQuery('#b2s-network-select-image').modal('show');
                    imageSize();
                    window.scrollTo(0, (jQuery(this).offset().top - 45));
                }
                result = false;
            }
        }
    });
    return result;
}


function releaseChoose(choose, dataNetworkAuthId, dataNetworkCount) {
    var selectorInput = '[data-network-auth-id="' + dataNetworkAuthId + '"]';
    jQuery('.b2s-post-item-details-release-area-details-row' + selectorInput).hide();
    if (choose == 0) {

        //since 4.8.0 customize content
        if (jQuery('.b2s-post-item-details-release-input-date-select' + selectorInput).attr('data-network-customize-content') == "1") {
            jQuery('.b2s-post-item-details-item-message-input' + selectorInput + '[data-network-count="-1"]').removeAttr('disabled');
            jQuery('.b2s-post-item-details-item-message-input' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-post-item-details-url-image' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-select-image-modal-open' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-image-remove-btn' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-post-original-area' + selectorInput).addClass('col-sm-7').addClass('col-lg-9');
            jQuery('.b2s-post-tool-area' + selectorInput).show();
        }

        jQuery('.b2s-post-item-details-release-input-date' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-customize-sched-area-details-row' + selectorInput).hide();
        jQuery('.b2s-post-item-sched-customize-text' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-date' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-time' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-weeks' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-weeks' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).val("0");
        //monthly- duration month
        jQuery('.b2s-post-item-details-release-area-div-duration-month' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-month' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months' + selectorInput).prop('disabled');
        //monthly- publish day (select-day)
        jQuery('.b2s-post-item-details-release-area-label-select-day' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-day' + selectorInput).prop('disabled');
        jQuery('.b2s-post-item-details-release-input-select-day' + selectorInput).hide();
        //own period- duration times
        jQuery('.b2s-post-item-details-release-area-div-duration-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times' + selectorInput).prop('disabled');
        //own period- timespan
        jQuery('.b2s-post-item-details-release-area-label-select-timespan' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan' + selectorInput).prop('disabled');
        jQuery('.b2s-post-item-details-release-input-days' + selectorInput).prop('disabled');
        jQuery('.b2s-post-item-details-release-input-daySelect' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-add' + selectorInput).hide();
        jQuery('.2s-post-item-details-release-area-details-ul' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-save-settings' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-area-details-ul' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-save-settings-label' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-interval' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-date' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-day' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-duration' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-interval' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-date' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-day' + selectorInput).hide();
    } else if (choose == 1) {

        //since 4.8.0 customize content
        if (jQuery('.b2s-post-item-details-release-input-date-select' + selectorInput).attr('data-network-customize-content') == "1") {
            jQuery('.b2s-post-item-details-item-message-input' + selectorInput + '[data-network-count="-1"]').prop('disabled', true);
            jQuery('.b2s-post-item-details-item-message-input' + selectorInput + '[data-network-count="-1"]').hide();
            jQuery('.b2s-post-item-details-url-image' + selectorInput + '[data-network-count="-1"]').hide();
            jQuery('.b2s-select-image-modal-open' + selectorInput + '[data-network-count="-1"]').hide();
            jQuery('.b2s-image-remove-btn' + selectorInput + '[data-network-count="-1"]').hide();
            jQuery('.b2s-post-original-area' + selectorInput).removeClass('col-sm-7').removeClass('col-lg-9');
            jQuery('.b2s-post-tool-area' + selectorInput).hide();
            //TOS Network Twitter
            if (jQuery('.b2s-post-item-details-release-input-date-select' + selectorInput).attr('data-network-id') == "2") {
                jQuery('.b2s-post-ship-item-copy-original-text' + selectorInput + '[data-network-count="0"]').trigger('click');
            }
        }

        jQuery('.b2s-post-item-details-release-area-details-row' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-date' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-date' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-time' + selectorInput).prop('disabled', true);
        for (var i = 0; i <= dataNetworkCount; i++) {
            jQuery('.b2s-post-item-details-release-area-details-row[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-date[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-date[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
            jQuery('.b2s-post-item-details-release-input-time[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-time[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
            //since 4.8.0 customize content
            jQuery('.b2s-post-item-details-release-customize-sched-area-details-row[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-item-message-input[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
        }
        jQuery('.b2s-post-item-details-release-input-weeks' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-weeks' + selectorInput).prop('disabled');
        //monthly- duration month
        jQuery('.b2s-post-item-details-release-area-div-duration-month' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-month' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months' + selectorInput).prop('disabled');
        //monthly- publish day (select-day)
        jQuery('.b2s-post-item-details-release-area-label-select-day' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-day' + selectorInput).prop('disabled');
        jQuery('.b2s-post-item-details-release-input-select-day' + selectorInput).hide();
        //own period- duration times
        jQuery('.b2s-post-item-details-release-area-div-duration-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times' + selectorInput).prop('disabled');
        //own period- timespan
        jQuery('.b2s-post-item-details-release-area-label-select-timespan' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan' + selectorInput).prop('disabled');
        //new since v.4.5.0
        jQuery('.b2s-post-item-details-release-area-label-duration' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-interval-select' + selectorInput).val("0");
        jQuery('.b2s-post-item-details-release-input-daySelect' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-days' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-add' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-details-ul' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-save-settings' + selectorInput).prop('disabled', false);
        jQuery('.b2s-post-item-details-release-save-settings-label' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-interval' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-date' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-time' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-day' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-duration' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-interval' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-date' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-div-time' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-div-day' + selectorInput).hide();
    } else if (choose == 2) {

        //since 4.8.0 customize content
        if (jQuery('.b2s-post-item-details-release-input-date-select' + selectorInput).attr('data-network-customize-content') == "1") {
            jQuery('.b2s-post-item-details-item-message-input' + selectorInput + '[data-network-count="-1"]').removeAttr('disabled');
            jQuery('.b2s-post-item-details-item-message-input' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-post-item-details-url-image' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-select-image-modal-open' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-image-remove-btn' + selectorInput + '[data-network-count="-1"]').show();
            jQuery('.b2s-post-original-area' + selectorInput).addClass('col-sm-7').addClass('col-lg-9');
            jQuery('.b2s-post-tool-area' + selectorInput).show();
        }

        jQuery('.b2s-post-item-details-release-area-details-row' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-customize-sched-area-details-row' + selectorInput).hide();
        jQuery('.b2s-post-item-sched-customize-text' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-date' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-date' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-time' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-time' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-input-add' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-daySelect' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-details-ul' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-save-settings' + selectorInput).prop('disabled', false);
        jQuery('.b2s-post-item-details-release-save-settings-label' + selectorInput).hide();
        for (var i = 0; i <= dataNetworkCount; i++) {
            jQuery('.b2s-post-item-details-release-area-details-row[data-network-count="' + i + '"]' + selectorInput).show();
            //new since v4.5.0
            jQuery('.b2s-post-item-details-release-input-interval-select[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-interval-select[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
            jQuery('.b2s-post-item-details-release-input-date[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-date[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
            jQuery('.b2s-post-item-details-release-input-daySelect[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-time[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-time[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
            jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + i + '"]' + selectorInput).show();
            jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
            jQuery('.b2s-post-item-details-release-input-days[data-network-count="' + i + '"]' + selectorInput).removeAttr('disabled');
        }
        jQuery('.b2s-post-item-details-release-area-label-duration' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-interval' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-date' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-time' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-day' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-div-duration' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-div-interval' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-div-date' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-div-time' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-div-day' + selectorInput).show();
    }

    var showMeridian = true;
    if (jQuery('#b2sUserLang').val() == 'de') {
        showMeridian = false;
    }

    jQuery('.b2s-post-item-details-release-input-time').timepicker({
        minuteStep: 15,
        appendWidgetTo: 'body',
        showSeconds: false,
        showMeridian: showMeridian,
        defaultTime: 'current',
        snapToStep: true
    });
}


function releaseChooseInterval(interval, selectorInput, dataCount) {
    //change view
    if (interval == 0) { //weekly,default
        // show
        //select days
        jQuery('.b2s-post-item-details-release-input-days[data-network-count="' + dataCount + '"]' + selectorInput).removeAttr('disabled');
        jQuery('.b2s-post-item-details-release-area-label-day[data-network-count="' + dataCount + '"]' + selectorInput).show();
        //duration weeks
        jQuery('.b2s-post-item-details-release-area-div-duration[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-duration[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + dataCount + '"]' + selectorInput).removeAttr('disabled');
        //hide
        //monthly- duration month
        jQuery('.b2s-post-item-details-release-area-div-duration-month[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-month[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        //monthly- publish day (select-day)
        jQuery('.b2s-post-item-details-release-area-label-select-day[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        //own period- duration times
        jQuery('.b2s-post-item-details-release-area-div-duration-time[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-time[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        //own period- timespan
        jQuery('.b2s-post-item-details-release-area-label-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
    }

    if (interval == 1) { //monthly
        // show
        //duration month
        jQuery('.b2s-post-item-details-release-area-div-duration-month[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-duration-month[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + dataCount + '"]' + selectorInput).removeAttr('disabled');
        //publish day (select-day)
        jQuery('.b2s-post-item-details-release-area-label-select-day[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + dataCount + '"]' + selectorInput).removeAttr('disabled');
        jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + dataCount + '"]' + selectorInput).show();
        //hide
        //weekly - select days
        jQuery('.b2s-post-item-details-release-input-days[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-area-label-day[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        //weekly- duration weeks
        jQuery('.b2s-post-item-details-release-area-div-duration[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        //own period- duration times
        jQuery('.b2s-post-item-details-release-area-div-duration-time[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-time[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        //own period- timespan
        jQuery('.b2s-post-item-details-release-area-label-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
    }

    if (interval == 2) { //own period
        // show
        //duration times
        jQuery('.b2s-post-item-details-release-area-div-duration-time[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-area-label-duration-time[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + dataCount + '"]' + selectorInput).show(); //select
        jQuery('.b2s-post-item-details-release-input-times[data-network-count="' + dataCount + '"]' + selectorInput).removeAttr('disabled'); //select
        //timespan
        jQuery('.b2s-post-item-details-release-area-label-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).show();
        jQuery('.b2s-post-item-details-release-input-select-timespan[data-network-count="' + dataCount + '"]' + selectorInput).removeAttr('disabled');
        //hide
        //weekly - select days
        jQuery('.b2s-post-item-details-release-input-days[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled', true);
        jQuery('.b2s-post-item-details-release-area-label-day[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        //weekly- duration weeks
        jQuery('.b2s-post-item-details-release-area-div-duration[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-weeks[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        //monthly- duration month
        jQuery('.b2s-post-item-details-release-area-div-duration-month[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-area-label-duration-month[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-months[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        //monthly- publish day (select-day)
        jQuery('.b2s-post-item-details-release-area-label-select-day[data-network-count="' + dataCount + '"]' + selectorInput).hide();
        jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + dataCount + '"]' + selectorInput).prop('disabled');
        jQuery('.b2s-post-item-details-release-input-select-day[data-network-count="' + dataCount + '"]' + selectorInput).hide();
    }
}



function addTag(networkAuthId) {
    var selector = ".b2s-post-item-details-tag-input-elem[data-network-auth-id='" + networkAuthId + "']";
    jQuery(selector).last().after('<input class="form-control b2s-post-item-details-tag-input-elem" data-network-auth-id="' + networkAuthId + '" value="" name="b2s[' + networkAuthId + '][tags][]">');
    jQuery(".remove-tag-btn[data-network-auth-id='" + networkAuthId + "'").show();
}

function removeTag(networkAuthId) {
    var selector = ".b2s-post-item-details-tag-input-elem[data-network-auth-id='" + networkAuthId + "']";
    jQuery(selector).last().remove();
    if (jQuery(selector).length === 1)
        jQuery(".remove-tag-btn[data-network-auth-id='" + networkAuthId + "'").hide();
}

function networkLimitAll(networkAuthId, networkId, limit) {

    var networkCountId = -1; //default;
    if (jQuery(':focus').length > 0) {
        var attr = jQuery(':focus').attr('data-network-count');
        if (typeof attr !== typeof undefined && attr !== false) {
            networkCountId = attr;
        }
    }

    var regX = /(<([^>]+)>)/ig;
    var url = jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").val();
    var text = jQuery(".b2s-post-item-details-item-message-input[data-network-count='" + networkCountId + "'][data-network-auth-id='" + networkAuthId + "']").val();
    jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").removeClass("error");
    if (url.length != "0") {
        if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
            url = "http://" + url;
            jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").val(url);
        }
    } else if (jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").hasClass("required_network_url")) {
        url = jQuery("#b2sDefault_url").val();
        jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").val(url);
    }

    var textLength = text.length;
    var newText = text;
    if (networkId == "2") { //twitter
        if (url.length != "0") {
            limit = limit - 24;
        }
    }
    if (textLength >= limit) {
        newText = text.substring(0, limit);
        var pos = getCaretPos(this);
        jQuery(".b2s-post-item-details-item-message-input[data-network-count='" + networkCountId + "'][data-network-auth-id='" + networkAuthId + "']").val(newText.replace(regX, ""));
        setCaretPos(this, pos);
        var text = jQuery(".b2s-post-item-details-item-message-input[data-network-count='" + networkCountId + "'][data-network-auth-id='" + networkAuthId + "']").val();
        var textLength = text.length;
    }
    var newLen = limit - textLength;
    jQuery(".b2s-post-item-countChar[data-network-count='" + networkCountId + "'][data-network-auth-id='" + networkAuthId + "']").html(newLen);
}

function networkCount(networkAuthId) {

    var networkCountId = -1; //default;
    if (jQuery(':focus').length > 0) {
        var attr = jQuery(':focus').attr('data-network-count');
        if (typeof attr !== typeof undefined && attr !== false) {
            networkCountId = attr;
        }
    }
    var url = jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").val();
    var text = jQuery(".b2s-post-item-details-item-message-input[data-network-count='" + networkCountId + "'][data-network-auth-id='" + networkAuthId + "']").val();
    jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").removeClass("error");
    if (url.length != "0") {
        if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
            url = "http://" + url;
            jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").val(url);
        }
    } else if (jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").hasClass("required_network_url")) {
        url = jQuery("#b2sDefault_url").val();
        jQuery(".b2s-post-item-details-item-url-input[data-network-auth-id='" + networkAuthId + "']").val(url);
    }
    var textLength = text.length;
    jQuery(".b2s-post-item-countChar[data-network-count='" + networkCountId + "'][data-network-auth-id='" + networkAuthId + "']").html(textLength);
}


function getCaretPos(domElem) {
    var pos;
    if (document.selection) {
        domElem.focus();
        var sel = document.selection.createRange();
        sel.moveStart("character", -domElem.value.length);
        pos = sel.text.length;
    } else if (domElem.selectionStart || domElem.selectionStart == "0")
        pos = domElem.selectionStart;
    return pos;
}

function setCaretPos(domElem, pos) {
    if (domElem.setSelectionRange) {
        domElem.focus();
        domElem.setSelectionRange(pos, pos);
    } else if (domElem.createTextRange) {
        var range = domElem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
}

function ucfirst(str) {
    str += '';
    return str.charAt(0).toUpperCase() + str.substr(1);
}


function hideDuplicateAuths() {
    jQuery(".b2s-sidbar-wrapper-nav-li").each(function () {
        jQuery(this).show();
    });
    var mandantId = jQuery('.b2s-network-details-mandant-select').val();
    jQuery(".b2s-sidbar-wrapper-nav-li").each(function () {
        if (jQuery(this).is(":visible")) {
            var dataNetworkDisplayName = jQuery(this).children('.b2s-network-select-btn').attr('data-network-display-name');
            var dataNetworkId = jQuery(this).children('.b2s-network-select-btn').attr('data-network-id');
            var dataNetworkType = jQuery(this).children('.b2s-network-select-btn').attr('data-network-type');
            var dataNetworkAuthId = jQuery(this).children('.b2s-network-select-btn').attr('data-network-auth-id');
            jQuery('.b2s-network-select-btn[data-network-display-name="' + dataNetworkDisplayName + '"][data-network-id="' + dataNetworkId + '"][data-network-type="' + dataNetworkType + '"][data-network-auth-id!="' + dataNetworkAuthId + '"]').each(function () {
                var selectedDataMandantId = jQuery.parseJSON(jQuery(this).parents('.b2s-sidbar-wrapper-nav-li').attr('data-mandant-id'));
                if (jQuery(this).parents('.b2s-sidbar-wrapper-nav-li').attr('data-mandant-default-id') != mandantId && selectedDataMandantId.indexOf(mandantId) == -1) {
                    jQuery(this).parents('.b2s-sidbar-wrapper-nav-li').hide();
                }
            });
        }
    });
}

function chooseMandant() {
//Laden abbrechen und anzeige zurück setzten
    jQuery.xhrPool.abortAll();
    jQuery('.b2s-post-item-loading-dummy').remove();
    jQuery('.b2s-network-status-img-loading').hide();
    jQuery('.b2s-network-select-btn-deactivate').removeClass('b2s-network-select-btn-deactivate');
    //imageCheck();
    //expiredDate wieder setzten
    jQuery('.b2s-network-status-expiredDate').each(function () {
        if (jQuery(this).is(':visible')) {
            jQuery('.b2s-network-select-btn[data-network-auth-id="' + jQuery(this).attr('data-network-auth-id') + '"').addClass('b2s-network-select-btn-deactivate');
        }
    });
    jQuery('.b2s-network-select-btn-deactivate')
    var mandantId = jQuery('.b2s-network-details-mandant-select').val();
    jQuery('.b2s-post-item').hide();
    jQuery('.b2s-post-item').find('.form-control').each(function () {
        jQuery(this).attr("disabled", "disabled");
        jQuery(this).removeClass('error');
    });
    jQuery('.b2s-network-select-btn').children().removeClass('active').find('.b2s-network-status-img').addClass('b2s-network-hide');
    //Check IS RE-PUBLISH
    if (jQuery('#b2sSelectedNetworkAuthId').val() > 0 && jQuery(".b2s-network-select-btn[data-network-auth-id='" + jQuery('#b2sSelectedNetworkAuthId').val() + "']").length > 0) { //exisits?
        jQuery(".b2s-network-select-btn[data-network-auth-id='" + jQuery('#b2sSelectedNetworkAuthId').val() + "']").trigger('click');
        var mandantId = jQuery(".b2s-network-select-btn[data-network-auth-id='" + jQuery('#b2sSelectedNetworkAuthId').val() + "']").parent('.b2s-sidbar-wrapper-nav-li').attr('data-mandant-id');
        jQuery('.b2s-network-details-mandant-select').val(mandantId);
        jQuery('#b2sSelectedNetworkAuthId').val("0");
    } else {
        jQuery(".b2s-sidbar-wrapper-nav-li").each(function () {
            var mandantIds = jQuery.parseJSON(jQuery(this).attr('data-mandant-id'));
            if (mandantIds.indexOf(mandantId) != -1 && !jQuery(this).children('.b2s-network-select-btn').hasClass('b2s-network-select-btn-deactivate')) {
                jQuery(this).children('.b2s-network-select-btn').trigger('click');
            }
        });
    }

    checkNetworkSelected();
}

function padDate(n) {
    return ("0" + n).slice(-2);
}

function wop(url, name) {
    jQuery('.b2s-network-auth-success').hide();
    var location = window.location.protocol + '//' + window.location.hostname;
    url = encodeURI(url + '&mandant_id=' + jQuery('.b2s-network-details-mandant-select').val() + '&location=' + location);
    window.open(url, name, "width=650,height=900,scrollbars=yes,toolbar=no,status=no,resizable=no,menubar=no,location=no,directories=no,top=20,left=20");
}

function loginSuccess(networkId, networkType, displayName, networkAuthId, mandandId) {
    jQuery('.b2s-network-auth-success').show();
    jQuery('#b2s-network-list-modal').modal('hide');
    jQuery('#b2s-network-list-modal').hide();
    jQuery('body').removeClass('modal-open');
    jQuery('body').removeAttr('style');
    if (jQuery('.b2s-network-select-btn[data-network-auth-id="' + networkAuthId + '"]').length == 0) {
        jQuery('.b2s-server-connection-fail').hide();
        jQuery.ajax({
            url: ajaxurl,
            type: "POST",
            dataType: "json",
            cache: false,
            data: {
                'action': 'b2s_ship_navbar_item',
                'networkId': networkId,
                'networkType': networkType,
                'displayName': displayName,
                'networkAuthId': networkAuthId,
                'mandandId': mandandId
            },
            error: function () {
                jQuery('.b2s-server-connection-fail').show();
                return false;
            },
            success: function (data) {
                if (data.result == true) {
                    jQuery(data.content).insertAfter('.b2s-sidbar-network-auth-btn');
                    jQuery('.b2s-network-select-btn[data-network-auth-id="' + data.networkAuthId + '"]').trigger('click');
                }
            }
        });
    } else {
        jQuery('.b2s-network-status-expiredDate').remove();
        jQuery('.b2s-network-select-btn[data-network-auth-id="' + networkAuthId + '"]').removeClass('b2s-network-select-btn-deactivate');
        jQuery('.b2s-network-select-btn[data-network-auth-id="' + networkAuthId + '"]').removeAttr('onclick');
        jQuery('.b2s-network-select-btn[data-network-auth-id="' + networkAuthId + '"]').trigger('click');
    }
}

//jQuery(this).attr('data-network-auth-id')
function checkSchedDateTime(dataNetworkAuthId) {
    var dateElement = '.b2s-post-item-details-release-input-date[data-network-auth-id="' + dataNetworkAuthId + '"]';
    var timeElement = '.b2s-post-item-details-release-input-time[data-network-auth-id="' + dataNetworkAuthId + '"]';
    var dateStr = jQuery(dateElement).val();
    var minStr = jQuery(timeElement).val();
    var timeZone = parseInt(jQuery('#user_timezone').val()) * (-1);
    if (jQuery('#b2sUserLang').val() == 'de') {
        dateStr = dateStr.substring(6, 10) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
    } else {
        var minParts = minStr.split(' ');
        var minParts2 = minParts[0].split(':');
        if (minParts[1] == 'PM') {
            minParts2[0] = parseInt(minParts2[0]) + 12;
        }
        minStr = minParts2[0] + ':' + minParts2[1];
    }

    var minParts3 = minStr.split(':');
    if (minParts3[0] < 10) {
        minParts3[0] = '0' + minParts3[0];
    }
    var dateParts = dateStr.split('-');
    //utc current time
    var now = new Date();
    //offset between utc und user
    var offset = (parseInt(now.getTimezoneOffset()) / 60) * (-1);
    //enter hour to user time
    var hour = parseInt(minParts3[0]) + timeZone + offset;
    //calculate datetime in utc
    var enter = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minParts3[1]);
    //compare enter date time with allowed user time
    if (enter.getTime() < now.getTime()) {
        //enter set on next 15 minutes and calculate on user timezone
        enter.setTime(now.getTime() + (900000 - (now.getTime() % 900000)) - (3600000 * (timeZone + offset)));
        jQuery(dateElement).datepicker('update', enter);
        jQuery(timeElement).timepicker('setTime', enter);
    }
}

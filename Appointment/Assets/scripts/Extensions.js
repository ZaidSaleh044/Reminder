
var setTimeoutID;
var interval;

function ValidateConfirmMsg(id) {

    var ddl = id != 'ddl_RelationshipTypes' && id != 'ddlCoBorrowerType';
    var field = id != 'txt_Branch' && id != 'txt_AccountNumber';

    if (!$("#cbResidence").is(":checked")) {

        $("#dvResidence input").each(function () {

            field = field && id != this.id;
        });
    }

    if (!$("#cbOffice").is(":checked")) {

        $("#dvOffice input").each(function () {

            field = field && id != this.id;
        });
    }

    return ddl && field;
}
function RegisterActionButton(url, ajaxType, isWithConfirmMsg, clientFunctionToCall, hdnProductID, hdnClientID, callBackFunction) {
    if ($('form').valid()) {
        switch (clientFunctionToCall) {
            case "goToStep(1,2)": goToStep(1, 2); break;
            case "goToStep(2,3)": goToStep(2, 3); break;
            case "goToStep(3,4)": goToStep(3, 4); break;
            case "goToStep(4,7)": goToStep(4, 7); break;
            case "goToStep(7,6)": goToStep(7, 6); break;
        }
    }
    else {
        return false;
    }
}

function OTPActionButton(url, ajaxType, isWithConfirmMsg, clientFunctionToCall, hdnProductID, hdnClientID, callBackFunction) {
    if ($('form').valid()) {
        PostOTPConfirm();
    }
    else {
        return false;
    }
}

function ProductActionButton(url, ajaxType, isWithConfirmMsg, clientFunctionToCall, hdnProductID, hdnClientID, callBackFunction) {
    function submit() {
        $('#wait_overlay').show();
        $('#btn_Submit').hide();
        $('#ProductStep').val($('.product-step').val());
        clearInterval(interval);
        clearTimeout(setTimeoutID);
        $.ajax({
            cache: false,
            type: ajaxType,
            url: url,
            data: $('form').serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.documentRequired != undefined && data.documentRequired) {
                    RequiredDocument(data);
                    return false;
                }
                if ($('.active-step').val() == "11") {
                    // if the step is FeesPayment, then check the response.
                    if (!data.isSuccess) {
                        $('#hdnValidatyPropEval').val(false);
                        $('#alertMsgFeesPayment').find('strong').html(data.msg);
                        $('#alertMsgFeesPayment').removeClass('alert-success');
                        $('#alertMsgFeesPayment').addClass('alert-danger');
                        $('#alertMsgFeesPayment').show("slow");
                        $('#wait_overlay').hide();
                        return false;
                    }
                    else if (data.isSuccess) {
                        $('#alertMsgFeesPayment').find('strong').html(data.msg);
                        $('#alertMsgFeesPayment').removeClass('alert-danger');
                        $('#alertMsgFeesPayment').addClass('alert-success');
                        $('#alertMsgFeesPayment').show("slow");
                        $('#lblHeaderPopup').html(_FeesPaymentBooked);
                    }
                }

                else if ($('.active-step').val() == "12") {
                    if (!data.isSuccess) {
                        $('#alertMsgDownPayment').find('strong').html(data.msg);
                        $('#alertMsgDownPayment').removeClass('alert-success');
                        $('#alertMsgDownPayment').addClass('alert-danger');
                        $('#alertMsgDownPayment').show('slow');
                        $('#wait_overlay').hide();
                        return false;
                    }
                    else {
                        $('#alertMsgDownPayment').hide();
                    }
                    if ($('#hdnIsAgreeContract').val().toString().toLowerCase() == "false") {
                        _isContractDeclined = false;
                        $('#wait_overlay').hide();
                        // show popup
                        bootbox.confirm({
                            title: _SubmitConfirmTitle,
                            message: '<div>' + _ContractStayLogout + '</div>',
                            buttons: {
                                'confirm': {
                                    label: _Continue
                                },
                                'cancel': {
                                    label: _LogoutLabel
                                }
                            },
                            callback: function (result) {
                                if (result) {
                                    return;
                                }
                                else {
                                    window.location.href = _LogoutUrl;
                                }
                            }
                        });
                    }
                    else {
                        $('#DashboardLink').click();
                        $('#wait_overlay').hide();
                        return;
                    }
                    return;
                }


                if (data.validationErros != undefined && data.validationErros != null && data.validationErros != undefined) {
                    for (var i = 0; i < data.validationErros.length; i++) {
                        $("span[data-valmsg-for='" + data.validationErros[i]["Key"] + "']").html(data.validationErros[i]["Value"]);
                    }
                    $('#wait_overlay').hide();
                    $('#btn_Submit').show();
                    $('html, body').animate({ scrollTop: $("span[data-valmsg-for='" + data.validationErros[0]["Key"] + "']").offset().top - 100 }, 1000);
                    return;
                }
                if (clientFunctionToCall != 'ContinueCalculator') {
                    if (data.CRMRefrenceNumber != null & data.CRMRefrenceNumber != "") {
                        $('#ApplicationRef').show();
                        $('#CRMRefrenceNumber').text('#' + data.CRMRefrenceNumber);
                        $('#lblAppStatus').addClass('d-md-flex');
                        $('#lblAppStatus2').removeClass('d-none');
                        $('#lblAppStatus2').addClass('d-flex');
                    }
                    var statusType = $('.status-type').val();
                    if (statusType == _SavaAsDraftStatus) {
                        // Save As draft ... go to application status.
                        bootbox.confirm({
                            title: _SubmitConfirmTitle,
                            message: '<div>' + _SubmitConfirmMsgSaveAsDraft + '</div>',
                            buttons: {
                                'confirm': {
                                    label: _Continue
                                },
                                'cancel': {
                                    label: _LogoutLabel
                                }
                            },
                            callback: function (result) {
                                if (result) {
                                    //$('#DashboardLink').click();
                                }
                                else {
                                    window.location.href = _LogoutUrl;
                                }
                            }
                        });
                        $('#wait_overlay').hide();
                        return;
                    }
                    else {
                        if ($('.active-step').val() == "4" // Documents
                            || $('.active-step').val() == "5" // Documents Correction
                            || $('.active-step').val() == "9"
                            || $('.active-step').val() == "10" // Full Document Correction
                            || $('.active-step').val() == "11" //FeePament finished
                            || ($('.active-step').val() == "12" && $('#hdnIsAgreeContract').val().toString().toLowerCase() == "false") // Contract Decline
                            || $('.IsRecaculated').val().toString().toLowerCase() == "true"
                            || $('#hdnIsExpired').val().toString().toLowerCase() == "true"
                        ) {
                            if ($('.active-step').val() >= 11) {
                                $('#wait_overlay').hide();
                                $('#lblMsgPopup').html(_TwoWorkingDaysMsg);
                                $('#dvPopupPending').modal('show');
                                return;
                            }
                            else if ($('.active-step').val() == "4" // Documents
                                || $('.active-step').val() == "5" // Documents Correction
                                || ($('.active-step').val() == "9" && ($('#PropertyInformationVM_SelectedProduct').val() == "0" || $('#PropertyInformationVM_SelectedProduct').val() == "3"))) {
                                var _active = false;
                                $.ajax({
                                    url: 'ApplicationInquiry/ActiveWorkingHourORNot',
                                    type: 'GET',
                                    data: {
                                    },
                                    async: false,
                                    success: function (data) {
                                        _active = data.Active;
                                    },
                                    error: function (erorr) {
                                        console.log(erorr);
                                        return false;
                                    }
                                });

                                $('#wait_overlay').hide();

                                if (_active) {
                                    $('#lblMsgPopup').html(_activeWorkingHourMsg);
                                }
                                else {
                                    $('#lblMsgPopup').html(_inActiveWorkingHourMsg);
                                }
                                $('#dvPopupPending').modal('show');
                                return;
                            }
                            else if ($('.active-step').val() == "9") {
                                $('#DashboardLink').click();
                                return;
                            }
                            else if ($('#hdnIsExpired').val().toString().toLowerCase() != "true") {
                                $('#Next').prop('disabled', 'disabled');
                                $('#DashboardLink').click();
                                return;
                            }
                        }

                        if (callBackFunction != '') {
                            var callBack = window[callBackFunction](data);
                            if (!callBack)
                                return;
                        }

                        var lastStep = parseInt($('#hdnLastStepBeforeRecalculated').val());
                        $('#ApplicationID').val(data.ID);
                        if ($('.active-step').val() == "3") {
                            LoadDocuments(data.ID, 4);
                        }
                        else if ($('.active-step').val() == "5") {
                            LoadDocuments(data.ID, 5);
                        }
                        else if ($('.active-step').val() == "8" || (lastStep == 8 && $('#hdnIsExpired').val().toString().toLowerCase() == "true")) {
                            LoadDocuments(data.ID, 9);
                        }

                        if ($('#hdnIsExpired').val().toString().toLowerCase() == "true" && lastStep >= 8) {
                            // if Expired and step = 8 or 9 then we need to skip steps
                            next_Step_Last();
                        }
                        else {
                            // next step normally
                            next_Step();
                        }
                    }
                }
                else {
                    if (data.maxLoanStep != undefined && data.maxLoanStep && data.isSuccess) {
                        $('#contentCalc9').html(data.partial);
                        $('#DownPaymentCustomized_Range').val('');
                    }
                    else if (data.isSuccess != undefined && !data.isSuccess) {
                        $('#dvCalculatorTimeOut').show();
                        $('#wait_overlay').hide();
                        return false;
                    }

                    next_StepCalculator();
                }
                
            },
            error: function (e) {
                HandleError(e.responseText);
            }
        });
    }

    var xx;
    if (clientFunctionToCall != '')
        xx = window[clientFunctionToCall]();

    if (!xx)
        return false;


    if (clientFunctionToCall != 'SaveAsDraftClinet') {
        var m = $('form').valid();
        if (!$('form').valid()) {
            $('form').submit();
            return false;
        }
    }


    if (isWithConfirmMsg == 'False') {
        submit();
    }
    else {

        var message = _SubmitConfirmMsgWithAllFields;
        if (clientFunctionToCall == 'SaveAsDraftClinet') {
            message = _SubmitConfirmMsgSaveAsDraft;
        }

        bootbox.confirm({
            title: _SubmitConfirmTitle,
            message: '<div>' + message + '</div>',
            buttons: {
                'confirm': {
                    label: _Yes
                },
                'cancel': {
                    label: _No
                }
            },
            callback: function (result) {
                if (result) {
                    submit();
                }
            }
        });
    }

    return false;
}

function ActionButton(url, ajaxType, clientFunctionToCall, callBackFunction) {
    function submit() {

        if (callBackFunction == '')
            $('#wait_overlay').show();

        var xx;
        if (clientFunctionToCall != '')
            xx = window[clientFunctionToCall]();

        if (!xx)
            return false;
        $.ajax({
            cache: false,
            type: ajaxType,
            url: url,
            data: $('form').serialize(),
            dataType: 'json',
            success: function (data) {
                if (callBackFunction != '') {

                    window[callBackFunction](data);
                }
            },
            error: function (e) {

                HandleError(e.responseText);
            }
        });
    }

    if (!$('form').valid()) {
        $('form').submit();
        return false;
    }

    submit();

    return false;
}

function RequiredDocument(response) {
    var messageReq = _docRequired;
    var docStep = $('.active-step').val();
    if (docStep == "4") {
        ErrorsList = [];
        for (var i = 0; i < response.errors.length; i++) {
            ErrorsList.push([response.errors[i], messageReq]);
        }
        ShowAlertMessage();
        $('#hdnDocumentValid').val("false");
        $('#wait_overlay').hide();
    }
    else if (docStep == "5") {
        ErrorsList_Verf = [];
        for (var i = 0; i < response.errors.length; i++) {
            ErrorsList_Verf.push([response.errors[i], messageReq]);
        }
        ShowAlertMessage_Verf();
        $('#hdnDocumentValid_Verf').val("false");
        $('#wait_overlay').hide();
    }
    else if (docStep == "9") {
        ErrorsList_Full = [];
        for (var i = 0; i < response.errors.length; i++) {
            ErrorsList_Full.push([response.errors[i], messageReq]);
        }
        ShowAlertMessage_Full();
        $('#hdnDocumentValid_Full').val("false");
        $('#wait_overlay').hide();
    }
    else if (docStep == "10") {
        ErrorsList_VerfFull = [];
        for (var i = 0; i < response.errors.length; i++) {
            ErrorsList_VerfFull.push([response.errors[i], messageReq]);
        }
        ShowAlertMessage_VerfFull();
        $('#hdnDocumentValid_VerfFull').val("false");
        $('#wait_overlay').hide();
    }
}

function LoadDocuments(appId, step) {
    $.ajax({
        url: 'ApplicationInquiry/GetDocuments',
        type: 'GET',
        data: {
            'applicationId': appId, 'step': step
        },
        async: false,
        cache:false,
        success: function (partialView) {
            if (step == 4) {
                $('#content4').html(partialView);
            }
            else if (step == 5) {
                $('#content5').html(partialView);
            }
            else if (step == 9) {
                $('#content9').html(partialView);
            }
            else if (step == 10) {
                $('#content10').html(partialView);
            }
            else if (step == 0) {
                $('#content4, #content5, #content9, #content10').html(partialView);
            }
            $('#wait_overlay').hide();
        },
        error: function (erorr) {
            console.log(erorr);
            return false;
        }
    });
}

function Autocomplete(url, txtID, hdnID) {

    $(document).ready(function () {

        if ($('#' + hdnID).val() != null && $('#' + hdnID).val() != '') {

            $.ajax({
                cache: false,
                url: url,
                dataType: "json",
                data: {
                    code: $('#' + hdnID).val()
                },
                success: function (data) {

                    $('#' + txtID).val(data.label);
                },
                error: function (e) {

                    HandleError(e.responseText);
                }
            });
        }


        $(function () {

            $('#' + txtID).autocomplete({
                create: function () {

                    $(".ui-autocomplete").addClass("autocomplete_scroll");
                    $(".ui-helper-hidden-accessible").remove();
                },
                source: function (request, response) {

                    $.ajax({
                        cache: false,
                        url: url,
                        dataType: "json",
                        data: {
                            name: request.term
                        },
                        success: function (data) {

                            response($.map(data, function (item) {
                                return { label: item.label, value: item.label, id: item.id };
                            }));
                        },
                        error: function (e) {

                            HandleError(e.responseText);
                        }
                    });
                },
                minLength: 3,
                select: function (event, ui) {

                    $('#' + txtID).val(ui.item.label);
                    $('#' + hdnID).val(ui.item.id);
                },
                open: function () {
                    $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                },
                close: function () {
                    $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                }
            });
        });

        $('#' + txtID).focusout(function () {

            if ($('#' + txtID).val() == '') {

                $('#' + hdnID).val('');

                return;
            }

            $.ajax({
                cache: false,
                url: url,
                dataType: "json",
                data: {
                    name: $(this).val()
                },
                success: function (data) {

                    var list = $.map(data, function (item) {
                        return { label: item.label, value: item.label, id: item.id };
                    });

                    var label = $('#' + txtID).val();
                    var value = $('#' + hdnID).val();

                    var append = false;
                    var change = true;

                    for (var i = 0; i < list.length; i++) {

                        if (value == list[i].id && list[i].label == label) {

                            change = false;

                            break;
                        }
                    }

                    if (change) {

                        for (var i = 0; i < list.length; i++) {

                            if (list[i].label == label) {
                                append = true;
                                if (value != list[i].id) {
                                    $('#' + hdnID).val(list[i].id);
                                }
                            }
                        }

                        if (append == false) {
                            $('#' + hdnID).val("");
                        }

                        if ($('#' + hdnID).val() == '' && $('#' + txtID).val() != '') {
                            $('#' + txtID).val("");
                        }
                    }
                },
                error: function (e) {

                    HandleError(e.responseText);
                }
            });
        });
    });
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

function FormatDecimalNumber(id) {
    if (typeof id !== 'undefined') {

        var val = commaSeparateNumber($('#' + id).val().replace(/,/g, ''));

        $('#' + id).val(val);
    }
    else {
        $('.decimal-number').each(function () {
            var val = commaSeparateNumber($(this).val().replace(/,/g, ''));
            $(this).val(val);
        });
    }
}

$(document).ready(function () {

    FormatDecimalNumber();
    // $("body").on('focusout', '.decimal-number', function () {
    $('.decimal-number').on("focusout", function () {
        var val = commaSeparateNumber($(this).val().replace(/,/g, ''));
        $(this).val(val);
    });

    $('.letter-field').focusout(function () {

        $(this).next().next().find('.lang-validation').remove();
    });

    $('.letter-field').keyup(function () {

        if ($(this).next().next().find('.lang-validation').length !== 0
            && $(this).next().next().find('.field-validation-error').length !== 0) {

            $(this).next().next().find('.field-validation-error').html('');

            $(this).next().next().find('.lang-validation').remove();
        }
    });
});

function ValidateNumberofRowsAndRowLength(el, evt, rows, length) {

    var rows = el.getAttribute('data-val-textareafieldvalidation-customtextarearow');
    var length = el.getAttribute('data-val-textareafieldvalidation-customtextareacolumn');

    var charKey = (evt.char) ? evt.char : evt.key;

    if (typeof evt.key == 'undefined')
        return true;

    var v = el.value;

    var lines = v.split('\n');

    var limit = length - 1;

    if (charKey == 13 || charKey == "\n" || charKey == "Enter") {

        if (lines.length >= rows)
            return false;
        else
            return true;
    }

    var line = v.substr(0, el.selectionStart).split("\n").length;

    return lines[line - 1].length <= limit
}

function validateFloatKeyPress(el, evt) {
    var elValue = el.value;

    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = elValue.split('.');
    if (charCode != 44 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    if (number.length > 1 && charCode == 46) {
        return false;
    }

    var caratPos = el.selectionStart;

    if (charCode == 46 && (elValue.length - caratPos) > 2) {
        return false;
    }

    var dotPos = elValue.indexOf(".");

    if (caratPos > dotPos && dotPos > -1 && (number[1].length > 1)) {
        return false;
    }

    if (charCode != 46)
        if ((dotPos == -1 && (number[0].replace(/,/g, '').length > 9))
            || (dotPos > -1 && caratPos <= dotPos && (number[0].replace(/,/g, '').length > 9)))
            return false;

    return true;
}

function alphaOnly(el, evt, lang) {

    lang = typeof lang !== 'undefined' ? lang : '';

    var charCode = (evt.which) ? evt.which : evt.keyCode;

    var charKey = (evt.char) ? evt.char : evt.key;

    var validate;

    if (typeof evt.key == 'undefined')
        validate = true;

    if (charCode === 32)
        validate = true;

    if (lang == '') {

        if (charCode == 1567 || charCode == 1548) // ؟ ،
            validate = false;

        var letter = /^[a-zA-Z\ \u0600-\u06FF]+$/i

        validate = letter.test(charKey);
    }
    else if (lang == 'en') {

        var en = /^[a-z\ \A-Z]+$/;

        validate = en.test(charKey);

        if (!validate) {

            if ($(el).next().next().find('.lang-validation').length === 0)
                $(el).next().next().append('<span class="lang-validation">' + _EnglishFieldValidation + '</span>');

            if ($(el).next().next().find('.field-validation-error').length !== 0)
                $(el).next().next().find('.field-validation-error').html('');
        }
    }
    else if (lang == 'ar') {

        if (charCode == 1567 || charCode == 1548) // ؟ ،
            validate = false;

        var ar = /^[\ \u0600-\u06FF]+$/i;

        validate = ar.test(charKey);

        if (!validate) {

            if ($(el).next().next().find('.lang-validation').length === 0)
                $(el).next().next().append('<span class="lang-validation">' + _ArabicFieldValidation + '</span>');

            if ($(el).next().next().find('.field-validation-error').length !== 0)
                $(el).next().next().find('.field-validation-error').html('');
        }
    }

    if (validate) {

        if ($(el).next().next().children().hasClass('lang-validation')) {

            $(el).next().next().find('.lang-validation').remove();
        }

    }

    return validate;
}

function alphaOnlyName(el, evt, lang) {

    lang = typeof lang !== 'undefined' ? lang : '';

    var charCode = (evt.which) ? evt.which : evt.keyCode;

    var charKey = (evt.char) ? evt.char : evt.key;

    var validate;

    if (typeof evt.key == 'undefined')
        validate = true;

    if (charCode === 32)
        validate = true;

    if (lang == '') {

        if (charCode == 1567 || charCode == 1548) // ؟ ،
            validate = false;

        var letter = /^[-\_\'\’a-zA-Z\ \u0600-\u06FF]+$/i

        validate = letter.test(charKey);
    }
    else if (lang == 'en') {

        var en = /^[-\_\'a-z\ \A-Z]+$/;

        validate = en.test(charKey);

        if (!validate) {

            if ($(el).next().next().find('.lang-validation').length === 0)
                $(el).next().next().append('<span class="lang-validation">' + _EnglishFieldValidation + '</span>');

            if ($(el).next().next().find('.field-validation-error').length !== 0)
                $(el).next().next().find('.field-validation-error').html('');
        }
    }
    else if (lang == 'ar') {

        if (charCode == 1567 || charCode == 1548) // ؟ ،
            validate = false;

        var ar = /^[-\_\’\ \u0600-\u06FF]+$/i;

        validate = ar.test(charKey);

        if (!validate) {

            if ($(el).next().next().find('.lang-validation').length === 0)
                $(el).next().next().append('<span class="lang-validation">' + _ArabicFieldValidation + '</span>');

            if ($(el).next().next().find('.field-validation-error').length !== 0)
                $(el).next().next().find('.field-validation-error').html('');
        }
    }

    if (validate) {

        if ($(el).next().next().children().hasClass('lang-validation')) {

            $(el).next().next().find('.lang-validation').remove();
        }

    }

    return validate;
}

function CheckNumberKey(el, e) {

    if (e.shiftKey || e.charCode == 46)
        return false;

    if (e.charCode >= 48 && e.charCode <= 57)
        return true;

    if (e.which == 8)
        return true;

    if ((e.ctrlKey === true || e.metaKey === true) || (e.charCode == 8) ||

        (e.keyCode >= 35 && e.keyCode <= 39)) {

        return true;
    }

    if (((e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }

    return false;
}

function CheckEmailAddress(evt) {

    var charKey = (evt.char) ? evt.char : evt.key;

    if (typeof evt.key == 'undefined')
        return true;

    var email = /^[-\a-z_.@0-9A-Z]+$/;

    return email.test(charKey);
}

function NOSpecialCharacter(evt) {

    var charKey = (evt.char) ? evt.char : evt.key;

    if (typeof evt.key == 'undefined' || evt.key == 'Enter')
        return true;

    var noSpecialCharacter = /^[A-Za-zء-يلإإأئًٌَُلإٍِِلأْلآ ّ~0-9]+$/;

    return noSpecialCharacter.test(charKey);
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var lblmints = display.find('#firstMinuts').text(firstMinutes);
        var lblseconds = display.find('#firstSecond').text(firStseconds);
        lblmints.text(minutes);
        lblseconds.text(seconds);

        //display.text(minutes + ":" + seconds);


        if (--timer < 0) {
            window.location.href = _LogoutUrl;
            clearInterval(interval);
        }
    }, 1000);
}

function SessionTimeOurAlert() {
    var firstTimer = _SessionRefreshTimeMinutes, minutes, seconds;
    firstMinutes = parseInt(firstTimer / 60, 10)
    firStseconds = parseInt(firstTimer % 60, 10);

    firstMinutes = firstMinutes < 10 ? "0" + firstMinutes : firstMinutes;
    firStseconds = firStseconds < 10 ? "0" + firStseconds : firStseconds;

    if (!$('#dvPopupSessionEnd').is(':visible')) {
        display = $('#dvSessionTimeFinished');
        display.find('#firstMinuts').text(firstMinutes);
        display.find('#firstSecond').text(firStseconds);
        $('#dvPopupSessionEnd').modal('show');
        startTimer(_SessionRefreshTimeMinutes, display);
    }

    //if ($('.bootbox').length == 0) {
    //    bootbox.confirm({
    //        closeButton: false,
    //        title: _SubmitConfirmTitle,
    //        message: '<div><div>' + _SessionClosedConfirmation + '</div><br/><div id="dvSessionTimeFinished" class="session-timeOut-alert">' + firstMinutes + ":" + firStseconds + '</div></div>',
    //        buttons: {
    //            'confirm': {
    //                label: _Stay
    //            },
    //            'cancel': {
    //                label: _LogoutLabel
    //            }
    //        },
    //        callback: function (result) {
    //            if (result) {
    //                $.get(_CheckSession, null, function (data) {
    //                    if (data != "False") {
    //                        window.location.href = _LogoutUrl;
    //                    }
    //                });

    //                RefreshSessions();
    //            }
    //            else {
    //                window.location.href = _LogoutUrl;
    //            }
    //        }
    //    })
    //        .on('shown.bs.modal', function (e) {
    //            display = $('#dvSessionTimeFinished');
    //            var modalParent = $('.bootbox').find('.modal-dialog').find('.modal-footer');
    //            var buttonCancel = modalParent.find('[data-bb-handler=cancel]');
    //            buttonCancel.attr('style', 'width:70px');
    //            startTimer(_SessionRefreshTimeMinutes, display);
    //        });
    //}
}


function RefreshSessionPopup(type) {
    if (type == 'refresh') {
        $.get(_CheckSession, null, function (data) {
            if (data != "False") {
                window.location.href = _LogoutUrl;
            }
        });
        RefreshSessions();

        $('#dvPopupSessionEnd').modal('hide');
    }
    else {
        window.location.href = _LogoutUrl;
    }
}

function SessionTimeOut() {
    setTimeoutID = setTimeout(function () {
        SessionTimeOurAlert();
    }, _SessionFullTimeMinutes);
}

function RefreshSessions() {

    clearInterval(interval);
    clearTimeout(setTimeoutID);

    $.ajax({
        type: 'GET',
        cache: false,
        url: _RefreshSessionTimeOutUrl,
        dataType: 'json',
        success: function (data) {
            SessionTimeOut();
        },
        error: function (e) {
            HandleError(e.responseText);
        }
    });
}


function CheckSession() {
    $.ajax({
        type: 'GET',
        url: _CheckSession,
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.hasAnotherSession) {
                window.location.href = _LogoutUrl;
            }
            else {
                return "true";
            }
        },
        error: function (er) {
            
        }
    });
}

var ONE_THOUSAND = Math.pow(10, 3);
var ONE_MILLION = Math.pow(10, 6);
var ONE_BILLION = Math.pow(10, 9);
var ONE_TRILLION = Math.pow(10, 12);
var ONE_QUADRILLION = Math.pow(10, 15);
var ONE_QUINTILLION = Math.pow(10, 18);

function integerToWord(integer) {
    var prefix = '';
    var suffix = '';

    if (!integer) { return "zero"; }

    if (integer < 0) {
        prefix = "negative";
        suffix = integerToWord(-1 * integer);
        return prefix + " " + suffix;
    }
    if (integer <= 90) {
        switch (integer) {
            case integer < 0:
                prefix = "negative";
                suffix = integerToWord(-1 * integer);
                return prefix + " " + suffix;
            case 1: return "one";
            case 2: return "two";
            case 3: return "three";
            case 4: return "four";
            case 5: return "five";
            case 6: return "six";
            case 7: return "seven";
            case 8: return "eight";
            case 9: return "nine";
            case 10: return "ten";
            case 11: return "eleven";
            case 12: return "twelve";
            case 13: return "thirteen";
            case 14: return "fourteen";
            case 15: return "fifteen";
            case 16: return "sixteen";
            case 17: return "seventeen";
            case 18: return "eighteen";
            case 19: return "nineteen";
            case 20: return "twenty";
            case 30: return "thirty";
            case 40: return "forty";
            case 50: return "fifty";
            case 60: return "sixty";
            case 70: return "seventy";
            case 80: return "eighty";
            case 90: return "ninety";
            default: break;
        }
    }

    if (integer < 100) {
        prefix = integerToWord(integer - integer % 10);
        suffix = integerToWord(integer % 10);
        return prefix + " " + suffix;
    }

    if (integer < ONE_THOUSAND) {
        prefix = integerToWord(parseInt(Math.floor(integer / 100), 10)) + " hundred";
        if (integer % 100) { suffix = " and " + integerToWord(integer % 100); }
        return prefix + suffix;
    }

    if (integer < ONE_MILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_THOUSAND), 10)) + " thousand";
        if (integer % ONE_THOUSAND) { suffix = integerToWord(integer % ONE_THOUSAND); }
    }
    else if (integer < ONE_BILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_MILLION), 10)) + " million";
        if (integer % ONE_MILLION) { suffix = integerToWord(integer % ONE_MILLION); }
    }
    else if (integer < ONE_TRILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_BILLION), 10)) + " billion";
        if (integer % ONE_BILLION) { suffix = integerToWord(integer % ONE_BILLION); }
    }
    else if (integer < ONE_QUADRILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_TRILLION), 10)) + " trillion";
        if (integer % ONE_TRILLION) { suffix = integerToWord(integer % ONE_TRILLION); }
    }
    else if (integer < ONE_QUINTILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_QUADRILLION), 10)) + " quadrillion";
        if (integer % ONE_QUADRILLION) { suffix = integerToWord(integer % ONE_QUADRILLION); }
    } else {
        return '';
    }
    return prefix + " " + suffix;
}

function moneyToWord(value, currency) {

    if (currency == null || currency == '')
        return floatToWord(value);

    value = value.toString().replace(/,/g, '');

    var subCurrency;
    var pluralSubCurrency;
    var pluralCurrency;

    switch (currency) {

        case "Canadian Dollar": {
            subCurrency = "cent";
            pluralSubCurrency = "cents";
            currency = "dollar";
            pluralCurrency = "dollars";
            break;
        }
        case "EURO": {
            subCurrency = "cent";
            pluralSubCurrency = "cents";
            currency = "euro";
            pluralCurrency = "euro";
            break;
        }
        case "Bahraini Dinar": {
            subCurrency = "fils";
            pluralSubCurrency = "fils";
            currency = "dinar";
            pluralCurrency = "dinars";
            break;
        }
        case "Pound Sterling": {
            subCurrency = "pence";
            pluralSubCurrency = "pences";
            currency = "pound";
            pluralCurrency = "pounds";
            break;
        }
        case "Qatari Rial": {
            subCurrency = "dirham";
            pluralSubCurrency = "dirhams";
            currency = "rial";
            pluralCurrency = "rial";
            break;
        }
        case "Omani Rial": {
            subCurrency = "baiza";
            pluralSubCurrency = "baiza";
            currency = "rial";
            pluralCurrency = "rial";
            break;
        }
        case "Swiss Franc": {
            subCurrency = "centime";
            pluralSubCurrency = "centimes";
            currency = "franc";
            pluralCurrency = "francs";
            break;
        }
        case "UAE Dirham": {
            subCurrency = "fils";
            pluralSubCurrency = "fils";
            currency = "dirham";
            pluralCurrency = "dirhams";
            break;
        }
        case "US Dollar": {
            subCurrency = "cent";
            pluralSubCurrency = "cents";
            currency = "dollar";
            pluralCurrency = "dollars";
            break;
        }
        case "Saudi Rial": {
            subCurrency = "halalah";
            pluralSubCurrency = "halalas";
            currency = "rial";
            pluralCurrency = "rial";
            break;
        }
        case "Kuwaiti Dinar": {
            subCurrency = "fils";
            pluralSubCurrency = "fils";
            currency = "dinar";
            pluralCurrency = "dinars";
            break;
        }
    }

    var decimalValue = (value % 1);
    var integer = value - decimalValue;
    decimalValue = Math.round(decimalValue * 100);
    var decimalText = !decimalValue ? '' : integerToWord(decimalValue) + ' ' + (decimalValue === 1 ? subCurrency : pluralSubCurrency);
    var integerText = !integer ? '' : integerToWord(integer) + ' ' + (integer === 1 ? currency : pluralCurrency);
    return (
        integer && !decimalValue ? integerText :
            integer && decimalValue ? integerText + ' and ' + decimalText :
                !integer && decimalValue ? decimalText :
                    'zero ' + pluralSubCurrency
    );
}

function floatToWord(value) {

    value = value.toString().replace(/,/g, '');

    var decimalValue = (value % 1);
    var integer = value - decimalValue;
    decimalValue = Math.round(decimalValue * 100);
    var decimalText = !decimalValue ? '' :
        decimalValue < 10 ? "point o' " + integerToWord(decimalValue) :
            decimalValue % 10 === 0 ? 'point ' + integerToWord(decimalValue / 10) :
                'point ' + integerToWord(decimalValue);
    return (
        integer && !decimalValue ? integerToWord(integer) :
            integer && decimalValue ? [integerToWord(integer), decimalText].join(' ') :
                !integer && decimalValue ? decimalText :
                    integerToWord(0)
    );
}

function HandleError(responseText) {

    $('#wait_overlay').hide();
    $('body').html(responseText);
}

function CancelProduct() {

    bootbox.confirm({
        title: _SubmitConfirmTitle,
        message: _CancelProductConfirm,
        buttons: {
            'confirm': {
                label: _Yes
            },
            'cancel': {
                label: _No
            }
        },
        callback: function (result) {
            if (result) {
                var url = _GetStartUrl;

                if ($("#hfIsSaudi").val() == "False") {
                    url = _GetStartNonSaudiUrl + "?lang=" + ($("#IsEnglish").val() == "False" ? "ar" : "En");
                } else {
                    url = _GetStartUrl;
                }
                if ($("#ProductType").val() == 7) {
                    url = _GetEFormStartUrl + "?lang=" + ($("#IsEnglish").val() == "False" ? "ar" : "En");
                }
                if ($("#ProductType").val() == 8) {
                    url = _GetHomeLoanUrl + "?lang=" + ($("#IsEnglish").val() == "False" ? "ar" : "En");
                }
                window.location.href = url;
            }
        }
    });
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function GetValidationMessage(msg) {
    return "<span class='text-danger field-validation-error' data-valmsg-for='OfficeExt' data-valmsg-replace='true'><span for='OfficeExt'>" + msg + "</span></span>";
}

function Notify(type, title, msg) {
    Lobibox.notify(type, {
        size: 'mini',
        title: title,
        msg: msg,
        delay: 7000,
        delayIndicator: false
    });
}


function ChangeImg(HdnFieldID) {
    var code = $('#' + HdnFieldID + '').val();
    $.ajax({
        cache: false,
        type: 'GET',
        url: common.baseUrl + 'Shared/GetImage?code=' + code,
        data: $('form').serialize(),
        dataType: 'json',
        success: function (data) {
            document.getElementById(HdnFieldID + "_Img").src = data.link;
        },
        error: function (e) {
            HandleError(e.responseText);
        }
    });
}



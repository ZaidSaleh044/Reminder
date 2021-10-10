

//KH041120200923
/* Calanders */
var calendarIslamic;
var calendarGregorian;
var calendarFormat = 'mm/dd/yyyy';
var calendarFormatHomeloan = 'dd/mm/yyyy';
/*convertFromGregToHijri: Convert Gregorian date to Hijri date auomaticlly*/
/*convertFromHijriToGreg: Convert Hijri date to Gregorian date auomaticlly*/
/*This assumes that date controls must have a class "datepickerfieldHijri" or "datepickerfieldGreg"  */
/*Also it assumes an id "xxxxx" and the same id for hijir with word "Hijri" appended to it "xxxx_Hijri"  */
function inilitizeCalanders(convertFromGregToHijri, convertFromHijriToGreg) {

    $(document).ready(function () {
        if (_SystemLanguge == 'en')
            $.calendarsPicker.setDefaults($.calendarsPicker.regionalOptions['']);
        else
            $.calendarsPicker.setDefaults($.calendarsPicker.regionalOptions['ar']);

        calendarIslamic = $.calendars.instance('ummalqura', _SystemLanguge);
        calendarGregorian = $.calendars.instance('gregorian', _SystemLanguge);

        //Inilize calanders
        $(function () {

            $('.dateDOBHijri').each(function () {
                var local = "ar-SA";
                if (_SystemLanguge == 'en') {
                    local = "en-SA";
                }

                var maxDate = '';
                var minDate = '';
                var showinDate = '';
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();

                if (typeof $("#hijri-date-input").attr('dataDate') != 'undefined') {
                    var date = mm + '/' + dd + '/' + (yyyy - $("#hijri-date-input").attr('dataDate').slice(1, -1));
                    var newDate = date.split('/');
                    //maxDate = convertGregoianToHijri(date);
                    if (newDate[0].length == 1)
                        newDate[0] = "0" + newDate[0];
                    if (newDate[1].length == 1)
                        newDate[1] = "0" + newDate[1];

                    maxDate = newDate[2] + '-' + newDate[0] + '-' + newDate[1];
                    showinDate = (parseInt(newDate[2]) - 2) + '-' + newDate[0] + '-' + newDate[1];
                }

                $("#hijri-date-input").hijriDatePicker({
                    locale: local,//ar-sa
                    hijriFormat: "iDD/iMM/iYYYY",
                    //format: "DD-MM-YYYY",
                    //hijriFormat:"iYYYY-iMM-iDD",
                    //dayViewHeaderFormat: "MMMM YYYY",
                    //hijriDayViewHeaderFormat: "iMMMM iYYYY",
                    showSwitcher: false,
                    allowInputToggle: false,
                    showTodayButton: false,
                    useCurrent: false,
                    isRTL: false,
                    keepOpen: false,
                    hijri: true,
                    debug: true,
                    showClear: false,
                    showTodayButton: false,
                    showClose: false,
                    maxDate: maxDate,
                    viewDate: showinDate
                });


                $('#hijri-date-input').on('keypress', function (e) {
                    var leng = $(this).val().length;

                    if (window.event) {
                        code = e.keyCode;
                    } else {
                        code = e.which;
                    };

                    var allowedCharacters = { 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9, 48: 0, 47: '/' }; /* KeyCodes for 1,2,3,4,5,6,7,8,9,/ */

                    if (typeof allowedCharacters[code] === 'undefined' || /* Can only input 1,2,3,4,5,6,7,8,9 or / */
                        (code == 47 && (leng < 2 || leng > 5 || leng == 3 || leng == 4)) ||
                        ((leng == 2 || leng == 5) && code !== 47) || /* only can hit a - for 3rd pos. */
                        leng == 10) /* only want 10 characters "12-45-7890" */ {

                        event.preventDefault();

                        return;
                    }
                });

            });

            $('.datepickerfieldHijri').each(function () {
                var maxDate = '';
                var minDate = '';
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();

                if (typeof $(this).attr('dataDate') != 'undefined') {

                    var date = mm + '/' + dd + '/' + (yyyy - $(this).attr('dataDate').slice(1, -1));

                    maxDate = convertGregoianToHijri(date);
                }

                if (typeof $(this).attr('today') != 'undefined') {

                    var date = $(this).attr('today');//  mm + '/' + dd + '/' + (yyyy);

                    maxDate = convertGregoianToHijri(date);
                }

                if (typeof $(this).attr('minDate') != 'undefined') {

                    var minDate1 = $(this).attr('minDate');//  mm + '/' + dd + '/' + (yyyy);

                    minDate = minDate1;
                }

                $(this).calendarsPicker(
                    {
                        calendar: calendarIslamic,
                        dateFormat: calendarFormat,
                        changeYear: true,
                        yearRange: 'c-65:c+10',
                        endDate: maxDate,
                        maxDate: maxDate,
                        minDate: minDate,
                        onSelect: function (date) {
                            if (typeof date[0] != "undefined") {
                                var dateHijri = $(this).val();
                                var dateGregorian = convertHijriToGregroian(dateHijri);
                                $("#" + $(this).attr('id').replace('Hijri', '')).val(dateGregorian);

                                if (typeof ChangeDateCallBack === "function")
                                    ChangeDateCallBack($(this).attr('id').replace('Hijri', ''), $("#" + $(this).attr('id').replace('Hijri', '')).val());
                            }
                            else {
                                $("#" + $(this).attr('id').replace('Hijri', '')).val('');
                            }
                        }
                    });
            });

            $('.datepickerfieldGreg').each(function () {
                var maxDate = $(this).attr('dataDate');
                var minDate = '';
                if (typeof $(this).attr('minDate') != 'undefined') {

                    minDate = $(this).attr('minDate');//  mm + '/' + dd + '/' + (yyyy);

                }

                if (typeof $(this).attr('today') != 'undefined') {

                    var date = $(this).attr('today');//  mm + '/' + dd + '/' + (yyyy);

                    maxDate = date;
                }
                $(this).calendarsPicker(
                    {
                        calendar: calendarGregorian,
                        dateFormat: calendarFormat,
                        changeYear: true,
                        yearRange: 'c-65:c+10',
                        endDate: maxDate,
                        maxDate: maxDate,
                        minDate: minDate,
                        onSelect: function (date) {
                            if (typeof date[0] != "undefined") {
                                var dateGregorian = $(this).val();
                                var dateHijri = convertGregoianToHijri(dateGregorian);
                                $("#" + $(this).attr('id') + "Hijri").val(dateHijri);

                                if (typeof ChangeDateCallBack === "function")
                                    ChangeDateCallBack($(this).attr('id'), $(this).val());
                            }
                            else {
                                $("#" + $(this).attr('id') + "Hijri").val('');
                            }
                        }
                    });
            });

            $('.datepickerfieldHijriHomeloan').each(function () {
                var maxDate = '';
                var minDate = '';
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();

                if (typeof $(this).attr('dataDate') != 'undefined') {

                    var date = dd + '/' + mm + '/' + (yyyy - $(this).attr('dataDate').slice(1, -1));

                    maxDate = convertGregoianToHijri(date);
                }

                if (typeof $(this).attr('today') != 'undefined') {

                    var date = $(this).attr('today');//  mm + '/' + dd + '/' + (yyyy);

                    maxDate = convertGregoianToHijri(date);
                }

                if (typeof $(this).attr('minDate') != 'undefined') {

                    var minDate1 = $(this).attr('minDate');//  mm + '/' + dd + '/' + (yyyy);

                    minDate = minDate1;
                }

                $(this).calendarsPicker(
                    {
                        calendar: calendarIslamic,
                        dateFormat: calendarFormatHomeloan,
                        changeYear: true,
                        yearRange: 'c-65:c+10',
                        endDate: maxDate,
                        maxDate: maxDate,
                        minDate: minDate,
                        onSelect: function (date) {
                            if (typeof date[0] != "undefined") {
                                var dateHijri = $(this).val();
                                var dateGregorian = convertHijriToGregroianHomeloan(dateHijri);
                                $("#" + $(this).attr('id').replace('Hijri', '')).val(dateGregorian);

                                if (typeof ChangeDateCallBack === "function")
                                    ChangeDateCallBack($(this).attr('id').replace('Hijri', ''), $("#" + $(this).attr('id').replace('Hijri', '')).val());
                            }
                            else {
                                $("#" + $(this).attr('id').replace('Hijri', '')).val('');
                            }
                        }
                    });
            });

            $('.datepickerfieldGregHomeloan').each(function () {
                var maxDate = $(this).attr('dataDate');
                var minDate = '';
                if (typeof $(this).attr('minDate') != 'undefined') {

                    minDate = $(this).attr('minDate');//  mm + '/' + dd + '/' + (yyyy);

                }

                if (typeof $(this).attr('today') != 'undefined') {

                    var date = $(this).attr('today');//  mm + '/' + dd + '/' + (yyyy);

                    maxDate = date;
                }
                $(this).calendarsPicker(
                    {
                        calendar: calendarGregorian,
                        dateFormat: calendarFormatHomeloan,
                        changeYear: true,
                        yearRange: 'c-65:c+10',
                        endDate: maxDate,
                        maxDate: maxDate,
                        minDate: minDate,
                        onSelect: function (date) {
                            if (typeof date[0] != "undefined") {
                                var dateGregorian = $(this).val();
                                var dateHijri = convertGregoianToHijriHomeloan(dateGregorian);
                                $("#" + $(this).attr('id') + "Hijri").val(dateHijri);

                                if (typeof ChangeDateCallBack === "function")
                                    ChangeDateCallBack($(this).attr('id'), $(this).val());
                            }
                            else {
                                $("#" + $(this).attr('id') + "Hijri").val('');
                            }
                        }
                    });
            });
        });

        $('.datepickerfieldGreg, .datepickerfieldHijri').mask("00/00/0000", { placeholder: calendarFormat, removeMaskOnSubmit: true });
        $('.datepickerfieldGregHomeloan, .datepickerfieldHijriHomeloan').mask("00/00/0000", { placeholder: calendarFormatHomeloan, removeMaskOnSubmit: true });

        $('.datepickerfieldHijri').on("focusout", function () {
            date = $(this).val();

            if (date != '' && date != null) {

                var splitDate = date.split("/");

                if (
                    ($.calendars.instance('ummalqura')._validateLevel === 0 &&
                        !$.calendars.instance('ummalqura').isValid(splitDate[2], splitDate[0], splitDate[1])
                    )
                    //||
                    //(splitDate[2] < (new Date().getFullYear() - 65) || splitDate[2] > (new Date().getFullYear() + 10))
                ) {

                    $(this).val('');
                    $("#" + $(this).attr('id').replace('Hijri', '')).val('');
                }
                else {

                    var dateHijri = $(this).val();
                    var dateGregorian = convertHijriToGregroian(dateHijri);
                    $("#" + $(this).attr('id').replace('Hijri', '')).val(dateGregorian);

                    if (typeof ChangeDateCallBack === "function")
                        ChangeDateCallBack($(this).attr('id').replace('Hijri', ''), $('#' + $(this).attr('id').replace('Hijri', '')).val());
                }
            }
            else {
                $("#" + $(this).attr('id').replace('Hijri', '')).val('');
            }
        });

        $('.datepickerfieldGreg').on("focusout", function () {
            date = $(this).val();
            if (date != '' && date != null) {

                var splitDate = date.split("/");

                if (
                    ($.calendars.instance('gregorian')._validateLevel === 0 &&
                        !$.calendars.instance('gregorian').isValid(splitDate[2], splitDate[0], splitDate[1])
                    )
                    ||
                    (splitDate[2] < 1900 || splitDate[2] > 2070)
                ) {

                    $(this).val('');
                    $("#" + $(this).attr('id') + "Hijri").val('');
                }
                else {

                    var dateGregorian = $(this).val();
                    var dateHijri = convertGregoianToHijri(dateGregorian);
                    $("#" + $(this).attr('id') + "Hijri").val(dateHijri);

                    if (typeof ChangeDateCallBack === "function")
                        ChangeDateCallBack($(this).attr('id'), $(this).val());
                }
            }
            else {
                $("#" + $(this).attr('id') + "Hijri").val('');
            }
        });


        $('.datepickerfieldHijriHomeloan').on("focusout", function () {
            date = $(this).val();

            if (date != '' && date != null) {

                var splitDate = date.split("/");

                if (
                    ($.calendars.instance('ummalqura')._validateLevel === 0 &&
                        !$.calendars.instance('ummalqura').isValid(splitDate[2], splitDate[1], splitDate[0])
                    )
                    //||
                    //(splitDate[2] < (new Date().getFullYear() - 65) || splitDate[2] > (new Date().getFullYear() + 10))
                ) {

                    $(this).val('');
                    $("#" + $(this).attr('id').replace('Hijri', '')).val('');
                }
                else {

                    var dateHijri = $(this).val();
                    var dateGregorian = convertHijriToGregroianHomeloan(dateHijri);
                    $("#" + $(this).attr('id').replace('Hijri', '')).val(dateGregorian);

                    if (typeof ChangeDateCallBack === "function")
                        ChangeDateCallBack($(this).attr('id').replace('Hijri', ''), $('#' + $(this).attr('id').replace('Hijri', '')).val());
                }
            }
            else {
                $("#" + $(this).attr('id').replace('Hijri', '')).val('');
            }
        });

        $('.datepickerfieldGregHomeloan').on("focusout", function () {

            date = $(this).val();
            if (date != '' && date != null) {

                var splitDate = date.split("/");

                if (
                    ($.calendars.instance('gregorian')._validateLevel === 0 &&
                        !$.calendars.instance('gregorian').isValid(splitDate[2], splitDate[1], splitDate[0])
                    )
                    ||
                    (splitDate[2] < 1900 || splitDate[2] > 2070)
                ) {

                    $(this).val('');
                    $("#" + $(this).attr('id') + "Hijri").val('');
                }
                else {

                    var dateGregorian = $(this).val();
                    var dateHijri = convertGregoianToHijriHomeloan(dateGregorian);
                    $("#" + $(this).attr('id') + "Hijri").val(dateHijri);

                    if (typeof ChangeDateCallBack === "function")
                        ChangeDateCallBack($(this).attr('id'), $(this).val());
                }
            }
            else {
                $("#" + $(this).attr('id') + "Hijri").val('');
            }
        });

        ////Calculate hijri date from gregorian
        //if (convertFromGregToHijri) {
        //    $('.datepickerfieldGreg').on('change keyup paste', function () {
        //        var dateGregorian = $(this).val();
        //        var dateHijri = convertGregoianToHijri(dateGregorian);
        //        $("#" + $(this).attr('id') + "Hijri").val(dateHijri);
        //    });
        //}

        ////Calculate gregorian date from hijri
        //if (convertFromHijriToGreg) {
        //    $('.datepickerfieldHijri').on('change keyup paste', function () {
        //        var dateHijri = $(this).val();
        //        var dateGregorian = convertHijriToGregroian(dateHijri);
        //        $("#" + $(this).attr('id').replace('Hijri', '')).val(dateGregorian);
        //    });
        //}
    })
}

function convertHijriToGregroian(date) {
    var date = calendarIslamic.parseDate(calendarFormat, date);
    date = calendarGregorian.fromJD(date.toJD());
    return calendarGregorian.formatDate(calendarFormat, date);
};

function convertGregoianToHijri(date) {
    var date = calendarGregorian.parseDate(calendarFormat, date);
    date = calendarIslamic.fromJD(date.toJD());
    return calendarIslamic.formatDate(calendarFormat, date);
};


function convertHijriToGregroianHomeloan(date) {
    var date = calendarIslamic.parseDate(calendarFormatHomeloan, date);
    date = calendarGregorian.fromJD(date.toJD());
    return calendarGregorian.formatDate(calendarFormatHomeloan, date);
};

function convertGregoianToHijriHomeloan(date) {
    var date = calendarGregorian.parseDate(calendarFormatHomeloan, date);
    date = calendarIslamic.fromJD(date.toJD());
    return calendarIslamic.formatDate(calendarFormatHomeloan, date);
};

/*Account number*/
//Account number masking & padding (13 digits)
function maskAccountNumber(control_accountNumberId) {
    $('#' + control_accountNumberId).mask("0000-000000-000", { placeholder: "0000-000000-000", removeMaskOnSubmit: true });
    $('#' + control_accountNumberId).on("change", function () {
        $('#' + control_accountNumberId).val($('#' + control_accountNumberId).masked(pad($('#' + control_accountNumberId).val().replace('-', ''), 13)));
    });
}
function MaskTINNumber(control_accountNumberId) {
    $('#' + control_accountNumberId).mask("000-00-0000", { placeholder: "000-00-0000", removeMaskOnSubmit: true });
    $('#' + control_accountNumberId).on("change", function () {
        $('#' + control_accountNumberId).val($('#' + control_accountNumberId).masked(pad($('#' + control_accountNumberId).val().replace('-', ''), 9)));
    });
}
function MaskEINNumber(control_accountNumberId) {
    $('#' + control_accountNumberId).mask("0000000-00", { placeholder: "0000000-00", removeMaskOnSubmit: true });
    $('#' + control_accountNumberId).on("change", function () {
        $('#' + control_accountNumberId).val($('#' + control_accountNumberId).masked(pad($('#' + control_accountNumberId).val().replace('-', ''), 9)));
    });
}
function MaskPhoneNumber(control_PhoneNumberId) {
    $('#' + control_PhoneNumberId).mask("+000-0000000000", { placeholder: "+000-0000000000", removeMaskOnSubmit: false });
    $('#' + control_PhoneNumberId).on("change", function () {
        $('#' + control_PhoneNumberId).val($('#' + control_PhoneNumberId).masked(pad($('#' + control_PhoneNumberId).val().replace(/\\+|-/g, ''), 13)));
    });
}

//Add leading zeros to the right
function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad(str + "0", max) : str;
}

//Validate account number
function validateAccountNumber(accountNumber) {
    if (accountNumber == null || accountNumber.length == 0 || accountNumber == "0000-000000-000") {
        return false;
    }
    else
        return true;
}

function ChangeDateCallBack(id, val) {
    //if (id == 'txt_IssueDate' || id == 'txt_IdentityExpiryDate')
    //    RangeBetweenTwoDates('txt_IssueDate', 'txt_IdentityExpiryDate', _IssueDateMustBeLessThanExpiryDate);

    if (id == 'G1_FromDate' || id == 'G1_ToDate')
        RangeBetweenTwoDates('G1_FromDate', 'G1_ToDate', _StartDateMustBeLessThanEndDate);

    if (id == 'txt_DateofBirth')
        ValidateBirthDate();

    if (id == 'txt_DateofJoin')
        ValidateJoinDate();
}

function RangeBetweenTwoDates(startDateID, endDateID, msg) {

    if ($('#' + startDateID).val() == '' || $('#' + startDateID).val() == null
        || $('#' + endDateID).val() == '' || $('#' + endDateID).val() == null)
        return

    var splitDate1 = $('#' + startDateID).val().split("/");
    var year1 = splitDate1[2];
    var month1 = splitDate1[0];
    var day1 = splitDate1[1];

    var splitDate2 = $('#' + endDateID).val().split("/");
    var year2 = splitDate2[2];
    var month2 = splitDate2[0];
    var day2 = splitDate2[1];

    var date1 = new Date(year1, month1, day1);
    var date2 = new Date(year2, month2, day2);
    var timeDiff = date2.getTime() - date1.getTime();

    if (timeDiff <= 0) {

        bootbox.alert({
            message: msg,
            size: "small",
            title: _Warring,
            buttons: {
                'ok': {
                    label: _Ok
                }
            },
        });
        $('#' + endDateID).val('');
        $("#" + endDateID + "Hijri").val('');
        $('#' + startDateID).val('');
        $("#" + startDateID + "Hijri").val('');
    }
}

function ValidateBirthDate() {
    var maxDate = '';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var date = mm + '/' + dd + '/' + (yyyy - 21);
    maxDate = new Date(date);
    var fit_start_time = $("#txt_DateofBirth").val();
    if (new Date(fit_start_time) > new Date(date)) {
        $('#BirthDateVal').removeClass('hide');
        $('#BirthDateHJVal').removeClass('hide');
        return
    }
    else {
        $('#BirthDateVal').addClass('hide');
        $('#BirthDateHJVal').addClass('hide');
        return
    }
}

function ValidateJoinDate(id, val) {
    var maxDate = '';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var date = mm + '/' + dd + '/' + (yyyy);
    maxDate = new Date(date);
    var fit_start_time = $("#txt_DateofJoin").val();
    if (new Date(fit_start_time) >= new Date(date)) {
        $('#JoinDateTodayVal').removeClass('hide');
        $('#JoinDateTodayHJVal').removeClass('hide');
        return
    }
    else {
        $('#JoinDateTodayVal').addClass('hide');
        $('#JoinDateTodayHJVal').addClass('hide');
        return
    }
}



function SaveAndContinue() {

    $(this).prop('disabled', 'disabled');

    $('#wizard').easyWizard('nextStep');

    if ($(".easyWizardWrapper div[data-step='" + 5 + "']").hasClass('active')) {
        $('button.continue').addClass('hide');
        $('#btn_Submit').removeClass('hide');
        $('#btn-Cancel').addClass('hide');
        $('#btn_SaveAsDraft').addClass('hide');
    }
    else {
        $('button.continue').removeClass('hide');
        $('#btn_Submit').addClass('hide');
        $('#btn-Cancel').removeClass('hide');
        $('#btn_SaveAsDraft').removeClass('hide');
    }


    if (!$(".easyWizardWrapper div[data-step='" + 1 + "']").hasClass('active'))
        $('#btnPrevious').removeClass('hide');
    else
        $('#btnPrevious').addClass('hide');

    $("#step1 .bs-wizard-dot, #step2 .bs-wizard-dot, #step3 .bs-wizard-dot, #step4 .bs-wizard-dot").removeClass('active-step');
    $("#step1 .text-center, #step2 .text-center, #step3 .text-center, #step4 .text-center").removeClass('stepInfo-style');

    $("#step" + $(".easyWizardWrapper .step.active").attr("data-step") + " .bs-wizard-dot").addClass('active-step');
    $("#step" + $(".easyWizardWrapper .step.active").attr("data-step") + " .text-center").addClass('stepInfo-style');

    RefreshSessions();

    setTimeout("$('button.continue').prop('disabled', false);", 1000);
}

//For form resize
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
});

//Advance the slider
var _activeStep = 1;
function next(currentStep, nextStep) {

    if (nextStep > currentStep) {
        if (!$('#step' + currentStep).hasClass("complete"))
            $('#step' + currentStep).removeClass("active").addClass("complete");

        _activeStep++;

        if (!$('#step' + nextStep).hasClass("complete"))
            $('#step' + nextStep).removeClass("disabled").addClass("active");
    }
}
function goTo(stepNumber) {
    $('.status-type').val(_ContinueStatus);
    if ($(".easyWizardWrapper div[data-step='" + stepNumber + "']").hasClass('active'))
        return

    _activeStep = stepNumber;
    $('#wizard').easyWizard('goToStep', stepNumber);

    if ($(".easyWizardWrapper div[data-step='" + 5 + "']").hasClass('active')) {
        $('button.continue').addClass('hide');
        $('#btn_Submit').removeClass('hide');
        $('#btn-Cancel').addClass('hide');
        $('#btn_SaveAsDraft').addClass('hide');
    }
    else {
        $('button.continue').removeClass('hide');
        $('#btn_Submit').addClass('hide');
        $('#btn-Cancel').removeClass('hide');
        $('#btn_SaveAsDraft').removeClass('hide');
    }

    if (!$(".easyWizardWrapper div[data-step='" + 1 + "']").hasClass('active'))
        $('#btnPrevious').removeClass('hide');
    else
        $('#btnPrevious').addClass('hide');

    $("#step1 .bs-wizard-dot, #step2 .bs-wizard-dot, #step3 .bs-wizard-dot, #step4 .bs-wizard-dot").removeClass('active-step');
    $("#step1 .text-center, #step2 .text-center, #step3 .text-center, #step4 .text-center").removeClass('stepInfo-style');

    $("#step" + $(".easyWizardWrapper .step.active").attr("data-step") + " .bs-wizard-dot").addClass('active-step');
    $("#step" + $(".easyWizardWrapper .step.active").attr("data-step") + " .text-center").addClass('stepInfo-style');
}

function PreviousStep() {
    $.get(_CheckSession, null, function (data) {
        if (data != "False") {
            window.location.href = _LogoutUrl;
        }
    });

    if (_activeStep == 12) {
        _isContractDeclined = true;
        $('#hdnIsAgreeContract').val(false);
        $('#Next').click();
        return false;
    }

    var _previousstep = _activeStep - 1;
    if ($('#hdnIsPropertySelected_Step').val() == "True" && _activeStep == 8) {
        _previousstep = (_activeStep - 2);
        _nextStep--;
    }
    if (_activeStep == 11) {
        _previousstep = (_activeStep - 2);
        _nextStep--;
    }

    $('#wait_overlay').show();

    $('#content' + _activeStep).delay(150).fadeOut(800);
    $('#content' + _previousstep).delay().fadeIn(1500);

    setTimeout(function () {
        $('#wait_overlay').hide();
    }, 1000);

    if (_nextStep > _previousstep) {
        if ($('#step' + _activeStep).hasClass("is-active")) {

            $('#step' + _activeStep).removeClass("is-active")
        }


        $('#step' + _previousstep).addClass("is-active");


        if ($('#step' + _previousstep).hasClass("is-lastSubStep")) {

            var _previousParentStep = _currentParentStep - 1;


            $('#parentstep' + _currentParentStep).removeClass("is-active");


            $('#parentstep' + _previousParentStep).addClass("is-active");

            _currentParentStep--;
            _nextParentStep--;


        }
        if ($('#hdnIsPropertySelected_Step').val() == "True" && _activeStep == 8) {
            _activeStep = (_activeStep - 2);
            _nextStep--;
        }
        else if (_activeStep == 11) {
            // if FeesPayment, then go to full document, NOT TO CORRECTION
            _activeStep = (_activeStep - 2);
            _nextStep--;
        }
        else {
            _activeStep--;
            _nextStep--;
        }
    }

    if (_activeStep == '1') {
        $("#Back").hide();
    }

    if (_activeStep == 3) {
        if ($('#PropertyInformationVM_IsPropertySelected').val().toString().toLowerCase() == "true") {
            $('#productId_' + $('#PropertyInformationVM_SelectedProduct').val()).prop('checked', true);
            $('#productId_' + $('#PropertyInformationVM_SelectedProduct').val()).parent().addClass("border-primary bg-light");
        } else {
            $("#productId_4").prop("checked", true);
        }
    }

    if (_activeStep == 6) {
        var LoanAmount = parseFloat($('#hdnMaxLoanVal').val().replace(/,/g, ''));
        var PrimaryIncome = parseFloat($('#FinanceInformationVM_PrimaryIncome').val().replace(/,/g, ''));
        var Additional = parseFloat($('#FinanceInformationVM_OtherIncome').val().replace(/,/g, ''));
        if (PrimaryIncome.toString() == 'NaN')
            PrimaryIncome = 0;
        if (Additional.toString() == 'NaN')
            Additional = 0;
        var TotalSalary = PrimaryIncome + Additional;
        if ((LoanAmount >= 1500000 && TotalSalary >= 30000) || (LoanAmount < 1500000 && TotalSalary >= 50000)) {
            //$('#btnChat').removeClass('d-none').addClass('d-flex');
            $('#dvAccessCall').removeClass('d-none').addClass('d-flex');
        }
    }

    if (_activeStep == 7) {
        if ($('#PropertyInformationVM_IsPropertySelected').val().toString().toLowerCase() == "true") {
            $('#productIdf_' + $('#PropertyInformationVM_SelectedProduct').val()).prop('checked', true);
            $('#productIdf_' + $('#PropertyInformationVM_SelectedProduct').val()).parent().addClass("border-primary bg-light");
        } else {
            $("#productIdf_0").prop("checked", true);
        }
    }

    if (_activeStep == 9) {
        LoadDocuments($('#ApplicationID').val(), _activeStep);
    }

    var inputText = $('#content' + _activeStep).find('input[type=text]');
    var inputTel = $('#content' + _activeStep).find('input[type=tel]');
    var radiobuttons = $('#content' + _activeStep).find('input[type=radio]');
    var buttons = $('#content' + _activeStep).find('button');
    var checkboxes = $('#content' + _activeStep).find('input[type=checkbox]');
    var dropdownlist = $('#content' + _activeStep).find('select');
    $.each(inputText, function () {
        $(this).attr('readonly', false);
    });
    $.each(inputTel, function () {
        $(this).attr('readonly', false);
    });
    $.each(radiobuttons, function () {
        $(this).attr('disabled', false);
    });
    $.each(buttons, function () {
        $(this).attr('disabled', false);
    });
    $.each(checkboxes, function () {
        $(this).attr('disabled', false);
    });
    $.each(dropdownlist, function () {
        $(this).attr('disabled', false);
    });


    $('.active-step').val(_activeStep);
    $('html, body').animate({
        scrollTop: $(".navbar").offset().top
    }, 500, 0);
    updateTitle();
    isSummryMoved = false;
    if (_currentStep < 5) {
        NewParentStep = 1;
    }
    else if (_currentStep <= 6) {
        NewParentStep = 2;
    }
    else if (_currentStep < 12) {
        NewParentStep = 3;
    }
    else {
        NewParentStep = 4;
    }

    if (_activeStep == 4) {
        $('#Next').html(_SubmitButton);
    }
    else {
        $('#Next').html(_NextButton);
    }

    $('.nStages').removeClass('current');
    $('#Newparentstep' + NewParentStep).addClass('current');
}

function next_Step() {
    $.get(_CheckSession, null, function (data) {
        if (data != "False") {
            window.location.href = _LogoutUrl;
        }
    }); 
    $('#wait_overlay').show();



    if ($('#hdnIsPropertySelected_Step').val() == "True" && _activeStep == 6) {
        _nextStep = _nextStep + 1;
    }
    if (_activeStep == 9) {
        _nextStep = _nextStep + 1;
    }

    if ($('#hdnDocumentValid').val() != "false") {
        if (!$('#step' + _activeStep).hasClass("have-congratulations")) {
            $('#content' + _activeStep).delay(150).fadeOut(800);
            $('#content' + _nextStep).delay().fadeIn(1500);
        }
        else {
            $('#content' + _activeStep).delay(150).fadeOut(800);
            $('#contentCongrates' + _activeStep).delay().fadeIn(1500);
        }
        setTimeout(function () {
            $('#wait_overlay').hide();
        }, 1000);


        if (_nextStep > _activeStep) {
            if (!$('#step' + _activeStep).hasClass("is-complete")) {
                $('#step' + _activeStep).removeClass("is-active").addClass("is-complete");
            }
            else {
                $('#step' + _activeStep).removeClass("is-active");
            }
            if (!$('#step' + _activeStep).hasClass("have-congratulations")) {
                if (!$('#step' + _nextStep).hasClass("is-complete"))
                    $('#step' + _nextStep).removeClass("disabled").addClass("is-active");
                else
                    $('#step' + _nextStep).addClass("is-active");

                if ($('#hdnIsPropertySelected_Step').val() == "True" && _activeStep == 6) {
                    $('#step7').removeClass("disabled").addClass("is-active");
                }

            }

            if ($('#step' + _activeStep).hasClass("is-lastSubStep")) {

                if (_nextParentStep > _currentParentStep) {
                    if (!$('#parentstep' + _currentParentStep).hasClass("is-complete")) {
                        $('#parentstep' + _currentParentStep).removeClass("is-active").addClass("is-complete");
                    }

                    if (!$('#step' + _activeStep).hasClass("have-congratulations")) {
                        if (!$('#parentstep' + _nextParentStep).hasClass("is-complete"))
                            $('#parentstep' + _nextParentStep).removeClass("disabled").addClass("is-active");
                    }
                    else {
                        if (!$('#parentstep' + _nextParentStep).hasClass("is-complete"))
                            $('#parentstep' + _nextParentStep).removeClass("disabled").addClass("");
                    }
                    _currentParentStep++;
                    _nextParentStep++;
                }

            }
            if (!$('#step' + _activeStep).hasClass("have-congratulations")) {
                if ($('#hdnIsPropertySelected_Step').val() == "True" && _activeStep == 6) {
                    _activeStep = _activeStep + 2;
                    _nextStep++;

                }
                else if (_activeStep == 9) {
                    _activeStep = _activeStep + 2;
                    _nextStep++;
                }
                else {
                    _activeStep++;
                    _nextStep++;
                }
                $("#Back").show();
            }
            else {
                $("#Next").hide();
                $("#Back").hide();
                $("#Skip").show();
            }
        }
        if (_activeStep > _currentStep) {
            _currentStep = _activeStep;
        }
        $('.product-step').val(_currentStep);
        $('.active-step').val(_activeStep);

        $('html, body').animate({
            scrollTop: $(".navbar").offset().top
        }, 500, 0);

        updateProgress();
        isSummryMoved = false;

        if (_activeStep < 5) {
            NewParentStep = 1;
        }
        else if (_activeStep <= 6) {
            NewParentStep = 2;
        }
        else if (_activeStep < 12) {
            $('#Newparentstep2').addClass('finished');
            NewParentStep = 3;
        }
        else {
            NewParentStep = 4;
        }
        for (var i = 1; i < 5; i++) {
            $('#Newparentstep' + i).removeClass('current');
        }
        $('#Newparentstep' + NewParentStep).addClass('current');
        OriginalStage = NewParentStep;


        if (_activeStep > 6) {
            //$('#btnChat').removeClass('d-flex').addClass('d-none');
            $('#dvAccessCall').removeClass('d-flex').addClass('d-none');
        }
        if (_activeStep == 4) {
            $('#Next').html(_SubmitButton);
        }
        else if (_activeStep == 11) {
            $("#Back").hide();
            $("#Skip").hide();
            $("#btnSaveAsDraft").hide();
            $("#btnCancel").hide();
            $('#Next').html(_FeePaymentstep);
        }
        else {
            $('#Next').html(_NextButton);
        }
    }
    else {
        $('#wait_overlay').hide();
    }
}


function next_Step_Last() {
    $.get(_CheckSession, null, function (data) {
        if (data != "False") {
            window.location.href = _LogoutUrl;
        }
    });
    $('#wait_overlay').show();


    var lastStep = parseInt($('#hdnLastStepBeforeRecalculated').val());
    _activeStep = lastStep;
    _nextStep = (_activeStep + 1);

    if (_activeStep == 8) {
        // Code will go to (9) then next step after step#9 displayed should be = 11... so nextStep +2 [ Skip DocumentCorrection Step#10]
        _nextStep = (_nextStep + 1);
    }
    // [1] Hide step #6
    if (!$('#step6').hasClass("have-congratulations")) {
        $('#content6').delay(150).fadeOut(800);
        $('#content' + (_activeStep + 1)).delay().fadeIn(1500);
    }
    else {
        $('#content6').delay(150).fadeOut(800);
        $('#contentCongrates' + (_activeStep + 1)).delay().fadeIn(1500);
    }

    setTimeout(function () {
        $('#wait_overlay').hide();
    }, 1000);


    if (_nextStep > _activeStep) {
        if (!$('#step' + _activeStep).hasClass("is-complete")) {
            $('#step' + _activeStep).removeClass("is-active").addClass("is-complete");
        }
        else {
            $('#step' + _activeStep).removeClass("is-active");
        }
        if (!$('#step' + _activeStep).hasClass("have-congratulations")) {
            if (!$('#step' + _nextStep).hasClass("is-complete"))
                $('#step' + _nextStep).removeClass("disabled").addClass("is-active");
            else
                $('#step' + _nextStep).addClass("is-active");

            if ($('#hdnIsPropertySelected_Step').val() == "True" && _activeStep == 6) {
                $('#step7').removeClass("disabled").addClass("is-active");
            }

        }

        if ($('#step' + _activeStep).hasClass("is-lastSubStep")) {
            if (_nextParentStep > _currentParentStep) {
                if (!$('#parentstep' + _currentParentStep).hasClass("is-complete")) {
                    $('#parentstep' + _currentParentStep).removeClass("is-active").addClass("is-complete");
                }

                if (!$('#step' + _activeStep).hasClass("have-congratulations")) {
                    if (!$('#parentstep' + _nextParentStep).hasClass("is-complete"))
                        $('#parentstep' + _nextParentStep).removeClass("disabled").addClass("is-active");
                }
                else {
                    if (!$('#parentstep' + _nextParentStep).hasClass("is-complete"))
                        $('#parentstep' + _nextParentStep).removeClass("disabled").addClass("");
                }
                _currentParentStep++;
                _nextParentStep++;
            }

        }
        if (!$('#step' + _activeStep).hasClass("have-congratulations")) {
            _activeStep = (lastStep+1);
            _nextStep = (_activeStep + 1);
            if (_activeStep == 9) {
                // Code will go to (9) then next step after step#9 displayed should be = 11... so nextStep +2 [ Skip DocumentCorrection Step#10]
                _nextStep = (_activeStep + 1);
            }

            $("#Back").show();
        }
        else {
            $("#Next").hide();
            $("#Back").hide();
            $("#Skip").show();
        }
    }
    if (_activeStep > _currentStep) {
        _currentStep = _activeStep;
    }
    $('.product-step').val(_currentStep);
    $('.active-step').val(_activeStep);

    $('html, body').animate({
        scrollTop: $(".navbar").offset().top
    }, 500, 0);

    updateProgress();
    isSummryMoved = false;

    if (_currentStep < 5) {
        NewParentStep = 1;
    }
    else if (_currentStep <= 6) {
        NewParentStep = 2;
    }
    else if (_currentStep < 12) {
        NewParentStep = 3;
    }
    else {
        NewParentStep = 4;
    }
    for (var i = 1; i < 5; i++) {
        $('#Newparentstep' + i).removeClass('current');
    }
    $('#Newparentstep' + NewParentStep).addClass('current');

    if (_currentStep > 6) {
        //$('#btnChat').removeClass('d-flex').addClass('d-none');
        $('#dvAccessCall').removeClass('d-flex').addClass('d-none');
    }
    if (_currentStep == 4) {
        $('#Next').html(_SubmitButton);
    }
    else if (_currentStep == 11) {
        $("#Back").hide();
        $("#Skip").hide();
        $("#btnSaveAsDraft").hide();
        $("#btnCancel").hide();
        $('#Next').html(_FeePaymentstep);
    }
    else {
        $('#Next').html(_NextButton);
    }

    $('#hdnLastStepBeforeRecalculated').val('');
    $('#hdnIsExpired').val(false);
}

///<reference path="CustomValidators.js" />
//Required If
$.validator.addMethod('customrequiredif',
function (value, element, parameters) {
    //return;
   
    if ('DebitCardDeliveryID' == element.id) {
    }
    var dependentpropertyArray = parameters['dependentproperty'].split(',')
    var targetvalueArray = parameters['targetvalue'].split(',')

    var validate = true;

    var id = '[name$=".' + 'StatusID' + '"]';

    var targetvalue = targetvalueArray[i];
    targetvalue =
      (targetvalue == null ? '' : targetvalue).toString();

    var control = $(id).first();
    var controltype = control.attr('type');
    var statusvalue = control.val();

    if (statusvalue == _SavaAsDraftStatus)
        return true;

    for (var i = 0; i < dependentpropertyArray.length; i++) {
        if (statusvalue == _SubmitStatus && dependentpropertyArray[i] == 'ActiveStep')
            continue;

        var id = '[name$=".' + dependentpropertyArray[i] + '"]';

        var isNameWithoutDot = $(id).length == 0;

        if (isNameWithoutDot) {
            id = '[name$="' + dependentpropertyArray[i] + '"]';
        }

        var targetvalue = targetvalueArray[i];
        targetvalue =
          (targetvalue == null ? '' : targetvalue).toString();

        var control = $(id).first();
        var controltype = control.attr('type');
        var actualvalue;

        if (controltype === 'checkbox') {
            actualvalue = control.is(":checked");
        } else if (controltype === 'radio') {

            if (isNameWithoutDot) {
                actualvalue = $('input[name$="' + dependentpropertyArray[i] + '"]:checked').val();
            }
            else {
                actualvalue = $('input[name$=".' + dependentpropertyArray[i] + '"]:checked').val();
            }


        } else {
            actualvalue = control.val();
        }

        validate = validate && (targetvalue.toString().toLowerCase() === actualvalue.toString().toLowerCase());
    }

    // if the condition is true, reuse the existing 
    // required field validator functionality
    if (validate) {

        return $.validator.methods.required.call(
          this, value, element, parameters);
    }
    return true;
}
 );

$.validator.unobtrusive.adapters.add(
'customrequiredif',
['dependentproperty', 'targetvalue', 'defaultrequired'],
function (options) {
    options.rules['customrequiredif'] = {
        dependentproperty: options.params['dependentproperty'],
        targetvalue: options.params['targetvalue'],
        defaultrequired: options.params['defaultrequired']
    };
    options.messages['customrequiredif'] = options.message;
});

//Required If
$.validator.addMethod('requiredif',
function (value, element, parameters) {

    var id = '[name="' + parameters['dependentproperty'] + '"]';
    var defaultrequired = eval(parameters['defaultrequired']);
    // get the target value (as a string, 
    // as that's what actual value will be) 
    var targetvalue = parameters['targetvalue'];
    targetvalue =
      (targetvalue == null ? '' : targetvalue).toString();

    // get the actual value of the target control
    // note - this probably needs to cater for more 
    // control types, e.g. radios
    var control = $(id);
    var controltype = control.attr('type');
    var actualvalue;

    if (controltype === 'checkbox') {
        actualvalue = (typeof (control.attr('checked')) == 'undefined' ? "false" : "true");
    } else if (controltype === 'radio') {
        actualvalue = $('input[name="' + parameters['dependentproperty'] + '"]:checked').val();
    } else {
        actualvalue = control.val().toString().toLowerCase();
    }


    // if the condition is true, reuse the existing 
    // required field validator functionality
    if (targetvalue === actualvalue || (defaultrequired && (actualvalue == null || typeof (actualvalue) == 'undefined')))
        return $.validator.methods.required.call(
          this, value, element, parameters);

    return true;
}
 );

$.validator.unobtrusive.adapters.add(
'requiredif',
['dependentproperty', 'targetvalue', 'defaultrequired'],
    function (options) {
    options.rules['requiredif'] = {
        dependentproperty: options.params['dependentproperty'],
        targetvalue: options.params['targetvalue'],
        defaultrequired: options.params['defaultrequired']
    };
    options.messages['requiredif'] = options.message;
});

(function ($) {
    $.validator.unobtrusive.adapters.addBool("booleanrequired", "required");
}(jQuery));

$.validator.methods.range = function (value, element, param) {
    var globalizedValue = value.replace(/,/g, '');
    return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
}

$.validator.methods.number = function (value, element) {

    var globalizedValue = value.replace(/,/g, '');

    //if (element.hasClass('decimal-number'))
    //    globalizedValue = value.replace(/,/g, '');

    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(globalizedValue);
}

$.validator.addMethod('textareafieldvalidation',
function (value, element, parameters) {

    var customtextarearow = parameters['customtextarearow']
    var customtextareacolumn = parameters['customtextareacolumn']

    var validate = false;

    var lines = value.split('\n');

    if (lines.length > customtextarearow)
        validate = true;

    for (var i = 0; i < lines.length; i++) {

        if (lines[i].length > customtextareacolumn)
            validate = true;
    }

    // if the condition is true, reuse the existing 
    // required field validator functionality
    if (validate) {

        //return $.validator.methods.textareafieldvalidation.call(
        //  this, value, element, parameters);

        return false;
    }
    return true;
}, function (value, element, parameters) {

    return element.getAttribute('data-val-textareafieldvalidation');
}
 );

$.validator.unobtrusive.adapters.add(
'textareafieldvalidation',
['customtextarearow', 'customtextareacolumn'],
function (options) {

    options.rules['textareafieldvalidation'] = {
        customtextarearow: options.params['customtextarearow'],
        customtextareacolumn: options.params['customtextareacolumn'],
    };
    options.messages['customtextarearow'] = options.message;
});






















$.validator.addMethod('textarealengthvalidation',
function (value, element, parameters) {

    var textarealength = parameters['textarealength']

    var validate = false;

    var lines = value.split('\n');

    var length = 0;

    for (var i = 0; i < lines.length; i++) {

        length = length + lines[i].length;
    }

    if (length > textarealength) {

        return false;
    }
    return true;
}, function (value, element, parameters) {

    return element.getAttribute('data-val-textarealengthvalidation');
}
 );

$.validator.unobtrusive.adapters.add(
'textarealengthvalidation',
['textarealength'],
function (options) {

    options.rules['textarealengthvalidation'] = {
        textarealength: options.params['textarealength']
    };
    //options.messages['customtextarearow'] = options.message;
});
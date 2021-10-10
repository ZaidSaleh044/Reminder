var common = {

    //baseUrl
    //baseUrl: "http://localhost/DLC.Web/",

    //#region Language
    languageId: 1,
    //#endregion

    getQueryStringValue: function (queryStringKey) {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams !== null)
            return urlParams.get(queryStringKey);
        else
            return null;
    },

    //show loading on single element (ex:single div or grid)
    showSingleElementLoading: function (id) {
        $(id).LoadingOverlay("show");
    },

    //hide loading from single element (ex:single div or grid)
    hideSingleElementLoading: function (id) {
        $(id).LoadingOverlay("hide");
    },
    // #endregion

    fillDropdown: function (data, dropdownId, selected) {
        var $dropdown = $(dropdownId);
        $dropdown.empty();
        $dropdown.append('<option selected value="0">' + globalResources.dropdownDefaultOption + '</option>');
        $.each(data, function () {
            $dropdown.append($("<option />").val(this.id).text(this.title));
        });
        if (selected > 0) {
            $dropdown.val(selected);
        }
    },

    fillDropdownLookup: function (data, dropdownId, selected) {

        var $dropdown = $(dropdownId);
        $dropdown.empty();
        $dropdown.append('<option selected value="0">' + globalResources.dropdownDefaultOption + '</option>');
        $.each(data, function () {

            $dropdown.append($("<option />").val(this.id).text(this.nameAr));
        });
        if (selected > 0) {
            $dropdown.val(selected);
        }
    },



    resetDropdown: function (dropdownId, selected) {
        var $dropdown = $(dropdownId);
        $dropdown.empty();
        $dropdown.append('<option selected value="0">' + globalResources.dropdownDefaultOption + '</option>');

        if (selected > 0) {
            $dropdown.val(selected);
        }
    },

    getDropdownSelectedValue: function (dropdownId) {
        var selectedValue = $('#' + dropdownId + ' option:selected').val();
        return (selectedValue === undefined || selectedValue === "") ? 0 : selectedValue;
    },

    getDropdownSelectedText: function (dropdownId) {
        var selectedText = $('#' + dropdownId + ' option:selected').text();
        return selectedText === undefined ? '' : selectedText;
    },




    // #region Get Checked Items Of Checkboxlist
    getCheckboxlistSelectedValue: function (CheckboxId) {
        var checkboxes = document.getElementsByName(CheckboxId);
        var CheckedItems = "";
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked)
                CheckedItems = CheckedItems + checkboxes[i].defaultValue + ",";
        }
        return CheckedItems;
    },
    // #endregion

    // #region Confirmation Message
    confirmationMessage: function (title, message, deleteId, className) {
        swal.fire({
            title: title,
            text: message,
            type: "warning",
            // html: '<div><label>Reason</label></div><textarea class="validate" required = "required" validationLabel="txtWFReason" id="txtWFReason" ></textarea> <label id="lblWFReasonError" style="color:red;display:none">Please fill the reason</label>',
            showCancelButton: true,
            cancelButtonText: globalResources.cancel,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: globalResources.ok

        }).then(function (result) {
            if (!result.value) return false;
            var obj = eval("(" + className + ")");
            obj.delete(deleteId);
        });
    },
    // #endregion

    //#region Information Message
    showInformationMessage: function (message) {
        swal({
            title: message,
            type: "info",
            showCancelButton: false,
            confirmButtonColor: "#529fe7",
            confirmButtonText: globalResources.ok,
            closeOnConfirm: true
        });
    },
    //#endregion

    // #region Alert Message
    alertMessage: function (title, message) {
        swal({
            title: title,
            text: message,
            type: "information",
            showCancelButton: false,
            cancelButtonText: globalResources.cancel,
            confirmButtonColor: "#337ab7",
            confirmButtonText: globalResources.ok,
            closeOnConfirm: true
        });
    },
    // #endregion

    successChangeStatusMessage: function (title, message, className) {
        swal.fire({
            title: title,
            text: message,
            type: "success",
            showConfirmButton: false,
            timer: 3500
        }).then(function (result) {
            window.location = GeneralClass.baseUrl + "Employee/" + className;
        });
    },

    customSuccessMessage: function (title, message, className) {
        swal.fire({
            title: title,
            text: message,
            type: "success",
            showConfirmButton: false,
            timer: 3500
        }).then(function (result) {
            window.location = GeneralClass.baseUrl + className + "/Index";
        });
    },

    successMessage: function (title, message) {
        swal.fire({
            title: title,
            text: message,
            type: "success",
            showConfirmButton: false,
            timer: 3500
        });
    },

    errorMessage: function (title, message) {
        swal.fire({
            title: title,
            text: message,
            type: "error",
            showConfirmButton: false,
            timer: 3000
        });
    },

    getDate: function (DateTime) {
        var returndDate;
        if (DateTime === null || DateTime === undefined)
            return null;
        if (DateTime === 0) {
            var date = new Date();
            returndDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }
        else {
            date = new Date(DateTime);
            returndDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }
        return returndDate;
    },
    //#region get Time with out seconds
    getTime: function (time) {
        var timeArray = time.split(":");
        timeArray.splice(2, 1);
        var resultTime = timeArray[0] + ":" + timeArray[1];
        return resultTime;
    },
    //#endregion
    //#region show and hide Elements
    showElement: function (elementId, attribute) {
        var elementSelector = $('#' + elementId);
        elementSelector.show();
        elementSelector.attr(attribute);
    },
    hideElement: function (elementId, attribute, value) {
        var elementSelector = $('#' + elementId);
        elementSelector.hide();
        elementSelector.removeAttr(attribute);
        elementSelector.val(value);
    }
    //#endregion
};
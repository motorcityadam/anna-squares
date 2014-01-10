/*! anna-squares - v0.1.7 - 09-01-2014 */
"use strict";

app.controller("signinController", function SigninController($scope) {
    $scope.formName = "signinForm";
    $scope.fieldDefinitions = [ {
        label: "Username or Email Address",
        name: "username",
        type: "text",
        isRequired: true,
        hasPattern: "",
        maxLength: "",
        minLength: "",
        matchField: "",
        fieldHelp: "",
        fieldHelpItems: [],
        fieldErrorItems: [ {
            errorKey: "required",
            errorMessage: "This field is required."
        }, {
            errorKey: "minlength",
            errorMessage: ""
        }, {
            errorKey: "maxlength",
            errorMessage: ""
        }, {
            errorKey: "pattern",
            errorMessage: ""
        }, {
            errorKey: "email",
            errorMessage: ""
        }, {
            errorKey: "unique",
            errorMessage: ""
        }, {
            errorKey: "match",
            errorMessage: ""
        } ]
    }, {
        label: "Password",
        name: "password",
        type: "password",
        isRequired: true,
        hasPattern: "",
        maxLength: "",
        minLength: "",
        matchField: "",
        fieldHelp: "",
        fieldHelpItems: [],
        fieldErrorItems: [ {
            errorKey: "required",
            errorMessage: "This field is required."
        }, {
            errorKey: "minlength",
            errorMessage: ""
        }, {
            errorKey: "maxlength",
            errorMessage: ""
        }, {
            errorKey: "pattern",
            errorMessage: ""
        }, {
            errorKey: "email",
            errorMessage: ""
        }, {
            errorKey: "unique",
            errorMessage: ""
        }, {
            errorKey: "match",
            errorMessage: ""
        } ]
    } ];
    $scope.formData = {};
    $scope.formAgreementNotice = "";
    $scope.formAgreements = [ {
        title: "Reset your password?",
        url: "#!/forgotpassword"
    } ];
    $scope.processForm = function() {};
});
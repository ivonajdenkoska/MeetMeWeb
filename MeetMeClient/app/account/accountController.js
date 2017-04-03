/**
 * Created by Frosina on 17.10.2016.
 */
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('AccountController', AccountController);

    AccountController.$inject = ['$log', '$scope', '$location', 'AccountService', 'ngAuthSettings'];

    function AccountController($log, $scope, $location, AccountService, ngAuthSettings) {
        var vm = this;
        vm.message = null;
        vm.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: false
        };
        vm.registerData = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
        vm.savedSuccessfully = false;
        vm.login = login;
        vm.register = register;
        vm.authExternalProvider = authExternalProvider;
        vm.authCompletedCB = authCompletedCB;

        function register() {
            console.log('Register');
            AccountService.saveRegistration(vm.registerData).then(function (response) {
                vm.savedSuccessfully = true;
                vm.message = 'Saved successfully.'
            }, function (err) {
                vm.message = err.error_description;
                if (err.exceptionMessage != null)
                    vm.message = err.exceptionMessage;
            });
        };

        function login() {
            console.log("LOG");
            AccountService.login(vm.loginData).then(function (response) {
                $location.path('/');
            }, function (err) {
                vm.message = err.error_description;
            });
        };

        function authExternalProvider(provider) {

            $log.debug("Provider");
            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                        + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                        + "&redirect_uri=" + redirectUri;
            window.$windowScope = $scope;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };

        function authCompletedCB(fragment) {
            $scope.$apply(function () {
                if (fragment.haslocalaccount == 'False') {

                    AccountService.logOut();

                    AccountService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token
                    };

                    $location.path('/associate');

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    AccountService.obtainAccessToken(externalData).then(function (response) {
                        $location.path('/orders');
                    }, function (err) {
                        vm.message = err.error_description;
                    });
                }
            });
        };

    }
})(angular);
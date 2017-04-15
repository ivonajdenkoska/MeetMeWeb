(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('AccountService', AccountServiceFn);

    AccountServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function AccountServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/account', {},
        {
            login: { method: "POST", url: 'https://localhost:44362/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            register: { method: "POST", url: 'https://localhost:44362/api/account/register' },
            obtainAccessToken: { method: "GET", url: 'api/account/obtainLocalAccessToken' },
            registerExternal: { method: "POST", url: 'api/account/registerExternal' },
            getLoggedUser: { method: "GET", url: 'https://localhost:44362/api/account/getLoggedUser' }
        });

        var _authentication = {
            isAuth: false,
            userName: "",
            user: null
        };

        var _externalAuthData = {
            provider: "",
            userName: "",
            externalAccessToken: ""
        };

        var service = {
            login: loginFn,
            saveRegistration: saveRegistrationFn,
            logOut: logOutFn,
            fillAuthData: fillAuthDataFn,
            obtainAccessToken: obtainAccessTokenFn,
            registerExternal: registerExternalFn,
            authentication: _authentication,
            externalAuthData: _externalAuthData
        };

        return service;

        function loginFn(loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            return resource.login(data, function (response) {
                var user = resource.getLoggedUser();
                console.log(user);
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName});
                
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                getCurrentlyLoggedUserFn();

            }, function (err) {
                console.log("failure loging in");
                logOutFn();
            }).$promise;
        };

        function getCurrentlyLoggedUserFn() {
            return resource.getLoggedUser(function (data) {
                _authentication.user = data;
            }).$promise;
        };

        function saveRegistrationFn(registration) {
            logOutFn();
            return resource.register(registration, function (response) {
                return response;
            }).$promise;
        };

        function logOutFn() {
            console.log("Log out");
            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.user = null;

        };

        function fillAuthDataFn() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                getCurrentlyLoggedUserFn();
            }
        };

        function obtainAccessTokenFn(externalData) {
            return resource.obtainAccessToken({ provider: externalData.provider, externalAccessToken: externalData.externalAccessToken }, function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName });

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                getCurrentlyLoggedUserFn();
            }, function (error, status) {
                logOutFn();
            }).$promise();
        };

        function registerExternalFn(registerExternalData) {
            return resource.externalAccessToken(registerExternalData, function () {
                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName });

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                getCurrentlyLoggedUserFn();
            }, function (err, status) {
                logOutFn();
            }).$promise();
        };
    }
})(angular);
(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('AccountService', AccountServiceFn);

    AccountServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function AccountServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('/api/account', {
            login: { method: "POST", url: '/api/account/login' },
            register: { method: "POST", url: '/api/account/register' },
            refreshToken: { method: "POST", url: 'api/account/refreshToken', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            obtainAccessToken: { method: "GET", url: 'api/account/obtainLocalAccessToken' },
            registerExternal: { method: "POST", url: 'api/account/registerExternal' }
        });

        var _authentication = {
            isAuth: false,
            userName: "",
            useRefreshTokens: false
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
            refreshToken: refreshTokenFn,
            obtainAccessToken: obtainAccessTokenFn,
            registerExternal: registerExternalFn,
            authentication: _authentication,
            externalAuthData: _externalAuthData
        };

        return service;

        function loginFn(loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            if (loginData.useRefreshTokens) {
                data = data + "&client_id=" + ngAuthSettings.clientId;
            }

            return resource.login(data, function (data) {
                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
                }
                else {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
                }
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.useRefreshTokens = loginData.useRefreshTokens;

            }, function (err) {
                logOutFn();
            }).$promise;
        };

        function saveRegistrationFn(registration) {
            logOutFn();
            return resource.register(registration, function (response) {
                return response;
            });
        };

        function logOutFn() {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.useRefreshTokens = false;

        };

        function fillAuthDataFn() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
            }
        };

        function refreshTokenFn() {
            var authData = localStorageService.get('authorizationData');

            if (authData) {

                if (authData.useRefreshTokens) {

                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                    localStorageService.remove('authorizationData');

                    return resource.refreshToken(data, function (response) {

                        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    }, function (err, status) {
                        logOutFn();
                    }).$promise();
                }
            }
        };

        function obtainAccessTokenFn(externalData) {
            return resource.obtainAccessToken({ provider: externalData.provider, externalAccessToken: externalData.externalAccessToken }, function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                _authentication.useRefreshTokens = false;
            }, function (error, status) {
                logOutFn();
            }).$promise();
        };

        function registerExternalFn(registerExternalData) {
            return resource.externalAccessToken(registerExternalData, function () {
                localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                _authentication.isAuth = true;
                _authentication.userName = response.userName;
                _authentication.useRefreshTokens = false;
            }, function (err, status) {
                logOutFn();
            }).$promise();
        };
    }
})(angular);
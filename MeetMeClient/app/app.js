(function (angular) {
    'use strict';

    var app = angular
                    .module('meet-me', [
                            'ui.router',
                            'ngResource',
                            'LocalStorageModule',
                            'ui.calendar',
                            ]);
    var serviceBase = 'https://localhost:44362/';
    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
        clientId: 'ngAuthApp'
    });

    app.run(['AccountService', function (AccountService) {
        AccountService.fillAuthData();
    }]);

})(angular);
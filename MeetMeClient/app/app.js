(function (angular) {
    'use strict';

    var app = angular
                    .module('meet-me', [
                            'ui.router',
                            'ngResource',
                            'LocalStorageModule',
                            'ui.calendar',
                            'angucomplete-alt',
                            'ui.select',
                            'angular-notification-icons',
                            'ngNotify'
                            ]);
    var serviceBase = 'https://localhost:44362/';

    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
        clientId: 'MeetMeApp'
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptorService');
    });

    app.run(['AccountService', function (AccountService) {
        AccountService.fillAuthData();
    }]);

    app.run(function ($rootScope, $state, AccountService) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var loggedIn = AccountService.authentication.isAuth;
            if (toState.url == "" && loggedIn) {
                $state.previous = toState;
                event.preventDefault();
                $state.go('calendar');
            }
            else if (toState.authenticate && !loggedIn) {
                $state.previous = toState;
                event.preventDefault();
                $state.go('login');
            }
        });
    });

})(angular);
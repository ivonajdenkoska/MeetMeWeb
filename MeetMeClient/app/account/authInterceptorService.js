(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('AuthInterceptorService', AuthInterceptorServiceFn);

    AuthInterceptorServiceFn.$inject = ['$q', '$location', 'localStorageService'];

    function AuthInterceptorServiceFn($q, $location, localStorageService) {

        var service = {
            request: requestFn,
            responseError: responseErrorFn
        };

        return service;

        function requestFn(config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        };

        function responseErrorFn(rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        };
        
    }
})(angular);
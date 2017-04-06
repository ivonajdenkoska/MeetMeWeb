(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('EventService', EventServiceFn);

    EventServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function EventServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/account', {},
        {
            login: { method: "POST", url: 'https://localhost:44362/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            register: { method: "POST", url: 'https://localhost:44362/api/account/register' },
            refreshToken: { method: "POST", url: 'api/account/refreshToken', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            obtainAccessToken: { method: "GET", url: 'api/account/obtainLocalAccessToken' },
            registerExternal: { method: "POST", url: 'api/account/registerExternal' }
        });

        var service = {
            createEvent: createEvent
        };

        function createEvent() { };

        return service;
    }
})(angular);
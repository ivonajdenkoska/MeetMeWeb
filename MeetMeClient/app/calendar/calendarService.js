(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('CalendarService', CalendarServiceFn);

    CalendarServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function CalendarServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/event', {},
        {
            getAll: { method: "GET", url: 'https://localhost:44362/api/event/getEvents', params: { username: '@username' }, isArray: true, headers: { 'Content-Type': 'application/json; charset=utf8' } },
        });


        var _events = null;
        var service = {
            getEvents: getEvents,
            events: _events
        };

        return service;

        function getEvents(username) {
            return resource.getAll({ username: username }, function (response) {
                _events = response;
            }).$promise;
        };

        return service;
       
    }
})(angular);
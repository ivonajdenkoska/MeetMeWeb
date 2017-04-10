(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('CalendarService', CalendarServiceFn);

    CalendarServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function CalendarServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/account', {},
        {
            getAll: { method: "GET", isArray:true, url: 'https://localhost:44362/api/event/getEvents', headers: { 'Content-Type': 'application/json; charset=utf8' } },
        });


        var service = {
            getEvents: getEvents,
        };

        return service;

        function getEvents() {
            return resource.getAll();
        };

       
    }
})(angular);
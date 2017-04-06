﻿(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('EventService', EventServiceFn);

    EventServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function EventServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/event', {},
        {
            createEvent: { method: "POST", url: 'https://localhost:44362/api/event/create' },
        });

        var service = {
            createEvent: createEvent
        };

        function createEvent(event) {
            return resource.createEvent(event, function (response) {
                return response;
            }).$promise;
        };

        return service;
    }
})(angular);
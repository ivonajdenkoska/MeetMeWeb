(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('EventService', EventServiceFn);

    EventServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function EventServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/event', {},
        {
            createEvent: { method: "POST", url: 'https://localhost:44362/api/event/create' },
            deleteEvent: { method: "POST", url: 'https://localhost:44362/api/event/delete', params: { title: '@title', id: '@id', username: '@username'}, headers: { 'Content-Type': 'application/json; charset=utf8' } },
            editEvent: { method: "POST", url: 'https://localhost:44362/api/event/edit', params:{title: '@title', id: '@id', start:'@start', end:'@end'}, headers: { 'Content-Type': 'application/json; charset=utf8' } }
        });

        var service = {
            createEvent: createEvent,
            deleteEvent: deleteEvent,
            editEvent: editEvent
        };

        function createEvent(event) {
            return resource.createEvent(event, function (response) {
                return response;
            }).$promise;
        };

        function deleteEvent(title,id,username) {
            return resource.deleteEvent({ title: title, id: id, username: username}, function (response) {
                return response;
            }).$promise;
        };

        function editEvent(title, id, start, end) {
            return resource.editEvent({ title: title, id: id, start: start, end: end},function(response){
                return response;
            }).$promise;
        };

        return service;
    }
})(angular);
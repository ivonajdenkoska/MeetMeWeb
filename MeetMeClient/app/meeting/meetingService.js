(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('MeetingService', MeetingServiceFn);

    MeetingServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function MeetingServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/event', {},
        {
            createMeeting: { method: "POST", url: 'https://localhost:44362/api/meeting/create' }
            /*deleteMeeting: { method: "POST", url: 'https://localhost:44362/api/meeting/delete', params: { title: '@title', id: '@id' }, headers: { 'Content-Type': 'application/json; charset=utf8' } },
            editMeeting: { method: "POST", url: 'https://localhost:44362/api/meeting/edit', params: { title: '@title', id: '@id', start: '@start', end: '@end' }, headers: { 'Content-Type': 'application/json; charset=utf8' } }
            */
        });

        var service = {
            createMeeting: createMeeting,
           // deleteMeeting: deleteMeeting,
           // editMeeting: editMeeting
        };

        function createMeeting(meeting) {
            return resource.createMeeting(meeting, function (response) {
                return response;
            }).$promise;
        };

        /*function deleteEvent(title, id) {
            return resource.deleteEvent({ title: title, id: id }, function (response) {
                return response;
            }).$promise;
        };

        function editEvent(title, id, start, end) {
            return resource.editEvent({ title: title, id: id, start: start, end: end }, function (response) {
                return response;
            }).$promise;
        };
        */

        return service;
    }
})(angular);
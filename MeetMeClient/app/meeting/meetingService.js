(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('MeetingService', MeetingServiceFn);

    MeetingServiceFn.$inject = ['$resource', 'localStorageService', 'ngAuthSettings'];

    function MeetingServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/event', {},
        {
            createMeeting: { method: "POST", url: 'https://localhost:44362/api/meeting/create', },
            sendMeetingRequest: { method: "POST", url: 'https://localhost:44362/api/meeting/send' },
            getMRById: { method: "GET", url: 'https://localhost:44362/api/meeting/getmeetingreq', params: { id: '@id' }, isArray: true},
            acceptMR: { method: "POST", url: 'https://localhost:44362/api/meeting/acceptmr' },
            rejectMR: { method: "POST", url: 'https://localhost:44362/api/meeting/rejecttmr' },
            getByTitle: { method: "GET", url: 'https://localhost:44362/api/meeting/get', params: { meeting: '@meeting' } }
            /*deleteMeeting: { method: "POST", url: 'https://localhost:44362/api/meeting/delete', params: { title: '@title', id: '@id' }, headers: { 'Content-Type': 'application/json; charset=utf8' } },
            editMeeting: { method: "POST", url: 'https://localhost:44362/api/meeting/edit', params: { title: '@title', id: '@id', start: '@start', end: '@end' }, headers: { 'Content-Type': 'application/json; charset=utf8' } }
            */
        });

        var _meeting = null;
        var _meetingReqs = [];
        var service = {
            createMeeting: createMeeting,
            createMeetingRequest: createMeetingRequest,
            getByTitle: getByTitle,
            getMRById: getMRById,
            acceptMR: acceptMR,
            rejectMR: rejectMR,
            meeting: _meeting,
            meetingReqs: _meetingReqs
           // deleteMeeting: deleteMeeting,
           // editMeeting: editMeeting
        };

        function createMeeting(meeting) {
            return resource.createMeeting(meeting, function (response) {
                return response;
            }).$promise;
        };

        function createMeetingRequest(meetingRequest) {
            return resource.sendMeetingRequest(meetingRequest, function (response) {
                return response;
            }).$promise;
        };

        function getByTitle(title) {
            return resource.getByTitle({ title: title }, function (response) {
                _meeting = response;
            }).$promise;
        };

        function getMRById(id) {
            return resource.getMRById({ id: id }, function (response) {
                _meetingReqs = response;
            }).$promise;
        };

        function acceptMR(meeting, user, id) {
            return resource.acceptMR({meeting, user, id: id}).$promise;
        };

        function rejectMR(meeting, user, id) {
            return resource.rejectMR({ meeting, user, id: id }).$promise;
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
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .config(registerState);


    registerState.$inject = ['$stateProvider'];

    function registerState($stateProvider) {

        $stateProvider.state('meetingRequests', {
            url: '/meetingRequests',
            authenticate: true,
            templateUrl: 'app/meeting-request/meetingRequestView.html',
            controller: 'MeetingRequestController',
            controllerAs: 'vm',
        });
    }

})(angular);
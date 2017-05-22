(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .config(registerState);


    registerState.$inject = ['$stateProvider'];

    function registerState($stateProvider) {

        $stateProvider.state('meeting', {
            url: '/meeting',
            authenticate: true,
            templateUrl: 'app/meeting/meetingView.html',
            controller: 'MeetingController',
            controllerAs: 'vm'
        });
    }

})(angular);
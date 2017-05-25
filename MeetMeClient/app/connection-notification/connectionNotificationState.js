(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .config(registerState);


    registerState.$inject = ['$stateProvider'];

    function registerState($stateProvider) {

        $stateProvider.state('connectionNotifications', {
            url: '/connectionNotifications',
            authenticate: true,
            templateUrl: 'app/connection-notification/connectionNotificationView.html',
            controller: 'ConnectionNotificationController',
            controllerAs: 'vm',
        });
    }

})(angular);
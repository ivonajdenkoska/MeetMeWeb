(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .config(registerState);


    registerState.$inject = ['$stateProvider'];

    function registerState($stateProvider) {

        $stateProvider.state('profile', {
            url: '/profile',
            authenticate: true,
            templateUrl: 'app/profile/profileView.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
        });
    }

})(angular);
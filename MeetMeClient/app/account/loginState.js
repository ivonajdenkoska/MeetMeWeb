(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .config(registerState);


    registerState.$inject = ['$stateProvider'];

    function registerState($stateProvider) {

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/account/loginView.html',
            controller: 'AccountController',
            controllerAs: 'vm'
        });
    }

})(angular);
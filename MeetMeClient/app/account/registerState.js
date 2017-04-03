(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .config(registerState);


    registerState.$inject = ['$stateProvider'];

    function registerState($stateProvider) {

        $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'app/account/registerView.html',
            controller: 'AccountController',
            controllerAs: 'vm'
        });
    }

})(angular);
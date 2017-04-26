(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .config(registerState);


    registerState.$inject = ['$stateProvider'];

    function registerState($stateProvider) {

        $stateProvider.state('home', {
            url: '',
            templateUrl: 'app/home/homeView.html'
        });
    }

})(angular);
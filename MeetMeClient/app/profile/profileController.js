/**
 * Created by Nacev on 24.04.2017.
 */
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'AccountService','UserService', '$interval', '$window'];

    function ProfileController($scope, AccountService, UserService, $interval, $window) {
        var vm = this;
        vm.user = {};
        vm.selectedUser;
        vm.users = UserService.getAllUsers();
       
        var setUser = function () {
            vm.user = AccountService.authentication.user;
        };

        $interval(function () {
            setUser();
            console.log('Refresh');
        }, 1000);

        setUser();

    }
})(angular);
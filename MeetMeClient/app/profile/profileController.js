/**
 * Created by Nacev on 24.04.2017.
 */
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'AccountService','UserService', '$interval', '$interval', '$window'];

    function ProfileController($scope, AccountService, UserService, $interval, $timeout, $window) {
        var vm = this;
        vm.user = {};
        vm.authentication = null;
        vm.selectedUser;
        vm.users = UserService.getAllUsers();
        vm.done = false;
       
        var setUser = function () {
            vm.user = AccountService.authentication.user;
        };

        $timeout(function () {
            setUser();
            vm.done = true;
        }, 400);

    }
})(angular);
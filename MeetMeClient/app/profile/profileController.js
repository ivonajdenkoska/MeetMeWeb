/**
 * Created by Nacev on 24.04.2017.
 */
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AccountService','UserService', '$timeout', '$stateParams'];

    function ProfileController(AccountService, UserService, $timeout, $stateParams) {
        var vm = this;
        vm.user = null;
        vm.loggedUser = null;
        vm.selectedUser;
        vm.users = UserService.getAllUsers();
        vm.done = false;
        vm.errMsg = "";
        vm.connected = "";

        getUser();

        function getUser() {
            var id = $stateParams.id;
            UserService.getUserByID(id).then(function (data) {
                vm.user = data;
                getLoggedUser();
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
            });
        };

        function getLoggedUser() {
            vm.loggedUser = AccountService.authentication.user;
            getConnection();
        };

        function getConnection() {
            UserService.getConnection(vm.loggedUser.id, vm.user.id).then(function (data) {
                if (data == null)
                    vm.connected = "not";
                else
                    vm.connected = data.status;
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
            });
        }

        $timeout(function () {
            vm.done = true;
        }, 5000);

    }
})(angular);
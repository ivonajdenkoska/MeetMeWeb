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
        vm.connected = false;
        vm.waiting = false;
        vm.connect = true;
        vm.users = UserService.getAllUsers();
        vm.done = false;
        vm.errMsg = "";
        vm.connection = null;
        vm.connectUsers = connectUsers;
        vm.acceptConnection = acceptConnection;
        vm.deleteConnection = deleteConnection;

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
            if (vm.loggedUser.id != vm.user.id) {
                UserService.getConnection(vm.loggedUser.id, vm.user.id).then(function (data) {
                    var response = data.toJSON();
                    console.log(response);
                    if (response.id != undefined) {
                        vm.connection = response;
                        vm.connect = false;
                        if (vm.connection.status == 0)
                            vm.waiting = true;
                        else if (vm.connection.status == 1)
                            vm.connected = true;
                    }
                }, function (response) {
                    vm.errMsg = "Error occurred: " + response.data;
                });
            }
        }

        function connectUsers() {
            if (vm.connection == null) {
                vm.connection = { user1: vm.loggedUser, user2: vm.user, status: "Waiting", startDate: new Date() };
                UserService.connectUsers(vm.connection).then(function (data) {
                        vm.connected = "Waiting";
                }, function (response) {
                    vm.errMsg = "Error occurred: " + response.data;
                });
            }
        }

        function acceptConnection() {
            if (vm.connection != null && !vm.waiting) {
                UserService.deleteConnection(vm.connection).then(function (data) {
                    vm.connect = true;
                    vm.connected = false;
                }, function (response) {
                    vm.errMsg = "Error occurred: " + response.data;
                });
            }
        }

        function deleteConnection() {
            if (vm.connection != null) {

            }
        }

        $timeout(function () {
            vm.done = true;
        }, 5000);

    }
})(angular);
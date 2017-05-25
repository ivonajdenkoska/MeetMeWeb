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
        vm.connected = "Connect";
        vm.users = UserService.getAllUsers();
        vm.done = false;
        vm.errMsg = "";
        vm.connection = null;
        vm.connect = connect;

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
                        if (vm.connection.status == "Waiting")
                            vm.connected = "Waiting";
                        else if(vm.connection.status == "Accepted")
                            vm.connected = "Connected";
                    }
                }, function (response) {
                    vm.errMsg = "Error occurred: " + response.data;
                });
            }
        }

        function connect() {
            console.log("Connect clicked");
            console.log(vm.connection);
            if (vm.connection == null) {
                UserService.connectUsers(vm.loggedUser.id, vm.user.id).then(function (data) {
                        vm.connected = "Waiting";
                }, function (response) {
                    vm.errMsg = "Error occurred: " + response.data;
                });
            }
        }

        $timeout(function () {
            vm.done = true;
        }, 5000);

    }
})(angular);
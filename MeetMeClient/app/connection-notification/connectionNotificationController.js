(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('ConnectionNotificationController', ConnectionNotificationController);

    ConnectionNotificationController.$inject = ['AccountService', 'UserService', '$timeout', '$stateParams'];

    function ConnectionNotificationController(AccountService, UserService, $timeout, $stateParams) {
        var vm = this;
        vm.loggedUser = null;
        vm.notifications = [];
        vm.done = false;
        vm.errMsg = "";

        getLoggedUser();

        function getLoggedUser() {
            vm.loggedUser = AccountService.authentication.user;
        };

        function getNotifications() {
            UserService.getConnectionNotifications(vm.loggedUser.id).then(function (data) {
                vm.notifications = data;
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
            });
            vm.done = true;
        };

        $timeout(function () {
            getNotifications();
        }, 5000);

    }
})(angular);
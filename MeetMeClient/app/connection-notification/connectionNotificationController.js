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
            getNotifications();
        };

        function getNotifications() {
            UserService.getConnectionNotifications(vm.loggedUser.id).then(function (data) {
                console.log(data);
                // vm.notifications = data;
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
            });
        };

        $timeout(function () {
            vm.done = true;
        }, 5000);

    }
})(angular);
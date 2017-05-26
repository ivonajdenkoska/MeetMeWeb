(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('ConnectionNotificationController', ConnectionNotificationController);

    ConnectionNotificationController.$inject = ['AccountService', 'UserService', '$timeout', '$stateParams', 'ngNotify'];

    function ConnectionNotificationController(AccountService, UserService, $timeout, $stateParams, ngNotify) {
        var vm = this;
        vm.loggedUser = null;
        vm.notifications = [];
        vm.done = false;
        vm.size = 10;
        vm.startPosition = 0;
        vm.loadMore = loadMore;
        vm.errMsg = "";

        function getLoggedUser() {
            vm.loggedUser = AccountService.authentication.user;
            getNotifications();
        };

        function getNotifications() {
            vm.loggedUser = AccountService.authentication.user;
            UserService.getConnectionNotifications(vm.loggedUser.id, vm.startPosition, vm.size).then(function (data) {
                vm.notifications = data;
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
                ngNotify.set(vm.errMsg, {
                    sticky: true,
                    type: 'error'
                });
            });
            vm.done = true;
        };

        function loadMore() {
            vm.startPosition = vm.startPosition + vm.size;
            UserService.getConnectionNotifications(vm.loggedUser.id, vm.startPosition, vm.size).then(function (data) {
                vm.notifications = vm.notifications.concat(data);
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
                ngNotify.set(vm.errMsg, {
                    sticky: true,
                    type: 'error'
                });
            });
        }

        $timeout(function () {
            getLoggedUser();
        }, 5000);

    }
})(angular);
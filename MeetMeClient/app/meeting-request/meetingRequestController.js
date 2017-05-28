(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('MeetingRequestController', MeetingRequestController);

    MeetingRequestController.$inject = ['AccountService', 'UserService','MeetingService', '$timeout', '$stateParams', 'ngNotify'];

    function MeetingRequestController(AccountService, UserService, MeetingService, $timeout, $stateParams, ngNotify) {
        var vm = this;
        vm.loggedUser = null;
        vm.notifications = [];
        vm.done = false;
        vm.errMsg = "";
        vm.acceptMR = acceptMR;

        getLoggedUser();

        function getLoggedUser() {
            vm.loggedUser = AccountService.authentication.user;
        };

        function getNotifications() {
            MeetingService.getMRById(vm.loggedUser.id).then(function (data) {
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

        function acceptMR(n) {
            console.log(n);
            MeetingService.acceptMR(n.meeting, n.user).then(function (data) {

            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
                ngNotify.set(vm.errMsg, {
                    sticky: true,
                    type: 'error'
                });
            });
        };

        $timeout(function () {
            getNotifications();
        }, 5000);

    }
})(angular);
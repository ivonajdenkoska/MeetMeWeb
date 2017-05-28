(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('MeetingRequestController', MeetingRequestController);

    MeetingRequestController.$inject = ['AccountService', 'UserService','MeetingService', '$timeout', '$stateParams', 'ngNotify','$state'];

    function MeetingRequestController(AccountService, UserService, MeetingService, $timeout, $stateParams, ngNotify, $state) {
        var vm = this;
        vm.loggedUser = null;
        vm.notifications = [];
        vm.done = false;
        vm.errMsg = "";
        vm.acceptMR = acceptMR;
        vm.rejectMR = rejectMR;


        function getLoggedUser() {
            vm.loggedUser = AccountService.authentication.user;
            getNotifications();
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
            console.log(n.id);
            console.log(n.meeting);
            console.log(n.user);
            MeetingService.acceptMR(n.meeting, n.user, n.id).then(function (data) {
                vm.event = data;
                $state.reload();
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
                ngNotify.set(vm.errMsg, {
                    sticky: true,
                    type: 'error'
                });
            });
        };

        function rejectMR(n) {
            console.log(n.id);
            console.log(n.meeting);
            console.log(n.user);
            MeetingService.rejectMR(n.meeting, n.user, n.id).then(function (data) {
                vm.event = data;
                $state.reload();
            }, function (response) {
                vm.errMsg = "Error occurred: " + response.data;
                ngNotify.set(vm.errMsg, {
                    sticky: true,
                    type: 'error'
                });
            });
        };

        $timeout(function () {
            getLoggedUser();
        }, 5000);

    }
})(angular);
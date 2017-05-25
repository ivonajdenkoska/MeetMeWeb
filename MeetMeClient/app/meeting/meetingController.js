(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('MeetingController', MeetingController);

    MeetingController.$inject = ['$scope','$state', 'MeetingService', 'AccountService','UserService'];

    function MeetingController($scope, $state, MeetingService, AccountService, UserService) {
        var vm = this;
        vm.message = null;

        vm.meetingData = {
            title: "",
            location: "",
            start: "",
            end: "",
            priority: "",
            creator: null
        };
        vm.participants = [];

        vm.names = ["Emil", "Tobias", "Linus"];
        vm.users = UserService.getAllUsers();
        console.log(vm.users);

        vm.createMeeting = createMeeting;

        function createMeeting() {
            vm.meetingData.creator = AccountService.authentication.user;
            console.log()
            console.log(vm.meetingData);
            console.log(vm.participants);
            MeetingService.createMeeting(vm.meetingData).then(function (data) {
                // redirect to calendar
                //$state.go("calendar");
            }, function (err) {
                vm.message = err;
            });
        };
    }
})(angular);
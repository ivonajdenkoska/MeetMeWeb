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
            participants:[],
            user: null
        };

        vm.names = ["Emil", "Tobias", "Linus"];
        vm.users = UserService.getAllUsers();
        console.log(vm.users);

        vm.createMeeting = createMeeting;

        function createMeeting() {
            vm.meetingData.user = AccountService.authentication.user;
            console.log(vm.meetingData);
            console.log(vm.meetingData.participants);
        };
    }
})(angular);
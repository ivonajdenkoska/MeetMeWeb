(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('MeetingController', MeetingController);

    MeetingController.$inject = ['$state', 'MeetingService', 'AccountService'];

    function MeetingController($state, MeetingService, AccountService) {
        var vm = this;
        vm.message = null;

        vm.meetingData = {
            title: "",
            location: "",
            start: "",
            end: "",
            priority: "",
            user: null
        };

        vm.createMeeting = createMeeting;

        function createMeeting() {
            vm.meetingData.user = AccountService.authentication.user;
            console.log(vm.meetingData);
        };
    }
})(angular);
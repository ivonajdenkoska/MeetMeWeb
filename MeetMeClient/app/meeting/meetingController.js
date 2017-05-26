(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('MeetingController', MeetingController);

    MeetingController.$inject = ['$scope','$state', 'MeetingService', 'AccountService','UserService','EventService','$timeout', 'ngNotify'];

    function MeetingController($scope, $state, MeetingService, AccountService, UserService, EventService,$timeout, ngNotify) {
        var vm = this;
        vm.message = null;

        vm.meetingData = {
            title: "",
            location: "",
            start: "",
            end: "",
            priority: "",
            creator: null,
            participants:[]
        };

        vm.names = ["Emil", "Tobias", "Linus"];
        vm.users = UserService.getAllUsers();
        console.log(vm.users);

        vm.createMeeting = createMeeting;

        function createMeeting() {
            vm.meetingData.creator = AccountService.authentication.user;
            console.log(vm.meetingData);
            MeetingService.createMeeting(vm.meetingData).then(function (data) {
                // redirect to calendar
                //$state.go("calendar");
            }, function (err) {
                vm.message = err;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });


            EventService.createEvent({title: vm.meetingData.title, location: vm.meetingData.location, start: vm.meetingData.start, end: vm.meetingData.end, priority:vm.meetingData.priority, user: vm.meetingData.creator}).then(function (data) {
                // redirect to calendar
               $state.go("calendar");
            }, function (err) {
                vm.message = err;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });

            /*for (let index = 0, len = vm.participants.length; index < len; ++index) {
                console.log(vm.participants[index]);
                MeetingService.createMeetingRequest({ User: vm.participants[index], Meeting: vm.meetingData, Content: "Do you want to accept the request for " + vm.meetingData.title + "?", Status: false }).then(function (data) {
                    // redirect to calendar
                    //$state.go("calendar");
                }, function (err) {
                    vm.message = err;
                });
            }*/
        };
    }
})(angular);
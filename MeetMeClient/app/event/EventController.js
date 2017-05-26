(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('EventController', EventController);

    EventController.$inject = ['$state', 'EventService', 'AccountService', 'ngNotify'];

    function EventController($state, EventService, AccountService, ngNotify) {
        var vm = this;
        vm.message = null;
        
        vm.eventData = {
            title: "",
            location: "",
            start: "",
            end: "",
            priority: "",
            user: null
        };

        vm.createEvent = createEvent;

        function createEvent() {
            vm.eventData.user = AccountService.authentication.user;
            EventService.createEvent(vm.eventData).then(function (data) {
                // redirect to calendar
                $state.go("calendar");
                vm.message = "Event created";
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'success'
                });
            }, function (err) {
                vm.message = err;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });
        };
    }
})(angular);
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('EventController', EventController);

    EventController.$inject = ['$state', 'EventService', 'AccountService'];

    function EventController($state, EventService, AccountService) {
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
            }, function (err) {
                vm.message = err;
            });
        };
    }
})(angular);
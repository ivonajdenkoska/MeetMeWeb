/**
 * Created by Nacev on 06.04.2017.
 */
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('EventController', EventController);

    EventController.$inject = ['$log', '$scope', '$location', 'EventService', 'ngAuthSettings'];

    function EventController($log, $scope, $location, EventService, ngAuthSettings) {
        var vm = this;
        vm.message = null;
        
        vm.eventData = {
            title: "",
            location: "",
            start: "",
            end: "",
            priority: ""
        };

        vm.createEvent = createEvent;

        function createEvent() {
            console.log(vm.eventData.eventName);
            console.log(vm.eventData.eventStart);
            console.log('createEvent');
            EventService.createEvent(vm.eventData);
        };
        

    }
})(angular);
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
            eventName: "",
            eventLocation: "",
            eventStart: "",
            eventEnd: "",
            eventPriority: ""
        };

        vm.createEvent = createEvent;

        function createEvent() {
            console.log(vm.eventData.eventName);
        };
        

    }
})(angular);
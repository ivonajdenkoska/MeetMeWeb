/**
 * Created by Nacev on 06.04.2017.
 */
(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('EventController', EventController);

    EventController.$inject = ['$q', 'EventService', 'UserService', 'AccountService'];

    function EventController($q, EventService, UserService, AccountService) {
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

        getLoggedUser();
        vm.createEvent = createEvent;

        function createEvent() {
            console.log(vm.eventData.title);
            console.log(vm.eventData.start);
            console.log('createEvent');
            if (AccountService.authentication.isAuth == false) {
                // TODO: redirect to login
                return null;
            }
            EventService.createEvent(vm.eventData);
        };
        
        function getLoggedUser() {
            if (AccountService.authentication.isAuth == false) {
                // TODO: redirect to login
                return null;
            }
            var username = AccountService.authentication.userName;
            var promise = UserService.getUserByUsername(username);
            console.log(promise.data);
            promise.then(function (data) {
                vm.eventData.user = data.toJSON();
            });
            return;
        }
    }
})(angular);
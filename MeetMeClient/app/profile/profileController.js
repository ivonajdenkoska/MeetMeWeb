(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AccountService', 'UserService', 'CalendarService', '$timeout', '$stateParams', 'ngNotify', 'uiCalendarConfig'];

    function ProfileController(AccountService, UserService, CalendarService, $timeout, $stateParams, ngNotify, uiCalendarConfig) {
        var vm = this;
        vm.user = null;
        vm.loggedUser = null;
        vm.connected = false;
        vm.waiting = false;
        vm.connect = true;
        vm.done = false;
        vm.message = "";
        vm.connection = null;
        vm.connectUsers = connectUsers;
        vm.acceptConnection = acceptConnection;
        vm.deleteConnection = deleteConnection;
        vm.events = [];

        getUser();

        function getUser() {
            var id = $stateParams.id;
            UserService.getUserByID(id).then(function (data) {
                vm.user = data;
                getLoggedUser();
            }, function (response) {
                vm.message = "Error occurred: " + response.data;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });
        };
              
        function getLoggedUser() {
            vm.loggedUser = AccountService.authentication.user;
            getConnection();
        };

        function getConnection() {
            if (vm.loggedUser.id != vm.user.id) {
                UserService.getConnection(vm.loggedUser.id, vm.user.id).then(function (data) {
                    var response = data.toJSON();
                    if (response.id != undefined) {
                        vm.connection = response;
                        vm.connect = false;
                        if (vm.connection.status == 0) {
                            if(response.user1.id == vm.loggedUser.id)
                                vm.waiting = true;
                        }
                        else if (vm.connection.status == 1) {
                            vm.connected = true;
                            CalendarService.getEvents(vm.user.userName).then(function (data) {
                                var events = data;
                                vm.events = events;
                                displayCalendar();
                                $timeout(function () {
                                    $('.fc-today-button').trigger("click");
                                }, 3000);
                            }, function (response) {
                                vm.message = "Error occurred: " + response.data;
                                ngNotify.set(vm.message, {
                                    sticky: true,
                                    type: 'error'
                                });
                            });
                        }
                    }
                }, function (response) {
                    vm.message = "Error occurred: " + response.data;
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'error'
                    });
                });
            }
        }

        function connectUsers() {
            if (vm.connection == null) {
                vm.connection = { user1: vm.loggedUser, user2: vm.user, status: "Waiting", startDate: new Date() };
                UserService.connectUsers(vm.connection).then(function (data) {
                    vm.connect = false;
                    vm.waiting = true;
                    vm.message = "Connection request was sent.";
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'success'
                    });
                }, function (response) {
                    vm.errMsg = "Error occurred: " + response.data;
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'error'
                    });
                });
            }
        }

        function acceptConnection() {
            if (vm.connection != null && !vm.waiting) {
                UserService.acceptConnection(vm.connection).then(function (data) {
                    vm.connected = true;
                    vm.message = "Accepted connection request. You are now connected.";
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'success'
                    });
                }, function (response) {
                    vm.message = "Error occurred: " + response.data; 
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'error'
                    });
                });
            }
        }

        function deleteConnection() {
            if (vm.connection != null) {
                UserService.deleteConnection(vm.connection).then(function (data) {
                    vm.connect = true;
                    vm.connected = false;
                    vm.waiting = false;
                    vm.connection = null;
                    vm.message = "Connection deleted successfully.";
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'success'
                    });
                }, function (response) {
                    vm.message = "Error occurred: " + response.data;
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'error'
                    });
                });
            }
        };

        function displayCalendar() {
            vm.uiConfig = {
                calendar: {
                    height: 450,
                    editable: false,
                    header: {
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    events: vm.events,
                    eventRender: function (event, element) {
                        $(element).tooltip({ title: event.title });
                        if (event.priority == 1) {
                            $(element).addClass('event-medium'); //Medium priority
                        }
                        else if (event.priority == 2) {
                            $(element).addClass('event-high'); //High priority
                        }
                        else {
                            $(element).addClass('event-low');  //Low priority
                        }
                        $(element).addClass('event');

                    }
                }
            };
        };
        
        $timeout(function () {
            vm.done = true;
        }, 5000);

        
    }
})(angular);
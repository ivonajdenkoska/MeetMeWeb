(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$log', '$scope', '$compile', 'uiCalendarConfig', 'CalendarService', '$interval', 'AccountService', 'EventService', '$state', 'ngNotify','MeetingService'];

    function CalendarController($log, $scope, $compile, uiCalendarConfig, CalendarService, $interval, AccountService, EventService, $state, ngNotify, MeetingService) {
        var vm = this;
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        vm.deleteEvent = deleteEvent;
        vm.init = init;
        vm.editEvent = editEvent;
        vm.goToEvent = goToEvent;
        vm.goToMeeting = goToMeeting;
        vm.initParticipants = initParticipants;

        vm.eventData = {
            title: "",
            id:"",
            start: "",
            end: ""
        };

        $scope.username = AccountService.authentication.userName;
        function deleteEvent() {
            
            EventService.deleteEvent($scope.SelectedEvent.title, $scope.SelectedEvent.id, $scope.username).then(function (data) {
                $scope.username = AccountService.authentication.userName;
                CalendarService.getEvents($scope.username).then(function (data) {
                    var events = data;
                    $scope.events = events;
                }, function (response) {
                    vm.message = "Error occurred: " + response.data;
                    ngNotify.set(vm.message, {
                        sticky: true,
                        type: 'error'
                    });
                });
                console.log($scope.SelectedEvent);
                $state.reload();
            }, function (err) {
                vm.message = err;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });

            
            CalendarService.getEvents($scope.username).then(function (data) {
                var events = data;
                $scope.events = events;
            }, function (response) {
                vm.message = "Error occurred: " + response.data;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });
        };

        function init() {
            console.log($scope.SelectedEvent);
            vm.eventData.title = $scope.SelectedEvent.title;
            vm.eventData.id = $scope.SelectedEvent.id;
            vm.eventData.start = new Date($scope.SelectedEvent.start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            vm.eventData.end = new Date($scope.SelectedEvent.end).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            console.log(vm.eventData.start);
        };

        function editEvent() {
            EventService.editEvent(vm.eventData.title, vm.eventData.id,vm.eventData.start,vm.eventData.end).then(function (data) {
                console.log(vm.eventData);
                $state.reload();
            }, function (err) {
                vm.message = err;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });
        };

        function initParticipants() {
            MeetingService.getParticipants($scope.SelectedEvent.title, $scope.SelectedEvent.start, $scope.SelectedEvent.end, $scope.SelectedEvent.location, $scope.SelectedEvent.priority).then(function (data) {
                $scope.participants = data;
                console.log($scope.participants);
            }, function (err) {
                vm.message = err;
                ngNotify.set(vm.message, {
                    sticky: true,
                    type: 'error'
                });
            });
        };

        function goToEvent() {
            $state.go("event");
        };

        function goToMeeting() {
            $state.go("meeting");
        };

        $scope.SelectedEvent = null;
        $scope.username = AccountService.authentication.userName;
        CalendarService.getEvents($scope.username).then(function (data) {
            var events = data;
            $scope.events = events;
            displayCalendar();
        }, function (error) {
            vm.message = error;
            ngNotify.set(vm.message, {
                sticky: true,
                type: 'error'
            });
        });
        vm.user = AccountService.authentication.user;

        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };
        function displayCalendar() {
            /* config object */
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    header: {
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    events: $scope.events,
                    eventClick: function (event) {
                        $scope.SelectedEvent = event;
                        vm.selectedStart = new Date($scope.SelectedEvent.start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                        vm.selectedEnd = new Date($scope.SelectedEvent.end).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    },
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
        }
        /* event sources array*/
        $scope.eventSources = [];
        
    }
})(angular);
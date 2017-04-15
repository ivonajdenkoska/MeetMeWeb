(function (angular) {
    'use strict';

    angular
      .module('meet-me')
      .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$log', '$scope', '$compile', 'uiCalendarConfig', 'CalendarService', '$interval', 'AccountService'];

    function CalendarController($log, $scope, $compile, uiCalendarConfig, CalendarService, $interval, AccountService) {
        var vm = this;
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        /*var events_array = [{
            id: 'available',
            start: new Date(y, m, d + 1, 9, 0),
            end: new Date(y, m, d + 1, 18, 0),
            rendering: 'background'
        }, {
            id: 'available',
            start: new Date(y, m, d + 2, 9, 0),
            end: new Date(y, m, d + 2, 18, 0),
            rendering: 'background'
        }, {
            constraint: 'available',
            id: 99,
            title: 'Foo',
            start: new Date(y, m, d + 1, 10, 0),
            end: new Date(y, m, d + 1, 11, 0),
            durationEditable: false,
            editable: true
        }];*/
        //$scope.events = CalendarService.getEvents();
        //$interval(loadEvents, 3000);
        $scope.SelectedEvent = null;
        //vm.loadEvents = loadEvents;
        $scope.username = AccountService.authentication.userName;
        $scope.events = CalendarService.getEvents($scope.username);
        console.log($scope.events);
        vm.user = AccountService.authentication.user;
       /* function loadEvents(username) {
            $scope.events = CalendarService.getEvents(username);
            console.log($scope.events);
        };*/

        $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "https://localhost:44362/api/event/getEvents?username='"+"m.nacev@yahoo.com"+"'",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        /*$scope.events = [
          { title: 'All Day Event', start: new Date(y, m, 1) },
          { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
          { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
          { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
          { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
          { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
        ];*/
        //loadEvents();
        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
               { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
               { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
               { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function () {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };
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
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                /* timeFormat: {
                     month: ' ',
                     agenda: 'h:mm t'
                 },*/
                events: $scope.events,
                eventClick: function(event){
                    $scope.SelectedEvent=event;
                },
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
               eventRender: function(event, element) {
                    $(element).tooltip({ title: event.title });
               }
            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [];
        //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

    }
})(angular);
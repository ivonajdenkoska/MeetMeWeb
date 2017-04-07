(function () {
    'use strict';

    angular
      .module('meet-me')
      .directive('dateTimePicker', dateTimePicker);

    dateTimePicker.$inject = [];

    /* @ngInject */
    function dateTimePicker() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/directives/date-time-picker/dateTimePickerView.html',
            scope: {
                model: "=",
                label: "@"
            },
            controller: DateTimePickerController,
            bindToController: true,
            controllerAs: 'vm',
            compile: compileFn
        };
        return directive;

        function compileFn(element, attr, transclude) {
            return postLinkFn;
        }

        function postLinkFn(scope, element, attr) {
            link(scope, element, attr);
        }


        function link(scope, element, attrs, ctrl) {
            var input = element.eq(0).children().eq(1);
            input.datetimepicker({
                format: 'dd/MM/yyyy hh:mm:ss'
            });
        }

    }

    DateTimePickerController.$inject = [];

    /* @ngInject */
    function DateTimePickerController() {
        var vm = this;
    }


})();
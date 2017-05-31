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
                label: "@",
                model: "="
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
                format: 'yyyy-mm-dd hh:ii'
            });
            // $(input).datetimepicker('setHoursDisabled', [12, 19]);
            $(input).datetimepicker('setStartDate', new Date());
            $(input).datetimepicker('update');

        }

    }

    DateTimePickerController.$inject = ['$scope', '$attrs', '$log'];

    /* @ngInject */
    function DateTimePickerController($scope,$attrs,$log) {
        var vm = this;
        $scope.test = {};
        vm.model = $scope.test.relation;
    }


})();
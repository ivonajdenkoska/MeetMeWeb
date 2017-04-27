(function (angular) {
    angular
        .module("meet-me")
        .controller("indexController", IndexController);

    IndexController.$inject = ['$scope', '$location', 'AccountService'];

    function IndexController($scope, $location, AccountService){
        var vm = this;

        $scope.logOut = function () {
            AccountService.logOut();
            $location.path('/');
        }

        $scope.authentication = AccountService.authentication;
    }
})(angular);
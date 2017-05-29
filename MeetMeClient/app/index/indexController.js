(function (angular) {
    angular
        .module("meet-me")
        .controller("indexController", IndexController);

    IndexController.$inject = ['$scope', '$location', 'AccountService', 'UserService', '$state'];

    function IndexController($scope, $location, AccountService, UserService, $state) {
        var vm = this;
        $scope.count = '0';
        $scope.users = UserService.getAllUsers();

        $scope.logOut = function () {
            AccountService.logOut();
            $location.path('/');
        }

        $scope.authentication = AccountService.authentication;

        $scope.selectUser = function (selected) {
            $state.go('profile', {
                id: selected.originalObject.id
            });

        };
    }
})(angular);
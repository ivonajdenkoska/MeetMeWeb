(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('UserService', UserServiceFn);

    UserServiceFn.$inject = ['$resource'];

    function UserServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/user', {},
        {
            getByUsername: { method: "GET", url: 'https://localhost:44362/api/user/get', params: { username: '@username' } },
            getAll: { method: "GET", url: 'https://localhost:44362/api/user/getAll', isArray: true}
        });

        var _user = null;
        var _users = null;

        var service = {
            getUserByUsername: getUserByUsernameFn,
            getAllUsers: getAllUsers,
            user: _user,
            users: _users
        };

        function getUserByUsernameFn(username) {
            return resource.getByUsername({ username: username }, function (response) {
                _user = response;
            }).$promise;
        };

        function getAllUsers() {
            return resource.getAll(function (response) {
                _users = response;
            });
        };

        return service;
    }
})(angular);
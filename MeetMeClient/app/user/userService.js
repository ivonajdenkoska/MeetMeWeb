(function (angular) {
    'use-strict';

    angular
        .module('meet-me')
        .factory('UserService', UserServiceFn);

    UserServiceFn.$inject = ['$resource'];

    function UserServiceFn($resource, localStorageService, ngAuthSettings) {
        var resource = $resource('https://localhost:44362/api/user', {},
        {
            getByUsername: { method: "GET", url: 'https://localhost:44362/api/user/get', params: { username:'@username'} },
        });

        var _user = null;

        var service = {
            getUserByUsername: getUserByUsernameFn,
            user : _user
        };

        function getUserByUsernameFn(username) {
            return resource.getByUsername({ username: username }, function (response) {
                _user = response;
            }).$promise;
        };

        return service;
    }
})(angular);
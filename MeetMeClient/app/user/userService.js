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
            getConnection: { method: "GET", url: 'https://localhost:44362/api/user/getConnection', params: { user1: '@user1', user2: '@user2' } },
            setConnection: { method: "POST", url: 'https://localhost:44362/api/user/connectUsers' },
            acceptConnection: { method: "POST", url: 'https://localhost:44362/api/user/acceptConnection' },
            deleteConnection: { method: "POST", url: 'https://localhost:44362/api/user/deleteConnection', headers: { 'Content-Type': 'application/json; charset=utf8' } },
            getConnectionNotifications: { method: "GET", url: 'https://localhost:44362/api/user/getConnestionNotifications', params: { userId: '@userId' }, isArray: true },
            getAll: { method: "GET", url: 'https://localhost:44362/api/user/getAll', isArray: true}
        });

        var _user = null;
        var _users = null;

        var service = {
            getUserByUsername: getUserByUsernameFn,
            getUserByID: getUserByIDFn,
            getConnection: getConnectionFn,
            connectUsers: connectUsersFn,
            acceptConnection: acceptConnectionFn,
            deleteConnection: deleteConnectionFn,
            getConnectionNotifications: getConnectionNotificationsFn,
            getAllUsers: getAllUsers,
            user: _user,
            users: _users
        };

        function getUserByUsernameFn(username) {
            return resource.getByUsername({ username: username }, function (response) {
                _user = response;
            }).$promise;
        };

        function getUserByIDFn(id) {
            return resource.get({ id: id }).$promise;
        };

        function getConnectionFn(user1, user2) {
            return resource.getConnection({ user1: user1, user2: user2 }).$promise;
        }

        function connectUsersFn(connection) {
            return resource.setConnection(connection).$promise;
        }

        function acceptConnectionFn(connection) {
            return resource.acceptConnection(connection).$promise;
        }

        function deleteConnectionFn(connection) {
            return resource.deleteConnection(connection).$promise;
        }

        function getConnectionNotificationsFn(userId) {
            return resource.getConnectionNotifications({ userId: userId }).$promise;
        }

        function getAllUsers() {
            return resource.getAll(function (response) {
                _users = response;
            });
        };

        return service;
    }
})(angular);
(function () {
    'use strict';
 
    angular
        .module('secondAppApp')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {
 
        var service = {};
        var usersInStore = getUsers();
        console.log("In localStorage");
            console.log(usersInStore);
            console.log(localStorage.users);
            //var lastUserInStore = usersInStore[usersInStore.length - 1] || { id: 0 };

            var inituser={"admin":true,"firstName":"admin","lastName":"admin","username":"admin","password":"password","id":1};
            if(usersInStore.length==0)
            {
                usersInStore.push(inituser);
            setUsers(usersInStore);
            console.log(localStorage.users);

            }
            else
            {
                console.log(" localStorage is not null");
            }
            //localStorage.users =localStorage.users||[{"admin":true,"firstName":"admin","lastName":"admin","username":"admin","password":"password","id":1}];
            //console.log(localStorage.users);
            //localStorage.users[0]={"admin":true,"firstName":"admin","lastName":"admin","username":"admin","password":"password","id":1};
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
 
        return service;
 
        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }
 
        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
 
        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
 
        function Create(user) {
            var deferred = $q.defer();
 
            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();
 
                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;
 
                            // save to local storage
                            users.push(user);
                            setUsers(users);
 
                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);
 
            return deferred.promise;
        }
 
        function Update(user) {
            var deferred = $q.defer();
 
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve({success: true});
 
            return deferred.promise;
        }
 
        function Delete(id) {
            var deferred = $q.defer();
 
            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();
 
            return deferred.promise;
        }
 
        // private functions
 
        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }
 
            return JSON.parse(localStorage.users);
        }
 
        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();
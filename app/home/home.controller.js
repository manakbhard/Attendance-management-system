(function () {
    'use strict';

    angular
        .module('secondAppApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            console.log("1213");
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
           //console.log("loadCurrentUser"+$rootScope.globals.currentUser.username)
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    //console.log(user);
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {

            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();
(function () {
    'use strict';
 console.log('1');
    angular
        .module('secondAppApp')
        .controller('RegisterController', RegisterController);
 
    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;
 
        vm.register = register;
 
        function register() {
            console.log("Hi"+vm.user.admin);
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/home');
                    } else {
                        alert(response.message);
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }
 
})();
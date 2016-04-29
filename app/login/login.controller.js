(function () {
    'use strict';
 console.log('2');
    angular
        .module('secondAppApp')
        .controller('LoginController', LoginController);
 console.log('3');
    LoginController.$inject = ['UserService','$location', 'AuthenticationService', 'FlashService','$rootScope','$scope'];
    function LoginController( UserService,$location, AuthenticationService, FlashService,$rootScope,$scope) {
        var vm = this;
 console.log('4');
        vm.login = login;
        //new
       // vm.user=null;
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    var d=vm.username;
                    console.log("dd="+d);

                  $scope.user= UserService.GetByUsername(d)
                .then(function (user) {
                    console.log(user);
                    $scope.user = user;
                    console.log('sdffsf'+$scope.user.admin);
                           if(user.admin==true){
                        console.log('AdminUser');
                    $location.path('/home');
            }
            else
            {
                console.log('NonAdminUser');
                $location.path('/users/'+vm.username);
            }
                });
                   //new
                   console.log("dfdgfdgs"+$scope.user);
             
                } else {
                    alert("Username or password is incorrect");
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
 
})();
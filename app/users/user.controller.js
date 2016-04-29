(function () {
    'use strict';

    angular
        .module('secondAppApp')
        .controller('UserController', UserController);

    UserController.$inject = ['UserService', '$location', '$rootScope', 'FlashService','$scope'];
    function UserController(UserService, $location, $rootScope, FlashService,$scope) {
        var vm = this;

       // vm.user = user;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        //vm.updateUser=updateUser;

        initController();

        function initController() {
            console.log("1213");
            console.log(document.getElementById("dates").value);
                                //console.log(" In user controller"+user);
                   // console.log(" In user controller vm"+vm.user);
            loadCurrentUser();

           // loadAllUsers();
         /**/
        }
                            //console.log(" In user controller"+user);
                    //console.log(" In user controller vm"+vm);
                    //console.log(" In user controller vm"+vm.username);
/*  $scope.$watch('dates', function() {
        // do something here
            var vis = "block";
            var abc= document.getElementById('div1').style.display;
            console.log(abc);
    document.getElementById('div1').style.display = vis;
        console.log("31334");
       
    }, true);*/

                  $scope.$watch(
                    "vm.user.dates",
                    function handledateChange( newValue, oldValue ) {
                        var abc= document.getElementById('div1').style.display;
                        /*var x=document.getElementById('startt').value;
                        console.log('x='+x);
                        vm.user.startt=x;*/
                        console.log(vm.user.startt);
                        /*var z=document.getElementById('endt').value;
                        console.log('z='+z);
                        vm.user.endt=z;*/
                        console.log(vm.user.endt);

                        /*var y=new Date(vm.user.dates);
                        console.log('y='+y);
                        //vm.user.dates=y
                        var w=document.getElementById('dates').value;
                        console.log('w='+w);
                        vm.user.dates=w;*/
                        if(vm.user.dates!=null && vm.user.startt!=null && vm.user.endt!=null){
                            //console.log(document.getElementById('div1').disabled);
                            document.getElementById('startt').disabled=true;
                            document.getElementById('endt').disabled=true;
                            document.getElementById('dates').disabled=true;
                            document.getElementById('save').disabled=true;
                        }

                        console.log( "vm.user.dates:", newValue );
                        if (newValue!=null||oldValue!=null){
                            console.log('1212311431');
                            document.getElementById('div1').style.display = "block";
                    
                        }
                        
                        console.log(abc);
                        }
                );
        function loadCurrentUser() {
                    //console.log(" In user controller"+user);
                    //console.log(" In user controller vm"+vm.user);
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                    console.log(user);
                    if(user.dates!=null && user.startt!=null && user.endt!=null)
                    {
                        document.getElementById('div3').style.display="none"
                        document.getElementById('div2').style.display="block"
                        //document.getElementById('save').disabled=true;
                        document.getElementById('save').style.display="none"


                    }
                    //console.log(" In user controller vm"+vm.user);

                });
        }

       vm.updateUser= function () {

            /*UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });*/
                //vm.dataLoading = true;
                console.log(vm.user.dates);
            UserService.Update(vm.user)
                .then(function (response) {
                    console.log(response);
                    if (response.success) {
                        console.log('Success');
                        FlashService.Success('Update successful', true);
                        $location.path('/users/'+vm.user.username);
                    } else {
                        console.log('failed');
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
                //console.log("234232421343414");
                //console.log(vm.user.username);
                $location.path('/users/'+vm.user.username);
                //console.log("dgfdg");
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();
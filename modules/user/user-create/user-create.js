angular.module('user').controller('UserCreateCtrl',function($scope,$location,userService){

    $scope.addUser = function(user){
        userService.createUser(user)
            .success(function(data){
                $location.path('/user-list');
            })
            .error(function(data){
                console.log(data);
            });
    };

});
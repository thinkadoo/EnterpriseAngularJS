angular.module('user').controller('UserListCtrl',function($scope,userService){

    $scope.readUsers = function() {
        userService.readUsers().
            success(function( data ) {
                $scope.users = data;
            }).
            error(function(data) {
                console.log(data);
            });
    };

    $scope.readUsers();

    $scope.addUser = function(user){
        userService.createUser(user)
            .success(function(data){
                $scope.readUsers();
            })
            .error(function(data){
                console.log(data);
            });
    };
});
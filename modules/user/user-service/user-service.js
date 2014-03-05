angular.module('user').factory('userService',function($http) {
	var userService = {
        createUser: function( userDetails ) {
            return $http.post( 'http://localhost:8888/Enterprise2/app/api.php' + '/user', userDetails );
        },
        readUser: function( userID ) {
            return $http.get('http://localhost:8888/Enterprise2/app/api.php' + '/user/' + userID );
        },
        readUsers: function() {
            return $http.get('http://localhost:8888/Enterprise2/app/api.php' + '/user');
        },
        updateUser: function( userDetails ) {
            return $http.put( 'http://localhost:8888/Enterprise2/app/api.php' + '/user', userDetails );
        },
        deleteUser: function( userID ) {
            return $http.delete( 'http://localhost:8888/Enterprise2/app/api.php' + '/user/' + userID );
        }
    };
	return userService;
});
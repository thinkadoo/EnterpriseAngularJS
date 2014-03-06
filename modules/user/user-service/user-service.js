angular.module('user').factory('userService',function($http,constantsService) {
	var userService = {
        createUser: function( userDetails ) {
            return $http.post( constantsService.apiGetEndpoint() + '/user', userDetails );
        },
        readUser: function( userID ) {
            return $http.get( constantsService.apiGetEndpoint() + '/user/' + userID );
        },
        readUsers: function() {
            return $http.get( constantsService.apiGetEndpoint() + '/user' );
        },
        updateUser: function( userDetails ) {
            return $http.put( constantsService.apiGetEndpoint() + '/user', userDetails );
        },
        deleteUser: function( userID ) {
            return $http.delete( constantsService.apiGetEndpoint() + '/user/' + userID );
        }
    };
	return userService;
});
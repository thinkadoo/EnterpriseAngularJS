angular.module('app', ['ui.bootstrap','ui.utils','ui.router','ngAnimate','user','employees','demo','httpPostFix']);
angular.module('user', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']); // <------ add user
angular.module('employees', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']); // <------ add employees
angular.module('demo', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']); // <------ add demo

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('employees-list', {
        url: '/employees-list',
        templateUrl: 'modules/employees/employees-list/employees-list.html'
    });
    $stateProvider.state('user-list', {
        url: '/user-list',
        templateUrl: 'modules/user/user-list/user-list.html'
    });
    $stateProvider.state('user-create', {
        url: '/user-create',
        templateUrl: 'modules/user/user-create/user-create.html'
    });
    $stateProvider.state('user-update', {
        url: '/user-update',
        templateUrl: 'modules/user/user-update/user-update.html'
    });
    $stateProvider.state('demo-list', {
        url: '/demo-list',
        templateUrl: 'modules/demo/demo-list/demo-list.html'
    });
    /* Add New States Above */

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

// http://thegreenpizza.github.io/2013/05/25/building-minification-safe-angular.js-applications/

angular.module('app').service('constantsService', [ function() {
    var constantsService = {
        apiGetEndpoint: function( ) {
            return 'http://localhost:8888/Enterprise/app/api.php';
        }
    };
    return constantsService;
}]);
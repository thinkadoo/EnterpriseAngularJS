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

// Modifies $httpProvider for correct server communication (POST variable format)
angular.module('httpPostFix', [], ['$httpProvider',function($httpProvider)
{
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data)
    {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj)
        {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj)
            {
                value = obj[name];

                if(value instanceof Array)
                {
                    for(i=0; i<value.length; ++i)
                    {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object)
                {
                    for(subName in value)
                    {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]);
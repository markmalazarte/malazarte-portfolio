
var appServices = angular.module('appServices', []);

angular.module('angular-lo-dash', [])
  .factory('_', ['$window', function ($window) {
    return $window._;
  }]);

var app = angular.module('app', ['ngRoute',
                                 'appServices', 
                                 'angular-lo-dash'
                                 ]);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: "src/index.html",
      controller: "homeCtrl"
    }).when('/search/', {
      templateUrl: "app/templates/search.html",
      controller: "searchCtrl"
    });
});
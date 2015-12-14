(function (angular) {
  'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state('app', {
            url: '/',
            templateUrl: 'modules/app.appdea/views/appdea.feed.html',
            requiresLogin: true
          })
          .state('signup', {
            url: '/signup',
            templateUrl: 'modules/app.user/views/signup.html',
            notWhileLoggedIn: true
          })
          .state('login', {
            url: '/login',
            templateUrl: 'modules/app.user/views/login.html',
            notWhileLoggedIn: true
          });


        $urlRouterProvider.otherwise('/login');
      }])

  // measures against AJAX request caching
  // Credit: http://stackoverflow.com/a/19771501
    .config(['$httpProvider', function ($httpProvider) {
      //initialize get if not there
      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
      }    

      // Answer edited to include suggestions from comments
      // because previous version of code introduced browser-related errors

      //disable IE ajax request caching
      $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
      // extra
      $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
      $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }])

    .run(['$rootScope', '$state', 'User',
      function ($rootScope, $state, User) {
        $rootScope.$on('$stateChangeStart',
          function (event, toState, toParams, fromState, fromParams) {
            if (toState.requiresLogin && !User.isAuthenticated()) {
              event.preventDefault();
              $state.go('login');
            }

            if (toState.notWhileLoggedIn && User.isAuthenticated()) {
              event.preventDefault();
              $state.go('app');
            }
          })
      }]);

})(angular);

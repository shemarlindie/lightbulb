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

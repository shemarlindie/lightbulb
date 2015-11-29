(function (angular) {
  'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('app', {
          url: '/',
          templateUrl: 'modules/app.appdea/views/appdea.feed.html'
        })

      }]);

})(angular);

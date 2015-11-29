(function (angular) {
  'use strict';

  angular.module('app')
    .config(['$mdThemingProvider', function ($mdThemingProvider) {

      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('yellow')
        .backgroundPalette('grey', {
          'default': '50',
          'hue-1': '100',
          'hue-2': '200',
          'hue-3': '300'
        })

    }]);

})(angular);

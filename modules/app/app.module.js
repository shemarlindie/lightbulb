/* global $ */
/* global angular */
(function (angular) {
  'use strict';

  // MODULE DEFINITION
  angular.module('app', ['app.firebase', 'app.user', 'app.appdea', 'ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngSanitize'])

  // measures against template caching
  // Credit: http://stackoverflow.com/a/27432167
    .config(['$provide', function ($provide) {
      // Set a suffix outside the decorator function 
      var cacheBuster = Date.now().toString();

      function templateFactoryDecorator($delegate) {
        var fromUrl = angular.bind($delegate, $delegate.fromUrl);
        $delegate.fromUrl = function (url, params) {
          if (url !== null && angular.isDefined(url) && angular.isString(url)) {
            url += (url.indexOf("?") === -1 ? "?" : "&");
            url += "v=" + cacheBuster;
          }

          return fromUrl(url, params);
        };

        return $delegate;
      }

      $provide.decorator('$templateFactory', ['$delegate', templateFactoryDecorator]);
    }])

    .run(function () {
      // remove preloader
      $('#preloader').fadeOut(1000, function () {
        $(this).remove();
      });
    });

})(angular);
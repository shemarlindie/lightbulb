/* global angular */
(function (angular) {
  'use strict';

  // MODULE DEFINITION
  angular.module('app', ['app.api', 'app.appdea', 'ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngSanitize'])

    .run(function () {
      // remove preloader
      $('#preloader').fadeOut(500, function () {
        $(this).remove();
      });
    });

})(angular);
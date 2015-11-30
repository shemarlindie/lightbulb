/* global angular */
(function (angular) {
  'use strict';

  // MODULE DEFINITION
  angular.module('app', ['app.api', 'app.appdea', 'ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngSanitize'])

    .run(function () {
      // remove preloader
      $('#preloader').fadeOut(1000, function () {
        $(this).remove();
      });
    });

})(angular);
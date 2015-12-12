(function (angular) {
  'use strict';
  
  // MODULE DEFINITION
  angular.module('app.appdea', ['app.firebase', 'ngAnimate', 'ngAria', 'ngMaterial', 'angularMoment', 'ngSanitize', 'hc.marked'])

  .config(['markedProvider', function (markedProvider) {
      markedProvider.setOptions({
        gfm: true
      });

      markedProvider.setRenderer({
        link: function (href, title, text) {
          return "<a href='" + href + "'" + (title ? " title='" + title + "'" : '') + " target='_blank'>" + text + "</a>";
        }
      });
    }]);
  
})(angular);
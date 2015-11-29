(function (angular) {
  'use strict';
  
  angular.module('app')
    .controller('AppCtrl', ['$mdMedia', function ($mdMedia) {
      var vm = this; // view model

      vm.$mdMedia = $mdMedia; // allows media query checks in templates
    }]);

})(angular);
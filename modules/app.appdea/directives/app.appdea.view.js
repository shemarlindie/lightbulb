(function (angular) {
  'use strict';

  angular.module('app.appdea')
    .directive('appdeaView', function () {
      return {
        restrict: 'E',
        templateUrl: 'modules/app.appdea/views/appdea.view.tpl.html',
        requires: 'ngModel',
        scope: {
          appdea: '=ngModel',
          onEdit: '=',
          onDelete: '=',
        }
      };
    });

})(angular);
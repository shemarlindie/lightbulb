(function (angular) {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', ['FirebaseService', 'User', '$scope', '$state',
      function (FirebaseService, User, $scope, $state) {
        var vm = this; // view model
        
        vm.user = undefined;
        
        var authCallback = function (authData) {
          if (authData) {
            vm.user = User.getProfile();
          }
          else {
            vm.user = undefined;
          }
        }

        FirebaseService.onAuth(authCallback);
        
        $scope.$on('$destroy', function () {
          FirebaseService.offAuth(authCallback);
        });

        vm.logout = function () {
          User.logout();
          $state.go('login');
        }
      }]);

})(angular);
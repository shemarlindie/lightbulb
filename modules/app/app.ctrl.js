(function (angular) {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', ['FirebaseService', 'User', '$scope', '$state',
      function (FirebaseService, User, $scope, $state) {
        var vm = this; // view model
        
        vm.user = {};
        
        var authCallback = function (authData) {
          if (authData) {
            vm.user = User.getProfile();
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

        vm.isAuthenticated = function () {
          return User.isAuthenticated();
        }
      }]);

})(angular);
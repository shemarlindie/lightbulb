(function (angular) {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', ['FirebaseService', 'User', '$scope', '$state', '$location', '$mdMedia', '$mdSidenav',
      function (FirebaseService, User, $scope, $state, $location, $mdMedia, $mdSidenav) {
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
        }
        
        vm.hasSidenav = function () {
          return $state.current.hasSidenav;
        }
        
        vm.showSidenavToggle = function () {
          return $mdMedia('xs') || $mdMedia('sm');
        }
        
        vm.toggleSidenav = function () {
          $mdSidenav('sidenav-main').toggle();
        }
      }]);

})(angular);
(function (angular) {
  'use strict';
  
  angular.module('app')
    .controller('AppCtrl', ['$mdMedia', '$state', 'User', function ($mdMedia, $state, User) {
      var vm = this; // view model

      vm.$mdMedia = $mdMedia; // allows media query checks in templates
      vm.user = {};
      
      vm.loadUserProfile = function () {
        vm.user = User.getProfile();
      }
      
      vm.logout = function () {
        User.logout();
        $state.go('login');
      }
      
      vm.isAuthenticated = function () {
        return User.isAuthenticated();
      }
    }]);

})(angular);
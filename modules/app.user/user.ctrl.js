(function (angular) {
  'use strict';

  angular.module('app.user')
    .controller('UserCtrl', ['User', '$state',
      function (User, $state) {
        var vm = this; // view model
        
        vm.signingUp = false;
        vm.loggingIn = false;
        vm.signupData = {};
        vm.loginData = {
          rememberMe: true
        };
        vm.loginError = undefined;
        vm.signupError = undefined;

        vm.signup = function () {
          vm.signingUp = true;
          User.create(vm.signupData)
            .then(function (data) {
              $state.go('login');
            })
            .catch(function (error) {
              vm.signupError = error;
            })
            .finally(function () {
              vm.signingUp = false;
            });
        }

        vm.login = function () {
          vm.loggingIn = true;
          User.login(vm.loginData)
            .then(function (data) {
              $state.go('app');
            })
            .catch(function (error) {
              vm.loginError = error;
            })
            .finally(function () {
              vm.loggingIn = false;
            });
        }

        vm.logout = function () {
          User.logout();
          $state.go('login');
        }

      }]);

})(angular);
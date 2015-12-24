/* global angular */
(function (angular) {
  'use strict';

  angular.module('app.user')
    .controller('UserCtrl', ['User', 'Appdea', '$state', '$scope', 'FirebaseService', '$mdDialog', '$mdSidenav', '$location',
      function (User, Appdea, $state, $scope, FirebaseService, $mdDialog, $mdSidenav, $location) {
        var vm = this; // view model
        
        vm.sidenav = {
          sections: [
            {
              name: 'Account Settings',
              type: 'heading',
              children: [
                {
                  name: 'Profile',
                  url: 'modules/app.user/views/account.profile.html',
                  type: 'link'
                },
                {
                  name: 'Security',
                  url: 'modules/app.user/views/account.security.html',
                  type: 'link'
                }
              ]
            }
          ],

          selectedSection: undefined
        }

        var sectionIndex = $location.search()['section'];
        if (sectionIndex >= 0 && sectionIndex < vm.sidenav.sections[0].children.length) {
          vm.sidenav.selectedSection = vm.sidenav.sections[0].children[sectionIndex];
        }
        else {
          vm.sidenav.selectedSection = vm.sidenav.sections[0].children[0];
        }

        vm.signingUp = false;
        vm.loggingIn = false;
        vm.updatingProifle = false;
        vm.changingEmail = false;
        vm.removingAcccount = false;
        vm.changingPassword = false;
        vm.signupData = {};
        vm.loginData = {
          rememberMe: true
        };
        vm.loginError = undefined;
        vm.signupError = undefined;
        vm.profileError = undefined;
        vm.emailError = undefined;
        vm.removeAccountError = undefined;
        vm.passwordChangeError = undefined;

        vm.profileMsg = undefined;
        vm.emailMsg = undefined;
        vm.passwordChangeMsg = undefined;

        vm.userEdit = {};
        vm.userDelete = {};
        vm.passwordChange = {};
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

        vm.saveProfile = function () {
          vm.updatingProfile = true;
          vm.profileError = undefined;
          vm.profileMsg = undefined;

          vm.user.$save()
            .then(function (ref) {
              vm.profileEditForm.$setPristine();
              vm.profileEditForm.$setUntouched();
              vm.profileMsg = 'Profile updated.';
            })
            .catch(function (error) {
              vm.profileError = error;
            })
            .finally(function () {
              vm.updatingProfile = false;
            });
        }

        vm.changeEmail = function () {
          vm.changingEmail = true;
          vm.emailError = undefined;
          vm.emailMsg = undefined;

          var data = {
            oldEmail: vm.user.email,
            newEmail: vm.userEdit.newEmail,
            password: vm.userEdit.password
          };

          User.changeEmail(data)
            .then(function (data) {
              vm.userEdit = {};
              vm.changeEmailForm.$setPristine();
              vm.changeEmailForm.$setUntouched();
              vm.emailMsg = 'Account email changed from to ' + vm.user.email + '.'
            })
            .catch(function (error) {
              vm.emailError = error;
            })
            .finally(function () {
              vm.changingEmail = false;
            });
        }

        vm.removeAccount = function () {
          // confirm danger action
          var confDialog = $mdDialog.confirm()
            .htmlContent('Your Lightbulb account, <b>' + (vm.user ? vm.user.email : '') + '</b>, will be deleted. This action is not reversable. Continue?')
            .ok('Delete My Account')
            .cancel('Cancel');

          $mdDialog.show(confDialog)
            .then(function () {
              // user about to lose privilages; stop listening for data
              Appdea.disconnect();
          
              // remove user
              vm.removingAccount = true;
              vm.removeAccountError = undefined;
              var data = {
                email: vm.user.email,
                password: vm.userDelete.password
              }
              User.remove(data)
                .then(function () {
                  vm.userDelete = {};
                  console.log('account removed');
                })
                .catch(function (error) {
                  vm.removeAccountError = error;
                })
                .finally(function () {
                  vm.removingAccount = false;
                });
            });
        }

        vm.changePassword = function () {
          vm.changingPassword = true;
          vm.passwordChangeError = undefined;
          vm.passwordChange.email = vm.user.email;

          User.changePassword(vm.passwordChange)
            .then(function () {
              vm.passwordChange = {};
              vm.changePasswordForm.$setPristine();
              vm.changePasswordForm.$setUntouched();
              vm.passwordChangeMsg = 'Password changed.';
            })
            .catch(function (error) {
              vm.passwordChangeError = error;
            })
            .finally(function () {
              vm.changingPassword = false;
            });
        }

        vm.signup = function () {
          vm.signingUp = true;
          User.create(vm.signupData)
            .then(function (data) {
              $state.go('app');
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

        vm.onSectionSelected = function (section) {
          vm.sidenav.selectedSection = section;
          $mdSidenav('sidenav-main').close();
          // $location.search({ section: vm.sidenav.sections[0].children.indexOf(section) });
        }

      }]);

})(angular);
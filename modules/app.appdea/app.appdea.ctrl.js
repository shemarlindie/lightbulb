(function (angular) {
  'use strict';

  angular.module('app.appdea')
    .controller('AppdeaCtrl', ['Appdeas', '$mdDialog', '$scope',
      function (Appdeas, $mdDialog, $scope) {
        var vm = this; // view model
    
        vm.appdeas = [];
        vm.loading = false;
        vm.status = [
          {
            name: 'Not Started',
            value: 0
          },
          {
            name: 'In Design',
            value: 1
          },
          {
            name: 'In Development',
            value: 2
          },
          {
            name: 'Developed',
            value: 3
          }
        ]
        vm.newAppdea = {};

        vm.init = function () {
          vm.loading = true;
          vm.reset();
          Appdeas.get()
            .then(function (data) {
              vm.loading = false;
              vm.appdeas = data;
              console.log('appdeas loaded:', data);
            })
            .catch(function (error) {
              console.log('unable to load appdeas:', error);
            });
        }

        vm.create = function () {
          var timestamp = Date.now() / 1000;
          vm.newAppdea.date_created = timestamp;
          vm.newAppdea.date_updated = timestamp;
          Appdeas.create(vm.newAppdea)
            .then(function (data) {
              vm.reset();
              console.log('added appdea:', data);
            })
            .catch(function (error) {
              console.log('unable to create appdea:', error);
            });
        }

        vm.update = function (appdea) {
          return Appdeas.update(appdea)
            .then(function (data) {
              console.log('updated appdea', data);
            })
            .catch(function (error) {
              console.log('unable to update appdea:', error);
            });
        }

        vm.remove = function ($event, appdea) {
          var dialog = $mdDialog.confirm()
            .targetEvent($event)
            .htmlContent('<b>' + appdea.title + '</b> will be deleted.')
            .ok('Delete')
            .cancel('Cancel')

          $mdDialog.show(dialog)
            .then(function () {
              Appdeas.delete(appdea)
                .then(function (data) {
                  console.log('deleted appdea:', data);
                })
                .catch(function (error) {
                  console.log('unable to delete appdea:', error);
                });
            });
        }

        vm.edit = function ($event, appdea) {
          $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            templateUrl: 'modules/app.appdea/views/appdea.edit.dialog.tpl.html',
            locals: {
              status: vm.status,
              appdea: appdea
            },
            controllerAs: 'vm',
            controller: ['$mdDialog', 'status', 'appdea', function ($mdDialog, status, appdea) {
              var vm = this;

              vm.status = status;
              vm.appdea = angular.copy(appdea);

              vm.cancel = function () {
                $mdDialog.cancel();
              }

              vm.save = function () {
                appdea.title = vm.appdea.title;
                appdea.description = vm.appdea.description;
                appdea.status = vm.appdea.status;
                appdea.date_updated = Date.now() / 1000;
                $mdDialog.hide(vm.appdea);
              }
            }]
          })
            .then(function (data) {
              vm.update(data);
            });
        }

        vm.reset = function () {
          vm.newAppdea = { status: 0 };
          if (vm.appdeaCreateForm) {
            vm.appdeaCreateForm.$setPristine();
            // vm.appdeaCreateForm.$setValidity();
            vm.appdeaCreateForm.$setUntouched();
          }
        }
      }]);

})(angular);
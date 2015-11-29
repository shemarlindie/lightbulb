(function (angular) {
  'use strict';

  angular.module('app.appdea')
    .controller('AppdeaCtrl', ['APIService', '$mdDialog', '$scope', function (APIService, $mdDialog, $scope) {
      var vm = this; // view model
    
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
      vm.appdeas = [];
      vm.newAppdea = {};

      vm.init = function () {
        vm.loading = true;
        vm.reset();
        APIService.getAppdeas()
          .then(function (response) {
            vm.appdeas = response.data.reverse();
            vm.loading = false;
            console.log('appdeas loaded', vm.appdeas);
          });
      }

      vm.add = function () {
        var timestamp = Date.now() / 1000;
        vm.newAppdea.date_created = timestamp;
        vm.newAppdea.date_updated = timestamp;
        vm.appdeas.unshift(vm.newAppdea);
        APIService.createAppdea(vm.newAppdea)
          .then(function (response) {
            vm.newAppdea.id = response.data.id;
            vm.reset();
            console.log('added', response.data);
          });
      }

      vm.update = function (appdea) {
        return APIService.updateAppdea(appdea)
          .then(function (response) {
            console.log('updated', response);
            return response;
          });
      }

      vm.remove = function ($event, appdea) {
        var index = vm.appdeas.indexOf(appdea);
        APIService.deleteAppdea(appdea.id)
          .then(function () {
            console.log('removed');
          });
        vm.appdeas.splice(index, 1);
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
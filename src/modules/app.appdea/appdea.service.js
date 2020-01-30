/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.appdea')
    .factory('Appdea', ['FirebaseService', '$firebaseArray', 'User',
      function (FirebaseService, $firebaseArray, User) {

        var service = {
          appdeas: undefined,

          connect: function () {
            if (this.appdeas === undefined) {
              // console.log('connecting appdea service');
              
              var ref = FirebaseService.getDbRef().child('appdeas');
              this.appdeas = $firebaseArray(ref);
            }
          },

          disconnect: function () {
            if (this.appdeas) {
              // console.log('disconnecting appdea service');

              this.appdeas.$destroy();
              this.appdeas = undefined;
            }
          },

          getAll: function () {
            service.connect();
            return this.appdeas && this.appdeas.$loaded();
          },

          create: function (appdea) {
            service.connect();
            var u = User.getProfile();
            if (u) {
              appdea.uid = u.uid;
              appdea.uname = u.first_name + ' ' + u.last_name;
            }

            return this.appdeas && this.appdeas.$add(appdea);
          },

          update: function (appdea) {
            service.connect();
            return this.appdeas && this.appdeas.$save(appdea);
          },

          delete: function (appdea) {
            service.connect();
            return this.appdeas && this.appdeas.$remove(appdea);
          }
        };

        var authCallback = function (authData) {
          if (authData) {
            service.connect();
          }
          else {
            service.disconnect();
          }
        }

        FirebaseService.onAuth(authCallback);

        return service;

      }]);

})(angular);
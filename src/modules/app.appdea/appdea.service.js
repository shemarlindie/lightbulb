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
              var ref = FirebaseService.getRef().child('appdeas');
              this.appdeas = $firebaseArray(ref);
            }
          },

          disconnect: function () {
            if (this.appdeas) {
              this.appdeas.$destroy();
              this.appdeas = undefined;
            }
          },

          getAll: function () {
            return this.appdeas && this.appdeas.$loaded();
          },

          create: function (appdea) {
            var u = User.getProfile();
            if (u) {
              appdea.uid = u.uid;
              appdea.uname = u.first_name + ' ' + u.last_name;
            }

            return this.appdeas && this.appdeas.$add(appdea);
          },

          update: function (appdea) {
            return this.appdeas && this.appdeas.$save(appdea);
          },

          delete: function (appdea) {
            return this.appdeas && this.appdeas.$remove(appdea);
          }
        };

        return service;

      }]);

})(angular);
/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.appdea')
    .factory('Appdea', ['FirebaseService', '$firebaseArray', 'User',
      function (FirebaseService, $firebaseArray, User) {
        var ref = FirebaseService.getRef().child('appdeas');

        var service = {
          appdeas: undefined,

          getAll: function () {
            if (this.appdeas === undefined) {
              this.appdeas = $firebaseArray(ref);
            }

            return this.appdeas.$loaded();
          },

          create: function (appdea) {
            var u = User.getProfile();
            if (u) {
              appdea.uid = u.uid;
              appdea.uname = u.first_name + ' ' + u.last_name;
            }
            
            return this.appdeas.$add(appdea);
          },

          update: function (appdea) {
            return this.appdeas.$save(appdea);
          },

          delete: function (appdea) {
            return this.appdeas.$remove(appdea);
          }
        };

        return service;

      }]);

})(angular);
/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.firebase')
    .factory('Appdeas', ['$firebaseArray', function ($firebaseArray) {
      var firebaseUrls = {
        APPDEAS: 'https://lightbulb75.firebaseio.com/appdeas'
      }
      
      var ref = new Firebase(firebaseUrls.APPDEAS);

      var service = {
        appdeas: undefined,

        get: function () {
          if (this.appdeas == undefined) {
            this.appdeas = $firebaseArray(ref);
          }
          
          return this.appdeas.$loaded();
        },
        
        create: function (appdea) {
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
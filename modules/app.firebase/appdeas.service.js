/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.firebase')
    .factory('Appdeas', ['$firebaseArray', function ($firebaseArray) {
      var URL_BASE = 'https://lightbulb75.firebaseio.com';
      var URL_APPDEAS = URL_BASE + '/appdeas';
      
      var ref = new Firebase(URL_APPDEAS);

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
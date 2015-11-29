/* global angular */
(function (angular) {
  'use strict';

  // MODULE DEFINITION
  angular.module('app.api')
    .factory('APIService', ['$http', function ($http) {

      var API_ENDPOINT = 'api/';

      var service = {
        getAppdeas: function () {
          var params = {
            action: 'get_appdeas'
          }
          
          return $http.post(API_ENDPOINT, params);
        },
        
        createAppdea: function (data) {
          var params = {
            action: 'create_appdea',
            data: data
          }
          
          return $http.post(API_ENDPOINT, params);
        },
        
        updateAppdea: function (data) {
          var params = {
            action: 'update_appdea',
            data: data
          }
          
          return $http.post(API_ENDPOINT, params);          
        },
        
        deleteAppdea: function (id) {
          var params = {
            action: 'delete_appdea',
            data: {
              id: id
            }
          }
          
          return $http.post(API_ENDPOINT, params);          
        }
      }

      return service;
    }]);

})(angular);
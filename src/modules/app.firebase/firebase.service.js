/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.firebase')
    .factory('FirebaseService', ['$firebaseAuth', function ($firebaseAuth) {
      var firebaseConfig = {
        apiKey: "<api key>",
        authDomain: "<auth domain>",
        databaseURL: "<database url>",
        projectId: "<project id>",
        storageBucket: "<storage bucket>",
        appId: "<app id>",
      };
      firebase.initializeApp(firebaseConfig);

      var service = {
        dbRef: undefined,

        getDbRef: function () {
          if (this.ref === undefined) {
            // Firebase.goOnline();
            this.dbRef = firebase.database().ref();
          }

          return this.dbRef;
        },

        unsetRef: function () {
          // Firebase.goOffline();
          this.dbRef = undefined;
        },

        onAuth: function (callback) {
          // this.getRef().onAuth(callback);
          $firebaseAuth().$onAuthStateChanged(callback);
        },

        offAuth: function (callback) {
          // this.getRef().offAuth(callback);
        }
      };

      return service;

    }]);

})(angular);
/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.user')
    .factory('User', ['FirebaseService', '$firebaseObject', 'SECRET_CODE', '$q', '$state',
      function (FirebaseService, $firebaseObject, SECRET_CODE, $q, $state) {

        var ref = FirebaseService.getRef();
        var usersRef = ref.child('users');

        ref.onAuth(function (authData) {
          if (authData) {
            // user logged in
            console.log('Logged in:', authData);
          }
          else {
            // user logged out
            console.log('Logged out.');
          }
        });

        var service = {
          user: undefined,

          isAuthenticated: function () {
            return ref.getAuth();
          },

          getProfile: function (uid) {
            if (uid) {
              return $firebaseObject(usersRef.child(uid));
            }
            else {
              var auth = ref.getAuth();
              if (auth && !this.user) {
                this.user = $firebaseObject(usersRef.child(auth.uid));
              }
            }

            return this.user;
          },

          login: function (data) {
            var promise = $q(function (resolve, reject) {
              ref.authWithPassword(data, function (error, data) {
                if (error) {
                  reject(error);
                }
                else {
                  resolve(data);
                }
              }, {
                  remember: (data.rememberMe ? 'default' : 'sessionOnly')
                });
            });

            return promise;
          },

          logout: function () {
            ref.unauth();
            this.user = undefined;
          },

          create: function (data) {
            var user = data;

            var promise = $q(function (resolve, reject) {
              if (data.secret === SECRET_CODE) {
                ref.createUser(user, function (error, data) {
                  if (error) {
                    reject(error);
                  }
                  else {
                    // account created; login & create user profile
                    ref.authWithPassword(user, function (error, data) {
                      if (error) {
                        reject(error)
                      }
                      else { // login successful; create profile
                        user.uid = data.uid;
                        delete user.password;
                        delete user.confirm_password;
                        delete user.secret;

                        usersRef.child(user.uid).set(user, function (error) {
                          if (error) {
                            reject(error);
                          }
                          else {
                            resolve(data);
                          }
                        });
                      }
                    }, { remember: true });
                  }
                });
              }
              else {
                reject({ wrongSecretCode: true });
              }
            });

            return promise;
          },

          remove: function (data) {
            var promise = $q(function (resolve, reject) {
              ref.removeUser(data, function (error, data) {
                if (error) {
                  reject(error);
                }
                else {
                  resolve(data);
                }
              });
            });

            return promise;
          },

          changeEmail: function (data) {
            var promise = $q(function (resolve, reject) {
              ref.changeEmail(data, function (error, data) {
                if (error) {
                  reject(error);
                }
                else {
                  resolve(data);
                }
              });
            });

            return promise;
          },

          changePassword: function (data) {
            var promise = $q(function (resolve, reject) {
              ref.changeEmail(data, function (error, data) {
                if (error) {
                  reject(error);
                }
                else {
                  resolve(data);
                }
              });
            });

            return promise
          },

          resetPassword: function (data) {
            var promise = $q(function (resolve, reject) {
              ref.changeEmail(data, function (error, data) {
                if (error) {
                  reject(error);
                }
                else {
                  resolve(data);
                }
              });
            });

            return promise
          }


        };

        return service;

      }]);

})(angular);
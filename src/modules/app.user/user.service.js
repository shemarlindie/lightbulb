/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.user')
    .factory('User', ['FirebaseService', '$firebaseAuth', '$firebaseObject', '$q', '$state',
      function (FirebaseService, $firebaseAuth, $firebaseObject, $q, $state) {

        var service = {
          user: undefined,

          isAdmin: undefined,

          isAuthenticated: function () {
            return $firebaseAuth().$getAuth();
          },

          getProfile: function (uid) {
            if (uid) {
              return $firebaseObject(FirebaseService.getDbRef().child('users/' + uid));
            } else {
              var auth = $firebaseAuth();
              if (auth && !this.user) {
                this.user = $firebaseObject(FirebaseService.getDbRef().child('users/' + auth.uid));
              }
            }

            return this.user;
          },

          login: function (data) {
            var promise = $q(function (resolve, reject) {
              $firebaseAuth().$signInWithEmailAndPassword(data.email, data.password)
                .then(function (user) {
                  resolve(user);
                })
                .catch(function (error) {
                  reject(error);
                });
            });

            return promise;
          },

          logout: function () {
            if (service.user) {
              service.user.$destroy();
              service.user = undefined;
            }
            $firebaseAuth().$signOut();
          },

          create: function (data) {
            var user = data;

            var promise = $q(function (resolve, reject) {
              $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
                .then(function (data) {
                  // account created; create user profile & login
                  var loginData = {
                    email: user.email,
                    password: user.password,
                    rememberMe: true
                  };

                  // don't store password in profile
                  user.uid = data.uid;
                  delete user.password;
                  delete user.confirm_password;

                  // create profile
                  FirebaseService.getDbRef().child('users/' + user.uid).set(user, function (error) {
                    if (error) {
                      reject(error);
                    } else {
                      // profile created; login
                      service.login(loginData)
                        .then(function (data) {
                          // login successful
                          resolve(data);
                        })
                        .catch(reject);
                    }
                  });
                })
                .catch(reject);
            });

            return promise;
          },

          remove: function (data) {
            var promise = $q(function (resolve, reject) {
              // delete profile
              service.getProfile().$loaded()
                .then(function (profile) {
                  var ref = profile.$ref();
                  profile.$destroy();
                  ref.remove(function (error) {
                    if (error) {
                      reject(error);
                    } else {
                      // delete user account
                      $firebaseAuth().removeUser(data, function (error) {
                        if (error) {
                          reject(error);
                        } else {
                          service.logout();
                          resolve(true);
                        }
                      });
                    }
                  });
                })
                .catch(function (error) {
                  reject(error);
                });
            });

            return promise;
          },

          changeEmail: function (data) {
            var promise = $q(function (resolve, reject) {
              // change account email
              $firebaseAuth().changeEmail(data, function (error) {
                if (error) {
                  reject(error);
                } else {
                  // change profile email
                  service.getProfile().$loaded()
                    .then(function (profile) {
                      profile.email = data.newEmail;
                      profile.$save()
                        .then(function (ref) {
                          resolve(ref);
                        })
                        .catch(function (error) {
                          reject(error);
                        });
                    })
                    .catch(function (error) {
                      reject(error);
                    });
                }
              });
            });

            return promise;
          },

          changePassword: function (data) {
            var promise = $q(function (resolve, reject) {
              $firebaseAuth().changePassword(data, function (error) {
                if (error) {
                  reject(error);
                } else {
                  resolve(true);
                }
              });
            });

            return promise
          },

          resetPassword: function (data) {
            var promise = $q(function (resolve, reject) {
              $firebaseAuth().$sendPasswordResetEmail(data.email)
                .then(function () {
                    resolve(true);
                })
                .catch(function (error) {
                    reject(error);
                });
            });

            return promise;
          }

        };


        var authCallback = function (authData) {
          if (authData) {
            // user logged in
            if (service.isAdmin === undefined) {
              FirebaseService.getDbRef().child('secrets/admin').once('value', function (data) {
                service.isAdmin = true;
                console.log('Logged in as admin.');
              }, function () {
                service.isAdmin = false;
                console.log('Logged in.');
              });
            }
          } else {
            // user logged out
            if (service.user) {
              service.user.$destroy();
              service.user = undefined;
            }
            service.isAdmin = undefined;
            console.log('Logged out.');
            $state.go('login');
          }
        };

        FirebaseService.onAuth(authCallback);


        return service;

      }]);

})(angular);
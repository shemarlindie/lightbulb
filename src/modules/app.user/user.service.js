/* global Firebase */
(function (angular) {
  'use strict';

  angular.module('app.user')
    .factory('User', ['FirebaseService', '$firebaseObject', '$q', '$state',
      function (FirebaseService, $firebaseObject, $q, $state) {

        var service = {
          user: undefined,

          isAdmin: undefined,

          isAuthenticated: function () {
            return FirebaseService.getRef().getAuth();
          },

          getProfile: function (uid) {
            if (uid) {
              return $firebaseObject(FirebaseService.getRef().child('users/' + uid));
            }
            else {
              var auth = FirebaseService.getRef().getAuth();
              if (auth && !this.user) {
                this.user = $firebaseObject(FirebaseService.getRef().child('users/' + auth.uid));
              }
            }

            return this.user;
          },

          login: function (data) {
            var promise = $q(function (resolve, reject) {
              FirebaseService.getRef().authWithPassword(data, function (error, data) {
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
            if (service.user) {
              service.user.$destroy();
              service.user = undefined;
            }
            FirebaseService.getRef().unauth();
          },

          create: function (data) {
            var user = data;

            var promise = $q(function (resolve, reject) {
              FirebaseService.getRef().createUser(user, function (error, data) {
                if (error) {
                  reject(error);
                }
                else {
                  // account created; create user profile & login
                  var loginData = {
                    email: user.email,
                    password: user.password,
                    rememberMe: true
                  }

                  // don't store password in profile
                  user.uid = data.uid;
                  delete user.password;
                  delete user.confirm_password;

                  // create profile
                  FirebaseService.getRef().child('users/' + user.uid).set(user, function (error) {
                    if (error) {
                      reject(error);
                    }
                    else {
                      // profile created; login
                      service.login(loginData)
                        .then(function (data) {
                          // login successful
                          resolve(data);
                        })
                        .catch(function (error) {
                          reject(error)
                        });
                    }
                  });
                }
              });
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
                    }
                    else {
                      // delete user account
                      FirebaseService.getRef().removeUser(data, function (error) {
                        if (error) {
                          reject(error);
                        }
                        else {
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
              FirebaseService.getRef().changeEmail(data, function (error) {
                if (error) {
                  reject(error);
                }
                else {
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
              FirebaseService.getRef().changePassword(data, function (error) {
                if (error) {
                  reject(error);
                }
                else {
                  resolve(true);
                }
              });
            });

            return promise
          },

          resetPassword: function (data) {
            var promise = $q(function (resolve, reject) {
              FirebaseService.getRef().changeEmail(data, function (error) {
                if (error) {
                  reject(error);
                }
                else {
                  resolve(true);
                }
              });
            });

            return promise;
          }

        };


        var authCallback = function (authData) {
          if (authData) {
            // user logged in
            if (service.isAdmin === undefined) {
              FirebaseService.getRef().child('secrets/admin').once('value', function (data) { 
                service.isAdmin = true;
                console.log('Logged in as admin.');
              }, function () {
                service.isAdmin = false;
                console.log('Logged in.');
              });
            }
          }
          else {
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
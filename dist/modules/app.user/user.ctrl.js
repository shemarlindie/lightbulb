!function(n){"use strict";n.module("app.user").controller("UserCtrl",["User","$state",function(n,i){var o=this;o.signingUp=!1,o.loggingIn=!1,o.signupData={},o.loginData={rememberMe:!0},o.loginError=void 0,o.signupError=void 0,o.signup=function(){o.signingUp=!0,n.create(o.signupData).then(function(n){i.go("app")})["catch"](function(n){o.signupError=n})["finally"](function(){o.signingUp=!1})},o.login=function(){o.loggingIn=!0,n.login(o.loginData).then(function(n){i.go("app")})["catch"](function(n){o.loginError=n})["finally"](function(){o.loggingIn=!1})},o.logout=function(){n.logout(),i.go("login")}}])}(angular);
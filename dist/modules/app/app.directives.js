!function(e){"use strict";e.module("app").directive("compareTo",function(){return{restrict:"",require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(e,o,r,t){t.$validators.compareTo=function(o){return o===e.otherModelValue},e.$watch("otherModelValue",function(){t.$validate()})}}})}(angular);
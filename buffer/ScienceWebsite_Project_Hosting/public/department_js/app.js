'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('department_app', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'department_template/about.html',
    controller: 'aboutCtrl'
  }).when('/enroll', {
    templateUrl: 'department_template/enroll.html',
    controller: 'enrollCtrl'
  }).when('/course', {
    templateUrl: 'department_template/course.html',
    controller: 'courseCtrl'
  }).when('/professor', {
    templateUrl: 'department_template/professor.html',
    controller: 'professorCtrl'
  }).otherwise({
    redirectTo: "/"
  });
});

console.log("hell0");


// ===================== start controller ===========================
app.controller("navCtrl", function($scope , $location) {
  $scope.gotoEnroll = function() {
    console.log("gotoEnroll");
    $location.path('/course/')
    console.log("gotoEnroll2222");
  };
});


app.controller("aboutCtrl", function($scope, $location) {
  $scope.gotoEnroll = function() {
    console.log("gotoEnroll");
    $location.path('/course/')
    console.log("gotoEnroll2222");
  };
});



app.controller("enrollCtrl", function($scope, $location) {
  ////เปลี่ยนหน้า
  // $scope.authenticate = function() {
  //   $location.path('/course')
  // };
});



app.controller("courseCtrl", function($scope, $location) {

});



app.controller("professorCtrl", function($scope, $location) {

});

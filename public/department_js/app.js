'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('department_app', ['ui.router'] );

/*app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'department_template/about.html',
    controller: 'aboutCtrl'
  }).when('/enroll', {
    templateUrl: 'department_template/enroll.html',
    controller: 'enrollCtrl'
  }).when('/scollarship', {
    templateUrl: 'department_template/scollarship.html',
    controller: 'scollarshipCtrl'
  }).when('/scollarship-partial', {
    templateUrl: 'department_template/scollarship-partial.html',
    controller: 'scollarshipCtrl'
  })
  .when('/course', {
    templateUrl: 'department_template/course.html',
    controller: 'courseCtrl'
  })
  .when('/course-partial', {
    templateUrl: 'department_template/course-partial.html',
    controller: 'courseCtrl'
  })
  .when('/professor', {
    templateUrl: 'department_template/professor.html',
    controller: 'professorCtrl'
  })
  .when('/course_detail', {
    templateUrl: 'department_template/course_detail.html',
    controller: 'course_detailCtrl'
  }).otherwise({
    redirectTo: "/"
  });
});

*/

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/about');

      $stateProvider

      .state('about', {
        url: '/about',
        templateUrl : "./department_template/about.html"
    , controller: 'aboutCtrl'
      })
    .state('enroll', {
      url: '/enroll',
      templateUrl : "./department_template/enroll.html"
  , controller: 'enrollCtrl'
    })

      .state('scollarship', {
        url: '/scollarship',
        templateUrl : "./department_template/scollarship.html"
    ,   controller: 'scollarshipCtrl'
      })
    .state('scollarship-partial', {
      url: '/scollarship-partial',
      templateUrl : "./department_template/scollarship-partial.html"
  ,   controller: 'scollarshipCtrl'
    })

  .state('course', {
    url: '/course',
    templateUrl : "./department_template/course.html"
,  controller: 'courseCtrl'
  })

.state('course-partial', {
  url: '/course-partial',
  templateUrl : "./department_template/course-partial.html"
,  controller: 'courseCtrl'
})

.state('professor', {
  url: '/professor',
  templateUrl : "./department_template/professor.html"
,    controller: 'professorCtrl'
})

.state('course_detail', {
  url: '/course_detail',
  templateUrl : "./department_template/course_detail.html"
,controller: 'course_detailCtrl'
})

  });

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
    $location.path('/course/')
  };
});


app.controller("enrollCtrl", function($scope, $location) {
  $scope.inedx = 1;
  $scope.changeIndex = function (index) {
    $scope.inedx = index;
  }
});



app.controller("courseCtrl", function($scope, $location) {

});



app.controller("professorCtrl", function($scope, $location) {
  $scope.test = 2;
  $scope.showDetail = function () {
    console.log("show deatil");
    $('#myModal').modal('show');
  }
});

app.controller("course_detailCtrl", function($scope, $location) {
 $scope.tab = 1;
 $scope.deailCouse = [];

 $scope.clickMenu = function (index) {
   $scope.tab = index;
 }

 $scope.clickList = function (nameCouse) {
   //console.log(nameCouse);
   if(nameCouse == "social"){
     $scope.deailCouse = com_social;
   }
   else if(nameCouse == "human"){
     $scope.deailCouse = com_human;
   }
   else if(nameCouse == "language"){
     $scope.deailCouse = com_language;
   }
   else if(nameCouse == "science"){
     $scope.deailCouse = com_science;
   }
   else if(nameCouse == "force_math"){
     $scope.deailCouse = force_math;
   }
   else if(nameCouse == "force_com"){
     $scope.deailCouse = force_com;
   }
   else{

   }
   console.log($scope.deailCouse);
 }

});

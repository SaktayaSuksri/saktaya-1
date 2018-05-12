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

  $scope.change_navstep = function(step){

    $scope.navstep = step;
  }
});


app.controller("aboutCtrl", function($scope, $location,$http) {
  $scope.gotoEnroll = function() {
    $location.path('/course/')
  };


  
  $scope.trustAsHtml = function(string) {
    console.log("str = "+string)
        return $sce.trustAsHtml(string);
    };




$scope.init_news_modal = function(id){
alert("new detail = "+id)


    let dataObj = {


        newsID : id,
        readCount:"true",


          }
          $http.post('/api/getNewsfromID/',dataObj)
            .success(function(data, status, headers, config) {
                //$scope.message = data;
                console.log("-----------"+ JSON.stringify(data));
                if(data.code != "999999")
                {
                  alert("modal_news "+data.message);
                }
                else
                {
                console.log(data);
                $scope.modal_news  = data.message;
                console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
            //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

              }

            })
            .error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                console.log(status+headers);
            });

}

$scope.get_news = function(){

$scope.news_list_1 =[];
$scope.news_list_2 =[];
$scope.news_list_3 =[];
let dataObj = {
  tag:$scope.filter_tag,
  filterTargetTypeName : $scope.search.targetTypeName,

  resourceId : "0",
  departmentId:"0",
  tag:"0",
  limit:6,
  isPosted:"false",
  isPreview:"true",
  targetTypeId:"0"

}
$http.post('/api/getNews/',dataObj)
  .success(function(data, status, headers, config) {
      //$scope.message = data;
    //  console.log("-----------"+ JSON.stringify(data));
      if(data.code != "999999")
      {
        alert(data.message);
      }
      else
      {
      console.log(data);
      $scope.news_list_1[0] = data.message[0];
      $scope.news_list_1[1] = data.message[1];
      $scope.news_list_1[2] = data.message[2];
      $scope.news_list_2[0] = data.message[3];
      $scope.news_list_2[1] = data.message[4];
      $scope.news_list_2[2] = data.message[5];
   //   console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
    //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

    }

  })
  .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      console.log(status+headers);
  });
}
$scope.init = function(){
  
          //  quill_title  quill_detail      quill_title_yo  quill_detail_yo
          $scope.search = {};
          $scope.search.targetTypeName = "0";
        //  $scope.search.department = "5a8470c028d2e92a0c753011"; //ภาคคอม
        $scope.search.department = "5a8470b228d2e92a0c753010";
        
          $scope.get_news();
  
  
      }
  
      
    $scope.init();
  
      $scope.news_detail_href= function(id){
  
  
          $scope.init_news_modal(id);
          $('#myModal').modal('show');
  
  
  
  
      }

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

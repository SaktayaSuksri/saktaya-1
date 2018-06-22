'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('department_app', ['ui.router',"api_service"] );

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

.state('course_detail_graduate', {
  url: '/course_detail_graduate',
  templateUrl : "./department_template/course_detail_graduate.html"
,controller: 'course_detail_graduate_Ctrl'
})


  });

// ===================== start controller ===========================
app.controller("navCtrl", function($scope , $location,api_manage) {
  $scope.gotoEnroll = function() {
    console.log("gotoEnroll");
    $location.path('/course/')
    console.log("gotoEnroll2222");
  };

  $scope.change_navstep = function(step){

    $scope.navstep = step;
  }
});


app.controller("aboutCtrl", function($scope, $location,$http,api_manage) {
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

  $scope.news_list = null;
  let dataObj = {

   filterTargetTypeName : "0",
    resourceId : "0",
    departmentId:"5a8470c028d2e92a0c753011",
    tag:"0",
    limit:3,
    isPinned : "false",
    isPosted:"false",
    isPreview:"true",
    targetTypeId:"0"

  }
    api_manage.get_news(dataObj)
    .success(function(data, status, headers, config) {
        //$scope.message = data;
      //  console.log("-----------"+ JSON.stringify(data));
        if(data.code != "999999")
        {
          alert(data.message);
        }
        else
        {
        console.log(" get_news  "+ JSON.stringify(data));
        $scope.news_list = data.message
        $scope.news_list.forEach(function(item){
          
           item.topicPicture  = 'http://www.science.kmitl.ac.th/assets/img/image_placeholder.jpg';
           
                       
         });


         $scope.news_list.forEach(function(item){
          api_manage.get_img_news(item._id)
          .success(function(data, status, headers, config) {
            item.topicPicture = data;

            })
        .error(function(data, status, headers, config) {
            
         });
        
                      
        });

     //   console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
      //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

      }

    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        console.log(status+headers);
    });
  }


                
$scope.get_news_slide = function(){
  
      //document.querySelector("#loading").style.display = "";
       $scope.news_list_slide = [];
  
    
      let dataObj = {
  
       filterTargetTypeName : "0",
        resourceId : "0",
        departmentId:"0",
        tag:"0",
        limit:0,
        isPinned : "true",
        isPosted:"false",
        isPreview:"true",
        targetTypeId:"0"
  
      }
        api_manage.get_news(dataObj)
        .success(function(data, status, headers, config) {
            //$scope.message = data;
          //  console.log("-----------"+ JSON.stringify(data));
            if(data.code != "999999")
            {
              alert(data.message);
            }
            else
            {
            console.log(" get_news for slide  "+ JSON.stringify(data));
            $scope.news_list_slide = data.message;
           
  

            $scope.news_list_slide.forEach(function(item){
              
               item.topicPicture  = 'http://www.science.kmitl.ac.th/assets/img/image_placeholder.jpg';
               
                           
             });
    
    
             $scope.news_list_slide.forEach(function(item){
              api_manage.get_img_news(item._id)
              .success(function(data, status, headers, config) {
                item.topicPicture = data;
    
                })
            .error(function(data, status, headers, config) {
                
             });
            
                          
            });


       //     document.querySelector("#loading").style.display = "none";
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
          $scope.search = {};
          $scope.search.targetTypeName = "0";
        //  $scope.search.department = "5a8470c028d2e92a0c753011"; //ภาคคอม
        $scope.search.department = "5a8470c028d2e92a0c753011";
        

          $scope.get_news_slide();
  
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



app.controller("courseCtrl", function($scope, $location , $state) {   
  $scope.goto_detail = function(){
        $state.go("course_detail_graduate");
       }
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
   else if(nameCouse == "select_comsci"){ 
    $scope.deailCouse = select_computer_sci;
  }
  else if(nameCouse == "select_se"){ 
    $scope.deailCouse = select_se;
  }
   else{

   }
   console.log($scope.deailCouse);
 }

});

app.controller("scollarshipCtrl", function($scope, $location,api_manage) {
  
  


$scope.get_news_tee = function(){
  
    $scope.news_list = null;
    let dataObj = {
  
     filterTargetTypeName : "0",
      resourceId : "5a8f08b8f9bb232d7442ff0a",
      departmentId:"5a8470c028d2e92a0c753011",
      tag:"0",
      limit:6,
      isPinned : "0",
      isPosted:"false",
      isPreview:"true",
      targetTypeId:"5af33d279e09ec2a242de439"
  
    }
      api_manage.get_news(dataObj)
      .success(function(data, status, headers, config) {
          //$scope.message = data;
        //  console.log("-----------"+ JSON.stringify(data));
          if(data.code != "999999")
          {
            alert(data.message);
          }
          else
          {
          console.log(" get_news tee  "+ JSON.stringify(data));
          $scope.news_list_tee = data.message;
        
       //   console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
        //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
  
        }
  
      })
      .error(function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
          console.log(status+headers);
      });
    }
  

    
$scope.get_news_bundit = function(){
  
    $scope.news_list = null;
    let dataObj = {
  
     filterTargetTypeName : "0",
     resourceId : "5a8f08b8f9bb232d7442ff0a",
     departmentId:"5a8470c028d2e92a0c753011",
      tag:"0",
      limit:6,
      isPinned : "0",
      isPosted:"false",
      isPreview:"true",
      targetTypeId:"5af33d3e9e09ec2a242de43a"
  
    }
      api_manage.get_news(dataObj)
      .success(function(data, status, headers, config) {
          //$scope.message = data;
        //  console.log("-----------"+ JSON.stringify(data));
          if(data.code != "999999")
          {
            alert(data.message);
          }
          else
          {
          console.log(" get_news_bundit "+ JSON.stringify(data));
          $scope.news_list_bundit = data.message
        
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
      
      $scope.get_news_tee();
      $scope.get_news_bundit();
      
      
  }
  
  
  $scope.init();
  

  });
  


  app.controller("course_detail_graduate_Ctrl", function($scope, $location) {
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
   else if(nameCouse == "select_comsci"){
    $scope.deailCouse = select_computer_sci;
  }
   else{

   }
  }
    
  });

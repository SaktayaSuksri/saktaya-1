angular.module('app', ['jtt_youtube','ui.router',"api_service", 'ngSanitize'])


angular.module('app').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
        $stateProvider
    
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl : "./partial/home.html"
            })

            .state('course-tee', {
                url: '/course-tee',
                templateUrl : "./partial/course-tee.html"
            })

            .state('course-tor', {
                url: '/course-tor',
                templateUrl : "./partial/course-tor.html"
            })

            
            .state('course-aek', {
                url: '/course-aek',
                templateUrl : "./partial/course-aek.html"
            })

            .state('news_detail', {
                url: 'news_detail',
                templateUrl : "./partial/news_detail.html"
            })

            .state('link_management', {
                url: '/link_management',
                templateUrl : "./partial/link_management.html"
            })

                // nested list with custom controller
       


            .state('person', {
                url: '/person',
                templateUrl : "./partial/person.html"
            })


     

});


angular.module('app')

    // super simple service
    // each function returns a promise object 
    .factory('global_service', ['$rootScope', '$http', function ($rootScope, $http){
        var buf_id ;
    return {
        get_news_id : function () {
            return buf_id;
        },
        set_news_id : function (id) {
            buf_id = id;
            alert(buf_id)
        }
    }


    }]);
angular.module('app').controller('global', function ($scope,$http,api_manage){
alert();
    
});


angular.module('app').controller('news_detail', function ($scope,$http,api_manage,global_service){
   
    
    alert(global_service.get_news_id())

    let dataObj = {
        
        
        newsID : global_service.get_news_id(),
        readCount:"true",
   
            
          }
            api_manage.get_news_fromID(dataObj)
            .success(function(data, status, headers, config) {
                //$scope.message = data;
                console.log("-----------"+ JSON.stringify(data));
                if(data.code != "999999")
                {
                  alert("news_detail "+data.message);
                }
                else
                {
                console.log(data);
                $scope.news_list  = data.message;
                console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
            //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
               
              }
            
            })
            .error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                console.log(status+headers);
            });	

    });

angular.module('app').controller('youtube_box', function ($scope, $filter, $q,$http, youtubeFactory){
    youtubeFactory.getVideoById({
        videoId: "sOPPCxEHoyM",

        key: "AIzaSyDXR1RJ2ac4Peb3cVezgG9x1pQSvOF7UxY",
    }).then(function (_data) {
        console.info("video by id", _data);
        //on success
    }).catch(function (_data) {
        //on error
    });

});


angular.module('app').controller('news', function ($scope, $filter, $q,$http,api_manage,global_service){

    $scope.init = function(){
        
            //  quill_title  quill_detail      quill_title_yo  quill_detail_yo
           
      
            $scope.get_news();
        
      
        }

        $scope.news_detail = function(id){
            global_service.set_news_id(id);
         
        }
$scope.get_news = function(){
    
    let dataObj = {
  
  
      resourceId : "0",
      departmentId:"0",
      tagId:"0",
      limit:6,
      isPosted:"false",
      isPreview:"true"
      
    }
      api_manage.get_news(dataObj)
      .success(function(data, status, headers, config) {
          //$scope.message = data;
          console.log("-----------"+ JSON.stringify(data));
          if(data.code != "999999")
          {
            alert(data.message);
          }
          else
          {
          console.log(data);
          $scope.news_list  = data.message;
          console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
        //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
         
        }
      
      })
      .error(function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
          console.log(status+headers);
      });	
    }


});

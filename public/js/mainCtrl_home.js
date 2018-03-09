angular.module('app', ['jtt_youtube','ui.router',"api_service", 'ngSanitize'])


angular.module('app').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
        $stateProvider
    
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl : "./partial/home.html"
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


angular.module('app').controller('news', function ($sce,$scope, $filter, $q,$http,api_manage,global_service){
    $scope.trustAsHtml = function(string) {
        console.log("str = "+string)
            return $sce.trustAsHtml(string);
        };

    $scope.init = function(){
        
            //  quill_title  quill_detail      quill_title_yo  quill_detail_yo
           
      
            $scope.get_news();
        
      
        }
    
        $scope.news_detail_href= function(id){


            $scope.init_news_modal(id);
            $('#myModal').modal('show');
            

  
         
        }

        
$scope.init_news_modal = function(id){
    alert("new detail = "+id)
    
        let dataObj = {
            
            
            newsID : id,
            readCount:"true",
       
                
              }
                api_manage.get_news_fromID(dataObj)
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
        //  console.log("-----------"+ JSON.stringify(data));
          if(data.code != "999999")
          {
            alert(data.message);
          }
          else
          {
          console.log(data);
          $scope.news_list_1[0] = data.message[1];
          $scope.news_list_1[1] = data.message[0];
          $scope.news_list_2[0] = data.message[2];
        /*  $scope.news_list_2[1] = data.message[3];
          $scope.news_list_3[0] = data.message[4];
          $scope.news_list_3[1] = data.message[5];*/
       //   console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
        //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
         
        }
      
      })
      .error(function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
          console.log(status+headers);
      });	
    }


});

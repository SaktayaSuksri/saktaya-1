angular.module('app', ['ui.bootstrap', 'jtt_youtube', 'ui.router', "api_service", 'ngSanitize'])


angular.module('app').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/course-tee');

  $stateProvider


  
  .state('dean', {
    url: '/dean',
    templateUrl: "./partial/dean.html"
  })

    .state('course-tee', {
      url: '/course-tee',
      templateUrl: "./partial/course-tee.html"
    })

    .state('course-tor', {
      url: '/course-tor',
      templateUrl: "./partial/course-tor.html"
    })


    .state('course-aek', {
      url: '/course-aek',
      templateUrl: "./partial/course-aek.html"
    })

    .state('news', {
      url: '/news',
      templateUrl: "./partial/news.html"
    })


    .state('history', {
      url: '/history',
      templateUrl: "./partial/history.html"
    })

    .state('resolution', {
      url: '/resolution',
      templateUrl: "./partial/resolution.html"
    })
    .state('structure', {
      url: '/structure',
      templateUrl: "./partial/structure.html"
    })

    .state('yearly-report', {
      url: '/yearly-report',
      templateUrl: "./partial/yearly-report.html"
    })

    .state('graduate', {
      url: '/graduate',
      templateUrl: "./partial/graduate.html"
    })


    .state('news_container', {
      url: '/news_container',
      templateUrl: "./partial/news_container.html"
    })

    .state('docs_container', {
      url: '/docs_container',
      templateUrl: "./partial/docs_container.html"
    })

    .state('link_management', {
      url: '/link_management',
      templateUrl: "./partial/link_management.html"
    })

    .state('about_timeline', {
      url: '/about_timeline',
      templateUrl: "./partial/about_timeline.html"
    })

    .state('about_vision', {
      url: '/about_vision',
      templateUrl: "./partial/about_vision.html"
    })

    .state('about_organizational_structure', {
      url: '/about_organizational_structure',
      templateUrl: "./partial/about_organizational_structure.html"
    })

    .state('about_year_reports', {
      url: '/about_year_reports',
      templateUrl: "./partial/about_year_reports.html"
    })

    .state('personel', {
      url: '/personel',
      templateUrl: "./partial/personel.html"
    })
  // nested list with custom controller


});


angular.module('app')

  // super simple service
  // each function returns a promise object
  .factory('global_service', ['$rootScope', '$http', function($rootScope, $http) {
    var buf_id;
    return {
      get_news_id: function() {
        return buf_id;
      },
      set_news_id: function(id) {
        buf_id = id;
        alert(buf_id)
      }
    }


  }]);
angular.module('app').controller('global', function($scope, $http, api_manage,$sce) {

  $scope.trustAsHtml = function(string) {
    console.log("str = "+string)
        return $sce.trustAsHtml(string);
    };

});

angular.module('app').controller('docs_container', function($scope, $http, api_manage, global_service) {


  $scope.docs_list = [{
    data: 1
  }, {
    data: 1
  }, {
    data: 1
  }, {
    data: 1
  }, {
    data: 1
  }]
});
angular.module('app').controller('news_container', function($scope, $http, api_manage, global_service) {




  $scope.init = function() {
   
    $scope.search = {};
    $scope.search.resourceId = window.resourceId;
    $scope.search.departmentId = window.departmentId;
    $scope.get_catagory();
    $scope.tag = "0";
 


    
    
  
  

  }
  $scope.news_filter = function(){
    
    if($scope.filter_tag)
    $scope.tag = $scope.filter_tag;
    else
    $scope.tag = '0';
    document.querySelector("#loading").style.display = "";
                $scope.get_news();
    
            }

  
$scope.get_catagory = function(){
  
  
    api_manage.get_catagory()
    .success(function(data, status, headers, config) {
        //$scope.message = data;
        if(data.code != "999999")
        {
          alert(data.message);
        }
        else
        {
        console.log(data);
        $scope.catagory_list  = data.message;
        $scope.catagory_list.push({"_id":"0","resourceName":"ทั้งหมด"})
        $scope.catagory_list.forEach(function(item){
          if(item._id == $scope.search.resourceId)
          {
   
            $scope.selected = item;
      
            $scope.get_news();
          }



        })
        
        
      //  $scope.catagory_list.push({"_id":"0","resourceName":"ทั้งหมด"})
        console.log('$scope.catagory_list  =  '+ JSON.stringify($scope.catagory_list))
        //$scope.catagory_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.catagory_list });
        }
  
    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        console.log(status+headers);
    });
  }


  $scope.get_news = function() {

 
    let dataObj = {
      tag: $scope.tag,
      filterTargetTypeName : "0",
     // resourceId :  $scope.search.resourceId,
     resourceId : $scope.selected._id,
      departmentId: $scope.search.departmentId,
      targetTypeId:"0",
     
      limit:0,
      isPinned :"0",
      isPosted:"false",
      isPreview:"true"
    }
    console.log('before get_news  =  '+ JSON.stringify(dataObj))

    api_manage.get_news(dataObj)
      .success(function(data, status, headers, config) {
        //$scope.message = data;
        //     console.log("-----------"+ JSON.stringify(data));
        if (data.code != "999999") {
          alert(data.message);
        } else {

          
          console.log(data.code);
          $scope.news_list = data.message;
          console.log('$scope.news_list  =  ' + $scope.news_list.length)
          
          
          $scope.news_list.forEach(function(item){
           
            item.topicPicture  = 'http://161.246.35.182:2001/assets/img/image_placeholder.jpg';
            
                        
          });

          $scope.news_list.forEach(function(item){
            api_manage.get_img_news(item._id)
            .success(function(data, status, headers, config) {
              item.topicPicture = data;
  
              })
          .error(function(data, status, headers, config) {
              
           });
          
                        
          });

          //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

          //for pagination

          // $scope.data = [{"name":"Bell","id":"K0H 2V5"},{"name":"Octavius","id":"X1E 6J0"},{"name":"Alexis","id":"N6E 1L6"},{"name":"Colton","id":"U4O 1H4"},{"name":"Abdul","id":"O9Z 2Q8"},{"name":"Ian","id":"Q7W 8M4"},{"name":"Eden","id":"H8X 5E0"},{"name":"Britanney","id":"I1Q 1O1"},{"name":"Ulric","id":"K5J 1T0"},{"name":"Geraldine","id":"O9K 2M3"},{"name":"Hamilton","id":"S1D 3O0"},{"name":"Melissa","id":"H9L 1B7"},{"name":"Remedios","id":"Z3C 8P4"},{"name":"Ignacia","id":"K3B 1Q4"},{"name":"Jaime","id":"V6O 7C9"},{"name":"Savannah","id":"L8B 8T1"},{"name":"Declan","id":"D5Q 3I9"},{"name":"Skyler","id":"I0O 4O8"},{"name":"Lawrence","id":"V4K 0L2"},{"name":"Yael","id":"R5E 9D9"},{"name":"Herrod","id":"V5W 6L3"},{"name":"Lydia","id":"G0E 2K3"},{"name":"Tobias","id":"N9P 2V5"},{"name":"Wing","id":"T5M 0E2"},{"name":"Callum","id":"L9P 3W5"},{"name":"Tiger","id":"R9A 4E4"},{"name":"Summer","id":"R4B 4Q4"},{"name":"Beverly","id":"M5E 4V4"},{"name":"Xena","id":"I8G 6O1"},{"name":"Yael","id":"L1K 5C3"},{"name":"Stacey","id":"A4G 1S4"},{"name":"Marsden","id":"T1J 5J3"},{"name":"Uriah","id":"S9S 8I7"},{"name":"Kamal","id":"Y8Z 6X0"},{"name":"MacKensie","id":"W2N 7P9"},{"name":"Amelia","id":"X7A 0U3"},{"name":"Xavier","id":"B8I 6C9"},{"name":"Whitney","id":"H4M 9U2"},{"name":"Linus","id":"E2W 7U1"},{"name":"Aileen","id":"C0C 3N2"},{"name":"Keegan","id":"V1O 6X2"},{"name":"Leonard","id":"O0L 4M4"},{"name":"Honorato","id":"F4M 8M6"},{"name":"Zephr","id":"I2E 1T9"},{"name":"Karen","id":"H8W 4I7"},{"name":"Orlando","id":"L8R 0U4"},{"name":"India","id":"N8M 8F4"},{"name":"Luke","id":"Q4Y 2Y8"},{"name":"Sophia","id":"O7F 3F9"},{"name":"Faith","id":"B8P 1U5"},{"name":"Dara","id":"J4A 0P3"},{"name":"Caryn","id":"D5M 8Y8"},{"name":"Colton","id":"A4Q 2U1"},{"name":"Kelly","id":"J2E 2L3"},{"name":"Victor","id":"H1V 8Y5"},{"name":"Clementine","id":"Q9R 4G8"},{"name":"Dale","id":"Q1S 3I0"},{"name":"Xavier","id":"Z0N 0L5"},{"name":"Quynn","id":"D1V 7B8"},{"name":"Christine","id":"A2X 0Z8"},{"name":"Matthew","id":"L1H 2I4"},{"name":"Simon","id":"L2Q 7V7"},{"name":"Evan","id":"Z8Y 6G8"},{"name":"Zachary","id":"F4K 8V9"},{"name":"Deborah","id":"I0D 4J6"},{"name":"Carl","id":"X7H 3J3"},{"name":"Colin","id":"C8P 0O1"},{"name":"Xenos","id":"K3S 1H5"},{"name":"Sonia","id":"W9C 0N3"},{"name":"Arsenio","id":"B0M 2G6"},{"name":"Angela","id":"N9X 5O7"},{"name":"Cassidy","id":"T8T 0Q5"},{"name":"Sebastian","id":"Y6O 0A5"},{"name":"Bernard","id":"P2K 0Z5"},{"name":"Kerry","id":"T6S 4T7"},{"name":"Uriel","id":"K6G 5V2"},{"name":"Wanda","id":"S9G 2E5"},{"name":"Drake","id":"G3G 8Y2"},{"name":"Mia","id":"E4F 4V8"},{"name":"George","id":"K7Y 4L4"},{"name":"Blair","id":"Z8E 0F0"},{"name":"Phelan","id":"C5Z 0C7"},{"name":"Margaret","id":"W6F 6Y5"},{"name":"Xaviera","id":"T5O 7N5"},{"name":"Willow","id":"W6K 3V0"},{"name":"Alden","id":"S2M 8C1"},{"name":"May","id":"L5B 2H3"},{"name":"Amaya","id":"Q3B 7P8"},{"name":"Julian","id":"W6T 7I6"},{"name":"Colby","id":"N3Q 9Z2"},{"name":"Cole","id":"B5G 0V7"},{"name":"Lana","id":"O3I 2W9"},{"name":"Dieter","id":"J4A 9Y6"},{"name":"Rowan","id":"I7E 9U4"},{"name":"Abraham","id":"S7V 0W9"},{"name":"Eleanor","id":"K7K 9P4"},{"name":"Martina","id":"V0Z 5Q7"},{"name":"Kelsie","id":"R7N 7P2"},{"name":"Hedy","id":"B7E 7F2"},{"name":"Hakeem","id":"S5P 3P6"}];

          $scope.viewby = 6;
          $scope.totalItems =  $scope.news_list.length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = $scope.viewby;
          $scope.maxSize = 4; //Number of pager buttons to show



          $scope.setItemsPerPage(6);

          document.querySelector("#loading").style.display = "none";
          //end pagination
        }

      })
      .error(function(data, status, headers, config) {
        alert("failure message: " + JSON.stringify({
          data: data
        }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        console.log(status + headers);
      });
  }



  $scope.setPage = function(pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.setItemsPerPage = function(num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1; //reset to first page
  }


});
angular.module('app').controller('news_detail', function($scope, $http, api_manage, global_service) {

});

angular.module('app').controller('youtube_box', function($scope, $filter, $q, $http, youtubeFactory) {
  youtubeFactory.getVideoById({
    videoId: "sOPPCxEHoyM",

    key: "AIzaSyDXR1RJ2ac4Peb3cVezgG9x1pQSvOF7UxY",
  }).then(function(_data) {
    console.info("video by id", _data);
    //on success
  }).catch(function(_data) {
    //on error
  });

});




//MrPondS created 21-03-2018
angular.module('app').controller('personelCtrl', function($scope, $filter, $q, $http, youtubeFactory) {
  // alert("personelCtrl started");
  //get list of personel
  let dataObj = {
    positionId : '0',
    divisionId : '0',
    departmentId : '0',
    isPreview : "false"
  }

    $http.post('/api/getPersonel/',dataObj)
    .success(function(data, status, headers, config) {
      //$scope.message = data;
      console.log("-----------" + JSON.stringify(data));
      if (data.code != "999999") {
        alert(data.code+" : "+data.message);
      } else {
        console.log(data);
        $scope.personel_list = data.message;
        //console.log('$scope.news_list  =  ' + JSON.stringify($scope.personel_list))
      }
    })
    .error(function(data, status, headers, config) {
      alert("failure message: " + JSON.stringify({
        data: data
      }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      console.log(status + headers);
    });
});


angular.module('app').controller('graduateCtrl', function(api_manage,$scope, $filter, $q, $http, youtubeFactory) {

$scope.init = function(){

  $scope.get_news();
}
  
  $scope.get_news = function() {
    
        let dataObj = {
          
          filterTargetTypeName : "0",
         // resourceId :  $scope.search.resourceId,
         resourceId : "0",
          departmentId: "0",
          targetTypeId:"5af33d3e9e09ec2a242de43a",





          tag:"0",
          limit:8,
          isPinned :"false",
          isPosted:"false",
          isPreview:"true"

          
        }
    
        api_manage.get_news(dataObj)
          .success(function(data, status, headers, config) {
            //$scope.message = data;
            console.log("-----------" + JSON.stringify(data));
            if (data.code != "999999") {
              alert(data.message);
            } else {
              console.log(data);
              $scope.news_list = data.message;
              console.log('$scope.news_list graduate  =  ' + JSON.stringify($scope.news_list))
              //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
              $scope.news_list.forEach(function(item){
                
                 item.topicPicture  = './assets/img/image_placeholder.jpg';
                 
                             
               });
     
               $scope.news_list.forEach(function(item){
                 api_manage.get_img_news(item._id)
                      .success(function(data, status, headers, config) {
                        item.topicPicture = data;
            
                        })
                    .error(function(data, status, headers, config) {
                        
                      });
                    });


          
          

          }


          })
          .error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
              data: data
            }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            console.log(status + headers);
          });
      }


      
  $scope.get_news_slide = function() {
    
        let dataObj = {
          tag: $scope.tag,
          filterTargetTypeName : "0",
         // resourceId :  $scope.search.resourceId,
         resourceId : "0",
          departmentId: "0",
          targetTypeId:"5af33d3e9e09ec2a242de43a",
          tag:"0",
          limit:0,
          isPinned :"true",
          isPosted:"false",
          isPreview:"true"

          
        }
    
        api_manage.get_news(dataObj)
          .success(function(data, status, headers, config) {
            //$scope.message = data;
            console.log("-----------" + JSON.stringify(data));
            if (data.code != "999999") {
              alert(data.message);
            } else {
              console.log(data);
              $scope.news_list_slide = data.message;
              console.log('$scope.news_list  =  ' + JSON.stringify($scope.news_list))
              //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
            }
          })
          .error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
              data: data
            }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            console.log(status + headers);
          });
      }



});

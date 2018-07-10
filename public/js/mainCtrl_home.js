angular.module('app', ['jtt_youtube', 'ui.router', "api_service", 'ngSanitize','pascalprecht.translate'])


angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: "./partial/home.html"
        })





});


angular.module('app')

    // super simple service
    // each function returns a promise object
    .factory('global_service', ['$rootScope', '$http', function ($rootScope, $http) {
        var buf_id;
        return {
            get_news_id: function () {
                return buf_id;
            },
            set_news_id: function (id) {
                buf_id = id;
                alert(buf_id)
            }
        }


    }]);
angular.module('app').controller('global', function ($scope, $http, api_manage,$translate) {
    document.querySelector("#loader").style.display = 'block';
    
    $translate.use(localStorage.getItem("languages"));
    $scope.change_languages = function(lang){
      localStorage.setItem("languages", lang);
      $translate.use(lang);
    }
});

angular.module('app').controller('header_first', function ($scope, $http, api_manage) {
    // alert("global ctrl");
  
    $scope.init = function () {

        //  quill_title  quill_detail      quill_title_yo  quill_detail_yo



        $scope.search = {};
        $scope.search.targetTypeName = "0";
        $scope.get_news();



    }



    $scope.get_news_news_academic_service = function () {

        //document.querySelector("#loading").style.display = "";
        $scope.news_academic_service = {};
        //console.log(" get_news_news_academic_service for slide ");
        let dataObj = {

            filterTargetTypeName: "0",
            resourceId: "5b02922a3c00fe2450c31ed8",
            departmentId: "0",
            tag: "0",
            limit: 1,
            isPinned: "0",
            isPosted: "false",
            isPreview: "true",
            targetTypeId: "0",
            needSort: 'true'

        }
        api_manage.get_news(dataObj)
            .success(function (data, status, headers, config) {
                //$scope.message = data;
                //  //console.log("-----------"+ JSON.stringify(data));
                if (data.code != "999999") {
                    alert(data.message);
                }
                else {
                    $scope.news_academic_service = data.message[0];

                    $scope.news_academic_service.topicPicture = './assets/img/image_placeholder.jpg';


                    api_manage.get_img_news($scope.news_academic_service._id)
                        .success(function (data, status, headers, config) {
                            $scope.news_academic_service.topicPicture = data;

                        })
                        .error(function (data, status, headers, config) {

                        });

                    //     document.querySelector("#loading").style.display = "none";
                    //   //console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
                    //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

                }

            })
            .error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({ data: data }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                //console.log(status+headers);
            });
    }
    $scope.get_news = function () {

        //document.querySelector("#loading").style.display = "";
        $scope.news_list_slide = [];


        let dataObj = {

            filterTargetTypeName: "0",
            resourceId: "0",
            departmentId: "0",
            tag: "0",
            limit: 0,
            isPinned: "true",
            isPosted: "false",
            isPreview: "true",
            targetTypeId: "0",
            needSort: 'true'

        }
        api_manage.get_news(dataObj)
            .success(function (data, status, headers, config) {
                //$scope.message = data;
                //  //console.log("-----------"+ JSON.stringify(data));
                if (data.code != "999999") {
                    alert(data.message);
                }
                else {
                    $scope.get_news_news_academic_service();
                    //console.log(" get_news for slide  "+ JSON.stringify(data));
                    $scope.news_list_slide = data.message;

                    document.querySelector("#loader").style.display = 'none';

                    $scope.news_list_slide[0].topicPicture = './assets/img/image_placeholder.jpg';

                    //  $scope.news_list_slide[1].topicPicture  = './assets/img/image_placeholder.jpg';
                    $scope.news_list_slide.forEach(function (item) {


                        api_manage.get_img_news(item._id)
                            .success(function (data, status, headers, config) {
                                //console.log("ddata  =  " + data)
                                item.topicPicture = data;

                            })
                            .error(function (data, status, headers, config) {

                            });

                    })





                    //     document.querySelector("#loading").style.display = "none";
                    //   //console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
                    //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

                }

            })
            .error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({ data: data }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                //console.log(status+headers);
            });
    }


});





angular.module('app').controller('news_detail', function ($scope, $http, api_manage, global_service) {




});

angular.module('app').controller('youtube_box', function ($scope, $filter, $q, $http, youtubeFactory) {
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


angular.module('app').controller('news', function ($sce, $scope, $filter, $q, $http, api_manage, global_service) {
    $scope.trustAsHtml = function (string) {
        //console.log("str = "+string)
        return $sce.trustAsHtml(string);
    };

    $scope.init = function () {

        //  quill_title  quill_detail      quill_title_yo  quill_detail_yo


        $scope.search = {};
        $scope.search.targetTypeName = "0";
        $scope.search.resourceId = "0";
        $scope.get_catagory();  //getResourceType
        $scope.get_news();



    }

    $scope.news_filter = function (filter) {

        $scope.search.resourceId = filter;

        $scope.get_news();

    }
    $scope.news_detail_href = function (id) {


        $scope.init_news_modal(id);
        $('#myModal').modal('show');




    }


    $scope.init_news_modal = function (id) {

        let dataObj = {


            newsID: id,
            readCount: "true",


        }
        api_manage.get_news_fromID(dataObj)
            .success(function (data, status, headers, config) {
                //$scope.message = data;
                //console.log("-----------"+ JSON.stringify(data));
                if (data.code != "999999") {
                    alert("modal_news " + data.message);
                }
                else {
                    document.querySelector("#loading").style.display = "none";
                    //console.log(data);
                    $scope.modal_news = data.message;
                    //console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
                    //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

                }

            })
            .error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({ data: data }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                //console.log(status+headers);
            });

    }

    $scope.get_catagory = function () {


        api_manage.get_catagory()
            .success(function (data, status, headers, config) {
                //$scope.message = data;
                if (data.code != "999999") {
                    alert(data.message);
                }
                else {
                    //console.log(data);
                    $scope.catagory_list = data.message;
                    //console.log('$scope.catagory_list  =  '+ JSON.stringify($scope.catagory_list))
                    //$scope.catagory_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.catagory_list });
                }

            })
            .error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({ data: data }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                //console.log(status+headers);
            });
    }

    $scope.get_news = function () {


        document.querySelector("#loading").style.display = "";
        $scope.news_list_1 = [];
        $scope.news_list_2 = [];
        $scope.news_list_3 = [];
        let dataObj = {

            filterTargetTypeName: $scope.search.targetTypeName,
            resourceId: $scope.search.resourceId,
            departmentId: "0",
            tag: "0",
            limit: 9,
            isPinned: "0",
            isPosted: "true",
            isPreview: "true",
            targetTypeId: "0",
            needSort: 'true',
         
        }

        //console.log(" before get_news  "+ JSON.stringify(dataObj));

        api_manage.get_news(dataObj)
            .success(function (data, status, headers, config) {
                //$scope.message = data;
                //  //console.log("-----------"+ JSON.stringify(data));
                if (data.code != "999999") {
                    alert(data.message);

                }
                else {
                    // ////console.log(" get_news  "+ JSON.stringify(data));
                    $scope.news_list_1 = [];
                    console.log( $scope.news_list_1);
                    
                    data.message.forEach(function (item) {
                        item.topicPicture = './assets/img/image_placeholder.jpg';
                        $scope.news_list_1.push(item)




                    })



                    for (let i = 0; i < data.message.length; i++) {

                        api_manage.get_img_news(data.message[i]._id)
                            .success(function (data, status, headers, config) {
                                $scope.news_list_1[i].topicPicture = data;

                            })
                            .error(function (data, status, headers, config) {

                            });

                    }





                    /* if(data.message[0])
                     {
                     $scope.news_list_1[0] = data.message[0];
                     $scope.news_list_1[0].topicPicture  = './assets/img/image_placeholder.jpg';
                     
                     api_manage.get_img_news(data.message[0]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_1[0].topicPicture = data;
           
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
           
                   }
                     
                   if(data.message[1])
                   {
                     $scope.news_list_1[1] = data.message[1];
                     $scope.news_list_1[1].topicPicture  = './assets/img/image_placeholder.jpg';
                     
                     api_manage.get_img_news(data.message[1]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_1[1].topicPicture = data;
            
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
                    
               }
           
                
                    
           
               if(data.message[2])
               {
                     $scope.news_list_2[0] = data.message[2];
                     $scope.news_list_2[0].topicPicture  = './assets/img/image_placeholder.jpg';
           
                     api_manage.get_img_news(data.message[2]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_2[0].topicPicture = data;
             
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
                     
           }
           
           if(data.message[3])
           {
           
                     $scope.news_list_2[1] = data.message[3];
                     $scope.news_list_2[1].topicPicture  = './assets/img/image_placeholder.jpg';
           
                     api_manage.get_img_news(data.message[3]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_2[1].topicPicture = data;
              
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
                
           }
           
           
           if(data.message[4])
           {
           
           
           
                     $scope.news_list_3[0] = data.message[4];
                     $scope.news_list_3[0].topicPicture  = './assets/img/image_placeholder.jpg';
                     api_manage.get_img_news(data.message[4]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_3[0].topicPicture = data;
               
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
           }
           
           if(data.message[5])
           {
                     $scope.news_list_3[1] = data.message[5];
                     $scope.news_list_3[1].topicPicture  = './assets/img/image_placeholder.jpg';
                     api_manage.get_img_news(data.message[5]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_3[1].topicPicture = data;
                
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
           }
           
           
           if(data.message[6])
           {
           
                     $scope.news_list_1[2] = data.message[6];
                     $scope.news_list_1[2].topicPicture  = './assets/img/image_placeholder.jpg';
                     api_manage.get_img_news(data.message[6]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_1[2].topicPicture = data;
                 
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
                     
           }
           
           if(data.message[7])
           {
                     
                     $scope.news_list_2[2] = data.message[7];
                     $scope.news_list_2[2].topicPicture  = './assets/img/image_placeholder.jpg';
                     api_manage.get_img_news(data.message[7]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_2[2].topicPicture = data;
                  
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
           
           }
           
           if(data.message[8])
           {
                     $scope.news_list_3[2] = data.message[8];
                     $scope.news_list_3[2].topicPicture  = './assets/img/image_placeholder.jpg';
           
                     api_manage.get_img_news(data.message[8]._id)
                     .success(function(data, status, headers, config) {
                       $scope.news_list_3[2].topicPicture = data;
                   
                       })
                   .error(function(data, status, headers, config) {
                       
                    });
           }*/

                    document.querySelector("#loading").style.display = "none";

























                    document.querySelector("#loading").style.display = "none";




                    //   //console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
                    //  $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

                }

            })
            .error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({ data: data }) + "ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                //console.log(status+headers);
            });
    }






});


angular.module('app').controller('homeHeaderCtrl', function ($sce, $scope, $filter, $q, $http, api_manage, global_service) {

    $(function () {
        // //console.log( "ready!" );
        var parent = document.querySelector('.splitview'),
            topPanel = parent.querySelector('.top'),
            handle = parent.querySelector('.handle'),
            skewHack = 0,
            delta = 0;

        // If the parent has .skewed class, set the skewHack var.
        if (parent.className.indexOf('skewed') != -1) {
            skewHack = 1000;
        }

        parent.addEventListener('mousemove', function (event) {
            // Get the delta between the mouse position and center point.
            delta = (event.clientX - window.innerWidth / 2) * 0.5;

            // Move the handle.
            handle.style.left = event.clientX + delta + 'px';

            // Adjust the top panel width.
            topPanel.style.width = event.clientX + skewHack + delta + 'px';
        });
    });
});


angular.module('app').filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});
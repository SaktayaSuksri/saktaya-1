angular.module('app', ['ui.router',"xeditable","ngTable","api_service", 'ngSanitize','textAngular','ngTagsInput'])

angular.module('app').directive('fileModel', ['$parse', function ($parse) {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
  
          element.bind('change', function(){
              scope.$apply(function(){
                  modelSetter(scope, element[0].files[0]);
              });
          });
      }
  };
  }]);

angular.module('app').config(function($provide){
$provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
  // $delegate is the taOptions we are decorating
  // register the tool with textAngular

  taRegisterTool('backgroundColor', {
    display: "<button colorpicker class='btn btn-default ng-scope' title='Background Color' type='button' colorpicker-close-on-select colorpicker-position='bottom' ng-model='backgroundColor' style='background-color: {{backgroundColor}}'><i class='fa fa-paint-brush'></i></button>",
    action: function (deferred) {
      var self = this;
      this.$editor().wrapSelection('backgroundColor', this.backgroundColor);
      if (typeof self.listener == 'undefined') {
        self.listener = self.$watch('backgroundColor', function (newValue) {
          self.$editor().wrapSelection('backColor', newValue);
        });
      }
      self.$on('colorpicker-selected', function () {
        deferred.resolve();
      });
      self.$on('colorpicker-closed', function () {
        deferred.resolve();
      });
      return;
    }
  });
  taOptions.toolbar[1].unshift('backgroundColor');

  taRegisterTool('fontColor', {
    display: "<button colorpicker type='button' class='btn btn-default ng-scope'  title='Font Color'  colorpicker-close-on-select colorpicker-position='bottom' ng-model='fontColor' style='color: {{fontColor}}'><i class='fa fa-font '></i></button>",
    action: function (deferred) {
      var self = this;
      if (typeof self.listener == 'undefined') {
        self.listener = self.$watch('fontColor', function (newValue) {
          self.$editor().wrapSelection('foreColor', newValue);
        });
      }
      self.$on('colorpicker-selected', function () {
        deferred.resolve();
      });
      self.$on('colorpicker-closed', function () {
        deferred.resolve();
      });
      return false;
    }
  });
  taOptions.toolbar[1].unshift('fontColor');

  taOptions.setup.textEditorSetup=function($element) {
    $element.attr('ui-codemirror', '');
  };
  return taOptions;
}]);
});

angular.module('app').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('utility', {
                url: '/utility',
                templateUrl : "./partial/utility.html"
            })

            .state('news', {
                url: '/news',
                templateUrl : "./partial/news.html"
            })

            .state('user_management', {
                url: '/user_management',
                templateUrl : "./partial/user_management.html"
            })


            .state('form_management', {
                url: '/form_management',
                templateUrl : "./partial/form_management.html"
            })

            .state('content_management', {
                url: '/content_management',
                templateUrl : "./partial/content_management.html"
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



angular.module('app').controller('utility', function ($scope,NgTableParams, $filter, $q,$http,api_manage){



    $scope.init = function(){
      $scope.get_catagory();
     $scope.get_tag();
  }

  $scope.get_catagory = function(){


    api_manage.get_catagory()
    .success(function(data, status, headers, config) {
        //$scope.message = data;
        console.log(data);
        $scope.catagory_list  = data.message;
        console.log('$scope.catagory_list  =  '+ JSON.stringify($scope.catagory_list))
        $scope.catagory_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.catagory_list });


    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        console.log(status+headers);
    });
  }

//create catagory
$scope.modal_create_catagory = function(){

    $('#modal_create_catagory').modal('show');



}
$scope.create_catagory = function()
{

    let dataobj = { resourceName : $scope.create_catagory_resourceName}
    console.log("beforesend  create_catagory = "+ JSON.stringify(dataobj))
    api_manage.create_catagory(dataobj)

    .success(function(data, status, headers, config) {
        //$scope.message = data;
      console.log("data  =  "+JSON.stringify(data));
        if(data.code != "999999")
        {
          alert(data.message)
        }
        else{
        $scope.catagory_list.push(data.data);

        $scope.catagory_table.reload();


        $("#modal_create_catagory .close").click()
        $scope.create_catagory_resourceName = null;
        }

    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

    });



}

//update catagory


$scope.modal_update_catagory = function(item){

  $scope.modal_update_catagory_id  = item._id;
  $scope.modal_update_catagory_resourceName = item.resourceName;
  $('#modal_update_catagory').modal('show');



}

$scope.update_catagory = function()
{

    let dataobj = { resourceId  : $scope.modal_update_catagory_id,
                     resourceName : $scope.modal_update_catagory_resourceName}
    console.log("beforesend  update_catagory = "+ JSON.stringify(dataobj))
    api_manage.update_catagory(dataobj)

    .success(function(data, status, headers, config) {
        //$scope.message = data;
      console.log("data  =  "+JSON.stringify(data));
        if(data.code != "999999")
        {
          alert(data.message)
        }
        else{

          $scope.get_catagory();

          $("#modal_update_catagory .close").click()

        }

    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

    });



}


//delete catagory


$scope.delete_catagory = function(item){

  let dataObj = {
      resourceId:item._id

      };
  api_manage.delete_catagory(dataObj)
  .success(function(data, status, headers, config) {

    console.log("data  =  "+JSON.stringify(data));
    if(data.code != "999999")
    {
      alert(data.message)
    }
    else{

      $scope.get_catagory();



    }
  })
  .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

  });

}






    //--tag



  $scope.get_tag = function(){


        api_manage.get_tag()
        .success(function(data, status, headers, config) {

            if(data.code !== "999999")
            {
              alert(data.message)
            }
            else{
            console.log(data);
            $scope.tag_list  = data.message;
            console.log('$scope.tag_list  =  '+ JSON.stringify($scope.tag_list))
            $scope.tag_table= new NgTableParams({count: 10 ,  sorting: { tagName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.tag_list });
          }

        })
        .error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            console.log(status+headers);
        });
     }

    //create catagory
    $scope.modal_create_tag = function(){

        $('#modal_create_tag').modal('show');



    }
    $scope.create_tag = function()
    {

        let dataobj = { tagName : $scope.create_tag_resourceName}
        console.log("beforesend  create_tag = "+ JSON.stringify(dataobj))
        api_manage.create_tag(dataobj)

        .success(function(data, status, headers, config) {
            //$scope.message = data;
          console.log("data  =  "+JSON.stringify(data));
            if(data.code != "999999")
            {
              alert(data.message)
            }
            else{
            $scope.tag_list.push(data.data);

            $scope.tag_table.reload();


            $("#modal_create_tag .close").click()
            $scope.create_tag_resourceName = null;
            }

        })
        .error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

        });



    }

    //update tag


    $scope.modal_update_tag = function(item){

      $scope.modal_update_tag_id  = item._id;
      $scope.modal_update_tag_resourceName = item.tagName;
      $('#modal_update_tag').modal('show');



    }

    $scope.update_tag = function()
    {

        let dataobj = { tagId  : $scope.modal_update_tag_id,
                         tagName : $scope.modal_update_tag_resourceName}
        console.log("beforesend  update_tag = "+ JSON.stringify(dataobj))
        api_manage.update_tag(dataobj)

        .success(function(data, status, headers, config) {
            //$scope.message = data;
          console.log("data  =  "+JSON.stringify(data));
            if(data.code != "999999")
            {
              alert(data.message)
            }
            else{

              $scope.get_tag();

              $("#modal_update_tag .close").click()

            }

        })
        .error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

        });



    }


    //delete tag


    $scope.delete_tag = function(item){

      let dataObj = {
          tagId:item._id

          };
      api_manage.delete_tag(dataObj)
      .success(function(data, status, headers, config) {

        console.log("data  =  "+JSON.stringify(data));
        if(data.code != "999999")
        {
          alert(data.message)
        }
        else{

          $scope.get_tag();



        }
      })
      .error(function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

      });

    }







});

angular.module('app').controller('user_management', function ($scope,NgTableParams, $filter, $q,$http){

    alert('user_management');



});


angular.module('app').controller('content_management', function ($scope,NgTableParams, $filter, $q,$http){

    alert('content_management');



});


//============uploadFile==============================
// angular.module('app').('fileModel', ['$parse', function ($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;
//
//             element.bind('change', function(){
//                 scope.$apply(function() {
//                         modelSetter(scope, element[0].files[0]);
//                         evt.target.value = "";
//                     });
//                     document.getElementById("test").classList.remove("open");
//                   <!--   scope.uploadFile(); -->
//             });
//         }
//     };
// }]);
// angular.module('app').service('fileUpload', ['$http', function ($http) {
//     this.uploadFileToUrl = function(file, uploadUrl){
//         var fd = new FormData();
//         fd.append('file', file);
//         $http.post(uploadUrl, fd, {
//             transformRequest: angular.identity,
//             headers: {'Content-Type': undefined}
//         })
//         .success(function(){
//         })
//         .error(function(){
//         });
//     }
// }]);
//
// angular.module('app').controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
//
//     $scope.uploadFile = function(){
//         var file = $scope.myFile;
//         console.log('file is ' );
//         console.dir(file);
//         var uploadUrl = "/fileUpload";
//         fileUpload.uploadFileToUrl(file, uploadUrl);
//     };
//
// }]);


//==================uploadFile==========================================





angular.module('app').controller('form_management', function ($scope,NgTableParams, $filter, $q,$http,api_manage){

    //alert('form_management');
/* $scope.tags = [
                    { text: 'just' },
                    { text: 'some' },
                    { text: 'cool' },
                    { text: 'tags' }
                ];
                $scope.loadTags = function(query) {
                     return $http.get('/tags?query=' + query);
                };*/
  $scope.init = function(){
    $scope.modal_form_data = {

      formName : '',
      formSource : '',
      sourceType : '',
      authorId : '',
      resourceTypeId :'',
      deptId : '',
      targetTypeId : '',
      divisionId : '',


      formCode : '',
      formDetail : '',
      tags : null,
      showFlag : true,
    }

   $scope.get_catagory();
   $scope.get_form_list();

   $scope.show_tags = $scope.modal_form_data.tags;

  }
  $scope.uploadFile = function(){
    
            var file = $scope.myFile;
            var uploadUrl = "/api/multer";
            var fd = new FormData();
            fd.append('file', file);
    
            $http.post(uploadUrl,fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
              console.log("success!!");
            })
            .error(function(){
              console.log("error!!");
            });
        };



  $scope.get_form_list = function(){
    api_manage.get_formAll()
    .success(function(data, status, headers, config) {
        console.log("data  =  "+JSON.stringify(data));
        if(data.code != "999999")
        {
          alert(data.message)
        }
        else{

          $scope.form_list  = data.message;

          $scope.form_table= new NgTableParams({count: 20 ,  sorting: { formName: "desc" }  }, { counts: [30,50, 100], dataset: $scope.form_list });



        }


    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

    });


  }

    $scope.get_catagory = function(){

          api_manage.get_catagory()
          .success(function(data, status, headers, config) {

              console.log("data  =  "+JSON.stringify(data));
              if(data.code != "999999")
              {
                alert(data.message)
              }
              else{

                $scope.catagory_list  = data.message;



              }


          })
          .error(function(data, status, headers, config) {
              alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

          });
        }



    $scope.create_form = function(){
        $('#form').modal('show');
    }

    $scope.form_create = function(){
      console.log("form_create");

      $scope.modal_form_data.authorId="a7b2489be10aa3b0836b35a";
      //$scope.modal_form_data.resourceTypeId = "5a8470b228d2e92a0c753010";
      $scope.modal_form_data.deptId = "5a8470b228d2e92a0c753010";
      $scope.modal_form_data.targetTypeId = "5ade1b9ef36d2856dd57f399";
      $scope.modal_form_data.divisionId = "5ac34c06734d1d4f8afa3038";

      let dataObj = {
        formName : $scope.modal_form_data.formName,
        formSource : $scope.modal_form_data.formSource,
        sourceType : $scope.modal_form_data.sourceType,
        authorId : $scope.modal_form_data.authorId,
        resourceTypeId : $scope.modal_form_data.resourceTypeId,
        deptId : $scope.modal_form_data.deptId,
        targetTypeId : $scope.modal_form_data.targetTypeId,
        divisionId : $scope.modal_form_data.divisionId,
        docFlag : true,

        formCode : $scope.modal_form_data.formCode,
        formDetail : $scope.modal_form_data.formDetail,
        tags : $scope.modal_form_data.tags,
        showFlag : $scope.modal_form_data.showFlag,
      }

      console.log("create_form dataOBJ = " + JSON.stringify(dataObj));
      api_manage.create_form(dataObj)
      .success(function(data, status, headers, config) {

          console.log("data  =  "+JSON.stringify(data));
          if(data.code != "999999")
          {
            alert(data.message)
          }
          else{

            $scope.init();



          }
      })
      .error(function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

      });


  }


    //for including fornm

    //  $scope.dataType = ['type1', 'type2', 'type'];
    //answer type
    $scope.dataType = [
        {id: 1, colId:['col1', 'col4'], dataTypeName: 'input'},
        {id: 2, colId:['col2', 'col3'], dataTypeName: 'checkbox'},
        {id: 3, colId:['col5', 'col6', 'col7', 'col8'], dataTypeName: 'textarea'},
        {id: 4, colId:['col5', 'col6', 'col7', 'col8'], dataTypeName: 'multiplechoice'}
      ];

     $scope.columns = [{colId: 'col1',
     title:'',
     type: {
        view: 'select',
        options: [
        /*  {id: 0, name: 'นักเรียน'},
          {id: 1, name: 'คุนครู'},
          {id: 2, name: 'ผุ้ปกครอง'}*/
        ]
      },
      detail:'',
      isKeyRequired:false }];

     //title  //dataType   //detail   //isrequired
      $scope.addNewColumn = function() {
        var newItemNo = $scope.columns.length+1;
        $scope.columns.push({'colId':'col'+newItemNo});
      };


      $scope.removeColumn = function(index) {
        // remove the row specified in index
        $scope.columns.splice( index, 1);
        // if no rows left in the array create a blank array
        if ( $scope.columns.length() === 0 || $scope.columns.length() == null){
          alert('no rec');
          $scope.columns.push = [{"colId":"col1"}];
        }


      };


    //end includin form

    // entity to edit
  $scope.entity = {
    name: 'Max',
    country: 2,
    licenceAgreement: true,
    description: 'I use AngularJS'
  };

  // fields description of entity
  $scope.fields = [
    {
      name: 'name',
      title: 'Name',
      required: true,
      type: {
        view: 'input'
      }
    },
    {
      name: 'country',
      title: 'Country',
      type: {
        view: 'select',
        options: [
          {id: 0, name: 'USA'},
          {id: 1, name: 'German'},
          {id: 2, name: 'Russia'}
        ]
      }
    },
    {
      name: 'licenceAgreement',
      title: 'Licence Agreement',
      type: {
        view: 'checkbox'
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: {
        view: 'textarea'
      }
    }
  ];


});


angular.module('app').controller('link_management', function ($scope,NgTableParams, $filter, $q,$http){

    alert('link_management');



});

angular.module('app').controller('person', function ($scope,NgTableParams, $filter, $q,$http){

  let dataObj = {
    positionId : '0',
    divisionId : '0',
    departmentId : '0',
    isPreview : "false"
  }
    console.log("for table catagory =====----dataObj ---+++++" + JSON.stringify(dataObj));
    let res = $http.post('/api/getPersonel/',dataObj);
    res.success(function(data, status, headers, config) {
        if(data.code !== "999999"){
          alert(data.message)
        }else {
          $scope.personal_list = data.message;
          console.log($scope.personal_list);
        }
    });
    res.error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        console.log(status+headers);
    });

    //brgin functioning
    $scope.show_personel_profile = function(person){
        $('#show_personel_profile').modal('show');
        console.log(person);
        $scope.show_personel_id = person._id;
        $scope.show_personel_name = person.personelName ;
        $scope.show_education = person.education;
        $scope.show_position = person.position;
        $scope.show_expertise = person.expertise;
        $scope.show_subjects = person.subjects;
        $scope.show_office_room = person.officeRoom;
        $scope.show_e_mail = person.email;
        $scope.show_home_page = person.homepage;
        $scope.show_tel_num = person.telNumber;
        $scope.show_position_id = person.positionId;
        $scope.show_department_id = person.departmentId;
    }

    $scope.getDepartmentsAll = function(){
      //get list department
            let res1 = $http.get('/api/getDepartmentsAll/');
            res1.success(function(data1, status, headers, config) {
                if(data1.code !== "999999"){
                  alert(data1.message)
                }else{
                  $scope.departmentList = data1.message;
                  console.log("getDepartmentsAll >>>");
                  console.log(data1.message);
                }
            });
            res1.error(function(data1, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data1: data1}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                console.log(status+headers);
            });
    }

    $scope.getPositionsAll = function(){
      //get list position
        let res2 = $http.get('/api/getPositionsAll/');
        res2.success(function(data2, status, headers, config) {
            if(data2.code !== "999999"){
              alert(data2.message)
            }else{
              $scope.positionList = data2.message;
              console.log("getPositionAll >>>>>>>>>>>>>");
              console.log($scope.positionList);
            }
        });
        res2.error(function(data2, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data2: data2}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            console.log(status+headers);
        });
    }

    $scope.getDivisionsAll = function(){
      //get list division
        let res3 = $http.get('/api/getDivisionsAll/');
        res3.success(function(data3, status, headers, config) {
            if(data3.code !== "999999"){
              alert(data3.message)
            }else{
              $scope.divisionList = data3.message;
              console.log("getDivisionsAll >>>>>>>>>>>>>");
              console.log($scope.divisionList);
            }
        });
        res3.error(function(data3, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data3: data3}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            console.log(status+headers);
        });
    }

// New personel
      $scope.new_personel_profile = function(){
          $('#new_personel_profile').modal('show');
          $scope.getPositionsAll();
          $scope.getDepartmentsAll();
          $scope.getDivisionsAll();
      }

      $scope.create_new_presonal_submit = function(item){
        let personelObj = {
              personelName : $scope.personel_name,
              education : $scope.education,
              position : $scope.position,
              picture : $scope.filepreview,
              expertise : $scope.expertise,
              subjects :  $scope.subjects,
              officeRoom : $scope.office_room,
              email : $scope.e_mail,
              homepage : $scope.home_page,
              telNumber : $scope.tel_num,
              positionId : $scope.position_id,
              departmentId : $scope.department_id,
              divisionId : $scope.division_id

        };
         console.log(personelObj);
         let res = $http.post('/api/newPersonel/',personelObj);
         res.success(function(data, status, headers, config) {
             if(data.code !== "999999"){
               alert(data.message)
             }else {
               alert("Update complete :)");
                 $('#new_personel_profile').modal('hide');
               console.log(data);
             }
         });
         res.error(function(data, status, headers, config) {
             alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
             console.log(status+headers);
         });
      }

//edit personel
      $scope.edit_personel_profile = function(person){
          $('#edit_personel_profile').modal('show');
          console.log(person);
          $scope.edit_personel_id = person._id;
          $scope.edit_personel_name = person.personelName;
          $scope.edit_education = person.education;
          $scope.edit_position = person.position;
          $scope.edit_expertise = person.expertise;
          $scope.edit_subjects = person.subjects;
          $scope.edit_office_room = person.officeRoom;
          $scope.edit_e_mail = person.email;
          $scope.edit_home_page = person.homepage;
          $scope.edit_tel_num = person.telNumber;
          $scope.edit_position_id = person.positionId;
          $scope.edit_department_id = person.departmentId;
      }
      $scope.edit_presonal_submit = function() {
        let personelObj = {
              personelId : $scope.edit_personel_id,
              personelName : $scope.edit_personel_name,
              position : $scope.edit_position,
              picture : "",
              education : $scope.edit_education,
              expertise : $scope.edit_expertise,
              subjects : $scope.edit_subjects,
              officeRoom : $scope.edit_office_room,
              email : $scope.edit_e_mail,
              homepage : $scope.edit_home_page,
              telNumber :  $scope.edit_tel_num,
              positionId :   $scope.edit_position_id ,
              departmentId : $scope.edit_department_id
        };
        console.log(personelObj);
        let res = $http.post('/api/editPersonel/',personelObj);
        res.success(function(data, status, headers, config) {
            if(data.code !== "999999"){
              alert(data.message)
            }else {
              alert("Update complete :)");
                $('#edit_personel_profile').modal('hide');
              console.log(data);
            }
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            console.log(status+headers);
        });
      }
  });


angular.module('app').controller('news', function ($scope,$sce,NgTableParams, $filter, $q,$http,api_manage){
  $scope.trustAsHtml = function(string) {
console.log("str = "+string)
    return $sce.trustAsHtml(string);
};

    $scope.title = '';
    $scope.changeDetected = false;

    $scope.editorCreated = function (editor) {
        console.log(editor);
    };
    $scope.contentChanged = function (editor, html, text) {
          $scope.changeDetected = true;
        console.log('editor: ', editor, 'html: ', html, 'text:', text);
    };


  $scope.init = function(){

    //  quill_title  quill_detail      quill_title_yo  quill_detail_yo

    $scope.get_catagory();
    $scope.get_news();

    $scope.quill_title ='';
    $scope.quill_detail = '';
    $scope.quill_title_yo = '';
    $scope.quill_detail_yo = '';



}

$scope.reload_table = function(item){

    alert(JSON.stringify(item));
    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" } ,filter:{resourceId:item._id} }, { counts: [10,20, 100], dataset: $scope.news_list });
    $scope.news_table.reload();
    alert("reload");
}
$scope.get_news = function(){

  let dataObj = {


    resourceId : "0",
    departmentId:"0",
    targetTypeId:"0",
    tagId:"0",
    limit:0,
    isPosted:"false",
    isPreview:"false"

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
      //  console.log(data);
        $scope.news_list  = data.message;
      //  console.log('$scope.news_list  =  '+ JSON.stringify($scope.news_list))
        $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

      }

    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        console.log(status+headers);
    });
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
      console.log('$scope.catagory_list  =  '+ JSON.stringify($scope.catagory_list))
      //$scope.catagory_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.catagory_list });
      }

  })
  .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      console.log(status+headers);
  });
}

$scope.update_news = function(){






    $scope.modal_update_news_data.topicFull   = $scope.quill_title;
    $scope.modal_update_news_data.detailFull  =  $scope.quill_detail;
    $scope.modal_update_news_data.topicShort  = $scope.quill_title_yo;
    $scope.modal_update_news_data.detailShort  =  $scope.quill_detail_yo;
 /*
    $scope.quill_title.setText("");
    $scope.quill_detail.setText("");
    $scope.quill_title_yo.setText("");
    $scope.quill_detail_yo.setText("");*/

    $scope.modal_update_news_data.isPinned = "false"
    console.log("beforsend update_news   = "+ JSON.stringify($scope.modal_update_news_data ));
    if($scope.modal_update_news_data.aiswitch != 'create')
{
    $scope.modal_update_news_data.newsID = $scope.modal_update_news_data._id;

    api_manage.update_news($scope.modal_update_news_data)
    .success(function(data, status, headers, config) {
            //$scope.message = data;
            console.log("data  =  "+JSON.stringify(data));
            if(data.code != "999999")
            {
              alert(data.message)
            }
            else{

              $scope.get_news();

              $("#modal_update_news .close").click()

            }

    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        console.log(status+headers);
    });

}
else{
    $scope.create_news( $scope.modal_update_news_data);
    console.log("Pond log test >>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log($scope.modal_update_news_data);
}






}


$scope.modal_create_news = function(){


    $scope.modal_create_news_data  = {

                    topicShort : '',
                    topicFull   : '',
                    detailShort :'',
                    detailFull: '',
                    topicPicture: '',
                    datetimePost: null,
                    author: 'testAuthor',
                    isPinned: '',
                    resourceId: '',
                    departmentId: '5a8470b228d2e92a0c753010',
                    tagId: '',
                    aiswitch: 'create',
                    targetTypeId:'5ade1b9ef36d2856dd57f399'
    }

    $scope.modal_update_news($scope.modal_create_news_data)



}
$scope.create_news = function(item)
{


    $scope.modal_create_news_data  = item;

    console.log("beforesend  create_news = "+ JSON.stringify($scope.modal_create_news_data));
    api_manage.create_news($scope.modal_create_news_data)

    .success(function(data, status, headers, config) {
        //$scope.message = data;
      console.log("data  =  "+JSON.stringify(data));
        if(data.code != "999999")
        {
          alert(data.message)
        }
        else{
        $scope.news_list.push($scope.modal_create_news_data);

        $scope.news_table.reload();


        $("#modal_update_news .close").click()


        }

    })
    .error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

    });



}


//delete news


$scope.delete_news = function(item){
    alert("delete news")
      let dataObj = {
          newsId:item._id
          };
          console.log("beforesend   =  "+JSON.stringify(dataObj));
      api_manage.delete_news(dataObj)
      .success(function(data, status, headers, config) {

        console.log("data  =  "+JSON.stringify(data));
        if(data.code != "999999")
        {
          alert(data.message)
        }
        else{
          $scope.get_news();
        }
      })
      .error(function(data, status, headers, config) {
          alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

      });

}

            $scope.modal_update_news = function(item){



                $scope.modal_update_news_data = item;

                $scope.quill_title = $scope.modal_update_news_data.topicFull;
                $scope.quill_detail = $scope.modal_update_news_data.detailFull;
                $scope.quill_title_yo = $scope.modal_update_news_data.topicShort;
                $scope.quill_detail_yo = $scope.modal_update_news_data.detailShort;
                console.log("$scope.modal_update_news_data   =  "+JSON.stringify($scope.modal_update_news_data ));
                        $('#modal_update_news').modal('show');



/*
                        $scope.quill_title.setText($scope.modal_update_news_data.topicFull);

                         $scope.quill_detail.setText($scope.modal_update_news_data.detailFull);

                          $scope.quill_title_yo.setText($scope.modal_update_news_data.topicShort);


                  $scope.quill_detail_yo.setText($scope.modal_update_news_data.detailShort);
                        */
               //         var form = d
                        /*ocument.querySelector('form');
                        form.onsubmit = function() {
                            // Populate hidden form on submit
                            var about = document.querySelector('input[name=about]');
                           about.value = JSON.stringify(quill.getContents());

                            console.log("Submitted", $(form).serialize(), $(form).serializeArray());

                            // No back end to actually submit to!
                            alert('Open the console to see the submit data!')
                            return false;
                        };*/


            }


})

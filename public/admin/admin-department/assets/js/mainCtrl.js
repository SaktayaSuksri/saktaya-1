angular.module('app', ['ui.router',"ngTable"])

angular.module('app').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
        $stateProvider
    
            // HOME STATES AND NESTED VIEWS ========================================
            .state('news', {
                url: '/news',
                templateUrl : "./partial/news.html"
            })

                // nested list with custom controller
       


            .state('person', {
                url: '/person',
                templateUrl : "./partial/person.html"
            })


     

});

angular.module('app').controller('news', function ($scope,NgTableParams, $filter, $q,$http){



    var news_JSON = {

        title:"",
        detail:""
    }
    
            $scope.edit_news = function(item){
                    
                        $('#edit_modal').modal('show');

                        var quill_title = new Quill('#editor-container-title', {
                            modules: {
                            toolbar: [
                                ['bold', 'italic'],
                                ['link', 'blockquote', 'code-block', 'image'],
                                [{ list: 'ordered' }, { list: 'bullet' }]
                            ]
                            },
                            placeholder: 'Compose an epic...',
                            theme: 'snow'
                        });

                        var quill_detail = new Quill('#editor-container-detail', {
                            modules: {
                            toolbar: [
                                ['bold', 'italic'],
                                ['link', 'blockquote', 'code-block', 'image'],
                                [{ list: 'ordered' }, { list: 'bullet' }]
                            ]
                            },
                            placeholder: 'Compose an epic...',
                            theme: 'snow'
                        });

                        var quill_title_yo = new Quill('#editor-container-title-yo', {
                            modules: {
                            toolbar: [
                                ['bold', 'italic'],
                                ['link', 'blockquote', 'code-block', 'image'],
                                [{ list: 'ordered' }, { list: 'bullet' }]
                            ]
                            },
                            placeholder: 'Compose an epic...',
                            theme: 'snow'
                        });

                        var quill_detail_yo = new Quill('#editor-container-detail-yo', {
                            modules: {
                            toolbar: [
                                ['bold', 'italic'],
                                ['link', 'blockquote', 'code-block', 'image'],
                                [{ list: 'ordered' }, { list: 'bullet' }]
                            ]
                            },
                            placeholder: 'Compose an epic...',
                            theme: 'snow'
                        });

              
                        
                        var form = document.querySelector('form');
                        form.onsubmit = function() {
                            // Populate hidden form on submit
                            var about = document.querySelector('input[name=about]');
                            about.value = JSON.stringify(quill.getContents());
                            
                            console.log("Submitted", $(form).serialize(), $(form).serializeArray());
                            
                            // No back end to actually submit to!
                            alert('Open the console to see the submit data!')
                            return false;
                        };

                
            }

      
})
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



angular.module('app').controller('global', function ($scope,$http,api_manage){
alert();
    
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
angular.module('app').config(function ($translateProvider) {
    $translateProvider
     // ภาษาไทย
        .translations('th', {
            // Nav
            home: 'หน้าแรก',
            course: 'หลักสูตร',
            bachelor: 'ปริญาตรี',
            master: 'ปริญาโท',
            PhD: 'ปริญาเอก',
            about: 'เกี่ยวกับคณะ',
            history: 'ประวัติความเป็นมา',
            philosophy:'ปรัชญา-ปณิธาน-วิสัยทัศน์-พันธกิจ',
            structure: 'โครงสร้างองค์กร',
            annual_report: 'รายงานประจำปี',
            department: 'ภาควิชา',
            department_of_mathematics: 'ภาควิชาคณิตศาสตร์',
            department_of_biology: 'ภาควิชาชีววิทยา',
            department_of_physicsy: 'ภาควิชาฟิสิกส์',
            department_of_computer_science: 'ภาควิชาวิทยาการคอมพิวเตอร์',
            department_of_statistics: 'ภาควิชาสถิติ',
            department_of_Chemistry: 'ภาควิชาเคมี',
            personnel: 'บุคลากร',
            form:'ฟอร์ม',
            graduate_studies:'บัณฑิตศึกษา',
            tool_center: 'ศูนย์เครื่องมือ',
            alumni:'ศิษย์เก่า',
            old_site:'เว็บไซต์เดิม'
            
            //Home page


        })
     // ENGLISH
        .translations('en', {
            home: 'HOME',
            course: 'COUESE',
            bachelor: 'BACHEOR',
            master: 'MASTER',
            PhD: 'PhD',
            about: 'ABOUT',
            history: 'HISTORY',
            philosophy:'PHILOSOPHY-RESOLUTION-VISION-MISSION',
            structure: 'ORGANIZATIONAL STRUCTURE',
            annual_report: 'ANNUAL REPORT',
            department: 'DEPARTMENT',
            department_of_mathematics: 'DEPARTMENT OF MATHEMATICS',
            department_of_biology: 'DEPARTMENT OF BIOLOGY',
            department_of_physicsy: 'DEPARTMENT OF PHYSICSY',
            department_of_computer_science: 'DEPARTMENT OF COMPUTER SCIENCE',
            department_of_statistics: 'DEPARTMENT OF  STATISTICS',
            department_of_Chemistry: 'DEPARTMENT OF  CHEMISTRY',
            personnel: 'PERSONNEL',
            form:'FORM',
            graduate_studies:'GRADUATE STUDIES',
            tool_center: 'Sci-Ins',
            alumni:'ALUMNI',
            old_site:'OLD SITE'

            //Home page




           
        });

    $translateProvider.preferredLanguage('th');
 
});


// angular.module('app')
//     .factory('global_languages', ['$rootScope', '$http', function ($rootScope, $http) {
//         var buf_languages;
//         return {
//             get_languages: function () {
//                 return buf_languages;
//             },
//             set_languages: function (languages) {
//                 buf_languages = languages;
//             }
//         }
//     }]);


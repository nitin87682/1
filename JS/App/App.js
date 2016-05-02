/**
 * Created by utanelan on 1/19/2016.
 */
var EventApp=angular.module("EventApp",['ui.router','angularUtils.directives.dirPagination','angular-loading-bar','ngAnimate', 'ui.bootstrap','ngResource','ngRoute','flash']);
EventApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'Templates/Home.html',
            controller : 'SuggestionController'

        })
        .state('createEvent',{
            url:'/createEvent',
            templateUrl:'Templates/CreateEventForm.html',
            controller : 'CreateEventController'
        })
        .state('search',{
            url : '/search',
            templateUrl : 'Templates/FirstSearchPage.html',
            params : {myParam : null},          //SEARCH INPUT is the Parameter
            controller : 'SearchController'
        })
        .state('detailedEventDetails',{
            url : '/detailedEventDetails',
            templateUrl : 'Templates/EventAllDetailsPage.html',
            params: {myParam: null},            //EVENT_ID is the parameter
            controller : 'EventDetailController'
        })
        .state('bookNow',{
            url : '/bookNow',
            templateUrl : 'Templates/BookingPage.html',
            controller : 'BookingPageController'
        })
        .state('login',{
            url :  "/login",
            templateUrl:"Templates/Login.html",
            controller:"LoginController"
        })
        .state('Dashboard',{
            url : '/Dashboard',
            templateUrl : 'Templates/UserDProfile.html',
            controller:"DashboardController"
         })
        .state('Dashboard.AdminProfile',{
            url : '/AdminProfile',
            templateUrl : 'Templates/AdminProfile.html'
        })
        .state('Dashboard.ChangePassword',{
            url : '/changePassword',
            templateUrl : 'Templates/ChangePassword.html'
        })
        .state('Dashboard.PendingForApproval',{
            url : '/EventsPendingForApproval',
            templateUrl : 'Templates/EventsPendingForApproval.html'
        })
        .state('Dashboard.AllTransactionsVOforAdmin',{
            url : '/allTransactions',
            templateUrl : 'Templates/AllTransactionsVOforAdmin.html'
        })
        .state('Dashboard.UserProfile',{
            url : '/UserProfile',
            templateUrl : 'Templates/UserProfile.html'
        })
        .state('Dashboard.UserCreatedEvents',{
            url : '/myEvents',
            templateUrl : 'Templates/UserCreatedEvents.html'
        })
        .state('Dashboard.UserVisitedEvents',{
            url : '/visitedEvents',
            templateUrl : 'Templates/UserVisitedEvents.html'
        })
        .state('ModifyEvent',{
            url : '/ModifyEvent',
            templateUrl : 'Templates/ModifyEvent.html',
            controller: 'ModifyController'
        })
        .state('Invoice',{
            url : '/Invoice?txId&status&bId',
            templateUrl : 'Templates/InvoicePage.html',
            params : {
                bId : null,
                txId : null,
                status : null
            },
            controller : 'InvoiceController'
        })
    ;


    /* $rootScope.$on('$routeChangeStart', function () {
     alert('refresh');
     });*/
});

//fileread directive
EventApp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);


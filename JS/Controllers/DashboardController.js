/**
 * Created by utanelan on 1/20/2016.
 */
EventApp.controller('DashboardController',function($scope,$location,$state,$stateParams,SearchService,$rootScope,$http,Flash){
    if($rootScope.isLogged==false){
     $location.path('/home')
     }
    $scope.deleteSuccess = function () {
        var message = '<strong>Event Deleted Successfully!!</strong>';
        Flash.create('success', message);
    };
    $scope.deleteFail = function () {
        var message = '<strong>Event is not Deleted!!</strong>';
        Flash.create('danger', message);
    };

    $scope.approveSuccess = function () {
        var message = '<strong>Event Approved!!</strong>';
        Flash.create('success', message);
    };
    $scope.rejectSuccess = function () {
        var message = '<strong>Event Rejected!!</strong>';
        Flash.create('danger', message);
    };
    $scope.changePwdSuccess = function () {
        var message = '<strong>Event Approved!!</strong>';
        Flash.create('success', message);
    };

    console.log("in dashboard");
    $rootScope.currentLocation = $location.path();
    $scope.userId = $rootScope.idOfUser;
    $scope.isUser = $rootScope.isUser;
    $scope.isAdmin = $rootScope.isAdmin;
    if($scope.isUser){
        $scope.usersRole ="USER"
    }
    if($scope.isAdmin){
        $scope.usersRole ="ADMIN"
    }
    if($scope.usersRole=="ADMIN") {

        function callbackForAdminProfile(data) {
            /*console.log("IN CALL BACK");*/
            $rootScope.AdminProfileDetails = data;
            /*console.log(data);*/
        }
        $scope.AdminProfileLink = "http://din51002665:8181/EventManagement/adetails?userId=" + $scope.userId;
        SearchService(callbackForAdminProfile, $scope.AdminProfileLink);


        function callbackDashboard(data) {
            /*console.log("IN CALL BACK");*/
            $rootScope.pendingEventsVO = data;
            console.log("Pending events for approval call back")
            console.log($rootScope.pendingEventsVO)
            /*console.log(data);*/
        }
        $scope.pendingEventsLink = "http://din51002665:8181/EventManagement/find";
        SearchService(callbackDashboard, $scope.pendingEventsLink);

        $scope.approveEvent = function (id) {
            console.log(id);
            var approveEventLink = "http://din51002665:8181/EventManagement/approve?eventId="+id;
            SearchService(callbackForApproveEvent,approveEventLink)
        };
        function callbackForApproveEvent(data) {
                var responseOfApproval = data;
            console.log("in approving event call back");
                //alert(responseOfApproval);
            $scope.approveSuccess();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 5000);
            SearchService(callbackDashboard, $scope.pendingEventsLink);
        }
        $scope.rejectEvent = function (id1) {
            console.log(id1);
            var rejectEventLink = "http://din51002665:8181/EventManagement/reject?eventId="+id1;
            SearchService(callbackForRejectEvent,rejectEventLink)
        };
        function callbackForRejectEvent(data) {
            var responseOfRejection = data;
            console.log(data);
            //alert(responseOfRejection);
            $scope.rejectSuccess();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 5000);
            SearchService(callbackDashboard, $scope.pendingEventsLink);
        }
        function callbackForAllTransactions(data) {
            /*console.log("IN CALL BACK");*/
            $rootScope.allTransactionsVO = data;
            /*console.log(data);*/
        }
        $scope.allTransactionsForAdminLink = "http://din51002665:8181/EventManagement/get";
        SearchService(callbackForAllTransactions, $scope.allTransactionsForAdminLink);
    }
    else{
        //user profile
        function callbackForUserProfile(data) {
            /*console.log("IN CALL BACK");*/
            $rootScope.UserProfileDetails = data;
            /*console.log(data);*/
        }
        $scope.UserProfileLink = "http://din51002665:8181/EventManagement/udetails?userId=" + $scope.userId;
        SearchService(callbackForUserProfile, $scope.UserProfileLink);

        //user created events
            function callbackForCreatedEvents(data) {
                /*console.log("IN CALL BACK");*/
                $rootScope.UserCreatedEvents = data;
                /*console.log(data);*/
            }
        $scope.UserCreatedEventsLink = "http://din51002665:8181/EventManagement/uevents?userId=" + $scope.userId;
        SearchService(callbackForCreatedEvents, $scope.UserCreatedEventsLink);
        //user visited events
        function callbackForVisitedEvents(data) {
            /*console.log("IN CALL BACK");*/
            $rootScope.UserVisitedEvents = data;
            /*console.log(data);*/
        }
        $scope.UserVisitedEventsLink = "http://din51002665:8181/EventManagement/ubookings?userId=" + $scope.userId;
        SearchService(callbackForVisitedEvents, $scope.UserVisitedEventsLink);
        $scope.modifyEvent = function (id) {
            $rootScope.modifyEventId = id;
            $state.go('ModifyEvent');
            console.log(id)
        };
        $scope.deleteEvent = function (id1) {
            console.log("in delete");
            console.log(id1);
            $http.get("http://din51002665:8181/EventManagement/deleteEvent?eventId="+id1).then(function(resp){
                //alert("Removed!!")
                $scope.deleteSuccess();
                $scope.LoginError = false;
                setTimeout(function() {
                    $('#loginErrorDiv').fadeOut('fast');
                }, 5000);
                SearchService(callbackForCreatedEvents, $scope.UserCreatedEventsLink);
            },function(resp){
                //alert("Not Removed!!")
                $scope.deleteFail();
                $scope.LoginError = false;
                setTimeout(function() {
                    $('#loginErrorDiv').fadeOut('fast');
                }, 2000);
            });
        };
    }
    
    $scope.changePassword = function (newPassWord) {
        $scope.linkForNewPwd = "http://din51002665:8181/EventManagement/changePassWord?user_id="+$rootScope.idOfUser+"&password="+newPassWord;
        $http.get($scope.linkForNewPwd).then(function(resp){
            //alert(resp.data);
            $scope.changePwdSuccess();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 5000);
        })
    }
    
});
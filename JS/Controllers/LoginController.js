/**
 * Created by utanelan on 1/20/2016.
 */
EventApp.controller('LoginController',function($scope,$location,$state,$stateParams,$rootScope,Flash,SearchService,$http){
/*console.log("login controller");*/
    $scope.loginFail = function () {
        var message = '<strong>Invalid Credentials!</strong>';
        Flash.create('danger', message);
    };
    $scope.signUpFail = function () {
        var message = '<strong>Username already exists!!</strong>';
        Flash.create('danger', message);
    };
    $scope.signUpSuccess = function () {
        var message = '<strong>Account Created Successfully!!</strong>';
        Flash.create('success', message);
    };
function callbackForLogin(resp){
    $rootScope.loginUserDetails = resp.data;
    $rootScope.isLogged=true;
    console.log($rootScope.loginUserDetails);
    if($rootScope.loginUserDetails.roles.user!=undefined){
        console.log("if user");
        $rootScope.isAdmin = false;
        $rootScope.isUser =true ;
    }
    if($rootScope.loginUserDetails.roles.admin!=undefined){
        console.log("if admin ");
        $rootScope.isUser =false ;
        $rootScope.isAdmin = true;
    }
    $rootScope.idOfUser = $rootScope.loginUserDetails.id;
    $scope.curLocation = $rootScope.currentLocation;
    if($scope.curLocation==undefined){
        $location.path('/home')
    }
    else {
        $location.path($scope.curLocation)
    }

}
    /*$scope.LoginError = true;
    $rootScope.isUser=false;
    $rootScope.isAdmin=true;*/
    $rootScope.isLogged = false;
    $scope.loginFunction=function(userDetails){
        console.log(userDetails);
        $http.get("http://din51002665:8181/EventManagement/rest/user/"+userDetails.userName+"/"+userDetails.passWord).then(function(data){
            callbackForLogin(data);
        },function(){
            $scope.loginFail();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 1500);
        })
    };

  /*  $scope.loginFunction = function(u,pwd){
        console.log("in login");
        if(u=="a" && pwd=="a"){
            $rootScope.isLogged=true;
            $rootScope.idOfUser = 1;
            $scope.curLocation = $rootScope.currentLocation;
            if($scope.curLocation==undefined){
                $location.path('/home')
            }
            else {
                $location.path($scope.curLocation)
            }
        }
        else
        {
            $scope.danger();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 1000);
        }

    };*/

/*    $scope.loginFunction = function(u,pwd){
        console.log("in login");
        if(u=="a" && pwd=="a"){
            $rootScope.isLogged=true;
            $rootScope.idOfUser = 1;
            /!* var userObjectLink = "http://din51002665:8181/EventManagement/udetails?userId=11";
             SearchService(callbackForUserObject,userObjectLink);
             function callbackForUserObject(data){
             /!*console.log("IN CALL PE BACK");*!/
             var user1 = {firstName:"abhijeet",lastName:"powar",email:"apowar@gmail.co",phoneNo:"7834655635",photoUrl:"hello",username:"apowar"}
             $rootScope.userObject = user1;
             console.log(data);
             /!*console.log(data);*!/
             };
             *!/

            $scope.curLocation = $rootScope.currentLocation;
            if($scope.curLocation==undefined){
                $location.path('/home')
            }
            else {
                $location.path($scope.curLocation)
            }
        }
        else
        {
            $scope.danger();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 1000);
        }

    };*/



    $scope.logout = function(){
        $rootScope.isLogged=false;
    };
     $scope.signUpFunction = function(userDetails){
        //userDetails.username = LoginDetails.username;
        console.log("in signup");
        console.log(userDetails);
        //console.log(LoginDetails);
        console.log("urlLink");
         //var userLogin = {
         //    user : userDetails,
         //    login : LoginDetails
         //}
        $http.post("http://din51002665:8181/EventManagement/signUp",angular.toJson(userDetails)).then(function(){
            //alert("Account Created Successfully!!")
            $scope.signUpSuccess();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 5000);
        },function(){
            $scope.signUpFail();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 2000);
        });

    }
});
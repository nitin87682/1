/**
 * Created by utanelan on 1/20/2016.
 */
EventApp.controller('EventDetailController',function($scope,$location,$state,$stateParams,SearchService,$rootScope,$http){
    /*if($rootScope.isLogged==false){
     $location.path('/home')
     }*/
    $rootScope.currentLocation = $location.path();
    /*console.log("IN EVENT DETAIL CONTROLLER");*/
    if($stateParams.myParam!=null) {
        $rootScope.eventId = $stateParams.myParam;
        $scope.commentTextOnEvent='';
        $scope.replyText='';
        console.log("EventId is : ----" + $rootScope.eventId);
    }
    $scope.eventURL = "http://din51002665:8181/EventManagement/findEvent?eventId="+$rootScope.eventId;
    SearchService(callbackForEvent,$scope.eventURL);
    $scope.commentsURL = 'http://din51002665:8181/EventManagement/findComment?eventId='+$rootScope.eventId;
    console.log($scope.commentsURL);
    SearchService(callbackForComments,$scope.commentsURL);
    $scope.gettingRatingUrl ="http://din51002665:8181/EventManagement/sratings?eventId="+$rootScope.eventId;
    console.log($scope.gettingRatingUrl);
    SearchService(callbackForRatings,$scope.gettingRatingUrl);
    //Call Back Functions
    function callbackForRatings(data){
        /*console.log("IN CALL BACK OF EVENT");*/
        $rootScope.eventRating = data;
        console.log($rootScope.eventRating);
        var ratingsArray = [0,0,0,0,0];
        for(var g=0;g<$rootScope.eventRating.length;g++)
        {
            ratingsArray[$rootScope.eventRating[g].rname-1] = $rootScope.eventRating[g].rvalue;
        }
        $rootScope.ratingOf5 = ratingsArray[4];
        $rootScope.ratingOf4 = ratingsArray[3];
        $rootScope.ratingOf3 = ratingsArray[2];
        $rootScope.ratingOf2 = ratingsArray[1];
        $rootScope.ratingOf1 = ratingsArray[0];

        /*console.log(data);*/
    };
    function callbackForEvent(data){
        /*console.log("IN CALL BACK OF EVENT");*/
        $rootScope.detailedEvent = data;
        console.log("********");
        console.log(data);
    };
    function callbackForComments(data){
        /*console.log("IN CALL BACK OF COMMENTS");*/
        $rootScope.comments =  data;
        /*console.log(data);*/
    };
    $scope.commentOnEvent = function(eventId,commentTextOnEvent){
        var usersId = $rootScope.idOfUser;
        if(usersId==undefined){
            $state.go('login')
        }
        else{
            console.log("userId is : "+usersId+"Events Id is : "+eventId);
            console.log(commentTextOnEvent);
            $http.get("http://din51002665:8181/EventManagement/addComment?userId="+usersId+"&eventId="+eventId+"&text="+commentTextOnEvent).then(function(resp){
                callForUpdatingReviews(resp.data)
            });

        }
    };
    function callForUpdatingReviews(data){
        SearchService(callbackForComments,$scope.commentsURL);
    }
    $scope.sendReply = function(commentId, replyText){
        var usersId = $rootScope.idOfUser;
        if(usersId==undefined){
            $state.go('login')
        }
        else{
            console.log("userId is : "+usersId+"CommentId is : "+commentId);
            console.log(replyText);
            $http.get("http://din51002665:8181/EventManagement/addReply?userId="+usersId+"&commentId="+commentId+"&text="+replyText).then(function(resp){
                callForUpdatingReviews(resp.data)
            });

        }
    };
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-star'},
        {stateOff: 'glyphicon-off'}
    ];

    $scope.sendRating = function (ratingValue) {
        var uId = $rootScope.idOfUser;
        if(uId==undefined){
            $state.go('login')
        }
        else {
            console.log("Rating : " + ratingValue);
            console.log($rootScope.detailedEvent);
            $scope.sendRatingUrl = "http://din51002665:8181/EventManagement/uratings?eventId=" + $rootScope.detailedEvent.eventId + "&userId=" + $rootScope.idOfUser + "&ratingValue=" + ratingValue;
            SearchService(callbackForInputRating, $scope.sendRatingUrl);
        }
    };
    function callbackForInputRating(data){
        console.log("Hellooo");
        console.log(data);
        $scope.responceForRating = data;
        SearchService(callbackForRatings,$scope.gettingRatingUrl);
    }

});
/**
 * Created by utanelan on 1/20/2016.
 */
EventApp.controller('SearchController',function($scope,$location,$stateParams,SearchService,$rootScope){
    /*if($rootScope.isLogged==false){
        $location.path('/home')
    }*/
    $rootScope.currentLocation = $location.path();
    console.log("SeachController");
    $scope.filterSearchInput='';
    $scope.sortType='';
    $rootScope.eventsVO = undefined;
   // $rootScope.events = undefined;
    if($stateParams.myParam!=null){
        $rootScope.searchInput = $stateParams.myParam;
    }
    console.log("inpututt"+$rootScope.searchInput);

/*    console.log("Hellll");

    console.log("SERACH INPUT"+$rootScope.searchInput);*/

    if($rootScope.eventName.indexOf($rootScope.searchInput)>-1){
        $scope.searchType='eventName';
        console.log("searchType : "+$scope.searchType);
        console.log("input"+$rootScope.searchInput);
        SearchService(callback,"http://din51002665:8181/EventManagement/sname?eventName="+$rootScope.searchInput);
        /*SearchService(callback,"http://din51002675:1025/EventManagement/find?eventId=15");*/
    }
    else if($rootScope.performers.indexOf($rootScope.searchInput)>-1){
        $scope.searchType='performer';
        console.log("searchType : "+$scope.searchType);
        var index =$rootScope.searchInput.indexOf(" ");
        var fname=$rootScope.searchInput.substr(0,index);
        var lname=$rootScope.searchInput.substr(index+1);
        $scope.link = "http://din51002665:8181/EventManagement/sperformer?firstName="+fname+"&lastName="+lname;
        SearchService(callback,$scope.link);
    }
    else if($rootScope.category.indexOf($rootScope.searchInput)>-1){
        $scope.searchType='category';
        console.log("searchType : "+$scope.searchType);
        $scope.link = "http://din51002665:8181/EventManagement/scategory?name="+$rootScope.searchInput;

        SearchService(callback,$scope.link);
    }
    else if($rootScope.venue.indexOf($rootScope.searchInput)>-1){
        $scope.searchType='venue';
        console.log("searchType : "+$scope.searchType);
        $scope.link = "http://din51002665:8181/EventManagement/scity?city="+$rootScope.searchInput;
        /*console.log("searchType : "+$scope.searchType);*/
        SearchService(callback,$scope.link);
    }
    else{
        $rootScope.eventsVO = [];
    }
    //Call Back Function
    function callback(data){
        /*console.log("IN CALL BACK");*/
        $rootScope.eventsVO = data;
        console.log(data);
    };


    $scope.invokeMethod = function(dt){
        //alert("Hai");
        convert = function(a){
            return "0"+a
        }
        var year = dt.getFullYear();
        var month = (dt.getMonth()+1); if(month<10){ month = convert(month)}
        var date = dt.getDate(); if(date<10){ date = convert(date)}
        var searchDate = year+"-"+(month)+"-"+date;
        console.log(searchDate);
        $scope.seachByDateUrl = "http://din51002665:8181/EventManagement/sdate?date="+searchDate;
        SearchService(callback,$scope.seachByDateUrl);
        console.log(dt);
    }

});
/**
 * Created by utanelan on 1/20/2016.
 */
EventApp.controller('SuggestionController',function($rootScope,SearchService){
    /*console.log("SuggestionController");*/
    function callbackOfEventName(data){
        /*console.log("IN CALL BACK");*/
        $rootScope.eventName = data;
        /*console.log(data);*/
        SearchService(callbackOfPerformers,'http://din51002665:8181/EventManagement/listOfPerformers');
    };
    function callbackOfPerformers(data){
        /*console.log("IN CALL BACK");*/
        var ListOfPerformers = data;
        $rootScope.performers = [];
        for(var i=0;i<ListOfPerformers.length;i++){
            var p = ListOfPerformers[i];
            var name = p[0]+" "+p[1];
            /*console.log("name"+name);*/
            $rootScope.performers[i]=name;
        }
        /*console.log($rootScope.performers);*/
        SearchService(callbackOfCategories,'http://din51002665:8181/EventManagement/listOfCategory');
    };
    function callbackOfCategories(data){
        /*console.log("IN CALL BACK");*/
        $rootScope.category = data;
        /*console.log(data);*/
        SearchService(callbackOfVenues,'http://din51002665:8181/EventManagement/listOfCity');
    };
    function callbackOfVenues(data){
        /*console.log("IN CALL BACK");*/
        $rootScope.venue = data;
        /*console.log(data);*/
        $rootScope.states=$rootScope.eventName.concat($rootScope.performers).concat($rootScope.category).concat($rootScope.venue);
    };
    //Variables
    SearchService(callbackOfEventName,'http://din51002665:8181/EventManagement/listOfEventsName');

    //first 4 most popular events
    SearchService(callbackFor4PopularEvents,"http://din51002665:8181/EventManagement/popularEvents");
    function callbackFor4PopularEvents(data){
        /*console.log("IN CALL PE BACK");*/
        $rootScope.popularEvents4VO = data;
        /*console.log(data);*/
    };
    // 4 upcoming events
    SearchService(callbackFor4UpcomingEvents,"http://din51002665:8181/EventManagement/upcomingEvents");
    function callbackFor4UpcomingEvents(data){
        /*console.log("IN CALL PE BACK");*/
        $rootScope.upcomingEvents4VO = data;
        /*console.log(data);*/
    };
});
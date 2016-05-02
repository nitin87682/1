/**
 * Created by Praneeth on 1/24/2016.
 */
/**
 * Created by utanelan on 1/20/2016.
 */
EventApp.controller('CreateEventController',function($scope,$rootScope,$location,$state,$http,Flash){

    /*console.log("in create")*/
    if($rootScope.isLogged==false){
        $rootScope.currentLocation = $location.path();
        $state.go('login')
    }
    /*console.log("IN ADD SCHEDULE CONTROLLER");*/

    $scope.createEventSuccess = function () {
        var message = '<strong>Event Created Successfully!!</strong>';
        Flash.create('success', message);
    };

    $scope.createEventFail = function () {
        var message = '<strong>Event is not created!!</strong>';
        Flash.create('danger', message);
    };

    var minDate = new Date();
    $scope.minDate=minDate.toISOString();

    $scope.formatDate = function(date){
        $scope.dateOut = new Date(date);
        return $scope.dateOut;
    };

    //For Schedule
    $scope.schedules = [{}];
    $scope.addSchedule = function(){
        var newSchedule = $scope.schedules.length+1;
        $scope.schedules.push({});
    };
    $scope.removeSchedule = function(){
        var lastSchedule = $scope.schedules.length-1;
        $scope.schedules.splice(lastSchedule);
    };

    //For Performers
    $scope.performers = [{}];
    $scope.addPerformer = function(){
        var newPerformer = $scope.performers.length+1;
        $scope.performers.push({});
    };
    $scope.removePerformer = function(){
        var lastPerformer = $scope.performers.length-1;
        $scope.performers.splice(lastPerformer);
    };

    //Album Photos
    $scope.photos = [{}];
    $scope.addPhoto = function(){
        var newPhoto = $scope.photos.length+1;
        $scope.photos.push({});
    };
    $scope.removePhoto = function(){
        var lastPhoto = $scope.photos.length-1;
        $scope.photos.splice(lastPhoto);
    };

    //Tickets
    $scope.tickettype = [{}];
    $scope.addTicketType = function(){
        var newTicketType = $scope.tickettype.length+1;
        $scope.tickettype.push({});
    };
    $scope.removeTicketType = function(){
        var lastTicketType = $scope.tickettype.length-1;
        $scope.tickettype.splice(lastTicketType);
    };

    //Contact
    $scope.contact = [{}];
    $scope.addContact = function(){
        var newContact = $scope.contact.length+1;
        $scope.contact.push({});
    };
    $scope.removeContact = function(){
        var lastContact = $scope.contact.length-1;
        $scope.contact.splice(lastContact);
    };


    //For Calender
    $scope.today = function() {
        $scope.dt = new Date();
        $scope.dt1 = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
        $scope.dt1 = null;
    };

/*
    $scope.toggleMin = function() {
        console.log("mindate")
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();*/

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function(dt) {
        $scope.minDate2 = dt;
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.event.dateStart= new Date(year, month, day);

        /*$scope.dt1 = new Date(year,month,day);*/
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    conversion = function(v){
        return '0'+v;
    };
    //Add Event In Database
    $scope.createEvent = function(){
        console.log("in create Event");
        var startDate = $scope.event.dateStart;
        var endDate = $scope.event.dateEnd;
        var sdMonth = startDate.getMonth()+1; if(sdMonth<10){ sdMonth= conversion(sdMonth)}
        var sdDate = startDate.getDate(); if(sdDate<10){ sdDate = conversion(sdDate)}
        var sd = startDate.getFullYear()+"-"+sdMonth+"-"+sdDate;

        var edMonth = endDate.getMonth()+1; if(edMonth<10){ edMonth= conversion(edMonth)}
        var edDate = endDate.getDate(); if(edDate<10){ edDate = conversion(edDate)}
        var ed = endDate.getFullYear()+"-"+edMonth+"-"+edDate;
        console.log(sd);
        console.log(ed);
        $scope.event.dateStart = sd;
        $scope.event.dateEnd = ed;

        $scope.t = $scope.schedules;
        for(var i=0;i<$scope.t.length;i++){
            var d = $scope.t[i].date;
            var dMonth = d.getMonth()+1; if(dMonth<10){ dMonth= conversion(dMonth)}
            var dDate = d.getDate(); if(dDate<10){ dDate = conversion(dDate)}
            var convertedDate = d.getFullYear()+"-"+dMonth+"-"+dDate;
            $scope.t[i].date = convertedDate;
            var st = $scope.t[i].startTime;
            var hrs = st.getHours();
            if(hrs<10){
                hrs = conversion(hrs)
            }
            var mins = st.getMinutes();
            if(mins<10){
                mins=conversion(mins)
            }
            var secs = "00";
            var convertedStartTime = hrs+":"+mins+":"+secs;
            $scope.t[i].startTime = convertedStartTime;
            /*console.log("time is"+hrs+":"+mins+":"+secs);*/
            var et = $scope.t[i].endTime;
            var hrs1 = et.getHours();
            if(hrs1<10){
                hrs1 = conversion(hrs1)
            }
            var mins1 = st.getMinutes();
            if(mins1<10){
                mins1=conversion(mins1)
            }
            var secs1 = "00";
            var convertedEndTime = hrs1+":"+mins1+":"+secs1;
            $scope.t[i].endTime = convertedEndTime;
        }
        $scope.event.schedule = $scope.t;
        $scope.event.performer = $scope.performers;
        var album = {
            albumName : $scope.event.eventName,
            photoCollection : $scope.photos
        };
        $scope.event.album = album;
        $scope.event.tickettype = $scope.tickettype;
        //availableSeats
        for(var x=0;x<$scope.event.tickettype.length;x++){
            $scope.event.tickettype[x].availableSeats=$scope.event.tickettype[x].maxCapacity;
        }
        $scope.event.contact = $scope.contact;
        $scope.event.status = "In Progress";
        $scope.event.userId = $rootScope.idOfUser;
        console.log($scope.event);
        var eventString = $scope.event;
        $scope.createEventURL="http://din51002665:8181/EventManagement/createEvent";
        $http.post($scope.createEventURL,angular.toJson(eventString)).then(function(){
            //alert("Event Added Successfully!!")
            $scope.createEventSuccess();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 5000);
        },function(){
            //alert("Event is not created!!")
            $scope.createEventFail();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 2000);
        });
    }

});

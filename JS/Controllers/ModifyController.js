/**
 * Created by ppaidi on 1/28/2016.
 */
EventApp.controller('ModifyController',function($scope,$rootScope,SearchService,$http,Flash){

    $scope.timeFormat=function(t){
        if (t!=undefined){
            return new Date(1999, 0, 1, t.split(':')[0], t.split(':')[1], 0)
        }

        // return new Date( dat.split('-')[0], dat.split('-')[1], dat.split('-')[2]);
    };

    $scope.dateFormat=function(d){
        console.log(d);
        if (d!=undefined){
            return new Date( d.split('-')[0], d.split('-')[1], d.split('-')[2]);
        }

    };



    $scope.modifySuccess = function () {
        var message = '<strong>Event Modified Successfully!!</strong>';
        Flash.create('success', message);
    };


    //To Find Event to modify
    $scope.modifyEventUrl = "http://din51002665:8181/EventManagement/findEvent?eventId="+$rootScope.modifyEventId;

    SearchService(callbackForModifyEvent,$scope.modifyEventUrl);
        function callbackForModifyEvent(data){
            console.log("IN CALL BACK");
            $scope.event = data;
            console.log($scope.event);


        $scope.schedules = $scope.event.schedule;
        $scope.addSchedule = function(){
            var newSchedule = $scope.schedules.length+1;
            $scope.schedules.push({});
        }
        $scope.removeSchedule = function(){
            var lastSchedule = $scope.schedules.length-1;
            $scope.schedules.splice(lastSchedule);
        }

        //For Performers
        $scope.performersNew = $scope.event.performer;
        $scope.addPerformer = function(){
            var newPerformer = $scope.performers.length+1;
            $scope.performers.push({});
        }
        $scope.removePerformer = function(){
            var lastPerformer = $scope.performers.length-1;
            $scope.performers.splice(lastPerformer);
        }

        //Album Photos
        //$scope.photos = $scope.event.photoCollection;
        $scope.photosNew = $scope.event.album.photoCollection;
        $scope.addPhoto = function(){
            var newPhoto = $scope.photos.length+1;
            $scope.photos.push({});
        }
        $scope.removePhoto = function(){
            var lastPhoto = $scope.photos.length-1;
            $scope.photos.splice(lastPhoto);
        }

        //Tickets
        $scope.tickettype = $scope.event.tickettype;
        $scope.addTicketType = function(){
            var newTicketType = $scope.tickettype.length+1;
            $scope.tickettype.push({});
        }
        $scope.removeTicketType = function(){
            var lastTicketType = $scope.tickettype.length-1;
            $scope.tickettype.splice(lastTicketType);
        }

        //Contact
        $scope.contact = $scope.event.contact;
        $scope.addContact = function(){
            var newContact = $scope.contact.length+1;
            $scope.contact.push({});
        }
        $scope.removeContact = function(){
            var lastContact = $scope.contact.length-1;
            $scope.contact.splice(lastContact);
        }
    }

    $scope.today = function() {
        $scope.dt = new Date();
        $scope.dt1 = new Date();
        $scope.dt2 = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
        $scope.dt1 = null;
        $scope.dt2 = null;
    };


    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    //$scope.toggle=function() {
    //    $scope.minDate = new Date();
    //    $scope.maxDate = new Date(2020, 5, 22);
    //}


    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function(dt) {
        $scope.minDate2 = $scope.event.dateStart;
        $scope.popup2.opened = true;
    };

    $scope.open3 = function() {
        $scope.popup3.opened = true;
    };


    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
        $scope.dt1 = new Date(year,month,day);
        $scope.dt2 = new Date(year,month,day);
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.popup3 = {
        opened: false
    };


    conversion = function(v){
        return '0'+v;
    };
    $scope.modifyEvent =function(){
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
        $scope.event.performer = $scope.performersNew;
        var album = {
            albumName : $scope.event.eventName,
            photoCollection : $scope.photosNew
        }
        $scope.event.album = album;
        $scope.event.tickettype = $scope.tickettype;
        $scope.event.contact = $scope.contact;
        $scope.event.status = "In Progress";
        $scope.event.userId = $rootScope.idOfUser;
        console.log("modifying event")
        console.log($scope.event);
        $scope.event.eventId = null;
        $scope.modifyEventURLNew="http://din51002665:8181/EventManagement/modifyEvent?eventId="+$rootScope.modifyEventId;
        $http.post($scope.modifyEventURLNew,angular.toJson($scope.event)).then(function(){
            //alert("Film Modified Successfully!!")
            $scope.modifySuccess();
            $scope.LoginError = false;
            setTimeout(function() {
                $('#loginErrorDiv').fadeOut('fast');
            }, 5000);
        });
    };

});

/**
 * Created by utanelan on 1/20/2016.
 */
EventApp.controller('BookingPageController',function($scope,$state,$location,$stateParams,$rootScope,$http,$window){
    /*if($rootScope.isLogged==false){
        $location.path('/home')
    }*/


    $scope.isLogged = $rootScope.isLogged;
    /*console.log("IN BOOKING PAGE CONTROLLER");*/
    $rootScope.currentLocation = $location.path();
    $scope.payNow= function(){
        if(!$scope.isLogged){
            $state.go('login')
        }
        else{
            $scope.bookingObject={};
            $scope.bookingObject.userId = $rootScope.idOfUser;
            $scope.bookingObject.eventId = $scope.detailedEvent.eventId;
            $scope.bookingObject.ticketId = $scope.ticketId;
            $scope.bookingObject.noOfTickets = $scope.noOfTickets;
            console.log($scope.bookingObject);

            $scope.payNowURL = "http://din51002665:8181/EventManagement/bookTicket";
            $http.post($scope.payNowURL,angular.toJson($scope.bookingObject)).then(function(resp){
               console.log(resp.data);
               callbackA(resp.data)
           });
            /*$http.post($scope.payNowURL,angular.toJson($scope.bookingObject)).then(function(resp){
                console.log(resp);
                $window.location.href=resp;
            })*/
            function callbackA(data){
                console.log(data);
                $window.location.href=data.url;
            }
        }
        /*console.log("PAY NOW METHOD");*/
    };
    $scope.detailedEvent = $rootScope.detailedEvent;
    $scope.selectedTicketType='';
    $scope.ticketCount='';
    $scope.getAmount = function(selectedTicketType,ticketCount){
        var l = $scope.detailedEvent.tickettype.length;
        console.log("-------");
        console.log($scope.detailedEvent);

        $scope.noOfTickets = ticketCount;
        for(var j=0; j<l;j++){
            if($scope.detailedEvent.tickettype[j].ticketType===selectedTicketType){
                /*console.log("before price");*/
                console.log("atickets");
                $scope.ticketId = $scope.detailedEvent.tickettype[j].ticketId;
                $scope.availableTickets =$scope.detailedEvent.tickettype[j].availableSeats;
            }
        }

        for(var i=0; i<l;i++){
            if($scope.detailedEvent.tickettype[i].ticketType===selectedTicketType){
                /*console.log("before price");*/
                var price = $scope.detailedEvent.tickettype[i].price;
                $rootScope.amount = price*ticketCount;
            }
        }
    };





});
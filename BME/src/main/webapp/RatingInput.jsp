<!doctype html>
<html ng-app>
  <head>
   
    
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>
<!-- <script src="http://localhost:9999/Day-Apr-21-Spring-JPA/ActorScript.js"></script>  -->
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.js"></script>
     
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src ="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> </script>
 
 
 <script>
 
 function UserController($scope, $http)
 {
 	$scope.actor = {};

 	$scope.createActor = function() 
 	{
 		$scope.datepattern="YYYY-MM-DD";
 		$http({
 			method: 'POST',
 			url: 'http://localhost:9998/BME/saveRating',
 			headers: {'Content-Type': 'application/json'},
 			data:  $scope.rating
 		}).success(function (data) 
 				{
 			$scope.status=data;
 				});
 	};
 }
 
 </script>
 
 
  </head>
 
  <body>
    


  
  
  
  <form name="aForm" ng-controller="UserController" ng-submit="createActor()" class="form-horizontal" align="right">

<fieldset>

<!-- Form Name -->
<legend>Add Rating</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">User Id</label>  
  <div class="col-md-4">
  <input id="textinput" name="userId" type="text" class="form-control input-md" required="" ng-model="rating.userId">
    
  </div>
</div>
<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Event Id</label>  
  <div class="col-md-4">
  <input id="textinput" name="eventId" type="text"  class="form-control input-md" required="" ng-model="rating.eventId">

  </div>
</div>

<label class="col-md-4 control-label" for="textinput">Rating</label>  
<div class="col-md-4">
  <select id="selectbasic" name="rating" class="form-control" ng-model="rating.rating">
      <option value="Like">Like</option>
      <option value="Dislike">Dislike</option>
     
    </select>
    
  </div>




<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for=""></label>
  <div class="col-md-4">
   <button class="btn btn-primary">Submit</button>
  </div>
</div>
<label >{{status}}</label>
</fieldset>

</form>
  

  </body>
  
 
</html>
<!doctype html>
<html ng-app>
  <head>
   
    
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>
  
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.js"></script>
     
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src ="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> </script>
  
  <script>
  
  function SearchActorController($scope, $http)
  {
  	$scope.fname;
  	
  	$scope.searchActor= function() 
  	{
  		$http.get('http://localhost:9998/BME/showLikes'+'?likes='+$scope.fname).success(function (data) {
  			console.log("Received");
  			$scope.status=data;
  			
  		});
  	};
  }
  
  
  </script>
  
  
  </head>
<body>
<form class="form-horizontal" ng-controller="SearchActorController" ng-submit="searchActor()">
<fieldset>

<!-- Form Name -->
    
<legend>Total No Of Likes</legend>


<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Event Id</label>  
  <div class="col-md-4">
  <input id="textinput" name="likes" type="text"  class="form-control input-md" required="" ng-model="fname">
    
  </div>
</div>
<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for=""></label>
  <div class="col-md-4">
    <button id="" name="" class="btn btn-primary">Submit</button>
  </div>
</div>


&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
<label >{{status}}</label>

</fieldset>
</form>
</body>
</html>

       // create the module and name it scotchApp
       var scotchApp = angular.module('scotchApp', ['ngRoute']);

       // configure our routes
       scotchApp.config(function($routeProvider) {
              $routeProvider

                     // route for the home page
                     .when('/', {
                           templateUrl : 'pages/home.html',
                           controller  : 'mainController'
                     })

                     // route for the about page
                     .when('/AddActor', {
                           templateUrl : 'pages/AddActor.html',
                           controller  : 'AddActorController'
                     })
                  // route for the about page
                  .when('/AddMovie', {
                      templateUrl : 'pages/AddMovie.html',
                      controller  : 'AddMovieController'
                  })

                     // route for the contact page
                     .when('/SearchActor', {
                           templateUrl : 'pages/SearchActor.html',
                           controller  : 'SearchActorByNameController'
                     })
                           // route for the contact page
                    
                     
                     .when('/searchFilmByActor', {
                           templateUrl : 'pages/searchFilmByActor.html',
                           controller  : 'searchFilmByActorController'
                     })
                     .when('/searchFilmByCategory', {
                           templateUrl : 'pages/searchFilmByCatergory.html',
                           controller  : 'searchFilmByCategoryController'
                     })
                      .when('/searchFilmByLanguage', {
                           templateUrl : 'pages/searchFilmByLanguage.html',
                           controller  : 'searchFilmByLanguageController'
                     })
                      .when('/searchFilmByReleaseYear', {
                           templateUrl : 'pages/searchFilmByReleaseYear.html',
                           controller  : 'searchFilmByReleaseYearController'
                     })
                      .when('/searchFilmByRating', {
                           templateUrl : 'pages/searchFilmByRating.html',
                           controller  : 'searchFilmByRatingController'
                     })
                      .when('/searchFilmByTitle', {
                           templateUrl : 'pages/searchFilmByTitle.html',
                           controller  : 'searchFilmByTitleController'
                     })
                  .when('/UpdateActor', {
                      templateUrl : 'pages/updateActor.html',
                      controller  : 'UpdateActorController'
                  })
                  .when('/RemoveActor', {
                      templateUrl : 'pages/RemoveActor.html',
                      controller  : 'RemoveActorController'
                  })

                  .when('/UpdateFilm', {
                      templateUrl : 'pages/UpdateFilm.html',
                      controller  : 'UpdateFilmController'
                  })
                  .when('/RemoveFilm', {
                      templateUrl : 'pages/RemoveFilm.html',
                      controller  : 'RemoveFilmController'
                  })
       });

       // create the controller and inject Angular's $scope
       scotchApp.controller('mainController', function($scope) {
              // create a message to display in our view
              $scope.message = 'A Dream Project';
       });

       scotchApp.controller('AddActorController', function($scope) {
              $scope.message = ' Add Actor ';
       });
       scotchApp.controller('AddMovieController', function($scope) {
           $scope.message = ' Add Movie ';
       });
       scotchApp.controller('UpdateActorController', function($scope) {
           $scope.message = ' Update Actor ';
       });
       scotchApp.controller('RemoveActorController', function($scope) {
           $scope.message = ' Remove Actor ';
       });
       scotchApp.controller('UpdateFilmController', function($scope) {
           $scope.message = ' Update Film ';
       });
       scotchApp.controller('RemoveFilmController', function($scope) {
           $scope.message = ' Remove Film ';
       });

       scotchApp.controller('SearchActorByNameController', function($scope) {
              $scope.message = 'Search Actor By Name';
       });
       
       scotchApp.controller('searchFilmByTitleController', function($scope) {
              $scope.message = 'Contact us! . This is just a demo.';
       });
       
       scotchApp.controller('searchFilmByActorController', function($scope) {
              $scope.message = 'Contact us! . This is just a demo.';
       });
       scotchApp.controller('searchFilmByCategoryController', function($scope) {
              $scope.message = 'Search Film By Category';
       });
       scotchApp.controller('searchFilmByLanguageController', function($scope) {
           $scope.message = 'Contact us! . This is just a demo.';
    });
       scotchApp.controller('searchFilmByReleaseYearController', function($scope) {
           $scope.message = 'Contact us! . This is just a demo.';
    });
       scotchApp.controller('searchFilmByRatingController', function($scope) {
           $scope.message = 'Contact us! . This is just a demo.';
    });
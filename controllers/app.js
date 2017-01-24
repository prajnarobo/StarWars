var myApp = angular.module("starWarsApp", ["ngRoute"])
.run(function($rootScope){
    $rootScope.isNavBarVisible = false;
    $rootScope.tabsData = [
        { name: "films", path: "#/films", logo: "assets/img/topics/films_normal.png", hoverLogo: "assets/img/topics/films_pressed.png" },
        { name: "species", path: "#/species", logo: "assets/img/topics/species_normal.png", hoverLogo: "assets/img/topics/species_pressed.png" },
        { name: "planets", path: "#/planets", logo: "assets/img/topics/planets_normal.png", hoverLogo: "assets/img/topics/planets_pressed.png" },
        { name: "people", path: "#/people", logo: "assets/img/topics/characters_normal.png", hoverLogo: "assets/img/topics/characters_pressed.png" },
        { name: "starships", path: "#/starships", logo: "assets/img/topics/droids_normal.png", hoverLogo: "assets/img/topics/droids_pressed.png" },
        { name: "vehicles", path: "#/vehicles", logo: "assets/img/topics/vehicles_normal.png", hoverLogo: "assets/img/topics/vehicles_pressed.png" }
    ];
})
.factory("listPageService", function($http, $location){
   return {
       getListData : function(){
           console.log("Path - " + $location.path());
           return $http.get("http://swapi.co/api" + $location.path()).then(function (response) {
               console.log("Result - " + response.data);
               return response.data;
           })
       }
   }
})
.factory("detailsPageService", function($http, $rootScope, $route){
   return {
       getDetailsData : function(){
           var detailsResponse = $rootScope.detailsData;
           var details = {
               imgSrc: "../assets/img/notfoundSW.jpg",
               name: "",
               data: {}
           };
           switch($route.current.params.type)
           {
                case "films" : details.name = detailsResponse.title;
                   details.data.Opening_Crawl = detailsResponse.opening_crawl;
                   details.data.Director = detailsResponse.director;
                   details.data.Producer = detailsResponse.producer;
                   details.data.Characters = detailsResponse.characters;
                   details.data.Planets = detailsResponse.planets;
                   details.data.Species = detailsResponse.species;
                   details.data.Starships = detailsResponse.starships;
                   details.data.Vehicles = detailsResponse.vehicles;
                   break;
                   
                case "species" : details.name = detailsResponse.name;
                   details.data.Classification = detailsResponse.classification;
                   details.data.Designation = detailsResponse.designation;
                   details.data.Language = detailsResponse.language;
                   details.data.Average_Height = detailsResponse.average_height;
                   details.data.Average_Lifespan = detailsResponse.average_lifespan;
                   details.data.Skin_Color = detailsResponse.skin_colors;
                   details.data.Hair_Color = detailsResponse.hair_colors;
                   details.data.Characters = detailsResponse.people; 
                   details.data.Films = detailsResponse.films; 
                   break;
                   
                case "planets" : details.name = detailsResponse.name;
                   details.data.Rotation_Period = detailsResponse.rotation_period;
                   details.data.Orbital_Period = detailsResponse.orbital_period;
                   details.data.Diameter = detailsResponse.diameter;
                   details.data.Surface_Water = detailsResponse.surface_water;
                   details.data.Films = detailsResponse.films;
                   details.data.Residents = detailsResponse.residents;
                   break;
                   
                case "people" : details.name = detailsResponse.name;
                   details.data.Birth_Year = detailsResponse.birth_year;
                   details.data.Height = detailsResponse.height;
                   details.data.Mass = detailsResponse.mass;
                   details.data.Species = detailsResponse.species;
                   details.data.Films = detailsResponse.films;
                   break;
                   
                case "starships" : details.name = detailsResponse.name;
                   details.data.Model = detailsResponse.model;
                   details.data.Starship_Class = detailsResponse.starship_class;
                   details.data.Manufacturer = detailsResponse.manufacturer;
                   details.data.Cost = detailsResponse.cost_in_credits;
                   details.data.Length = detailsResponse.length;
                   details.data.Crew = detailsResponse.crew;
                   details.data.Passengers = detailsResponse.passengers;
                   details.data.Films = detailsResponse.films; 
                   details.data.Pilots = detailsResponse.pilots; 
                   break;
                   
               case "vehicles" : details.name = detailsResponse.name;
                   details.data.Model = detailsResponse.model;
                   details.data.Class = detailsResponse.vehicle_class;
                   details.data.Manufacturer = detailsResponse.manufacturer;
                   details.data.Cost = detailsResponse.cost_in_credits;
                   details.data.Length = detailsResponse.length;
                   details.data.Crew = detailsResponse.crew;
                   details.data.Passengers = detailsResponse.passengers;
                   details.data.Films = detailsResponse.films;
                   break;
           }
           
           
               return $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyCKER-MMdjjmtlRNA_9QX7x_kHL7f07qVw&cx=000151646051229800399:8kz0uivdlxa&q=" + (detailsResponse.name || detailsResponse.title)  + "&imgSize=large&num=1&fileType=jpg").then(function(response){
                   console.log($route.current.params.type);
                   
                   details.imgSrc = response.data.items[0].pagemap.cse_image[0].src;
                   console.log("Details Image Data - " + detailsResponse.imgSrc);
                   return details;
               },
               function(response){
                   console.log($route.current.params.type);
                   //details.imgSrc = "../assets/img/notfoundSW.jpg";
                   return details;
               });
       }
   }
})
.config(function ($routeProvider, $locationProvider){
                      $routeProvider.caseInsensitiveMatch = true;
                       $routeProvider
                           .when("/home", {
                           templateUrl: "templates/home.html",
                           controller: "homeController",
                           controllerAs: "homeCtrl"
                       })
                           .when("/films", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl",
                           resolve: {
                                listData: function(listPageService){
                                    return listPageService.getListData();
                                }
                            }
                       })
                           .when("/species", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl",
                           resolve: {
                                listData: function(listPageService){
                                    return listPageService.getListData();
                                }
                            }
                       })
                           .when("/planets", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl",
                           resolve: {
                                listData: function(listPageService){
                                    return listPageService.getListData();
                                }
                            }
                       })
                           .when("/people", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl",
                           resolve: {
                                listData: function(listPageService){
                                    return listPageService.getListData();
                                }
                            }
                       })
                           .when("/starships", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl",
                           resolve: {
                                listData: function(listPageService){
                                    return listPageService.getListData();
                                }
                            }
                       })
                           .when("/vehicles", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl",
                           resolve: {
                                listData: function(listPageService){
                                    return listPageService.getListData();
                                }
                            }
                       })
                           .when("/details/:type", {
                           templateUrl: "templates/details.html",
                           controller: "detailsController",
                           controllerAs: "detailsCtrl",
                           resolve: {
                                detailsData: function(detailsPageService){
                                    return detailsPageService.getDetailsData();
                                }
                            }
                       })
                           .otherwise({
                           redirectTo: "/home"
                       })
                       //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
                   })
.controller("navBarController", function($scope, $location) {
            $scope.isNavBarActive = function (viewLocation) {
                //console.log("viewLocation : " + viewLocation + "path : " + $location.path());
                //return (("/" + viewLocation) === $location.path()); 
                return ($location.path().includes(viewLocation)); 
            };
})
.controller("homeController", function () {
   
})
.controller("listController", function($scope, $http, $location, $rootScope, listData){
    $rootScope.isNavBarVisible = true;
    $scope.path = $location.path();
    console.log($rootScope.isNavBarVisible);
    
    if(listData && listData.results){
        $scope.listData = listData.results;
        $scope.nextUrl = listData.next;
        $scope.prevUrl = listData.previous;
        
        console.log("nextUrl - " + $scope.nextUrl);
        console.log("prevUrl - " + $scope.prevUrl);
    }
    
    $scope.setDetailsData = function(selectedItemDetails){
        $rootScope.detailsData = selectedItemDetails;
    };
    
    $scope.getPreviousListData = function () {
        console.log($scope.prevUrl);
        $http.get($scope.prevUrl).then(successCallback, errorCallback);
    };

    $scope.getNextListData = function () {
        console.log($scope.nextUrl);
        $http.get($scope.nextUrl).then(successCallback, errorCallback);
    };
})
.controller("detailsController", function($scope, $http, $location, $rootScope, detailsData){
    $rootScope.isNavBarVisible = true;
    $scope.path = $location.path();
    
    var detailsArray = [];

     if (detailsData && detailsData.data) {
            $rootScope.detailsData = detailsData;
            //var item;
            //for (item in detailsData.data) {
            //    if (typeof detailsData.data[item] === 'string' || typeof detailsData.data[item] === 'array') {
            //        var description = {};
            //        description['key'] = item.replace("_", " ");
            //        description['value'] = detailsData[item];
            //        detailsArray.push(description);
            //    }
            //}
            //console.log(detailsArray);
            //$scope.detailslist = detailsArray;
         
            for (var item in detailsData.data) {
                console.log(typeof detailsData.data[item]);
                
                var description = {};
                description['key'] = item.replace("_", " ");
                description['value'] = detailsData.data[item];
                detailsArray.push(description);
            }
            console.log(detailsArray);
            $scope.detailslist = detailsArray;
         
         console.log($rootScope.detailsData);
         //console.log(detailsData.data);
         //$scope.detailslist = detailsData.data;
        }
})
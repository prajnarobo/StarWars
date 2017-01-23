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
.factory("detailsPageService", function($http, $location, $rootScope){
   return {
       getDetailsData : function(){
               var detailsResponse = $rootScope.detailsData;
               return $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyBisQfBBU8MfZrAmOb71VQ89OG9TC969E0&cx=003815258484784381351:ma5agjqx0mi&q=" + (detailsResponse.name || detailsResponse.title)  + "&imgSize=large&num=1&fileType=jpg").then(function(response){
                   detailsResponse.imgSrc = response.data.items[0].pagemap.cse_image[0].src;
                   console.log("Details Image Data - " + detailsResponse.imgSrc);
                   return detailsResponse;
               },
               function(response){
                   detailsResponse.imgSrc = "../assets/img/notfoundSW.jpg";
                   return detailsResponse;
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
                           .when("/details", {
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

     if (detailsData) {
            $rootScope.detailsData = detailsData;
            var item;
            for (item in detailsData) {
                if (typeof detailsData[item] === 'string') {
                    var description = {};
                    description['key'] = item.replace("_", " ");
                    description['value'] = detailsData[item];
                    detailsArray.push(description);
                }
            }
            console.log(detailsArray);
            $scope.detailslist = detailsArray;
        }
})

let app = angular.module('myApp', ["ngRoute"]);
// config routes

app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            // this is a template
            templateUrl: 'pages/login/login.html',
            controller : 'loginController as logCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi 
        .when('/Map', {
            templateUrl: 'pages/Map/Map.html',
            controller : 'MapController as mapCtrl'
        })
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .when('/main', {
            templateUrl: 'pages/main/main.html',
            controller : 'mainController as mainCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as regCtrl'
        })
        .when('/favorite', {
            templateUrl: 'pages/favorite/favorite.html',
            controller : 'favoriteController as favoriteCtrl'
        })
        .when('/forgot', {
            templateUrl: 'pages/forgot/forgot.html',
            controller : 'forgotController as forgotCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });

});


// custom service
app.service('myService',  function($http , $window ) {
    this.UpdateNumFavorite =  function()
    {
        $http(
            {method : "GET",
             url : "http://localhost:3000/private/getFavoritesCount/"+$window.sessionStorage.getItem("Username") , 
             headers : {
             "Authorization" : $window.sessionStorage.getItem("Token")
            }
            }).then(function mySuccess(response) { 
                alert(response.data.length);               
                return response.data.length;
            },
            function myError(response) { });
    }
})

function LogOut()
{
       document.getElementById("MenuFavorite").style = "visibility: hidden;"
       document.getElementById("MenuHome").style = "visibility: hidden;"
       document.getElementById("MenuLogIn").style = "visibility: visible;"
       document.getElementById("LogOutbut").style = "visibility: hidden;"
       document.getElementById("LogOutlbl").innerHTML = "Hello guest";
       document.getElementById("MenuRegister").style = "visibility: visible;"


       window.sessionStorage.removeItem("Username");
       window.sessionStorage.removeItem("Token");
       window.location.href = '#!'

}
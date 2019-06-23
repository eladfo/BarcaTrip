// login controller
angular.module("myApp")
.controller("loginController", function ($scope, $http , $window) {
    self = this;


    /*
    let serverUrl = "http://localhost:3000/"

    self.login = function()
    {
        $http({
            method : "POST",
            url : serverUrl + "LogIn",
            data : {Username:"alonts", Password:"123"}
        }).then(function success(response){
            console.log("LogIn successful!")
        }, function failed(response) {
            console.log("LogIn failed!")
        });
    }
    */

   $scope.LogIn = function() 
   {
       $scope.Username = "alonts"; //need to change to the real name of the user!
       $window.sessionStorage.setItem("Username","alonts");
       document.getElementById("MenuFavorite").style = "visibility: visible;";
       document.getElementById("MenuHome").style = "visibility: visible;"
       document.getElementById("MenuLogIn").style = "visibility: hidden;"
       document.getElementById("MenuRegister").style = "visibility: hidden;"
       
       document.getElementById("LogOutbut").style = "visibility: visible;"
       document.getElementById("LogOutlbl").innerHTML = "Hello " + $scope.Username;


       $window.sessionStorage.setItem("Token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsb250cyIsImlhdCI6MTU2MDg2ODc5MSwiZXhwIjoxNTYwOTU1MTkxfQ.gLs0t03HPa9b8FFT48jv5-bfbDrmvQ2Hx2TtntvZ7J8");
       $scope.UpdateNumOfFavorite();
       $window.location.href = '#!main'
   }

    $scope.UpdateNumOfFavorite = function()
    {
        $http({method : "GET",
        url : "http://localhost:3000/private/getFavoritesCount/"+$window.sessionStorage.getItem("Username") , 
        headers : {
        "Authorization" : $window.sessionStorage.getItem("Token")
        }
        }).then(function mySuccess(response) {
        document.getElementById("numbernoti").innerHTML = response.data.length;
        } ,
        function myError(response) {
        });
    }
});

///http://127.0.0.1:5500/index.html#!/



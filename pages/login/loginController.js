// login controller
angular.module("myApp")
.controller("loginController", function ($scope, $http , $window) {
   
   let serverUrl = "http://localhost:3000/"

   $scope.LogIn = function() 
   {
        let userJsn = {
            "Username":$scope.username,
            "Password":$scope.password
        };

        $http({
            method: 'POST',
            url: serverUrl + "login",
            data: userJsn
        }).then(function (success) {
            $scope.token = success.data;
            document.getElementById("MenuFavorite").style = "visibility: visible;";
            document.getElementById("MenuHome").style = "visibility: visible;"
            document.getElementById("MenuLogIn").style = "visibility: hidden;"
            document.getElementById("MenuRegister").style = "visibility: hidden;"
            document.getElementById("LogOutbut").style = "visibility: visible;"
            document.getElementById("LogOutlbl").innerHTML = "Hello " + $scope.username;
            $window.sessionStorage.setItem("Token", $scope.token);
            $scope.UpdateNumOfFavorite(userJsn.Username);
            $window.location.href = '#!main'
        }, function (error) {
            alert(error.data.err);
        });      
   }

    $scope.UpdateNumOfFavorite = function(Username)
    {
        $http({method : "GET",
        url : "http://localhost:3000/private/getFavoritesCount/"+$window.sessionStorage.getItem(Username) , 
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




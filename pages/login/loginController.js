// login controller
angular.module("myApp")
.controller("loginController", function ($scope, $http , $window) {

    let serverUrl = "http://localhost:3000/"

    $http({
        method : "GET",
        url : "http://localhost:3000/getRandomPOI/0.5"
    }).then(function mySuccess(response)
    {
        $scope.favorite = new Array();
        $scope.favorite[0] ={Name: response.data.res1.Name , Picture: response.data.res1.Picture };
        $scope.favorite[1] ={Name: response.data.res2.Name , Picture: response.data.res2.Picture };
        $scope.favorite[2] ={Name: response.data.res3.Name , Picture: response.data.res3.Picture };
    } ,
    function myError(response) {
        alert(response.data) 
    });

    
    $scope.ImgClick = function(pic)
    {    
        $scope.Res = pic.IsFavorite;
        if($scope.isConecting)
            $scope.updateFavorite();

        $http.get('http://localhost:3000/getPOIByName/'+pic.Name).then(function(response)
        {
            $scope.id = response.data[0].ID ;      
            $scope.title = response.data[0].Name ; 
            $scope.users = response.data[0].Num_of_Users ; 
            $scope.desc = response.data[0].Description ;
            $scope.img = response.data[0].Picture ; 
            $scope.rank = response.data[0].Rank ;               
            $scope.tableVis = false;     
               
            $http.get('http://localhost:3000/increaseWatchPOI/'+$scope.id).then(function(response)
            {
                $http.get('http://localhost:3000/getLastReviews/'+$scope.id).then(function(response)
                {
                    $scope.reviews = new Array();
                    for(i=0 ; i<Object.keys(response.data).length ; i++)
                    {
                        $scope.reviews[i] = {Date:response.data[i].Date, Review: response.data[i].Review ,Rank: response.data[i].Rank };
                    }             
                    if(Object.keys(response.data).length != 0)
                        $scope.tableVis = true;  
                });  
            });
            document.getElementById('id01').style.display='block'
        });
    }



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
            $window.sessionStorage.setItem("Username", userJsn.Username);
            $scope.UpdateNumOfFavorite(userJsn.Username);
            $window.location.href = '#!main'
        }, function (error) {
            alert(error.data.err);
        });      
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




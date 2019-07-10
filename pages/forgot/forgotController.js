// forgot controller
angular.module("myApp")
.controller("forgotController", function ($scope, $http, $window) {
    
    let serverUrl = "http://localhost:3000/";

    $scope.questions = ["What is your dream car?", "Where do you want to retire?",
                        "Who was your least favorite boss?", "What's your favorite security question?"]
    
    /************/

    $scope.restorePassword = function() 
   {
        let jsn = {
            "Username":$scope.user,
            "Q":$scope.q,
            "A":$scope.ans
        };

        $http({
            method: 'POST',
            url: serverUrl + "restorePassword",
            data: jsn
        }).then(function (success) {
            $scope.pass = success.data[0].Password
        }, function (error) {
            alert(error.data.err);
        });     
   }   
});
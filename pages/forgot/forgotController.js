// forgot controller
angular.module("myApp")
.controller("forgotController", function ($scope, $http, $window) {
    
    let serverUrl = "http://localhost:3000/";
  
    $scope.user;
    $scope.q;
    $scope.ans;
    $scope.pass;

    $scope.questions = [
        {"Q":"Q1"},
        {"Q":"Q2"},
        {"Q":"Q3"}
    ];
    
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
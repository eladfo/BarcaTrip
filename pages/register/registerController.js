// register controller
angular.module("myApp")
.controller("registerController", function ($scope, $http, $window) {
    self = this;
    
    $scope.countries;
    $scope.categories;
    $scope.questions = ["What is your dream car?", "Where do you want to retire?",
                        "Who was your least favorite boss?", "What's your favorite security question?"]

    let serverUrl = "http://localhost:3000/";
    
    /** Initialze page values */
    $http({
        method: 'GET', url: serverUrl + "getPossibleCountries",
    }).then(function (success) {
        $scope.countries = success.data;
    }, function (error) {
        alert("Something went wrong :/");
    });     

    $http({
        method: 'GET', url: serverUrl + "getAllCategories",
    }).then(function (success) {
        $scope.categories = success.data;
    }, function (error) {
        alert("Something went wrong :/");
    });   

    
    /************/

    $scope.Register = function() 
   {
        var jsnCatgs = [];

        $scope.catgs.forEach(function(item)
        {
            jsnCatgs.push(item.ID);
            
        });

        let regJsn = {
            "Username":$scope.user,
            "Password":$scope.pass,
            "FirstName":$scope.firstname,
            "LastName":$scope.lastname,
            "City":$scope.city,
            "Country":$scope.country,
            "Email":$scope.email,
            "QA":[{"q":$scope.q1, "a":$scope.answer1},{"q":$scope.q2, "a":$scope.answer2},{"q":$scope.q3, "a":$scope.answer3}],
            "Categories": jsnCatgs
        };
        
        console.log(regJsn);

        $http({
            method: 'POST',
            url: serverUrl + "signUp",
            data: regJsn
        }).then(function (success) {
            alert(success.data.err)
            $window.location.href = '#!main'
        }, function (error) {
            alert(error.data.err);
            console.log(error);
        });     
   }   
});
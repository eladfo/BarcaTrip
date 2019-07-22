// register controller
angular.module("myApp")
.controller("registerController", function ($scope, $http, $window) {
    self = this;
    
    $scope.countries;
    $scope.categories;
    $scope.questions = ["What is your dream car?", "Where do you want to retire?",
                        "Who was your least favorite boss?", "What is your favorite security question?"];


    $scope.firstname = "";
    $scope.lastname = "";
                        
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

    
    $scope.Register = function() 
   {
        // var jsnCatgs = [];

        // $scope.catgs.forEach(function(item)
        // {
        //     jsnCatgs.push(item.ID);
            
        // });

        $scope.categories.forEach(function(item)
        {
            if($scope.catg1 == item.Name){
                $scope.catg1 = item.ID;   
                return;
            }     
        });

        $scope.categories.forEach(function(item)
        {
            if($scope.catg2 == item.Name){
                $scope.catg2 = item.ID;   
                return;
            }     
        });


        let regJsn = {
            "Username":$scope.user,
            "Password":$scope.pass,
            "FirstName":$scope.firstname,
            "LastName":$scope.lastname,
            "City":$scope.city,
            "Country":$scope.country,
            "Email":$scope.email,
            "QA":[{"q":$scope.q1, "a":$scope.answer1},{"q":$scope.q2, "a":$scope.answer2}],
            "Categories":[$scope.catg1, $scope.catg2]
        };
        
        console.log(regJsn);


        $http({
            method: 'POST',
            url: serverUrl + "signUp",
            data: regJsn
        }).then(function (success) {
            alert(success.data.err)
            $window.location.href = '#!'
        }, function (error) {
            alert(error.data.err);
            console.log(error);
        });     
   }   
});
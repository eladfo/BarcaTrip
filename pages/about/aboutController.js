// about controller
angular.module("myApp")
.controller("aboutController", function ($scope) {
    //  $scope.slideIndex = 1;
    //  var i;
    //  var x = document.getElementsByClassName("mySlides");
    //  if (1 > x.length) {$scope.slideIndex = 1}
    //  if (1 < 1) {$scope.slideIndex = x.length}
    //  for (i = 0; i < x.length; i++) {
    //     x[i].style.display = "none";  
    //  }
    //  x[$scope.slideIndex-1].style.display = "block";  


 $scope.plusDivs = function(n) {
  $scope.showDivs($scope.slideIndex += n);
}

 $scope.showDivs = function(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {$scope.slideIndex = 1}
  if (n < 1) {$scope.slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[$scope.slideIndex-1].style.display = "block";  
}


});
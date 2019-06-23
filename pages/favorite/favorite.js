// poi controller
angular.module("myApp")
.controller("favoriteController", function ($scope,$http,$window) {
    self = this;
    $scope.favoriteSrc= "EmptyStar.jpg";
    self.favorite = new Array();
    self.Saves = new Array();
    self.Sorted = new Array();
    self.HistoricFavorite = new Array();
    self.AttractionFavorite = new Array();
    self.MuseumsFavorite = new Array();
    self.RestaurantsFavorite = new Array();
    $scope.RankReview=1;

    $http.get('http://localhost:3000/getPOI_ByCategory/1').then(function(response)
    {
        $scope.myWelcome=response.data;

        $http({method : "GET",
        url : "http://localhost:3000/private/getAllFavoritePoi/"+$window.sessionStorage.getItem("Username") , 
        headers : {
        "Authorization" : $window.sessionStorage.getItem("Token")
        }
        }).then(function mySuccess(response) {
            for(i=0 ; i<Object.keys(response.data).length ; i++)
                self.favorite[i]  = response.data[i].POI_ID;
                var j=0;
                var indexHis = 0;
                var indexAttra = 0;
                var indexMuseume = 0;
                var indexResturant = 0;
                for(i=0 ; i<$scope.myWelcome.length ; i++)
                {
                    if(self.favorite.includes($scope.myWelcome[i].ID))
                    {
                        self.Saves[j] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                        j++;
                        if($scope.myWelcome[i].CategoryID == 1)
                        {
                            self.HistoricFavorite[indexHis] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                            indexHis++;
                        }
                        else if($scope.myWelcome[i].CategoryID == 2)
                        {
                            self.AttractionFavorite[indexAttra] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                            indexAttra++;
                        }
                        else if($scope.myWelcome[i].CategoryID == 3)
                        {
                            self.MuseumsFavorite[indexMuseume] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                            indexMuseume++;
                        }
                        else if($scope.myWelcome[i].CategoryID == 4)
                        {
                            self.RestaurantsFavorite[indexResturant] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                            indexResturant++;
                        }
                    } 
                }
                $scope.isHis = self.HistoricFavorite.length != 0;
                $scope.isAtt = self.AttractionFavorite.length != 0;
                $scope.isMuse = self.MuseumsFavorite.length != 0;
                $scope.isRest = self.RestaurantsFavorite.length != 0;
                $http({method : "GET",
                url : "http://localhost:3000/private/getAllFavoritePoiSort/"+$window.sessionStorage.getItem("Username") , 
                headers : {
                "Authorization" : $window.sessionStorage.getItem("Token")
                }
                }).then(function mySuccess(response) {
                    var sort=0;
                    for(i=1 ; i<=response.data.length ; i++ )
                    {
                        self.Sorted[sort] ={ID:response.data[response.data.length-i].ID ,name: response.data[response.data.length-i].Name, Picture: response.data[response.data.length-i].Picture, Rank: response.data[response.data.length-i].Rank, Num_of_Users: response.data[response.data.length-i].Description , IsFavorite:"favorite.jpg"}; 
                        sort++;
                    }

                } ,
                function myError(response) {
                });

        } ,
        function myError(response) {
        });

    });

    $scope.addReview = function()
    {
        document.getElementById(1).style = "color: orange;"
         for( j=2; j<=5 ;j++ )
             document.getElementById(j).style = "color: #aaa;"
         document.getElementById("ReviewText").value="";
         document.getElementById('id01').style.display='none';
         document.getElementById('id02').style.display='block';
    }
 
    $scope.AddDbReview = function()
    {
     
     $http({method : "POST",
     url : "http://localhost:3000/private/addPoiReview" , 
     headers : {
     'Content-Type'  : "application/json"  ,
     "Authorization" : $window.sessionStorage.getItem("Token")
     },
     data: {Username: $window.sessionStorage.getItem("Username"), POI_ID: $scope.id , Rank: $scope.RankReview , Review: document.getElementById("ReviewText").value}
     }).then(function mySuccess(response) {
         $http.get('http://localhost:3000/getLastReviews/'+$scope.id ).then(function(response){
             self.review = new Array();
             for(i=0 ; i<Object.keys(response.data).length ; i++)
                 self.review[i]   =  { Date:response.data[i].Date, Review: response.data[i].Review ,Rank: response.data[i].Rank};  
             
             if(Object.keys(response.data).length != 0)
                 $scope.tableVis = true;  
             $scope.Refresh();
             document.getElementById('id01').style.display='block';
             document.getElementById('id02').style.display='none';
             });
                        
     } ,
                 function myError(response) {
                     alert(response.data) 
     });
 
     
    }
 
    $scope.OnStar = function(i)
    {
     for( j=1; j<=i ;j++ )
         document.getElementById(j).style = "color: orange;"
     for( j=i+1; j<=5 ;j++ )
         document.getElementById(j).style = "color: #aaa;"
     
     $scope.RankReview = i ;
    }

    $scope.ImgClick = function(pic)
   {    
        //$scope.updateFavorite();
         $scope.id = pic.ID ; 
         $scope.title = pic.name ; 
         $scope.users = pic.Num_of_Users ; 
         $scope.desc = pic.Description ;
         $scope.img = pic.Picture ; 
         $scope.rank = pic.Rank ;
         $scope.Res = "favorite.jpg" ;
         $scope.tableVis = false;        
         
         $http.get('http://localhost:3000/increaseWatchPOI/'+pic.ID).then(function(response){

            $http.get('http://localhost:3000/getLastReviews/'+pic.ID).then(function(response){
            self.review = new Array();
            for(i=0 ; i<Object.keys(response.data).length ; i++)
                self.review[i]   =  { Date:response.data[i].Date, Review: response.data[i].Review,Rank: response.data[i].Rank };  
            
            if(Object.keys(response.data).length != 0)
                $scope.tableVis = true;  
            });
            
         });
         document.getElementById('id01').style.display='block'

   }


   $scope.ClickFavorite1 = function()
   {
        if($scope.Res == "favorite.jpg")
        {
            $http({method : "DELETE",
            url : "http://localhost:3000/private/removePoiFromFavorites" , 
             headers : {
                'Content-Type'  : "application/json"  ,
                'Authorization' : $window.sessionStorage.getItem("Token")            },
            data: {Username: $window.sessionStorage.getItem("Username"), poiID: $scope.id}
             }).then(function mySuccess(response) {
                $scope.updateFavorite();
            } ,
            function myError(response) { 
             alert(response.data);
             });
        } 
        //$scope.refresh($scope.id ,$scope.Res);
   }



   $scope.ClickFavorite = function(pic)
   {
            $http(
            {
            method : 'DELETE',
            url : 'http://localhost:3000/private/removePoiFromFavorites' , 
             headers : {
            'Content-Type'  : "application/json"  ,
            'Authorization' : $window.sessionStorage.getItem("Token")
            },
            data: {"Username":  $window.sessionStorage.getItem("Username") ,  "poiID" : pic.ID}
             }).then(function mySuccess(response) {
                $scope.updateFavorite(); 
           } ,
            function myError(response) { 
                      });

          
   }


   $scope.updateFavorite =  function()
   {
    self.favorite = new Array();
    self.Saves = new Array();
    self.Sorted = new Array();
    self.HistoricFavorite = new Array();
    self.AttractionFavorite = new Array();
    self.MuseumsFavorite = new Array();
    self.RestaurantsFavorite = new Array();

    $http({method : "GET",
    url : "http://localhost:3000/private/getAllFavoritePoi/"+$window.sessionStorage.getItem("Username") , 
    headers : {
    "Authorization" : $window.sessionStorage.getItem("Token")
    }
    }).then(function mySuccess(response) {
        for(i=0 ; i<Object.keys(response.data).length ; i++)
            self.favorite[i]  = response.data[i].POI_ID;
            var j=0;
            var indexHis = 0;
            var indexAttra = 0;
            var indexMuseume = 0;
            var indexResturant = 0;
            for(i=0 ; i<$scope.myWelcome.length ; i++)
            {
                if(self.favorite.includes($scope.myWelcome[i].ID))
                {
                    self.Saves[j] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                    j++;
                    if($scope.myWelcome[i].CategoryID == 1)
                    {
                        self.HistoricFavorite[indexHis] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                        indexHis++;
                    }
                    else if($scope.myWelcome[i].CategoryID == 2)
                    {
                        self.AttractionFavorite[indexAttra] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                        indexAttra++;
                    }
                    else if($scope.myWelcome[i].CategoryID == 3)
                    {
                        self.MuseumsFavorite[indexMuseume] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                        indexMuseume++;
                    }
                    else if($scope.myWelcome[i].CategoryID == 4)
                    {
                        self.RestaurantsFavorite[indexResturant] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"}; 
                        indexResturant++;
                    }
                } 
            }
            $scope.isHis = self.HistoricFavorite.length != 0;
            $scope.isAtt = self.AttractionFavorite.length != 0;
            $scope.isMuse = self.MuseumsFavorite.length != 0;
            $scope.isRest = self.RestaurantsFavorite.length != 0;
            document.getElementById("numbernoti").innerHTML = self.favorite.length;
            $http({method : "GET",
            url : "http://localhost:3000/private/getAllFavoritePoiSort/"+$window.sessionStorage.getItem("Username") , 
            headers : {
            "Authorization" : $window.sessionStorage.getItem("Token")
            }
            }).then(function mySuccess(response) {
                var sort=0;
                for(i=1 ; i<=response.data.length ; i++ )
                {
                    self.Sorted[sort] ={ID:response.data[response.data.length-i].ID ,name: response.data[response.data.length-i].Name, Picture: response.data[response.data.length-i].Picture, Rank: response.data[response.data.length-i].Rank, Num_of_Users: response.data[response.data.length-i].Description , IsFavorite:"favorite.jpg"}; 
                    sort++;
                }

            } ,
            function myError(response) {
            });

    } ,
    function myError(response) {
    });
   }

   $scope.Refresh = function()
   {
       $http.get('http://localhost:3000/getPOIByName/'+$scope.title).then(function(response){
           $scope.rank = response.data[0].Rank ;
       } ,
       function myError(response) { 
       });
   }

});

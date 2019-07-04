
// poi controller
angular.module("myApp")
.controller("mainController", function ($scope, $window,$http) {
    
    self = this;
    self.favorite = new Array();
    self.save = new Array();
    self.review = new Array();
    self.LastSaves = new Array();
    self.show = new Array();


    $scope.numberFavorite;
    $scope.RankReview=1;

    $http({method : "GET",
    url : "http://localhost:3000/private/getPopularPOI/"+$window.sessionStorage.getItem("Username") , 
    headers : {
    "Authorization" : $window.sessionStorage.getItem("Token")
    }
    }).then(function mySuccess(response) {
        self.save = response.data;
        $http({method : "GET",
        url : "http://localhost:3000/private/getAllFavoritePoi/"+$window.sessionStorage.getItem("Username") , 
        headers : {
        "Authorization" : $window.sessionStorage.getItem("Token")
        }
        }).then(function mySuccess(response) {
            $scope.numberFavorite= response.data.length;
            for(i=0 ; i<Object.keys(response.data).length ; i++)
                self.favorite[i]   =  response.data[i].POI_ID;
            
        } ,
        function myError(response) {
            alert(response.data) 
        });

    } ,
    function myError(response) {
        alert(response.data) 
    });




    $http({method : "GET",
    url : "http://localhost:3000/private/getLastFavoritePOI/"+$window.sessionStorage.getItem("Username") , 
    headers : {
    "Authorization" : $window.sessionStorage.getItem("Token")
    }
    }).then(function mySuccess(response) {
        var count=0;
        self.LastSaves = response.data;
        if(response.data.length == undefined)
        {
            $scope.NumLastFavorite = false;
        }
        else
        {
            $scope.NumLastFavorite = true;
        }

        if($scope.NumLastFavorite)
        {
        $http({method : "GET",
        url : "http://localhost:3000/getAllPOI", 
        headers : {
        "Authorization" : $window.sessionStorage.getItem("Token")
        }
        }).then(function mySuccess(response) {
            $scope.numberFavorite= response.data.length;
            
            for(j=0 ; j<Object.keys(self.LastSaves).length ; j++)
            {
                for(i=0 ; i<Object.keys(response.data).length ; i++)
                    if(self.LastSaves[j].POI_ID == response.data[i].ID && count!=2)
                    {
                        self.show[j] = response.data[i];
                        count++;
                    }
                              
                        
            }
        } ,
        function myError(response) {
            alert(response.data) 
        });
    }

    } ,
    function myError(response) {
        alert(response.data) 
    });





    $scope.ImgClick = function(pic)
    {
        if(self.favorite.includes(pic.ID))
            $scope.Res = "favorite.jpg";
        else
            $scope.Res = "EmptyStar.jpg";
        
            

          $http.get('http://localhost:3000/getPOIByName/'+pic.Name).then(function(response){
          $scope.id = response.data[0].ID ;      
          $scope.title = response.data[0].Name ; 
          $scope.users = response.data[0].Num_of_Users ; 
          $scope.desc = response.data[0].Description ;
          $scope.img = response.data[0].Picture ; 
          $scope.rank = response.data[0].Rank ;
          
 
        
          $scope.tableVis = false;        
          $http.get('http://localhost:3000/increaseWatchPOI/'+pic.ID).then(function(response){
 
             $http.get('http://localhost:3000/getLastReviews/'+pic.ID).then(function(response){
             self.review = new Array();
             for(i=0 ; i<Object.keys(response.data).length ; i++)
                 self.review[i]   =  { Date:response.data[i].Date, Review: response.data[i].Review ,Rank: response.data[i].Rank };  
             
             if(Object.keys(response.data).length != 0)
                 $scope.tableVis = true;  
             });
             
          });
          document.getElementById('id01').style.display='block';
     });
     
    }


    $scope.addReview = function(img)
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
                self.review[i]   =  { Date:response.data[i].Date, Review: response.data[i].Review , Rank: response.data[i].Rank};  
            
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
            $scope.numberFavorite=$scope.numberFavorite-1;
            document.getElementById("numbernoti").innerHTML = $scope.numberFavorite;  
            $scope.updateFavorite(); 
            $scope.updateLastFavorite();
            $scope.Res = "EmptyStar.jpg"  
            $scope.UpdateNumOfFavorite($window.sessionStorage.getItem("Username"));                     
            } ,
            function myError(response) { 
             alert(response.data);
             });

        }   
        else
        {
            $http({method : "POST",
                        url : "http://localhost:3000/private/addPoiToFavorites" , 
                         headers : {
                        "Authorization" : $window.sessionStorage.getItem("Token")
                        },
                        data: {userID: $window.sessionStorage.getItem("Username"), poiID: $scope.id}
                         }).then(function mySuccess(response) {
                $scope.numberFavorite=$scope.numberFavorite+1;
                document.getElementById("numbernoti").innerHTML = $scope.numberFavorite;  
                $scope.updateFavorite(); 
                $scope.updateLastFavorite();
                $scope.Res = "favorite.jpg"; 
                $scope.UpdateNumOfFavorite($window.sessionStorage.getItem("Username"));           
            } ,
                        function myError(response) { 
                                                   });
        }
    
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

    $scope.Refresh = function()
    {
        $http.get('http://localhost:3000/getPOIByName/'+$scope.title).then(function(response){
            $scope.rank = response.data[0].Rank ;
        } ,
        function myError(response) { 
        });
    }

    $scope.updateFavorite =  function()
    {
        self.favorite = new Array();
        $http({method : "GET",
        url : "http://localhost:3000/private/getAllFavoritePoi/"+$window.sessionStorage.getItem("Username") , 
        headers : {
        "Authorization" : $window.sessionStorage.getItem("Token")
        }
        }).then(function mySuccess(response) {
            for(i=0 ; i<Object.keys(response.data).length ; i++)
                self.favorite[i]   =  response.data[i].POI_ID;
        } ,
        function myError(response) { 
        });
    }


    $scope.updateLastFavorite =  function()
    {
        self.show = new Array();
        $http({method : "GET",
        url : "http://localhost:3000/private/getLastFavoritePOI/"+$window.sessionStorage.getItem("Username") , 
        headers : {
        "Authorization" : $window.sessionStorage.getItem("Token")
        }
        }).then(function mySuccess(response) {
            var count=0;
            self.LastSaves = response.data;
            if(response.data.length == undefined)
            {
                $scope.NumLastFavorite = false;
            }
            else
            {
                $scope.NumLastFavorite = true;
            }
    
            if($scope.NumLastFavorite)
            {
            $http({method : "GET",
            url : "http://localhost:3000/getAllPOI", 
            headers : {
            "Authorization" : $window.sessionStorage.getItem("Token")
            }
            }).then(function mySuccess(response) {
                $scope.numberFavorite= response.data.length;
                
                for(j=0 ; j<Object.keys(self.LastSaves).length ; j++)
                {
                    for(i=0 ; i<Object.keys(response.data).length ; i++)
                        if(self.LastSaves[j].POI_ID == response.data[i].ID && count!=2)
                        {
                            self.show[j] = response.data[i];
                            count++;
                        }
                                  
                            
                }
            } ,
            function myError(response) {
                alert(response.data) 
            });
        }
    
        } ,
        function myError(response) {
            alert(response.data) 
        });
    }


});
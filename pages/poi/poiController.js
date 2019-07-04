// poi controller
angular.module("myApp")
.controller("poiController", function ($scope , $http , $window ) {
    $scope.RankReview = 1;
    self = this;    
    $scope.favoriteSrc= "EmptyStar.jpg";
    $scope.numberFavorite;
    self.favorite = new Array();
    $scope.isConecting=false;
    self.Historic = new Array();
    self.Attraction = new Array();
    self.Museums = new Array();
    self.Restaurants = new Array();
    document.getElementById("MenuFavorite").style = "visibility: hidden;"


    if($window.sessionStorage.getItem("Username") != undefined)
    {
        $scope.isConecting=true;
        document.getElementById("MenuFavorite").style = "visibility: visible;"
    }
                
    if($scope.isConecting)    
    {

            $http({method : "GET",
            url : "http://localhost:3000/private/getFavoritesCount/"+$window.sessionStorage.getItem("Username") , 
            headers : {
            "Authorization" : $window.sessionStorage.getItem("Token")
            }
            }).then(function mySuccess(response) {
            $scope.numberFavorite= response.data.length;
            document.getElementById("numbernoti").innerHTML = $scope.numberFavorite;
            } ,
            function myError(response) {
                alert(response.data) 
            });
    }

    $http.get('http://localhost:3000/getPOI_ByCategory/1').then(function(response)
    {
        $scope.myWelcome=response.data;

        if($scope.isConecting)
        {
        $http({method : "GET",
        url : "http://localhost:3000/private/getAllFavoritePoi/"+$window.sessionStorage.getItem("Username") , 
        headers : {
        "Authorization" : $window.sessionStorage.getItem("Token")
        }
        }).then(function mySuccess(response) {
            for(i=0 ; i<Object.keys(response.data).length ; i++)
                self.favorite[i]   =  response.data[i].POI_ID;

                for(i=0 ; i<5 ; i++)
                {
                    if(self.favorite.includes($scope.myWelcome[i].ID))
                        self.Historic[i] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"};
                    else
                        self.Historic[i] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"EmptyStar.jpg"};
                }            
                for(i=0 ; i<5 ; i++)
                {
                    if(self.favorite.includes($scope.myWelcome[i+5].ID))
                        self.Attraction[i] ={ID:$scope.myWelcome[i+5].ID,name:$scope.myWelcome[i+5].Name, Picture: $scope.myWelcome[i+5].Picture, Rank: $scope.myWelcome[i+5].Rank, Num_of_Users: $scope.myWelcome[i+5].Num_of_Users, Description: $scope.myWelcome[i+5].Description , IsFavorite:"favorite.jpg"};
                    else
                        self.Attraction[i] ={ID:$scope.myWelcome[i+5].ID,name:$scope.myWelcome[i+5].Name, Picture: $scope.myWelcome[i+5].Picture, Rank: $scope.myWelcome[i+5].Rank, Num_of_Users: $scope.myWelcome[i+5].Num_of_Users, Description: $scope.myWelcome[i+5].Description , IsFavorite:"EmptyStar.jpg"};
                }
                for(i=0 ; i<5 ; i++)
                {
                    if(self.favorite.includes($scope.myWelcome[i+10].ID))
                         self.Museums[i] ={ID:$scope.myWelcome[i+10].ID,name:$scope.myWelcome[i+10].Name, Picture: $scope.myWelcome[i+10].Picture, Rank: $scope.myWelcome[i+10].Rank, Num_of_Users: $scope.myWelcome[i+10].Num_of_Users, Description: $scope.myWelcome[i+10].Description , IsFavorite:"favorite.jpg"};
                     else
                         self.Museums[i] ={ID:$scope.myWelcome[i+10].ID,name:$scope.myWelcome[i+10].Name, Picture: $scope.myWelcome[i+10].Picture, Rank: $scope.myWelcome[i+10].Rank, Num_of_Users: $scope.myWelcome[i+10].Num_of_Users, Description: $scope.myWelcome[i+10].Description , IsFavorite:"EmptyStar.jpg"};           
                }
                for(i=0 ; i<5 ; i++)
                {
                    if(self.favorite.includes($scope.myWelcome[i+15].ID))
                        self.Restaurants[i] ={ID:$scope.myWelcome[i+15].ID,name:$scope.myWelcome[i+15].Name, Picture: $scope.myWelcome[i+15].Picture, Rank: $scope.myWelcome[i+15].Rank, Num_of_Users: $scope.myWelcome[i+15].Num_of_Users, Description: $scope.myWelcome[i+15].Description , IsFavorite:"favorite.jpg"};
                    else
                        self.Restaurants[i] ={ID:$scope.myWelcome[i+15].ID,name:$scope.myWelcome[i+15].Name, Picture: $scope.myWelcome[i+15].Picture, Rank: $scope.myWelcome[i+15].Rank, Num_of_Users: $scope.myWelcome[i+15].Num_of_Users, Description: $scope.myWelcome[i+15].Description , IsFavorite:"EmptyStar.jpg"};
                }
        } ,
        function myError(response) { 
        });
    }
    else
    {
        for(i=0 ; i<5 ; i++)
            self.Historic[i] ={ID:$scope.myWelcome[i].ID,name:$scope.myWelcome[i].Name, Picture: $scope.myWelcome[i].Picture, Rank: $scope.myWelcome[i].Rank, Num_of_Users: $scope.myWelcome[i].Num_of_Users, Description: $scope.myWelcome[i].Description , IsFavorite:"favorite.jpg"};                 
        for(i=0 ; i<5 ; i++)  
            self.Attraction[i] ={ID:$scope.myWelcome[i+5].ID,name:$scope.myWelcome[i+5].Name, Picture: $scope.myWelcome[i+5].Picture, Rank: $scope.myWelcome[i+5].Rank, Num_of_Users: $scope.myWelcome[i+5].Num_of_Users, Description: $scope.myWelcome[i+5].Description , IsFavorite:"favorite.jpg"};
        for(i=0 ; i<5 ; i++)
            self.Museums[i] ={ID:$scope.myWelcome[i+10].ID,name:$scope.myWelcome[i+10].Name, Picture: $scope.myWelcome[i+10].Picture, Rank: $scope.myWelcome[i+10].Rank, Num_of_Users: $scope.myWelcome[i+10].Num_of_Users, Description: $scope.myWelcome[i+10].Description , IsFavorite:"favorite.jpg"};
        for(i=0 ; i<5 ; i++)
            self.Restaurants[i] ={ID:$scope.myWelcome[i+15].ID,name:$scope.myWelcome[i+15].Name, Picture: $scope.myWelcome[i+15].Picture, Rank: $scope.myWelcome[i+15].Rank, Num_of_Users: $scope.myWelcome[i+15].Num_of_Users, Description: $scope.myWelcome[i+15].Description , IsFavorite:"favorite.jpg"};       
    }
         
    });

    
    
   $scope.all = function()
   {      
       if($scope.isConecting)
       {
        $scope.updateFavorite();
       }
               
       $scope.search = true;
       $scope.myDropDown = "Search";
       self.resSearch = {}
       $http.get('http://localhost:3000/getPOIByName/'+$scope.Search).then(function(response){
        $scope.myWelcome=response.data;
       if(Object.keys(response.data).length == 1)
        {
            var namepoi = response.data[0].ID;
            if($scope.isConecting)
            {
            $http({method : "GET",
            url : "http://localhost:3000/private/getAllFavoritePoi/"+$window.sessionStorage.getItem("Username") , 
            headers : {
            "Authorization" : $window.sessionStorage.getItem("Token")
            }
            }).then(function mySuccess(response)
            {
            if(self.favorite.includes(namepoi))
                self.resSearch[0] ={ID:$scope.myWelcome[0].ID,name:$scope.myWelcome[0].Name, Picture: $scope.myWelcome[0].Picture, Rank: $scope.myWelcome[0].Rank, Num_of_Users: $scope.myWelcome[0].Num_of_Users, Description: $scope.myWelcome[0].Description, IsFavorite:"favorite.jpg"};
            else
                self.resSearch[0] ={ID:$scope.myWelcome[0].ID,name:$scope.myWelcome[0].Name, Picture: $scope.myWelcome[0].Picture, Rank: $scope.myWelcome[0].Rank, Num_of_Users: $scope.myWelcome[0].Num_of_Users, Description: $scope.myWelcome[0].Description, IsFavorite:"EmptyStar.jpg"};
            
            });
            }
            else
            {
                self.resSearch[0] ={ID:$scope.myWelcome[0].ID,name:$scope.myWelcome[0].Name, Picture: $scope.myWelcome[0].Picture, Rank: $scope.myWelcome[0].Rank, Num_of_Users: $scope.myWelcome[0].Num_of_Users, Description: $scope.myWelcome[0].Description, IsFavorite:"favorite.jpg"};
            }
        }        
              
    });
   }

   $scope.choice = function()
   {    
        if($scope.search == true)
        {
            $scope.search = false;
            $scope.myDropDown = "All";
        }
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
    alert($scope.RankReview);
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

   $scope.ImgClick = function(pic)
   {    
       $scope.Res = pic.IsFavorite;
       if($scope.isConecting)
         $scope.updateFavorite();

         $http.get('http://localhost:3000/getPOIByName/'+pic.name).then(function(response){
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
         document.getElementById('id01').style.display='block'
    });
    
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
            } ,
            function myError(response) { 
             alert(response.data);
             });
            $scope.Res = "EmptyStar.jpg"
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
            } ,
                        function myError(response) { 
                                                   });
            $scope.Res = "favorite.jpg";
        }
        $scope.refresh($scope.id ,$scope.Res);
   }



   $scope.ClickFavorite = function(pic)
   {
        if(pic.IsFavorite == "favorite.jpg")
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
            $scope.numberFavorite=$scope.numberFavorite-1;
            document.getElementById("numbernoti").innerHTML = $scope.numberFavorite;
            pic.IsFavorite = "EmptyStar.jpg";
            $scope.Res = pic.IsFavorite;
            $scope.refresh(pic.ID , pic.IsFavorite)
        } ,
            function myError(response) { 
                      });
            
        }   
        else
        {
            $http({method : "POST",
                        url : "http://localhost:3000/private/addPoiToFavorites" , 
                         headers : {
                        "Authorization" : $window.sessionStorage.getItem("Token")
                        },
                        data: {userID: $window.sessionStorage.getItem("Username"), poiID: pic.ID}
                         }).then(function mySuccess(response) {
                $scope.numberFavorite=$scope.numberFavorite+1;
                document.getElementById("numbernoti").innerHTML = $scope.numberFavorite;  
                pic.IsFavorite = "favorite.jpg";
                $scope.Res = pic.IsFavorite;
                $scope.refresh(pic.ID , pic.IsFavorite)             
            } ,
                        function myError(response) { 
                         alert(response.data);
                         });
          
            
        }

        if($scope.isConecting)
            $scope.updateFavorite();
   }
   
   

$scope.refresh = function(poiID , res)
{

    if(poiID == 11)
    self.Historic[0] ={ID:poiID,name: self.Historic[0].name, Picture: self.Historic[0].Picture, Rank: self.Historic[0].Rank, Num_of_Users: self.Historic[0].Num_of_Users, Description: self.Historic[0].Description , IsFavorite:res};
    else if(poiID == 12)
    self.Historic[1] ={ID:poiID,name: self.Historic[1].name, Picture: self.Historic[1].Picture, Rank: self.Historic[1].Rank, Num_of_Users: self.Historic[1].Num_of_Users, Description: self.Historic[1].Description , IsFavorite:res};
    else if(poiID == 13)
    self.Historic[2] ={ID:poiID,name: self.Historic[2].name, Picture: self.Historic[2].Picture, Rank: self.Historic[2].Rank, Num_of_Users: self.Historic[2].Num_of_Users, Description: self.Historic[2].Description , IsFavorite:res};
    else if(poiID == 14)
    self.Historic[3] ={ID:poiID,name: self.Historic[3].name, Picture: self.Historic[3].Picture, Rank: self.Historic[3].Rank, Num_of_Users: self.Historic[3].Num_of_Users, Description: self.Historic[3].Description , IsFavorite:res};
    else if(poiID == 15)
    self.Historic[4] ={ID:poiID,name: self.Historic[4].name, Picture: self.Historic[4].Picture, Rank: self.Historic[4].Rank, Num_of_Users: self.Historic[4].Num_of_Users, Description: self.Historic[4].Description , IsFavorite:res};
    else if(poiID == 21)
    self.Attraction[0] ={ID:poiID,name: self.Attraction[0].name, Picture: self.Attraction[0].Picture, Rank: self.Attraction[0].Rank, Num_of_Users: self.Attraction[0].Num_of_Users, Description: self.Attraction[0].Description , IsFavorite:res};
    else if(poiID == 22)
    self.Attraction[1] ={ID:poiID,name: self.Attraction[1].name, Picture: self.Attraction[1].Picture, Rank: self.Attraction[1].Rank, Num_of_Users: self.Attraction[1].Num_of_Users, Description: self.Attraction[1].Description , IsFavorite:res};
    else if(poiID == 23)
    self.Attraction[2] ={ID:poiID,name: self.Attraction[2].name, Picture: self.Attraction[2].Picture, Rank: self.Attraction[2].Rank, Num_of_Users: self.Attraction[2].Num_of_Users, Description: self.Attraction[2].Description , IsFavorite:res};
    if(poiID == 24)
    self.Attraction[3] ={ID:poiID,name: self.Attraction[3].name, Picture: self.Attraction[3].Picture, Rank: self.Attraction[3].Rank, Num_of_Users: self.Attraction[3].Num_of_Users, Description: self.Attraction[3].Description , IsFavorite:res};
    else  if(poiID == 25)
    self.Attraction[4] ={ID:poiID,name: self.Attraction[4].name, Picture: self.Attraction[4].Picture, Rank: self.Attraction[4].Rank, Num_of_Users: self.Attraction[4].Num_of_Users, Description: self.Attraction[4].Description , IsFavorite:res};
    else if(poiID == 31)
    self.Museums[0] ={ID:poiID,name: self.Museums[0].name, Picture: self.Museums[0].Picture, Rank: self.Museums[0].Rank, Num_of_Users: self.Museums[0].Num_of_Users, Description: self.Museums[0].Description , IsFavorite:res};
    else if(poiID == 32)
    self.Museums[1] ={ID:poiID,name: self.Museums[1].name, Picture: self.Museums[1].Picture, Rank: self.Museums[1].Rank, Num_of_Users: self.Museums[1].Num_of_Users, Description: self.Museums[1].Description , IsFavorite:res};
    else if(poiID == 33)
    self.Museums[2] ={ID:poiID,name: self.Museums[2].name, Picture: self.Museums[2].Picture, Rank: self.Museums[2].Rank, Num_of_Users: self.Museums[2].Num_of_Users, Description: self.Museums[2].Description , IsFavorite:res};
    else if(poiID == 34)
    self.Museums[3] ={ID:poiID,name: self.Museums[3].name, Picture: self.Museums[3].Picture, Rank: self.Museums[3].Rank, Num_of_Users: self.Museums[3].Num_of_Users, Description: self.Museums[3].Description , IsFavorite:res};
    else if(poiID == 35)
    self.Museums[4] ={ID:poiID,name: self.Museums[4].name, Picture: self.Museums[4].Picture, Rank: self.Museums[4].Rank, Num_of_Users: self.Museums[4].Num_of_Users, Description: self.Museums[4].Description , IsFavorite:res};
    else if(poiID == 41)
    self.Restaurants[0] ={ID:poiID,name: self.Restaurants[0].name, Picture: self.Restaurants[0].Picture, Rank: self.Restaurants[0].Rank, Num_of_Users: self.Restaurants[0].Num_of_Users, Description: self.Restaurants[0].Description , IsFavorite:res};
    else if(poiID == 42)
    self.Restaurants[1] ={ID:poiID,name: self.Restaurants[1].name, Picture: self.Restaurants[1].Picture, Rank: self.Restaurants[1].Rank, Num_of_Users: self.Restaurants[1].Num_of_Users, Description: self.Restaurants[1].Description , IsFavorite:res};
    else if(poiID == 43)
    self.Restaurants[2] ={ID:poiID,name: self.Restaurants[2].name, Picture: self.Restaurants[2].Picture, Rank: self.Restaurants[2].Rank, Num_of_Users: self.Restaurants[2].Num_of_Users, Description: self.Restaurants[2].Description , IsFavorite:res};
    else if(poiID == 44)
    self.Restaurants[3] ={ID:poiID,name: self.Restaurants[3].name, Picture: self.Restaurants[3].Picture, Rank: self.Restaurants[3].Rank, Num_of_Users: self.Restaurants[3].Num_of_Users, Description: self.Restaurants[3].Description , IsFavorite:res};
    else
    self.Restaurants[4] ={ID:poiID,name: self.Restaurants[4].name, Picture: self.Restaurants[4].Picture, Rank: self.Restaurants[4].Rank, Num_of_Users: self.Restaurants[4].Num_of_Users, Description: self.Restaurants[4].Description , IsFavorite:res};
    
    if($scope.search == true)
    {
        self.resSearch[0] ={ID:poiID,name: self.resSearch[0].name, Picture: self.resSearch[0].Picture, Rank: self.resSearch[0].Rank, Num_of_Users: self.resSearch[0].Num_of_Users, Description: self.resSearch[0].Description , IsFavorite:res};
    }
}

    $scope.updateFavorite =  function()
    {
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


    $scope.Refresh = function()
    {
        $http.get('http://localhost:3000/getPOIByName/'+$scope.title).then(function(response){
            $scope.rank = response.data[0].Rank ;
        } ,
        function myError(response) { 
        });
    }


});



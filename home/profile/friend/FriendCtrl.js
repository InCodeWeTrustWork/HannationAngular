(function () {
    'use strict';

    angular
        .module('app')
        .controller('FriendCtrl', Controller);

    function Controller($scope, AuthService, $http, $localStorage, QiNiu, $stateParams) {
        var vm = this;
      var user_id = $stateParams.user_id;
        // User Info 
        AuthService.GetFriendInfo(user_id)
            .then(function(data) {
            $scope.user = data;
        });


        AuthService.GetFriendMeta(user_id)
        .then(function(data) {
            $scope.user_meta = data;
            $scope.user_id = $stateParams.user_id;
        });



        AuthService.GetFriendMoments(user_id)
        .then(function(data) {
            $scope.activities = data.activities;
            $scope.activities.comments = [];
            $scope.activities.comments = data.activities.comments;
            console.log('GetFriend Momemts:', data.activities);
        });



        $http.jsonp('http://hannation.me/api/userplus/friends_check_friendship/', {
            params: {
                key: '57f211a0354d7',
                friend_id: $stateParams.user_id,
                user_id: $localStorage.currentUser.id,
                callback: "JSON_CALLBACK"
               
            }
        }).then(function(response){
          $scope.friendship = response.data;
          console.log('response data', response.data);
        })





      //функции

        $scope.AddToFriend = function() {
            AuthService.AddToFriend(user_id, $stateParams.user_id).
            then(function(data){
                console.log('data', data);
            });
        }


      $scope.remove = function(user_id){
        
        $http.jsonp('http://hannation.me/api/userplus/friends_remove_friend/', {
          params: {
            key: '57f211a0354d7',
            cookie: $localStorage.currentUser.cookie,
            friend_id: user_id
          }
        }).then(function(response){
          console.log('response data', response.data);
          console.log(user_id)
        }); 
    }

      $scope.AddToFriend = function(){
        $http.get('http://hannation.me/api/userplus/friends_add_friend/', {
          params: {
            key: '57f211a0354d7',
            cookie: user.cookie,
            friend_id: $stateParams.user_id
          }
        }).then(function(response){
          console.log('response data', response.data);
          console.log($stateParams.userId);
        });
    }


// Add to favorite 
    

        $scope.Add2Favorite = function(activity_id) {
            $http.jsonp('http://hannation.me/api/userplus/activities_add_user_favorite/', {
                params: {
                    key: '57f211a0354d7',
                    cookie: $localStorage.currentUser.cookie,
                    activity_id: activity_id,
                    callback: 'JSON_CALLBACK'
                }
            }).then(function(response){
                console.log('This moment favorite', response);
            })
        };


        initController();
        function initController() {}
    }

})();
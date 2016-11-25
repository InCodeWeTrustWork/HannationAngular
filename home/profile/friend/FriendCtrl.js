(function () {
    'use strict';

    angular
        .module('app')
        .controller('FriendCtrl', Controller);

    function Controller($scope, AuthService, $http, $localStorage, QiNiu, $stateParams) {
        //Variables
        var vm = this;
        var user_id = $stateParams.user_id;
 
        //User info
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

        //User relations
        AuthService.FriendStatus(user_id)
        .then(function(data) {
           $scope.response = data.response;
            console.log('FRIEND STATUS IS', data.response);
        });

        AuthService.GetFriendshipId(user_id)
        .then(function(data) {
           $scope.ffid = data.response;
        });

        AuthService.CheckFriendShip(user_id)
        .then(function(data) {
           $scope.response = data.response;
            console.log('Friendship checked', data.response);
        });

        $scope.AddToFriend = function(){
            AuthService.AddToFriend(user_id)
            .then(function(data){
                console.log('Friendship request sended');
            });
        }

        $scope.RemoveFromFriends = function(){
            AuthService.RemoveFromFriends(user_id)
            .then(function(data){
                console.log('You no more Friends');
                 AuthService.FriendStatus(user_id)
                    .then(function(data) {
                       $scope.response = data.response;
                        console.log('FRIEND STATUS IS', data);
                    });
            });
        }

        $scope.CancelFriendRequest = function(){
            AuthService.RemoveFrienRequest(user_id)
            .then(function(data){
                console.log('Friendship Request Canceled');
                AuthService.FriendStatus(user_id)
                    .then(function(data) {
                       $scope.response = data.response;
                        console.log('FRIEND STATUS IS', data);
                    });
            });
        }

       //Accept Friendship Request
        $scope.accept = function() {
             AuthService.GetFriendshipId(user_id)
             .then(function(data) {
             $http.jsonp("http://hannation.me/api/userplus/friends_accept_friendship/", {
                        params: {
                          key: '57f211a0354d7',
                          cookie: $localStorage.currentUser.cookie,
                          user_id: user_id,
                          friendship_id: data.response,
                          callback: "JSON_CALLBACK"
                  }
               }).then(function(response){
                  AuthService.FriendStatus(user_id)
                    .then(function(data) {
                       $scope.response = data.response;
                        console.log('FRIEND STATUS IS', data);
                    });
                 console.log('They are friends and they number of friends equal to', data.response)
            })            
           });
        } 

       //Reject Friendship Request
        $scope.reject = function() {
             AuthService.GetFriendshipId(user_id)
             .then(function(data) {
             $http.jsonp("http://hannation.me/api/userplus/friends_reject_friendship/", {
                        params: {
                          key: '57f211a0354d7',
                          cookie: $localStorage.currentUser.cookie,
                          user_id: user_id,
                          friendship_id: data.response,
                          callback: "JSON_CALLBACK"
                  }
               }).then(function(response){
                 console.log('You rejected friends', data.response);
                  AuthService.FriendStatus(user_id)
                      .then(function(data) {
                         $scope.response = data.response;
                          console.log('FRIEND STATUS IS', data);
                  });
            })            
           });
        } 



// Relation with friend's moments
    

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
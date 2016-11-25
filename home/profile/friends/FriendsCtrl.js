
(function () {
    'use strict';

    angular
        .module('app')
        .controller('FriendsCtrl', Controller);

    function Controller($scope, AuthService, $http, $localStorage) {
        var vm = this;

        // User Info 
        AuthService.GetUserInfo()
            .then(function(data) {
            $scope.user = data.user;
        });
        // GetFriends list
        AuthService.GetFriends()
            .then(function(data){
            $scope.count = data.count;
            $scope.friends = data.friends;
            console.log('Friends:', data)
        });

        //Get User Meta
        AuthService.GetUserMeta()
            .then(function(data){
               $scope.info = data;
        });

        //Get friends request
        AuthService.GetFriendsNotifications()
            .then(function(data){
              $scope.notifications = data.notifications;
              console.log('We have this requests', data);
        });


        //Подтверждение дружбы
        $scope.accept = function(item_id) {
             AuthService.GetFriendshipId(item_id)
             .then(function(data) {
             //Добавляем в друзья
             $http.jsonp("http://hannation.me/api/userplus/friends_accept_friendship/", {
                        params: {
                          key: '57f211a0354d7',
                          cookie: $localStorage.currentUser.cookie,
                          user_id: item_id,
                          friendship_id: data.response,
                          callback: "JSON_CALLBACK"
                  }
               }).then(function(response){
                    //Get friends request
                  AuthService.GetFriendsNotifications()
                      .then(function(data){
                        $scope.notifications = data.notifications;
                        console.log('We have this requests', data);
                  });
            })            
           });
        } 

          //Подтверждение дружбы
        $scope.reject = function(item_id) {
             AuthService.GetFriendshipId(item_id)
             .then(function(data) {
             //Добавляем в друзья
             $http.jsonp("http://hannation.me/api/userplus/friends_reject_friendship/", {
                        params: {
                          key: '57f211a0354d7',
                          cookie: $localStorage.currentUser.cookie,
                          user_id: item_id,
                          friendship_id: data.response,
                          callback: "JSON_CALLBACK"
                  }
               }).then(function(response){
                    //Get friends request
                  AuthService.GetFriendsNotifications()
                      .then(function(data){
                        $scope.notifications = data.notifications;
                        console.log('Friendship rejected', data);
                  });
            })            
           });
        } 


        initController();
        function initController() {}
    }

})();
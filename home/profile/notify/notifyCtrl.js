(function () {
    'use strict';

    angular
        .module('app')
        .controller('NotifyCtrl', Controller);

    function Controller($scope, AuthService, $http, $localStorage) {
        var vm = this;

           // User Info 
        AuthService.GetUserInfo()
            .then(function(data) {
            $scope.user = data.user;
        });

        AuthService.GetFriends()
            .then(function(data){
            $scope.count = data.count;
            $scope.friends = data.friends;
            console.log('Friends:', data)
        });

        AuthService.GetUserMeta()
            .then(function(data){
               $scope.info = data;
        });


        AuthService.GetNotifications()
            .then(function(data){
              $scope.notifications = data.notifications;
        });


      //Подтверждение дружбы
       $scope.accept = function(item_id, response, user_id) {
        AuthService.GetFriendshiId()
        .then(function(data) {
            $scope.response = data.response;
            console.log('бро номер дружбы этих двух равен', data.response)
         //Добавляем в друзья
         $http.get("http://hannation.me/api/userplus/friends_accept_friendship/", {
                    params: {
                      key: '57f211a0354d7',
                      cookie: user.cookie,
                      friendship_id: data.response
              }
           })            
       });
    } 




    $scope.reject = function(item_id, response) {
      AuthService.GetFriendshiId()
      .then(function(data) {
          $scope.response = data.response;
          console.log('бро номер дружбы этих двух равен', data.response)
      //Отклоняем дружбу
         $http.get("http://hannation.me/api/userplus/friends_reject_friendship/", {
                    params: {
                      key: '57f211a0354d7',
                      cookie: user.cookie,
                      friendship_id: data.response
              }
           })
      });
    }

    

    $scope.DeleteNotifictaion = function(id) {
        $http.jsonp("http://hannation.me/api/userplus/notifications_delete/", {
          params: {
            key:'57f211a0354d7',
            cookie: $localStorage.currentUser.cookie,
            notification_id: id,
            callback: 'JSON_CALLBACK'
          }
        })
        .success(function(response) {
             AuthService.GetNotifications()
            .then(function(response, data){
              console.log('We do that', response);
              $scope.notifications = data.notifications;

        });

        });
    }



        initController();
        function initController() {}
    }

})();
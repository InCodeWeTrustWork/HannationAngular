(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', Controller);

    function Controller($scope, AuthService, $http, $localStorage, QiNiu, $timeout) {
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
               console.log(data);
        });
    
        AuthService.GetMoments() 
            .then(function(data){
                $scope.activities = data.activities;
                $scope.activities.comments = [];
                $scope.activities.comments = data.activities.comments;
                console.log('We have this activity', data.activities);               
        });


        AuthService.NotificationCount()
            .then(function(data){
                $scope.countnot = data.count;
                console.log('This not', data);
            })

        AuthService.GetNotificationsNew()
            .then(function(data){
                $scope.newnotifications = data.notifications;
              console.log('You Have this new notification', data.newnotifications);
        });
    
        //Add activity

        $scope.AddMoment = function() {
           $http.jsonp('http://hannation.me/api/userplus/activities_post_update/', {
                params: {
                    key: '57f211a0354d7',
                    cookie: $localStorage.currentUser.cookie,
                    content: $scope.content + '<img src="' + $scope.img + '">',
                    callback: 'JSON_CALLBACK'
                  }
             })
            .success(function(data) {
                console.log('Moment added succesfull');
                AuthService.GetMoments() 
                    .then(function(data){
                        $scope.activities = data.activities;
                        console.log('We have this activity', data.activities);
                        $scope.content = "";
                        $scope.img = "";
                });

            });
        }

        $scope.$on('beforeUpload', function () {
            $scope.$apply(function () {
              $scope.uploading = true;
            });
        });

        $scope.$on('upload', function (e, data) {
            $scope.$apply(function () {
              $scope.img = data;
              $scope.uploading = false;
            });
        });
       


      $scope.addComment = function(activity_id) {
            $http.jsonp('http://hannation.me/api/userplus/activities_new_comment/', {
            params: {
                key: '57f211a0354d7',
                cookie: $localStorage.currentUser.cookie,
                content: this.new_comment,
                activity_id: activity_id,
                callback: 'JSON_CALLBACK'
              }
              }).success(function(response) {
                
                console.log('This response', response);
                $scope.new_comment = "";
                $scope.comments = [];
                $scope.activity_id = response.activity_id;
                console.log('response data21312', response.data);
                AuthService.GetMoments() 
                    .then(function(data){
                        $scope.activities = data.activities;
                        $scope.activities.comments = data.activities.comments;
                        $scope.activities.comments = [];
                        console.log('Activity refresh done', data.activities);
                        console.log('Comments  refresh done',  data.activities.comments);
                });

            })
        };




        //Delete Activity 
         $scope.deleteMoment = function(activity_id){
              $http.jsonp('http://hannation.me/api/userplus/activities_delete_activity/', {
                params: {
                   key: '57f211a0354d7',
                   cookie: $localStorage.currentUser.cookie,
                   activity_id: activity_id,
                   callback: 'JSON_CALLBACK'
                }
              }).then(function(response) {
                $scope.comments = [];
                $scope.activity_id = response.activity_id;
                console.log('response data21312', response.data);
                AuthService.GetMoments() 
                    .then(function(data){
                        $scope.activities = data.activities;
                        console.log('Activity refresh done', data.activities);
                });
              })
            };


        $scope.Add2Favorite = function(activity_id) {
            $http.jsonp('http://hannation.me/api/userplus/activities_add_user_favorite/', {
                params: {
                    key: '57f211a0354d7',
                    cookie: $localStorage.currentUser.cookie,
                    activity_id: activity_id,
                    callback: 'JSON_CALLBACK'
                }
            }).then(function(response) {
                console.log('Added to Favorite')
            });
        };

    // Save settings profile

    $scope.save_settings = function () {
        $http.jsonp('http://hannation.me/api/userplus/update_user_meta_vars/', {
            params: {
                key: '57f211a0354d7',
                cookie: $localStorage.currentUser.cookie,
                name: this.name, 
                city: this.city, 
                birthday: this.birthday, 
                wechat: this.wechat, 
                email: this.email, 
                phone: this.phone, 
                callback: 'JSON_CALLBACK'
            }    
        }).then(function(data) {
            console.log("Addit settngs", data);
             AuthService.GetUserMeta()
            .then(function(data){
                console.log(data);
               $scope.info = data;
                $scope.name_edit = false;
                 $scope.city_edit = false;
               $scope.birthday_edit = false;
               $scope.wechat_edit = false;
               $scope.email_edit = false;
               $scope.phone_edit = false;
               $scope.edit = false;
                $scope.notify = false;
                 $scope.page = 'default';
             });
        });
    };


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


    $scope.back = function() {
        $scope.notify = false;
        $scope.edit = false;
    };


      AuthService.GetNotifications()
            .then(function(data){
              $scope.notifications = data.notifications;
              console.log('You Have this all notification', data.notifications);
            $timeout(function () { 
                $scope.out = true;
                console.log('Waste your time');
                $scope.animate = 'animated fadeOut';
                 }, 5000);
            $timeout(function () { 
                $scope.animate = 'animated fadeOut';
                 }, 4000);


        });


    $scope.notif_show = function() {
        $scope.notify = true;
        AuthService.ReadAllNotifications()
            .then(function(data){
              console.log('Success');
            $scope.notificat = true;
        });

    };

 
        initController();
        function initController() {}
    }

})();
(function () {'use strict';
	angular.module('app.profile-services', [])

	.service('AuthService', function($rootScope, $http, $q, $localStorage){
		  
		  this.GetUserInfo = function() {
		    var deferred = $q.defer();
		    $http.jsonp('http://hannation.me/api/user/get_currentuserinfo/?user_id=' 
		  	+ $localStorage.currentUser.id + '&cookie=' +  $localStorage.currentUser.cookie + 
		    '&insecure=cool&callback=JSON_CALLBACK')
		    .success(function(data) {
		      deferred.resolve(data);
		      console.log('We take', data)
		    })
		    .error(function(data) {
		      deferred.reject(data);
		    });
		    return deferred.promise;
		  };




		  this.GetFriends = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/friends/?key=57f211a0354d7&user_id=' 
		  		+ $localStorage.currentUser.id + '&insecure=cool&callback=JSON_CALLBACK')
		  	.success(function(data){
		  		deferred.resolve(data);
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };

		  this.GetUserMeta = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/get_user_meta/?key=57f211a0354d7&user_id=' 
		  		+ $localStorage.currentUser.id + '&cookie=' +  $localStorage.currentUser.cookie + '&insecure=cool&callback=JSON_CALLBACK')
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };



		  this.GetMoments = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/activities/', {
		  		params: {
		  		  key: '57f211a0354d7',
			      comment: true,
			      cookie: $localStorage.currentUser.cookie,
			      type: 'activity_update',
			      user_id: $localStorage.currentUser.id,
			      callback: 'JSON_CALLBACK'
		  		}
		  	})
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };

//Get Notifications 
		    this.GetNotifications = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/notifications/', {
		  		params: {
		  		  key: '57f211a0354d7',
			      cookie: $localStorage.currentUser.cookie,
			      user_id: $localStorage.currentUser.id,
			      callback: 'JSON_CALLBACK',
			      is_new: 'both',
		  		}
		  	})
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };


 		this.GetNotificationsNew = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/notifications/', {
		  		params: {
		  		  key: '57f211a0354d7',
			      cookie: $localStorage.currentUser.cookie,
			      user_id: $localStorage.currentUser.id,
			      is_new: true,
			      callback: 'JSON_CALLBACK'
		  		}
		  	})
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };

		 this.ReadAllNotifications = function() {
		 	var deferred = $q.defer();
		 	$http.jsonp('http://hannation.me/api/userplus/notifications_mark_all/', {
		 		params: {
		 			key: '57f211a0354d7',
			      cookie: $localStorage.currentUser.cookie,
			      callback: 'JSON_CALLBACK'
		 		}
		 	})
			.success(function(data) {
				console.log("Read all not");
		  		deferred.resolve(data);
		  		
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };

		  this.AddMoment = function(content) {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/activities_post_update/', {
			    params: {
			        key: '57f211a0354d7',
			        cookie: $localStorage.currentUser.cookie,
			        content: content
			      }
			 })
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		console.log('Moment added succesfull');
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  		console.log(data)
		  	});
		  	return deferred.promise;
		  };



		  /*Friend service*/
		  this.GetFriendInfo = function(user_id){
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/get_userinfo/',{
		  		params:{
		  			key: '57f211a0354d7',
		  			user_id: user_id,
		  			 callback: 'JSON_CALLBACK'
		  		}
		  	})
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		console.log('Friend info shown succesfully');
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  		console.log(data)
		  	});
		  	return deferred.promise;
		  };

		  this.GetUserMeta = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/get_user_meta/?key=57f211a0354d7&user_id=' 
		  		+ $localStorage.currentUser.id + '&cookie=' +  $localStorage.currentUser.cookie + '&insecure=cool&callback=JSON_CALLBACK')
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };

		  this.GetFriendMeta = function(user_id){
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/get_user_meta_id/',{
		  		params:{
		  			key: '57f211a0354d7',
		  			cookie: $localStorage.currentUser.cookie,
		  			user_id: user_id,
		  			secret: 'maxt9leo',
		  			callback: 'JSON_CALLBACK'
		  		}
		  	})
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		console.log('Take a user id from service', user_id)
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };



//Get Friend Activity

		  this.GetFriendMoments = function(user_id) {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/activities/', {
		  		params: {
		  		  key: '57f211a0354d7',
		  		  	cookie: $localStorage.currentUser.cookie,
			      comment: true,
			      type: 'activity_update',
			      user_id: user_id,
			      callback: 'JSON_CALLBACK'
		  		}
		  	})
		  	.success(function(data) {
		  		deferred.resolve(data);
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };

//Add to friend 
		this.AddToFriend = function(user_id) {
			var deferred = $q.defer();
			$http.jsonp('http://hannation.me/api/userplus/friends_withdraw_friendship/?key=57f211a0354d7', {
				params: {
					cookie: $localStorage.currentUser.cookie,
					callback: 'JSON_CALLBACK'
				}
			}).success(function(data) {
		  		deferred.resolve(data);
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		};



		//Notif service 
			this.GetFriendshiId = function(user_id) {
			var deferred = $q.defer();
			   $http.get("http://hannation.me/api/userplus/friends_friendship_id/", {
            params: {
             key: '57f211a0354d7',
             cookie: $localStorage.currentUser.cookie,
			 callback: 'JSON_CALLBACK',
             user_id: item_id
          }
       		})
			.success(function(data) {
		  		deferred.resolve(data);
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		};




 	})
})();	

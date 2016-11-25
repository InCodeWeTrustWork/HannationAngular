(function () {'use strict';
	angular.module('app.profile-services', [])

	.service('AuthService', function($rootScope, $http, $q, $localStorage){

//Get Current User Info		  
		  this.GetUserInfo = function() {
		    var deferred = $q.defer();
		    $http.jsonp('http://hannation.me/api/user/get_currentuserinfo/', {
		    	params: {
		    		user_id: $localStorage.currentUser.id,
		    		cookie: $localStorage.currentUser.cookie,
		    		insecure: 'cool',
		    		callback:'JSON_CALLBACK'
		    	}
		    })
		    .success(function(data) {
		      deferred.resolve(data);
		      console.log('We take', data)
		    })
		    .error(function(data) {
		      deferred.reject(data);
		    });
		    return deferred.promise;
		  };


//Get Current user Friends 
		  this.GetFriends = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/friends/', {
		  		params: {
		  		key: '57f211a0354d7',
		  		user_id: $localStorage.currentUser.id,
		  		insecure: 'cool',
		  		callback: 'JSON_CALLBACK'
		  		}
		  	})
		  	.success(function(data){
		  		deferred.resolve(data);
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		  };

//Get Current user Meta 
		  this.GetUserMeta = function() {
		  	var deferred = $q.defer();
		  	$http.jsonp('http://hannation.me/api/userplus/get_user_meta/', {
		  		params: {
		  			key: '57f211a0354d7',
		  			user_id: $localStorage.currentUser.id,
		  			cookie: $localStorage.currentUser.cookie,
		  			callback:'JSON_CALLBACK',
		  			insecure: 'cool'
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


//Get user moments
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


//Add current user moment (Not work)
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

//Get Friend info
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

//Get friend info
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
		this.AddToFriend = function(id) {
			var deferred = $q.defer();
			$http.jsonp('http://hannation.me/api/userplus/friends_add_friend/', {
		          params: {
		            key: '57f211a0354d7',
		            cookie: $localStorage.currentUser.cookie,
		            friend_id: id,
		            callback: "JSON_CALLBACK"
		          }
			}).success(function(data) {
		  		deferred.resolve(data);
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
		};

//Get Friend Status
		this.FriendStatus = function(id) {
			var deferred = $q.defer();
			$http.jsonp('http://hannation.me/api/userplus/friends_friendship_status/', {
				params: {
					key: '57f211a0354d7',
					cookie: $localStorage.currentUser.cookie,
					user_id: $localStorage.currentUser.id,
					friend_id: id,
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

//Check FriendShip 
		this.CheckFriendShip = function(id) {
			var deferred = $q.defer();
			$http.jsonp('http://hannation.me/api/userplus/friends_friendship_status/', {
				params: {
					key: '57f211a0354d7',
					cookie: $localStorage.currentUser.cookie,
					user_id: $localStorage.currentUser.id,
					friend_id: id,
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

//Get Friendship id 
	this.GetFriendshipId = function(id) {
			var deferred = $q.defer();
			$http.jsonp("http://hannation.me/api/userplus/friends_friendship_id/", {
	            params: {
	             key: '57f211a0354d7',
	             cookie: $localStorage.currentUser.cookie,
				 callback: 'JSON_CALLBACK',
	             user_id: id,
	             friend_id: $localStorage.currentUser.id
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
//Remove Friend request
	this.RemoveFrienRequest = function(id) {
			var deferred = $q.defer();
			 $http.jsonp('http://hannation.me/api/userplus/friends_withdraw_friendship/', {
	          params: {
	            key: '57f211a0354d7',
	            cookie: $localStorage.currentUser.cookie,
	            friend_id: id,
	            callback: "JSON_CALLBACK"
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
//Remove friendship
	this.RemoveFromFriends = function(id) {
			var deferred = $q.defer();
			 $http.jsonp('http://hannation.me/api/userplus/friends_remove_friend/', {
	          params: {
	            key: '57f211a0354d7',
	            cookie: $localStorage.currentUser.cookie,
	            friend_id: id,
	            callback: "JSON_CALLBACK"
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




//Notif service 

//Get friends request (as  notifications )
	this.GetFriendsNotifications = function() {
			var deferred = $q.defer();
			$http.jsonp('http://hannation.me/api/userplus/notifications/', {
	  		params: {
	  		  key: '57f211a0354d7',
		      cookie: $localStorage.currentUser.cookie,
		      callback: 'JSON_CALLBACK',
		       is_new: 'both'
	  		}
		  	})
		  	.success(function(data) {
		  		deferred.resolve(data);
		  		
		  	})
		  	.error(function(data){
		  		deferred.reject(data);
		  	});
		  	return deferred.promise;
	}
		
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

//Get all Notifications
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

//Notification Read all (Mark as read)
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
//Get Notifications Count 
		
		this.NotificationCount = function() {
			var deferred = $q.defer();
			$http.jsonp('http://hannation.me/api/userplus/notifications_unread_count/', {
				params: {
					key: '57f211a0354d7',
					cookie: $localStorage.currentUser.cookie,
					user_id: $localStorage.currentUser.id,
					callback: 'JSON_CALLBACK'
				}
			})
			.success(function(data){
				console.log("we have ", data);
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject(data);
				console.log('We have this error', data);
			});
			return deferred.promise;
		};

 	})
})();	

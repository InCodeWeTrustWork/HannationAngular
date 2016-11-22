(function () {'use strict';
	angular.module('app.services', [])


	.service('PostService', function($rootScope, $http, $q){ 
		  this.GetPosts = function(slug) {
		    var deferred = $q.defer();
		    $http.jsonp('http://hannation.me/api/get_category_posts/?slug=' +
		    	slug + '&callback=JSON_CALLBACK')
		    .success(function(data) {
		      deferred.resolve(data);
		      console.log('We take', slug, data.posts)
		    })
		    .error(function(data) {
		      deferred.reject(data);
		    });
		    return deferred.promise;
		  };
	})


})();	


           

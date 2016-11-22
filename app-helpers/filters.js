(function () {
    'use strict';


    

angular.module('app.filters', [])

	.filter('limitHtml', function () {
    return function (text, limit) {
        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;
        return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
    }
})

	.filter('limitHtml2', function () {
    return function (text, limit) {
        var changedString = String(text).replace('\n[bpfb_images]\n', '<img class="moment-img" src="http://hannation.me/wp-content/uploads/bpfb/');
        var length = changedString.length;
        return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
    }
       
  
})

.filter('limitHtml3', function () {
    return function (text, limit) {
        var changedString = String(text).replace('\n[/bpfb_images]', '">');
        var length = changedString.length;
        return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
    }
       
  
})




})();	


           

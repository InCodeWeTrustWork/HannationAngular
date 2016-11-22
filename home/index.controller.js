(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($scope, $http, $localStorage) {
        var vm = this;

        $http.jsonp('http://hannation.me/api/user/get_userinfo/?user_id=' + $localStorage.currentUser.id + '&insecure=cool&callback=JSON_CALLBACK')
        .success(function(response) {
            $scope.user = response;
            console.log('we take user', response)
        });
        
        console.log('We take from localstorage', $localStorage.currentUser);

        initController();

        function initController() {
        }
    }

})();
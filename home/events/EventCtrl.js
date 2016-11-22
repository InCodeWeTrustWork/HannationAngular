(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventsCtrl', Controller);

    function Controller($scope, PostService) {
        var vm = this;
        PostService.GetPosts('events').then(function(data) {
            $scope.posts = data.posts;
        });
        initController();

        function initController() {
        }
    }

})();
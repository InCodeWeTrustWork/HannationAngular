(function () {
    'use strict';

    angular
        .module('app')
        .controller('NightCtrl', Controller);

    function Controller($scope, PostService) {
        var vm = this;
        PostService.GetPosts('nightplace').then(function(data) {
              $scope.slug = 'nightplace';
              $scope.posts = data.posts;
        });
        initController();
        function initController() {
        }
    }

})();
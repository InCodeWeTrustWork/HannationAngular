(function () {
    'use strict';

    angular
        .module('app')
        .controller('GuidesCtrl', Controller);

    function Controller($scope, PostService) {
        var vm = this;
        PostService.GetPosts('guids').then(function(data) {
              $scope.slug = 'nightplace';
              $scope.posts = data.posts;
        });
        initController();

        function initController() {
        }
    }

})();
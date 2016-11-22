(function () {
    'use strict';

    angular
        .module('app')
        .controller('DayCtrl', Controller);

    function Controller($scope, PostService) {
        var vm = this;
        PostService.GetPosts('dayplace').then(function(data) {
              $scope.slug = 'dayplace';
              $scope.posts = data.posts;
        });
        initController();

        function initController() {
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('PlaceCtrl', Controller);

    function Controller($scope, PostService) {
        var vm = this;
        var post_id = $stateParams.id;
        PostService.GetPlace('dayplace').then(function(data) {
              $scope.slug = 'dayplace';
              $scope.posts = data.posts;
        });
        initController();

        function initController() {
        }
    }

})();
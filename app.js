(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router', 
            'ngMessages', 
            'ngStorage', 
            'app.filters', 
            'app.services', 
            'app.profile-services',
            'ngSanitize',
            'app.image-service'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'home/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm'
            })
            .state('daylife', {
                url: '/daylife',
                templateUrl: 'home/places/day/daylife.html',
                controller: 'DayCtrl',
                controllerAs: 'vm'
            })
            .state('nightlife', {
                url: '/nightlife',
                templateUrl: 'home/places/night/nightlife.html',
                controller: 'NightCtrl',
                controllerAs: 'vm'
            })
            .state('events', {
                url: '/events',
                templateUrl: 'home/events/events.html',
                controller: 'EventsCtrl',
                controllerAs: 'vm'
            })
            .state('guides', {
                url: '/guides',
                templateUrl: 'home/guides/guides.html',
                controller: 'GuidesCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
            .state('friend', {
                url: '/friend/:user_id',
                templateUrl: 'home/profile/friend/friend.html',
                controller: 'FriendCtrl',
                controllerAs: 'vm'
            })
             .state('friends', {
                url: '/friends',
                templateUrl: 'home/profile/friends/friends.html',
                controller: 'FriendsCtrl',
                controllerAs: 'vm'
            })
             .state('notifications', {
                url: '/notifications',
                templateUrl: 'home/profile/notify/notify.html',
                controller: 'NotifyCtrl',
                controllerAs: 'vm'
            });
    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();
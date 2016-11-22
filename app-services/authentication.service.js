(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
               $http.jsonp('http://hannation.me/api/user/generate_auth_cookie/?insecure=cool&callback=JSON_CALLBACK&username=' +  username + '&password=' + password )
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.cookie) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { 
                            username: username, 
                            token: response.token,
                            cookie: response.cookie,
                            id: response.user.id,
                            avatar: response.user.avatar,
                            response: response
                        };

                        console.log('this your cookie', response.cookie)

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();


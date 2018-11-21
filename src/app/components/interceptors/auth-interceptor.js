angular.module('interceptors.auth', [
    'config'
]).factory('AuthInterceptor', authInterceptor);

function authInterceptor($log, $q, $window){
    var authInterceptor = {
        request: function (config) {
            console.log(config);
            var accessToken = sessionStorage.getItem('accessToken');
            console.log(accessToken);
            if (accessToken === null || accessToken == "undefined") {
                console.log('unauthenticated');
                if($window.location.href.indexOf('auth') < 0)
                {
                    console.log(config);
                    // $window.location.href = '/auth.html';
                }
            }
            else {
                config.headers["Authorization"] = "bearer " + accessToken;
            }
            return config;
        },

        requestError: function (config) {
            $log.debug("login");
            return config;
        },

        response: function (res) {
            return res;
        },

        responseError: function (res) {
            if (res.status == "401") {
                $log.debug("login");
            }
            if (res.status == "400") {
                $log.debug("login");
            }
            if (res.status == "403") {
                $log.debug("login");
            }
            if (res.status == "404") {
                $log.debug("login");
            }
            $q.reject(res);
            return res;
        }
    };

    return authInterceptor;
}
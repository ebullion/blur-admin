angular.module('common.services',[
    'config'
]).factory('BaseService', baseService);

function baseService($q, $http, $rootScope, $config){
    var BaseService = function (controller) {
        this.apiUrl = $config.apiUrl + '/actionapi/' + controller + '/';



        this.get = getApiResponse;
        this.put = putApiResponse;
        this.post = postApiResponse;
        this.delete = deleteApiResponse;
        this.extract = extractData;
        this.getUrl = getUrl;
    };

    /**
     * makes a GET rest request
     * @param route - the url to call
     * @param params - the params to pass to the request
     * @returns {*}
     */
    function getApiResponse(route, params) {
        var deferred = $q.defer();

        $http.get(route, params).then(extractData).then(function (result) {
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    /**
     * makes a POST rest request
     * @param route - the url to call
     * @param params - the params to pass to the request
     * @returns {*}
     */
    function postApiResponse(route, params) {
        var deferred = $q.defer();

        $http.post(route, params).then(extractData).then(function (result) {
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    /**
     * makes a PUT rest request
     * @param route - the url to call
     * @param params - the params to pass to the request
     * @returns {*}
     */
    function putApiResponse(route, params) {
        var deferred = $q.defer();

        $http.put(route, params).then(extractData).then(function (result) {
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    /**
     * makes a DELETE rest request
     * @param route - the url to call
     * @param params - the params to pass to the request
     * @returns {*}
     */
    function deleteApiResponse(route, params) {
        var deferred = $q.defer();

        $http.delete(route, params).then(extractData).then(function (result) {
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    /**
     * extracts the result from the server response
     * @param result
     * @returns {*}
     */
    function extractData(result) {
        var message;

        //TODO: Add error handling
        //adding logic for hooks into GUI service

        if (result.data) {
            if ((typeof result.data.result === 'boolean') || result.data.result !== undefined) {
                if (result.data.status === 1) {
                    return result.data.result;
                } else if (result.data.status === 3) {
                    return result.data.message;
                }
                else {
                    logger.logError(result.data.message, result.data, result, true);
                    // send the message event
                    $rootScope.$broadcast('logError', getServerResponseMessage(result));
                    return {};
                }
            } else {
                if (result.data.status === 3) {
                    return result.data.message;
                } else {
                    var isSuccess = result.data.status === 1;

                    if (!isSuccess) {
                        logger.logError(result.data.message, result.data, result, true);
                        // send the message event
                        $rootScope.$broadcast('logError', getServerResponseMessage(result));
                    }

                    return isSuccess;
                }
            }
        } else {
            if (result.result) {
                if (result.status === 1) {
                    return result.result;
                } else if (result.status === 3) {
                    return result.message;
                } else {
                    logger.logError(result.message, result, result, true);
                    // send the message event
                    $rootScope.$broadcast('logError', getServerResponseMessage(result));
                    return {};
                }
            } else {
                return result.status === 1;
            }
        }
    }

    function getServerResponseMessage(result) {
        var message = '';
        // build error message string
        message += result.data && result.data.exceptionType ? 'EXCEPTION TYPE: ' + result.data.exceptionType + ' ' : '';
        message += result.data && result.data.status ? 'STATUS: ' + result.data.status + ' ' : '';
        message += result.config ? 'METHOD: ' + result.config.method + ' URL: ' + result.config.url + ' ' : '';
        message += (result.data && result.data.message) || (result.message) ?
            'RESPONSE MESSAGE: ' + (result.data.message ? result.data.message : result.message) + ' ' : '';
        message += result.data && result.data.messageDetail ? 'RESPONSE DETAIL: ' + result.data.messageDetail + ' ' : '';
        message += result.status ? 'REQUEST STATUS: ' + result.status + ' ' : '';
        message += result.statusText ? 'REQUEST STATUS TEXT: ' + result.statusText + ' ' : '';

        return message;
    }

    function getUrl(relativePath){
        return this.apiUrl + relativePath;
    }

    return BaseService;
}
angular.module('config',[

])
    .factory('$config', appConfig);

function appConfig(){
    var environment = 'DEV';

    var config = {
        appName: 'Chess Admin',
        version: '0.0.0.1',
        apiUrl: getUrl('CHESS_API'),
        environment: environment
    };

    return config;

    function getUrl(url){
        switch(environment.toUpperCase()){
            case "DEV":
                return 'http://localhost/' + url;
            case 'QA':
                return 'http://localhost/' + url;
            case 'PROD':
                return 'http://localhost/' + url;
        }
    }
}
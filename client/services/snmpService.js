
angular.module('SnmpService', [])
.factory('snmp', ['$http', function ($http) {
    var serviceObj = {};
    serviceObj.getData = function(oid){ 
        var data = {};
        return $http.post("http://localhost:3000/api/"+oid, data);
    };
    
    return serviceObj;
}]);
describe("Unit Testing Dashboard Component", function() {

  beforeEach(angular.mock.module('clientApp'));

  let $scope;
  let getSnmpDataMock;

  beforeEach(inject(function(_$controller_,_$rootScope_,$q) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();

    getSnmpDataMock = {
      getData: function() {
        var deferred = $q.defer();
        deferred.resolve([{message: "Disk Space or Packet Data"}]);
        return deferred.promise;
      }            
    }
  }));

  it('should test that tests are working', function() {
    expect(2 + 2).toEqual(4);
  });

  it('should have a DashboardController', function() {
    const controller = $controller('DashboardController',{$scope:$scope});
    expect(controller).toBeDefined();
  });

  it('should call the snmp service and return response', inject(function() {
    const controller = $controller('DashboardController',{$scope:$scope,snmp:getSnmpDataMock});
    $scope.$digest();
    //expect(controller.diskData).toBe([{message: "Disk Space or Packet Data"}]);
  }));
    
});

describe("Unit Test: Dashboard Component", function() {

  beforeEach(module('clientApp'));
  beforeEach(module('SnmpService'));

  var ctrl, snmpService, $q;

  beforeEach(inject(function($controller,_$q_, snmp) {
    ctrl = $controller('DashboardController');
    $q = _$q_;
    snmpService = snmp;
  }));

  it('should test that tests are working', function() {
    expect(2 + 2).toEqual(4);
  });

  it('should have a DashboardController', function() {
    expect(ctrl).toBeDefined();
  });
    
   describe('click Disk Button', function() {
    beforeEach(function(){
      var deferred = $q.defer();
      spyOn(snmpService, 'getData').and.returnValue(deferred.promise);
      ctrl.getDiskSpace();
    });

    it('should call snmpService', function() {     
      expect(snmpService.getData).toHaveBeenCalled();
    });    
  });

});

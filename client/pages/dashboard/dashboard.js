angular.module('Dashboard',['SnmpService'])
.controller("DashboardController", DashboardController)
.component('dashboard', {
	templateUrl: "pages/dashboard/dashboard.html",
    controllerAs : "vm",
	controller: "DashboardController"
});

DashboardController.$inject = ['snmp'];
function DashboardController(snmp) 
{		
        var vm = this;
        
        vm.getDiskSpace = function() {
            vm.dataLoadingSp = true;
            snmp.getData('space').then(
            function(res){
                vm.dataLoadingSp = false;
                vm.diskData = res.data;
            },
            function(err){
                vm.dataLoadingSp = false;
                vm.diskData = err;
            }
            );
        };

        vm.getPacketsData = function() {
            vm.dataLoadingPkt = true;
            snmp.getData('packets').then(
            function(res){
                vm.dataLoadingPkt = false;
                vm.packetsData = res.data;
            },
            function(err){
                vm.dataLoadingPkt = false;
                vm.packetsData = err;
            }
            );
        };
};



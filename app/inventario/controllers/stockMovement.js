(function(){
  'use strict';
  angular
    .module('ExamenWeb')
    .controller('StockMovementCtrl', ["$scope","InventarioService", "shareSessionService","$uibModal","confirmationModalService","StockMovementService","$uibModalInstance", "messageHandlerService",
        function ($scope,inventarioService,shareSessionService,$uibModal,confirmationModalService, stockMovementService, $uibModalInstance, messageHandlerService) {
            $scope.stock = {};
            $scope.getStock = function() {
                $scope.stock = stockMovementService.getStock();
            };

            $scope.doMovement = function(callback) {
                inventarioService.stockMovement($scope.stock).then(function(result) {
                    if(result.success) {
                        messageHandlerService.notifySuccess(null, result.message);
                        callback({
                            success: true,
                            message: "Operación exitosa",
                            data: $scope.stock
                        })
                    }
                    else {
                        messageHandlerService.notifyError(null, result.message);
                        callback({
                            success: false,
                            message: "Operación fallida",
                            data:null
                        })
                    }
                });
            };

            $scope.ok = function() {
                $scope.doMovement(function(result) {
                    if (result.success){
                        $scope.stock = null;
                        $uibModalInstance.close({
                            success: true,
                            data: result.data,
                            message: result.data
                        });
                    }
                    else{
                        $uibModalInstance.close({
                            success: false,
                            data: null,
                            message: result.data
                        });
                    }
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.getStock();
  }]);
})();
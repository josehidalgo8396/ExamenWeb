'use strict';

angular.module('ExamenWeb')
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, confirmationModalService) {
  $scope.modalContent = {};

  $scope.ok = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  var modalContent = function(){
  	$scope.modalContent = confirmationModalService.getModalContent();
  };

  modalContent();
});
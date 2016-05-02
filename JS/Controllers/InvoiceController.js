
EventApp.controller('InvoiceController',function($scope,$location,$state,$stateParams,SearchService,$rootScope){

    $scope.bookingId = $stateParams.bId;
    $scope.trascationId = $stateParams.txId;
    $scope.status = $stateParams.status;
    console.log($scope.bookingId + $scope.trascationId + $scope.status);

    $scope.bookingVOUrl = "http://din51002665:8181/EventManagement/finalizeBooking?bookingId="+$scope.bookingId+"&transactionId="+$scope.trascationId+"&status="+$scope.status;
    SearchService(callbackForInvoice,$scope.bookingVOUrl);

    function callbackForInvoice(data){
        console.log("Invoice Data");
        console.log(data);
        $rootScope.invoiceData = data;
    }

});
 
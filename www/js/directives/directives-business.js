var businessDirectives = angular.module('businessDirectives', []);

businessDirectives.directive('selectSizeDirective',[
  '$ionicModal',
  function(
    $ionicModal
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<label class="item item-input item-select" ng-click="sizeOpenModal()"><span class="input-label">Size</span><input ng-model="bs.sizeName" type="text" value=""></label>',
        link:function($scope, $element, $attrs){
          $ionicModal.fromTemplateUrl('templates/business/select-size.html', {
               scope: $scope,
               animation: 'slide-in-up',
               focusFirstInput: true
           }).then(function(modal) {
               $scope.sizemodal = modal
           });
           $scope.sizeOpenModal = function() {
               $scope.sizemodal.show()
           };
           $scope.sizeCloseModal = function() {
             $scope.sizemodal.hide();
           };

           $scope.selectSize = function(key, value) {
             $scope.bs.size = key;
             $scope.bs.sizeName = value;
             $scope.sizeCloseModal();
           };
        }
    };
  }
]);

businessDirectives.directive('selectCategoryDirective',[
  '$ionicModal',
  function(
    $ionicModal
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<label class="item item-input item-select" ng-click="categoryOpenModal()"><span class="input-label">Category</span><input ng-model="bs.categoryName" type="text" value=""></label>',
        link:function($scope, $element, $attrs){
          $ionicModal.fromTemplateUrl('templates/business/select-category.html', {
               scope: $scope,
               animation: 'slide-in-up',
               focusFirstInput: true
           }).then(function(modal) {
               $scope.categorymodal = modal
           });
           $scope.categoryOpenModal = function() {
               $scope.categorymodal.show()
           };
           $scope.categoryCloseModal = function() {
             $scope.categorymodal.hide();
           };

           $scope.selectCategory = function(key, value) {
             $scope.bs.category = key;
             $scope.bs.categoryName = value;
             $scope.categoryCloseModal();
           };
        }
    };
  }
]);

businessDirectives.directive('selectTypeDirective',[
  '$ionicModal',
  function(
    $ionicModal
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<label class="item item-input item-select" ng-click="typeOpenModal()"><span class="input-label">Type</span><input ng-model="bs.typeName" type="text" value=""></label>',
        link:function($scope, $element, $attrs){
          $ionicModal.fromTemplateUrl('templates/business/select-type.html', {
               scope: $scope,
               animation: 'slide-in-up',
               focusFirstInput: true
           }).then(function(modal) {
               $scope.typemodal = modal
           });
           $scope.typeOpenModal = function() {
               $scope.typemodal.show()
           };
           $scope.typeCloseModal = function() {
             $scope.typemodal.hide();
           };
           $scope.selectType = function(key, value) {
             $scope.bs.type = key;
             $scope.bs.typeName = value;
             $scope.typeCloseModal();
           };
        }
    };
  }
]);

businessDirectives.directive('selectCurrencyDirective',[
  '$ionicModal',
  function(
    $ionicModal
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<label class="item item-input item-select" ng-click="currencyOpenModal()"><span class="input-label">Currency</span><input ng-model="bs.currencyName" type="text" value=""></label>',
        link:function($scope, $element, $attrs){
          $ionicModal.fromTemplateUrl('templates/business/select-currency.html', {
               scope: $scope,
               animation: 'slide-in-up',
               focusFirstInput: true
           }).then(function(modal) {
               $scope.currencymodal = modal
           });
           $scope.currencyOpenModal = function() {
               $scope.currencymodal.show()
           };
           $scope.currencyCloseModal = function() {
             $scope.currencymodal.hide();
           };
           $scope.selectCurrency = function(key, value) {
             $scope.bs.currency = key;
             $scope.bs.currencyName = value;
             $scope.currencyCloseModal();
           };
        }
    };
  }
]);

businessDirectives.directive('selectCrmPointsDirective',[
  '$ionicModal',
  function(
    $ionicModal
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<label class="item item-input item-select" ng-click="crmPointsOpenModal()"><span class="input-label">CRM Points</span><input ng-model="bs.crm_pointsName" type="text" placeholder="" value=""></label>',
        link:function($scope, $element, $attrs){
          $ionicModal.fromTemplateUrl('templates/business/select-crm-points.html', {
               scope: $scope,
               animation: 'slide-in-up',
               focusFirstInput: true
           }).then(function(modal) {
               $scope.crmPointsmodal = modal
           });
           $scope.crmPointsOpenModal = function() {
               $scope.crmPointsmodal.show()
           };
           $scope.crmPointsCloseModal = function() {
             $scope.crmPointsmodal.hide();
           };
           $scope.selectCrmPoints = function(key, value) {
             $scope.bs.crm_points = key;
             $scope.bs.crm_pointsName = value;
             $scope.crmPointsCloseModal();
           };
        }
    };
  }
]);

businessDirectives.directive('selectCountryDirective',[
  '$ionicModal',
  function(
    $ionicModal
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<label class="item item-input item-select" ng-click="countryOpenModal()"><span class="input-label">Country</span><input ng-model="bs.countryName" type="text" value=""></label>',
        link:function($scope, $element, $attrs){
          $ionicModal.fromTemplateUrl('templates/business/select-country.html', {
               scope: $scope,
               animation: 'slide-in-up',
               focusFirstInput: true
           }).then(function(modal) {
               $scope.countrymodal = modal
           });
           $scope.countryOpenModal = function() {
               $scope.countrymodal.show()
           };
           $scope.countryCloseModal = function() {
             $scope.countrymodal.hide();
           };
           $scope.selectCountry = function(key, value) {
             $scope.bs.country = key;
             $scope.bs.countryName = value;
             $scope.countryCloseModal();
           };
        }
    };
  }
]);

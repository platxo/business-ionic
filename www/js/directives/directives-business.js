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

businessDirectives.directive('compile', ['$compile', function ($compile) {
    return function(scope, iElement, iAttrs) {
        var x = scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(iAttrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                iElement.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(iElement.contents())(scope);

                //deactivate watch if "compile-once" is set to "true"
                if(iAttrs.compileOnce === 'true'){
                    x();
                }
            }
        );
    };
}]);

businessDirectives.directive('modalSelect', ['$ionicModal','$timeout', '$filter', function ($ionicModal, $timeout, $filter) {
    return {
        restrict: 'A',
        require : 'ngModel',
        scope: { options:"=", optionGetter:"&", onSelect:"&" },
        link: function (scope, iElement, iAttrs, ngModelController, transclude) {

            var shortList;
            var shortListBreak = iAttrs.shortListBreak ? parseInt(iAttrs.shortListBreak) : 10;
            var setFromProperty= iAttrs.optionProperty;
            var onOptionSelect = iAttrs.optionGetter;

            //#todo: multiple is not working right now
            var multiple = iAttrs.multiple  ? true : false;
            if(multiple){
                scope.checkedItems = [];
            }

            scope.ui = {
                modalTitle : iAttrs.modalTitle || 'Select an option',
                okButton : iAttrs.okButton || 'OK',
                hideReset : iAttrs.hideReset  !== "true" ? false : true,
                resetButton : iAttrs.okButton || 'Reset',
                cancelButton : iAttrs.cancelButton || 'Cancel',
                loadListMessage : iAttrs.loadListMessage || 'Loading',
                modalClass : iAttrs.modalClass || '',
                headerFooterClass : iAttrs.headerFooterClass || 'bar-stable',
                value  : null,
                selectedClass : iAttrs.selectedClass || 'option-selected',
                //search stuff
                hasSearch : iAttrs.hasSearch  !== "true" ? false : true,
                searchValue : '',
                subHeaderClass : iAttrs.subHeaderClass || 'bar-stable',
                cancelSearchButton : iAttrs.cancelSearchButton || 'Cancel',

            };

            // getting options template
            var opt = iElement[0].querySelector('.option');
            if(!opt){
                throw new Error({
                    name:'modalSelectError:noOptionTemplate',
                    message:'When using modalSelect directive you must include an element with class "option" to provide a template for your select options.',
                    toString:function(){
                        return this.name + " " + this.message;
                    }
                });
            }
            scope.inner = angular.element(opt).html();
            angular.element(opt).remove();

            //shortList controls wether using ng-repeat instead of collection-repeat
            if(iAttrs.useCollectionRepeat === "true"){
                shortList = false;
            } else if(iAttrs.useCollectionRepeat === "false") {
                shortList = true;
            } else {
                shortList = scope.options.length < shortListBreak;
            };

            scope.ui.shortList = shortList;

            ngModelController.$render = function(){
                scope.ui.value = ngModelController.$viewValue;
            };

            var getSelectedValue = scope.getSelectedValue = function(option){
                if(!option){
                    return null;
                }
                if(onOptionSelect){
                    var out = scope.optionGetter({option:option});
                    return out;
                }
                if(setFromProperty){
                    val = option[setFromProperty]
                } else {
                    val = option;
                }
                return val;
            };

            scope.setOption = function(option){
                var oldValue = ngModelController.$viewValue;
                var val = getSelectedValue(option);
                ngModelController.$setViewValue(val);
                ngModelController.$render();
                scope.closeModal();
                if(scope.onSelect){
                    scope.onSelect({ newValue: val, oldValue: oldValue });
                }
            };

            scope.unsetValue = function(){
                $timeout(function(){
                    ngModelController.$setViewValue("");
                    ngModelController.$render();
                    scope.modal.hide();
                    scope.showList = false;
                });
            };

            scope.closeModal = function(){
                scope.modal.hide().then(function(){
                    scope.showList = false;
                });
            };

            //loading the modal
            var modalTpl = multiple ? 'templates/partials/modal-template-multiple.html' : 'templates/partials/modal-template.html';
            scope.modal = $ionicModal.fromTemplate(
                modalSelectTemplates[modalTpl],
                { scope: scope }
            );

            scope.$on('$destroy', function(){
                scope.modal.remove();
            });

            iElement.on('click', function(){
                if(shortList){
                    scope.showList = true;
                    scope.modal.show()
                } else {
                    scope.modal.show()
                    .then(function(){
                        scope.showList = true;
                    });
                }
            });

            //filter function
            if(scope.ui.hasSearch){
                var allOptions = angular.copy(scope.options);
                scope.$watch('ui.searchValue', function(nv){
                    scope.options = $filter('filter')(allOptions, nv);
                });
                scope.clearSearch = function(){
                    scope.ui.searchValue = '';
                }
            }



            ngModelController.$render();

        }
    };
}])

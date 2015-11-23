(function(angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name upload.utilities
   * @description
   * # utilities
   * Factory in upload.
   */
  angular.module('materialFm')
    .service('utilities', utilities);

  function utilities($mdSidenav, $mdUtil, $log) {
    var service = this;

    service.buildToggler = buildToggler;

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
    }
  }
})(angular);

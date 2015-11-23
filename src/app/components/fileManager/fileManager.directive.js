(function(angular) {
  'use strict';

  angular
    .module('materialFm')
    .directive('fileManager', fileManager);

  /** @ngInject */
  function fileManager() {
    var directive = {
      restrict: 'EA',
      scope: {},
      template: '<ng-transclude layout="row" flex layout-fill></ng-transclude>',
      // compile: fileManagerCompiler,
      bindToController: {
        folders: '='
      },
      controller: fileManagerController,
      controllerAs: 'fm',
      transclude: true
    };

    return directive;

    // function fileManagerCompiler(iElem) {
    //   return recursionHelper.compile(iElem);
    // }

    /** @ngInject */
    function fileManagerController($attrs, $element, $log, $mdSidenav, list) {
      var vm = this;
      $log.debug(vm.folders);

      vm.updatePath = updatePath;

      function updatePath() {
        $log.debug(list.currentPath);
      }
    }
  }

})(angular);

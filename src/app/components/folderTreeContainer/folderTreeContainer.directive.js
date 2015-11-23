(function(angular) {
  'use strict';

  angular
    .module('materialFm')
    .directive('folderTreeContainer', folderTreeContainer);

  /** @ngInject */
  function folderTreeContainer() {
    var directive = {
      restrict: 'EA',
      require: '^fileManager',
      templateUrl: 'app/components/folderTreeContainer/folderTreeContainer.html',
      scope: {},
      bindToController: {
        folders: '=',
        openFt: '=openFolderTree'
      },
      controller: folderTreeController,
      controllerAs: 'ftc'
    };

    return directive;

    // function folderTreeCompiler(iElem) {
    //   return recursionHelper.compile(iElem);
    // }

    /** @ngInject */
    function folderTreeController($scope, $attrs, $element, $log, $mdSidenav, list) {
      var vm = this;
      $log.debug(vm.folders);

      $attrs.$observe('openFolderTree', updateFtState);

      vm.close = close;
      vm.updatePath = updatePath;

      function updatePath() {
        list.currentPath = null;
      }

      function updateFtState(newValue) {
        newValue = !!newValue;
        if (newValue) {
          open();
        } else {
          close();
        }
      }

      function open() {
        $mdSidenav('tree').open()
          .then(function () {
            vm.openFt = true;
          });
      }

      function close() {
        $mdSidenav('tree').close()
          .then(function () {
            vm.openFt = false;
          });
      }
    }
  }

})(angular);

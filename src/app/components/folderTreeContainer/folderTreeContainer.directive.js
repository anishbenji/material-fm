(function(angular) {
  'use strict';

  angular
    .module('upload')
    .directive('folderTreeContainer', folderTreeContainer);

  /** @ngInject */
  function folderTreeContainer() {
    var directive = {
      restrict: 'EA',
      require: '^fileManager',
      templateUrl: 'app/components/folderTreeContainer/folderTreeContainer.html',
      scope: {
        folders: '=',
        openFt: '=openFolderTree'
      },
      controller: folderTreeController
    };

    return directive;

    // function folderTreeCompiler(iElem) {
    //   return recursionHelper.compile(iElem);
    // }

    /** @ngInject */
    function folderTreeController($scope, $attrs, $element, $log, $mdSidenav) {
      console.debug($scope.folders);

      $attrs.$observe('openFolderTree', updateFtState);

      $scope.close = close;

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
            $scope.openFt = true;
          });
      };

      function close() {
        $mdSidenav('tree').close()
          .then(function () {
            $scope.openFt = false;
          });
      };
    }
  }

})(angular);

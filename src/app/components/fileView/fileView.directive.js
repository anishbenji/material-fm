(function(angular) {
  'use strict';

  angular
    .module('upload')
    .directive('fileView', fileView);

  /** @ngInject */
  function fileView() {
    var directive = {
      restrict: 'EA',
      // replace: true,
      require: ['^fileManager'],
      templateUrl: 'app/components/fileView/fileView.html',
      scope: {
        path: '='
      },
      // compile: folderTreeCompiler,
      // bindToController: {
      //   folders: '='
      // },
      controller: fileViewController
      // controllerAs: 'ft'/*,*/
      // transclude: true
    };

    return directive;

    // function folderTreeCompiler(iElem) {
    //   return recursionHelper.compile(iElem);
    // }

    /** @ngInject */
    function fileViewController($scope, $attrs, $element, $window, $log, list) {
      $scope.downloadPath = list.basePath;
      $scope.files = list.files;

      $scope.updatePath = updatePath;
      $scope.deleteFile = deleteFile;
      $scope.downloadFile = downloadFile;

      // UPDATE THIS TO NOT USE $watch
      $scope.$watch(function() {
        return list.currentPath;
      }, function(newValue) {
        if (newValue) {
          $scope.files = newValue[newValue.length - 1].list;

        } else {
          $scope.files = list.data;
        }
        $log.debug($scope.files);
      }, false);

      function updatePath(folder) {
        if (folder.list){
          if (list.currentPath === null) {
            list.currentPath = [folder];
          } else {
            list.currentPath.push(folder);
          }
          $scope.files = folder.list;
        }
      }

      function deleteFile(path) {
        $log.debug(list.deletePath + path);
        list.deletePath(path);
      }

      function downloadFile(path) {
        $log.debug(list.downloadPath + path);
        $window.open(list.downloadPath + path);
      }
    }
  }

})(angular);

(function(angular) {
  'use strict';

  angular
    .module('upload')
    .directive('folderTree', folderTree);

  /** @ngInject */
  function folderTree($log, recursionHelper, list) {
    var directive = {
      restrict: 'A',
      require: ['^fileManager', '?breadcrumbs', '?folderView'],
      template: '<div ng-repeat="(key, value) in folders track by $index">' +
                '  <div layout="row" layout-fill>' +
                '    <div ng-if="!value.sub" class="folder-state"></div>' +
                '    <div ng-if="value.sub" ng-click="value.open=!value.open" class="folder-state" ng-bind="value.open?\'-\':\'+\'"></div>' +
                '    <div flex ng-click="updatePath(value.path)" ng-bind="key"></div>' +
                '  </div>' +
                '  <div ng-if="value.sub && value.open" class="tree-leaf" folder-tree folders="value.sub"></div>' +
                '</div>',
      scope: {folders: '='},
      compile: folderTreeCompiler,
      // bindToController: {
      //   folders: '='
      // },
      // controller: folderTreeController,
      // controllerAs: ft,
      link: folderTreeLinkFn
    };

    return directive;

    function folderTreeCompiler(iElem) {
      return recursionHelper.compile(iElem, folderTreeLinkFn);
    }

    function folderTreeLinkFn(scope, iAttrs, iElem, externalControllers) {
      var fm = externalControllers[0];
      var bc = externalControllers[1];
      var fv = externalControllers[2];
      $log.debug(scope.folders, fm, bc, fv);

      scope.updatePath = updatePath;

      function updatePath(path) {
        list.setCurrentPath(path);
        fm.updatePath();
        (bc) && bc.updatePath();
        (fv) && fv.updatePath();
      }
    }

    function folderTreeController($scope) {

    }
  }

})(angular);

(function(angular) {
  'use strict';

  angular
    .module('upload')
    .directive('folderTree', folderTree);

  /** @ngInject */
  function folderTree($log, recursionHelper, list) {
    var directive = {
      restrict: 'A',
      require: ['^fileManager', '^folderTreeContainer'],
      template: '<div ng-repeat="(key, value) in folders track by $index">' +
                '  <div class="folder-tree" layout="row">' +
                '    <div ng-if="!value.sub" class="folder-state"></div>' +
                '    <md-button ng-if="value.sub" ng-click="value.open=!value.open" class="folder-state md-icon-button" aria-label="Expand {{::key}}">' +
                '      <md-icon md-svg-icon="assets/icons/{{value.open?\'ic_remove_24px\':\'ic_add_24px\'}}.svg"></md-icon>' +
                '    </md-button>' +
                // '    <div ng-if="value.sub" ng-click="value.open=!value.open" class="folder-state pointer" ng-bind="value.open?\'-\':\'+\'"></div>' +
                '    <md-button flex ng-click="updatePath(value.path)" class="folder-btn tree-leaf" aria-label="Navigate to {{::key}}" ng-bind="::key"></md-button>' +
                '  </div>' +
                '  <div ng-if="value.sub && value.open" class="tree-leaf folder-btn" folder-tree folders="value.sub"></div>' +
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
      var ftc = externalControllers[1];
      // $log.debug(scope.folders, ftc);

      scope.updatePath = updatePath;

      function updatePath(path) {
        list.setCurrentPath(path);
        fm.updatePath();
        ftc.close();
      }
    }

    // function folderTreeController($scope) {

    //   list.registerUpdate


    //   function updatePath() {
    //     $scope.folders = list.currentPath;
    //   }
    // }
  }

})(angular);

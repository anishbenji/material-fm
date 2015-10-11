(function(angular) {
  'use strict';

  angular
    .module('upload')
    .directive('breadcrumbs', breadcrumbs);

  /** @ngInject */
  function breadcrumbs() {
    var directive = {
      restrict: 'EA',
      require: ['^fileManager', '?folderTree', '?folderView'],
      templateUrl: 'app/components/breadcrumbs/breadcrumbs.html',
      scope: {
        path: '='
      },
      // compile: folderTreeCompiler,
      // bindToController: {
      //   folders: '='
      // },
      controller: breadcrumbsController
      // controllerAs: 'ft'/*,*/
      // transclude: true
    };

    return directive;

    // function folderTreeCompiler(iElem) {
    //   return recursionHelper.compile(iElem);
    // }

    /** @ngInject */
    function breadcrumbsController($scope, $attrs, $element, $log) {

    }
  }

})(angular);

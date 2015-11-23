(function(angular) {
  'use strict';

  angular
    .module('materialFm')
    .directive('breadcrumbs', breadcrumbs);

  /** @ngInject */
  function breadcrumbs() {
    var directive = {
      restrict: 'EA',
      // replace: true,
      // require: ['^fileManager'],
      templateUrl: 'app/components/breadcrumbs/breadcrumbs.html',
      scope: {},
      // compile: folderTreeCompiler,
      bindToController: {
        path: '='
      },
      controller: breadcrumbsController,
      controllerAs: 'bc'
    };

    return directive;

    // function folderTreeCompiler(iElem) {
    //   return recursionHelper.compile(iElem);
    // }

    /** @ngInject */
    function breadcrumbsController($scope, $attrs, $element, $log, list) {
      var vm = this;
      vm.setPath = setPath;

      // UPDATE THIS TO NOT USE $watch
      $scope.$watch(function() {
        return list.currentPath;
      }, function(newValue) {
        vm.path = newValue;
        $log.debug($scope.path);
      }, false);

      function setPath(index) {
        list.currentPath = index === -1 ? null : vm.path.splice(0, index + 1);
      }

      // function updatePath() {
      //   vm.path = list.currentPath;
      // }
    }
  }

})(angular);

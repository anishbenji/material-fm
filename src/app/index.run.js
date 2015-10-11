(function() {
  'use strict';

  angular
    .module('upload')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

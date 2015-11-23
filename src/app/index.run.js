(function() {
  'use strict';

  angular
    .module('materialFm')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

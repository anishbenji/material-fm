(function() {
  'use strict';

  angular
    .module('materialFm')
    .config(config);

  /** @ngInject */
  function config($logProvider, $compileProvider) {
    // Enable log
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }

})();

(function() {
  'use strict';

  angular
    .module('upload')
    .config(config);

  /** @ngInject */
  function config($logProvider, $compileProvider) {
    // Enable log
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }

})();

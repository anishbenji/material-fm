(function(angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name upload.getData
   * @description
   * # getData
   * Factory in upload.
   */
  angular.module('upload')
    .service('getData', getData);

  function getData($http, $log) {
    this.async = function(url) {
      return $http.get(url).then(function(response) {
        return response.data;
      }, function(response) {
        $log.warn('Unable to connect to server', response);
        throw new Error('Unable to connect to server' + response);
      });
    };
  }
})(angular);

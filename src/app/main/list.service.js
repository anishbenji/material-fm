(function(angular) {
  'use strict';

  angular
      .module('materialFm')
      .service('list', list);

  /** @ngInject */
  function list($q, $http, $log, getData, preprocess) {
    var service = this;
    var url;
    service.downloadPath = '/anish/filemanager/download.php?path=';
    service.deletePath = deletePath;
    $log.debug('Starting discover feed service');

    // dev & testing
    url = '/anish/filemanager/listfolder.php?path=';
    service.currentPath = null;

    service.getFiles = getFiles;
    service.setCurrentPath = setCurrentPath;

    function setCurrentPath(path) {
      service.currentPath = preprocess.pathRead(service.data, path, null)
    }

    function deletePath(path) {
      var delPath = '/anish/filemanager/delete.php?path=';
      $http.post(delPath + path).then(function(response) {
        $log.debug(response);
      });
    }

    function getFiles(path) {
      var deferred = $q.defer();
      path = path || 'files';
      if (!service.data) {
        service.currentPath = [path];
        getData.async(url+encodeURIComponent(path)).then(function(response) {
          if (angular.isDefined(response)) {
            $log.debug('feed before preprocessing: ', response);
            service.data = angular.fromJson(response);
            preprocess.creatUrl(service.data, '');
            service.folders = preprocess.folders(response, [], ['id']);
            deferred.resolve(service.data);
            $log.debug('feed after preprocessing: ', service.data);
          } else {
            deferred.reject(response);
          }
          service.currentPath = null;
        });
      } else {
        deferred.resolve(service.data);
      }

      return deferred.promise;
    }
  }

})(angular);

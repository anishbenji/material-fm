(function(angular) {
  'use strict';

  angular
      .module('upload')
      .service('list', list);

  /** @ngInject */
  function list($q, $log, getData, preprocess) {
    var service = this;
    var url;
    service.basePath = '/anish/filemanager/download.php?path=files';
    $log.debug('Starting discover feed service');

    // dev & testing
    url = '/anish/filemanager/listfolder.php?path=';
    service.currentPath = null;

    service.getFiles = getFiles;
    service.setCurrentPath = setCurrentPath;

    function setCurrentPath(path) {
      service.currentPath = preprocess.pathRead(service.data, path, null)
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
            preprocess.createDownloadLink(service.data, service.basePath);
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

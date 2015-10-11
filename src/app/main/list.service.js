(function(angular) {
  'use strict';

  angular
      .module('upload')
      .service('list', list);

  /** @ngInject */
  function list($q, $log, getData, preprocess) {
    var service = this;
    // var datasource = {};
    // var max = 0;
    var url;
    // var currentPath = null;

    // url = 'v2/getipfeed.php?city=' + prefs.data.cityName.toLowerCase();
    // if (angular.isDefined(prefs.data.email) && prefs.data.email !== null && prefs.data.email !== '') {
    //   url += '&email=' + prefs.data.email;
    // }

    // if (angular.isDefined(prefs.data.prefsId) && prefs.data.prefsId !== null && prefs.data.prefsId !== 'NA' && prefs.data.prefsId !== '') {
    //   url += '&q=' + prefs.data.prefsId;
    // }

    $log.debug('Starting discover feed service');

    // dev & testing
    url = '/anish/filemanager/listfolder.php?path=';
    // prefs.disableFeedback = true;
    service.currentPath = null;

    service.getFiles = getFiles;
    service.setCurrentPath = setCurrentPath;

    function setCurrentPath(path) {
      service.currentPath = preprocess.pathRead(service.data, path, null)
    }

    function getFiles(path) {
      var deferred = $q.defer();
      path = path || 'files';
      // refreshFeed = refreshFeed || false;
      if (!service.data) {
        service.currentPath = [path];
        getData.async(url+encodeURIComponent(path)).then(function(response) {
          if (angular.isDefined(response)) {
            $log.debug('feed before preprocessing: ', response);
            service.data = angular.fromJson(response);
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

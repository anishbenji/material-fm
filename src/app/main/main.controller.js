(function() {
  'use strict';

  angular
    .module('upload')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, $log, Upload, list, utilities) {
    var vm = this;

    vm.toggleTree = utilities.buildToggler('tree');


    list.getFiles().then(function() {
      vm.list = list.data;
      vm.folders = list.folders;
    });

    vm.log = '';

    vm.upload = function (files) {
      var path = 'files/';
      if (list.currentPath !== null) {
        path += list.currentPath[list.currentPath.length -1].name + '/';
      }

      if (files && files.length) {
        $log.debug(files, path);

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var reg = new RegExp(escapeRegExp(file.name) + '$');
          var tempPath;
          if (angular.isDefined(file.path)) {
            tempPath = path + file.path.replace(reg, '');
          } else {
            tempPath = path;
          }
          $log.debug(file);

          if (!file.$error) {
            Upload.upload({
              url: '/anish/filemanager/upload.php',
              method: 'POST',
              // url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
              data: {
                // username: 'anish',
                file: file,
                path: tempPath
              }
            }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              vm.log = 'progress: ' + progressPercentage + '% ' +
                            evt.config.data.file.name + '\n' + vm.log;
            }).success(function (data, status, headers, config) {
              $timeout(function() {
                vm.log = 'file: ' + config.data.file.name + ', Response: ' + angular.toJson(data) + '\n' + vm.log;
              });
            });
          }
        }
      }
    };

    function escapeRegExp(s) {
      return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    }

    // function escapeSubstitute(s) {
    //   return s.replace(/\$/g, '$$$$');
    // }

  }
})();

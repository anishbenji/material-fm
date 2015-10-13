(function() {
  'use strict';

  angular
    .module('upload')
    .controller('MainController', MainController)
    /*.controller('LeftCtrl', function (vm, $timeout, $mdSidenav, $log, list) {



    list.getFiles().then(function() {
      vm.folders = list.folders;
    });


  })*/;

  /** @ngInject */
  function MainController($scope, $timeout, $log, Upload, list, utilities) {
    var vm = this;

    vm.toggleTree = utilities.buildToggler('tree');


    list.getFiles().then(function() {
      vm.list = list.data;
      vm.folders = list.folders;
    });

    $scope.$watch('files', function () {
      vm.upload(vm.files);
    });
    $scope.$watch('file', function () {
      if (vm.file != null) {
        vm.files = [vm.file];
      }
    });
    vm.log = '';

    vm.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {
            Upload.upload({
              url: '/anish/filemanager/upload.php',
              data: {
                username: vm.username,
                file: file
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

  }
})();

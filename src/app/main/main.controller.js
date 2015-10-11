(function() {
  'use strict';

  angular
    .module('upload')
    .controller('MainController', MainController)
    /*.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log, list) {



    list.getFiles().then(function() {
      $scope.folders = list.folders;
    });


  })*/;

  /** @ngInject */
  function MainController($scope, $timeout, $log, Upload, list, utilities) {

    $scope.toggleTree = utilities.buildToggler('tree');


    list.getFiles().then(function() {
      $scope.list = list.data;
      $scope.folders = list.folders;
    });

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
      if ($scope.file != null) {
        $scope.files = [$scope.file];
      }
    });
    $scope.log = '';

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {
            Upload.upload({
              url: 'upload.php',
              data: {
                username: $scope.username,
                file: file
              }
            }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $scope.log = 'progress: ' + progressPercentage + '% ' +
                            evt.config.data.file.name + '\n' + $scope.log;
            }).success(function (data, status, headers, config) {
              $timeout(function() {
                $scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
              });
            });
          }
        }
      }
    };

  }
})();

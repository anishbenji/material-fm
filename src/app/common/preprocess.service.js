(function() {
  'use strict';

  angular
      .module('upload')
      .service('preprocess', preprocess);

  /** @ngInject */
  function preprocess($log) {
    var service = this;
    $log.debug('Starting preprocess service');

    service.folders = folders;
    service.pathRead = pathRead;

    function folders(obj, currentPath, params) {
      var i;
      var j;
      var result = false;
      var temp;
      var newPath;
      for (i in obj) {
        if (typeof obj[i].list === 'object') {
          if (result === false ) {
            result = {};
          }
          for (j in params) {
            result[obj[i].name] = {};
            result[obj[i].name][params[j]] = obj[i][params[j]];
          }
          newPath = angular.copy(currentPath);
          // newPath.push(obj[i].name);
          newPath.push(i);
          result[obj[i].name].path = newPath;
          result[obj[i].name].open = false;
          temp = folders(obj[i].list, newPath, params);
          if (temp !== false) {
            result[obj[i].name].sub = temp;
          }
        }
      }

      return result;
    }

  }

  /**
   * Read arbitrary properties & values in a nested object/array
   * @param {Object|Array} obj
   * @param {Array} path for each level of object/array
   * @param {*} def default value ( if result undefined )
   * @returns {*}
  */
  function pathRead(obj, path, def) {
    var newObj = [];
    for (var i = 0, len = path.length; i < len; i++) {
      obj = obj[path[i]] ? obj[path[i]] : obj.list[path[i]];
      if (!obj || typeof obj !== 'object') {
        return def;
      }
      newObj.push(obj);

    }

    // $log.log(obj);
    return newObj;
  }

})();

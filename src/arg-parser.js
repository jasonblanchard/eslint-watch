'use strict';
var path = require('path');
var _ = require('lodash');

var simpleDetail = 'simple-detail';
var formatterPath = 'formatters';

var defaultPath = './';
var formatKey = '-f';
var keys = {
  '-w': true,
  '--watch': true
};
var formats = { // still don't like this can cause too much duplication
  'simple': true,
  'simple-success': true,
  'simple-detail': true
};
var bin = {
  node: 'node',
  iojs: 'iojs',
  esw: 'esw'
};

var getPath = function(options){
  return path.join(__dirname, formatterPath, options.format);
};

var contains = function(str, items){
  return _.some(items, function(item){
    return str.indexOf(item) >= 0;
  });
};

module.exports = {
  parse: function (args, options) {
    var arr = [];
    var dirs = options._;
    var formatSpecified = false;
    _.each(args, function(item){
      if (!keys[item] && !formats[item] && !bin[item] && !contains(item, [bin.esw, bin.iojs])) {
        arr.push(item);
      }
      if (formats[item]) {
        formatSpecified = true;
        arr.push(getPath(options));
      }
    });
    if (options.format === simpleDetail && !formatSpecified) {
      arr.push(formatKey);
      arr.push(getPath(options));
    }
    if (!dirs.length) {
      arr[arr.length] = defaultPath;
    }
    return arr;
  }
};

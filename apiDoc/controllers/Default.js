'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.registerPOST = function registerPOST (req, res, next) {
  Default.registerPOST(req.swagger.params, res, next);
};

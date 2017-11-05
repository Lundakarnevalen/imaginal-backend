'use strict';

exports.registerPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (User)
  **/
    var examples = {};
  examples['application/json'] = {
  "success" : true,
  "message" : "aeiou",
  "accessToken" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}


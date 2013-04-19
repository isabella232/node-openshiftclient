var request = require("request");
var underscore = require("underscore");

var OpenShiftClient = function() {
  "use strict";

  if(arguments.length === 1) {
    var authKey = arguments[0];
    if (!OpenShiftClient.validateAuthKey(authKey)) {
      throw new Error("Invalid authkey");
    }
    this.authKey = authKey;
  }
  else if (arguments.length === 2) {
    this.username = arguments[0];
    this.password = arguments[1];
  }
  else {
    throw new Error(arguments.length + " arguments given, 1 or 2 expected");
  }

  this.baseUrl = "https://openshift.redhat.com/broker/rest/";
};

module.exports = OpenShiftClient;

var authKeyValidator = /^[a-f0-9]{64}$/i;
OpenShiftClient.validateAuthKey = function(authKey) {
  "use strict";
  return authKeyValidator.test(authKey);
};

OpenShiftClient.prototype._request = function(path, method, body, callback) {
  "use strict";

  var self = this;

  this._doRequest({
    "headers": {
      "Authorization": "Bearer "+this.authKey
    },
    "url": this.baseUrl + path,
    "method": method,
    "body": body,
  }, function(error, response, body) {
    if(underscore.isFunction(callback)) {
      callback(error, body, response);
    }
  });
};

OpenShiftClient.prototype._doRequest = function() {
  "use strict";

  request(arguments);
};

OpenShiftClient.prototype.listDomains = function(callback) {
  "use strict";

  this._request("domains", "GET", null, callback);
};


var request = require("request");

var OpenShiftClient = function() {
  "use strict";

  if(arguments.length === 1) {
    this.authKey = arguments[0];
  } else if (arguments.length === 2) {
    this.username = arguments[0];
    this.password = arguments[1];
  } else {
    throw new Error(arguments.length + " arguments given, 1 or 2 expected");
  }

  this.baseUrl = "https://openshift.redhat.com/broker/rest/";
};

module.exports = OpenShiftClient;

OpenShiftClient.prototype.request = function(path, method, body, callback) {
  "use strict";
  var self = this;

  request({
    "headers": {
      "Authorization": "Bearer "+this.authKey
    },
    "url": this.baseUrl + path,
    "method": method,
    "body": body,
  }, function(error, response, body) {
    callback(error, body, response);
  });
};

OpenShiftClient.prototype.listDomain = function(callback) {
  "use strict";
  this.request("domains", "GET", null, callback);
};

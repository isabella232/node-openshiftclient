var https = require("https");
var underscore = require("underscore");
var util = require("util");
var winston = require("winston");
var request = require("request");

var OpenShiftClient = function(authKey) {
  "use strict";
  this.authKey = authKey;
  this.baseUrl = "https://openshift.redhat.com/broker/rest/"
};

module.exports = OpenShift;

OpenShiftClient.prototype.request = function(path, method, body, callback) {
  "use strict";
  var self = this;

  request({
    "headers" {
      "Authorization": "Bearer "+this.authKey
    },
    "url": this.baseUrl + path,
    "method": method,
    "body": body,
  }, function(error, response, body) {
    callback(error, body, response)
  });
};

OpenShiftClient.prototype.listDomain = function(callback) {
  "use strict";
  this.request("domains", "GET", null, callback);
};

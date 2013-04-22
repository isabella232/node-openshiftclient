var request = require("request");
var underscore = require("underscore");

var fromAuthKey = function(authKey) {
    return function(requestOptions) {
        requestOptions.headers.Authorization = "Bearer " + authKey;
    };
};

var fromUserNameAndPassword = function(username, password) {
    var userAndPass = this.username + ":" + this.password;
    var encodedAuthorization = new Buffer(userAndPass).toString("base64")

    return function(requestOptions) {
        requestOptions.headers.Authorization = "Basic " + encodedAuthorization;
    };
};

var OpenShiftClient = function() {
    "use strict";

    if(arguments.length === 1) {
        var authKey = arguments[0];
        if (!OpenShiftClient.validateAuthKey(authKey)) {
            throw new Error("Invalid authkey");
        }
        this.authKey = authKey;
        this._addAuthorizationHeaders = fromAuthKey(authKey);
    }
    else if (arguments.length === 2) {
        this.username = arguments[0];
        this.password = arguments[1];
        this._addAuthorizationHeaders = fromUserNameAndPassword(username, password);
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
    var requestOptions = {
        "headers": {},
        "url": this.baseUrl + path,
        "method": method,
        "body": body,
    };
    this._addAuthorizationHeaders(requestOptions);

    this._doRequest(requestOptions,
    function(error, response, body) {
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


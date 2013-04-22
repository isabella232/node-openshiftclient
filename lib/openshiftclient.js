var request = require("request");
var underscore = require("underscore");

var fromAuthKey = function(authToken) {
    "use strict";

    return function(requestOptions) {
        requestOptions.headers.Authorization = "Bearer " + authToken;
    };
};

var fromUserNameAndPassword = function(username, password) {
    "use strict";

    var userAndPass = username + ":" + password;
    var encodedAuthorization = new Buffer(userAndPass).toString("base64");

    return function(requestOptions) {
        requestOptions.headers.Authorization = "Basic " + encodedAuthorization;
    };
};

var OpenShiftClient = function() {
    "use strict";

    if(arguments.length === 1) {
        var authToken = arguments[0];
        if (!OpenShiftClient.validateAuthKey(authToken)) {
            throw new Error("Invalid authentication token ("+authToken+")");
        }
        this.authToken = authToken;
        this._addAuthorizationHeaders = fromAuthKey(authToken);
    }
    else if (arguments.length === 2) {
        this.username = arguments[0];
        this.password = arguments[1];
        this._addAuthorizationHeaders = fromUserNameAndPassword(this.username, this.password);
    }
    else {
        throw new Error(arguments.length + " arguments given, 1 or 2 expected");
    }

    this.baseUrl = "https://openshift.redhat.com/broker/rest/";
};

module.exports = OpenShiftClient;

var authTokenValidator = /^[a-f0-9]{64}$/i;
OpenShiftClient.validateAuthKey = function(authToken) {
    "use strict";

    return authTokenValidator.test(authToken);
};

OpenShiftClient.prototype._request = function(path, method, body, callback) {
    "use strict";

    var self = this;
    var requestOptions = {
        "headers": { },
        "url": this.baseUrl + path,
        "method": method,
        "json": true,
    };
    if(body) {
        requestOptions.body = body;
    }

    this._addAuthorizationHeaders(requestOptions);

    this._doRequest(requestOptions, function(error, response, body) {
        if(underscore.isFunction(callback)) {
            callback(error, body, response);
        }
    });
};

OpenShiftClient.prototype._doRequest = function(options, callback) {
    "use strict";

    request(options, callback);
};

OpenShiftClient.prototype.listDomains = function(callback) {
    "use strict";

    this._request("domains", "GET", null, callback);
};

OpenShiftClient.prototype.listApplications = function(domainId, callback) {
    "use strict";

    var url = "domains/"+domainId+"/applications";
    this._request(url, "GET", null, callback);
};

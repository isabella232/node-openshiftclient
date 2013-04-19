var buster = require("buster");
var OpenShiftClient = require("../index");
var constants = require("./test-constants");

buster.spec.expose();

var spec = describe("The OpenShiftClient with authKey", function(){
    "use strict";
    before(function() {
        this.client = new OpenShiftClient(constants.validAuthKey);
    });

    it("includes authKey in authorization header", function(){
        var options;
        this.client._doRequest = function() {
            var callback = arguments[arguments.length-1];
            options = arguments[0];
        };

        this.client.listDomains();

        var expected = "Bearer "+ constants.validAuthKey;
        assert.equals(options.headers.Authorization, expected);
    });
});
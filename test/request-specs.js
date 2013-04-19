var buster = require("buster");
var OpenShiftClient = require("../index");

require("buster-test");

var assert = buster.assert;
var describe = buster.spec.describe;
var it = buster.spec.it;
var before = buster.spec.before;

var spec = describe("The OpenShiftClient with authKey", function(){
    "use strict";
    before(function() {
        this.client = new OpenShiftClient("abc");
    });

    it("includes authKey in authorization header", function(){
        var options;
        this.client._doRequest = function() {
            var callback = arguments[arguments.length-1];
            options = arguments[0];
        };

        this.client.listDomains();

        var expected = "Bearer "+this.client.authKey;
        assert.equals(options.headers.Authorization, expected);
    });
});

var buster = require("buster");
var OpenShiftClient = require("../index");

require("buster-test");

var assert = buster.assert;
var describe = buster.spec.describe;
var it = buster.spec.it;

var spec = describe("Creating client", function(){
    "use strict";
    describe("with no parameters", function() {
        var creatingWithNoParameters = function() {
            var _ = new OpenShiftClient();
        };

        it("should throw", function(){
            assert.exception(creatingWithNoParameters);
        });
    });

    describe("with a single parameter", function(){
        var authKey = "ABC";
        var client = new OpenShiftClient(authKey);

        it("should set authKey", function(){
            assert.equals(client.authKey, authKey);
        });
    });

    describe("with two parameters", function(){
        var username = "username";
        var password = "password";
        var client = new OpenShiftClient(username, password);

        it("should set username", function(){
            assert.equals(client.username, username);
        });

        it("should set password", function(){
            assert.equals(client.password, password);
        });
    });
});

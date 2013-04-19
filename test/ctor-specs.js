var buster = require("buster");
require("buster-test").spec;
var OpenShiftClient = require("../index");

var assert = buster.assert;
buster.spec.expose();

var spec = describe("Creating client", function(){
    "use strict";
    describe("with no parameters", function() {
        var creatingWithNoParameters = function() {
            var _ = new OpenShiftClient();
        };

        it("should throw", function(){
            assert.exception(this.creatingWithNoParameters);
        })
    });

    describe("with a single parameter", function(){
        authKey = "ABC";
        client = new OpenShiftClient(authKey);

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
        })

        it("should set password", function(){
            assert.equals(client.password, password);
        })
    });
});

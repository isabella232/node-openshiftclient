var buster = require("buster");
var OpenShiftClient = require("../index");
var a = require("./test-constants");

require("buster-test");

var assert = buster.assert;
var describe = buster.spec.describe;
var it = buster.spec.it;
var before = buster.spec.before;

var spec = describe("Creating client", function() {
    "use strict";
    describe("with no parameters", function() {
        before(function() {
            this.creatingWithNoParameters = function() {
                var _ = new OpenShiftClient();
            };
        });

        it("should throw", function() {
            assert.exception(this.creatingWithNoParameters);
        });
    });

    describe("with a single parameter", function() {
        describe("which is a valid authKey", function() {
            before(function() {
                this.client = new OpenShiftClient(a.validAuthKey);
            });

            it("should set authKey", function() {
                assert.equals(this.client.authKey, a.validAuthKey);
            });
        });
        describe("which is a invalid authKey", function() {
            it("should throw error", function() {
                assert.exception(function() {
                    var client = new OpenShiftClient("invalid auth key");
                });
            });
        });
    });

    describe("with two parameters", function() {
        before(function() {
            this.username = "username";
            this.password = "password";
            this.client = new OpenShiftClient(this.username, this.password);
        });

        it("should set username", function() {
            assert.equals(this.client.username, this.username);
        });

        it("should set password", function() {
            assert.equals(this.client.password, this.password);
        });
    });
});

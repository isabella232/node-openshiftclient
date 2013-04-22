var buster = require("buster");
var OpenShiftClient = require("../index");
var constants = require("./test-constants");

buster.spec.expose();

var spec = describe("Creating client", function() {
    "use strict";
    describe("with no parameters", function() {
        before(function() {
            this.creatingWithNoParameters = function() {
                var _ = new OpenShiftClient();
            };
        });

        it("should throw", function() {
            expect(this.creatingWithNoParameters).toThrow();
        });
    });

    describe("with a single parameter", function() {
        describe("which is a valid authToken", function() {
            before(function() {
                this.client = new OpenShiftClient(constants.validAuthToken);
            });

            it("should set authToken", function() {
                expect(this.client.authToken).toEqual(constants.validAuthToken);
            });
        });
        describe("which is a invalid authToken", function() {
            it("should throw error", function() {
                expect(function() {
                    var client = new OpenShiftClient("invalid auth token");
                }).toThrow();
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
            expect(this.client.username).toEqual(this.username);
        });

        it("should set password", function() {
            expect(this.client.password).toEqual(this.password);
        });
    });
});

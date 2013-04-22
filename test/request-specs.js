var buster = require("buster");
var OpenShiftClient = require("../index");
var constants = require("./test-constants");

buster.spec.expose();

var spec = describe("The OpenShiftClient", function(){
    "use strict";
    before(function() {
        var client = new OpenShiftClient(constants.validAuthToken);
        var self = this;
        client._doRequest = function() {
            var callback = arguments[arguments.length-1];
            self.options = arguments[0];
        };

        this.client = client;
    });

    itEventually("includes application/json in accept header", function(){
        expect(this.options.headers.Accept).toEqual("application/json");
    });

    describe("with a authToken", function(){
        before(function() {
            var client = new OpenShiftClient(constants.validAuthToken);
            var self = this;
            client._doRequest = function() {
                var callback = arguments[arguments.length-1];
                self.options = arguments[0];
            };

            this.client = client;
        });

        it("includes authToken in authorization header", function(){
            this.client.listDomains();

            var expected = "Bearer " + this.client.authToken;
            expect(this.options.headers.Authorization).toEqual(expected);
        });
    });

    describe("with a username or password", function(){
        before(function() {
            var username = "username";
            var password = "password";
            var client = new OpenShiftClient(username, password);
            var self = this;

            client._doRequest = function() {
                var callback = arguments[arguments.length-1];
                self.options = arguments[0];
            };

            this.client = client;
        });

        itEventually("includes authToken in authorization header", function(){
            this.client.listDomains();

            var userAndPass = this.username + ":" + this.password;
            var base64 = new Buffer(userAndPass).toString("base64");
            var expected = "Basic "+ base64;
            expect(this.options.headers.Authorization).toEqual(expected);
        });
    });
});

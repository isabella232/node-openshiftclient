var buster = require("buster");
var OpenShiftClient = require("../index");
var constants = require("./test-constants");

buster.spec.expose();

var spec = describe("The OpenShiftClient", function(){
    "use strict";

    var options;
    before(function(){
        this.client._doRequest = function() {
            var callback = arguments[arguments.length-1];
            options = arguments[0];
        };
    });

    describe("with a authKey", function(){
        "use strict";

        before(function() {
            this.client = new OpenShiftClient(constants.validAuthKey);
        });

        it("includes authKey in authorization header", function(){
            this.client.listDomains();

            var expected = "Bearer "+this.client.authKey;
            assert.equals(options.headers.Authorization, expected);
        });
    });

    describe("with a username or password", function(){
        "use strict";

        before(function() {
            this.username = "username";
            this.password = "password";
            this.client = new OpenShiftClient(username, password);
        });

        it("includes authKey in authorization header", function(){
            this.client.listDomains();

            var base64 = new Buffer(this.username+":"+this.password).toString('base64');
            var expected = "Basic "+ base64;
            assert.equals(options.headers.Authorization, expected);
        });
    });
});

var buster = require("buster");
var OpenShiftClient = require("../index");

var assert = buster.assert;

buster.testCase("Creating client", {
    "with no parameters should throw": function(){
        "use strict";
        var sut = function() {
            var _ = new OpenShiftClient();
        };

        assert.exception(sut);
    },
    "with a single parameter should set authKey": function () {
        "use strict";
        var authKey = "ABC";
        var sut = new OpenShiftClient(authKey);

        assert.equals(sut.authKey, authKey);
    },
    "with two parameters should set username and password": function(){
        "use strict";
        var username = "username";
        var password = "password";

        var sut = new OpenShiftClient(username, password);

        assert.equals(sut.username, username);
        assert.equals(sut.password, password);
    }
});

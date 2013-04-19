var config = module.exports;

config["OpenShift API client tests"] = {
    rootPath: "../",
    environment: "node",
    tests: [
        "test/**/*-specs.js"
    ]
};

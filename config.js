var args = require('minimist')(process.argv.slice(2));
var extend = require('extend');

var environment = args.env || "test";

var common_conf = {
    name: "Larry Litterbug Server",
    version: "0.0.1a",
    environment: environment
};

var conf = {
    production: {
        port: args.port || "3000",
        database: args.sqlite || "./llProductionDB.sqlite"
    },

    test: {
        port: args.port || "3001",
        database: args.sqlite || "./llTestDB.sqlite"
    }
};

extend(false, conf.production, common_conf);
extend(false, conf.test, common_conf);

module.exports = config = conf[environment];
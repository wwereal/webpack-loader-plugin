var Minimize = require('minimize');

module.exports = function(source) {
    var callback = this.async();
    if (this.cacheable) {
        this.cacheable();
    }
    var opts = this.query || {};
    var minimize = new Minimize(opts);
    minimize.parse(source, callback);
};
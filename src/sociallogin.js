/*
 * Social Login
 */
var Facebook = require("./facebook");

var SocialLogin = function SocialLogin(){
    this.q = {};
}

/**
 * Run functions queued up by proxy loading snippet
 * @private
 */
SocialLogin.prototype.runQueuedFunctions = function () {
    // run queued up old versions of functions
    for (var i = 0; i < this._q.length; i++) {
        var fn = this[this._q[i][0]];
        if (typeof fn === 'function') {
            fn.apply(this, this._q[i].slice(1));
        }
    }
    this._q = []; // clear function queue after running
};

SocialLogin.prototype.facebookInit = function facebookInit(apiKey){
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    Facebook.init(apiKey);
    this.Facebook = Facebook;
};

module.exports = SocialLogin;

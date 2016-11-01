(function umd(require){
  if (typeof exports === 'object') {
    module.exports = require('1');
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function(){ return require('1'); });
  } else {
    this['sociallogin'] = require('1');
  }
})((function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @api public
   */

  function require(name){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];
    var threw = true;

    try {
      fn.call(m.exports, function(req){
        var dep = modules[id][1][req];
        return require(dep || req);
      }, m, m.exports, outer, modules, cache, entries);
      threw = false;
    } finally {
      if (threw) {
        delete cache[id];
      } else if (name) {
        // expose as 'name'.
        cache[name] = cache[id];
      }
    }

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
/*
 * Social Login enter
 */
var SocialLogin = require("./sociallogin");

var old = window.sociallogin || {};
var newInstance = new SocialLogin();
newInstance._q = old._q || [];

// export the instance
module.exports = newInstance;
}, {"./sociallogin":2}],
2: [function(require, module, exports) {
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

}, {"./facebook":3}],
3: [function(require, module, exports) {
/*
 * Facebook login
 */
var DEFAULT_OPTIONS = require("./options");

var Facebook = function Facebook(){
  this.options = DEFAULT_OPTIONS;
}

Facebook.prototype.init = function init(apiKey){
  var facebook_api_version =  this.options.facebook_api_version;
  window.fbAsyncInit = function() {
    FB.init({
      appId      : apiKey,
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : facebook_api_version // use graph api version
    });
  }
}

Facebook.prototype.login = function login(callback, scope){
  var default_scopt = {scope: 'public_profile'};
  var scope = typeof scope==="object"?scope:default_scopt;

  FB.login(function(response){
    callback(response);
  }, scope);
}

Facebook.prototype.getLoginStatus = function getLoginStatus(callback){
  FB.getLoginStatus(function(response){
    callback(response);
  });
}

Facebook.prototype.getUser = function getUser(callback){
    FB.api('/me?fields=id,name,email,first_name,last_name,gender,picture', function(response) {
        callback(response);
    });
}

module.exports = new Facebook;

}, {"./options":4}],
4: [function(require, module, exports) {
/*
 * Options
 */
module.exports = {
  facebook_api_version: "v2.8"
};

}, {}]}, {}, {"1":""}));
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

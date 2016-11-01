/*
 * Social Login enter
 */
var SocialLogin = require("./sociallogin");

var old = window.sociallogin || {};
var newInstance = new SocialLogin();
newInstance._q = old._q || [];

// export the instance
module.exports = newInstance;
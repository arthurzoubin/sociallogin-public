(function(window, document){
    var sociallogin = window.sociallogin || {'_q':[]};
    var as = document.createElement('script');
    as.type = 'text/javascript';
    as.async = true;
    as.src = 'http://sl.arthur.com/sociallogin.min.js';
    as.onload = function() {window.sociallogin.runQueuedFunctions();};
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(as, s);
    var funcs = ['facebookInit'];
    function setUpProxy(instance) {
        function proxyMain(fn) {
            instance[fn] = function() {
                instance._q.push([fn].concat(Array.prototype.slice.call(arguments, 0)));
            };
        }
        for (var k = 0; k < funcs.length; k++) {proxyMain(funcs[k]);}
    }
    setUpProxy(sociallogin);
    window.sociallogin = sociallogin;
})(window, document);

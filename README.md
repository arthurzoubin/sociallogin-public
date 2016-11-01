Social Login
==============

This Readme will guide you through using Social Login Javascript SDK to login your website by third part.

# Setup #
1. On every page that uses Social login, paste the following Javascript code between the `<head>` and `</head>` tags:

    ```html
       <script type="text/javascript">
          !function(n,o){function t(n){function o(o){n[o]=function(){n._q.push([o].concat(Array.prototype.slice.call(arguments,0)))}}for(var t=0;t<a.length;t++)o(a[t])}var c=n.sociallogin||{_q:[]},e=o.createElement("script");e.type="text/javascript",e.async=!0,e.src="http://sl.arthur.com/sociallogin.min.js",e.onload=function(){n.sociallogin.runQueuedFunctions()};var i=o.getElementsByTagName("script")[0];i.parentNode.insertBefore(e,i);var a=["facebookInit"];t(c),n.sociallogin=c}(window,document);
       </script>
    ```
## Facebook ##
1. If you haven't already, go to http://developer.facebook.com and register for an account. You will receive an API Key.
2. Paste the following Javascript code behind the above code:

    ```javascript
       sociallogin.facebookInit("YOUR_FACEBOOK_API_KEY_HERE");
    ```
3. Replace `YOUR_FACEBOOK_API_KEY_HERE` with the Facebook API Key given to you.

### API ###

##### Login #####
If you want to login by your facebook account, use `sociallogin.Facebook.login()`

    ```javascript
       sociallogin.Facebook.login(function(response){

       }, scope);
    ```
    * response:
        The response object that's provided to your callback contains a number of fields:

        ```javascript
            {
                status: 'connected',
                authResponse: {
                    accessToken: '...',
                    expiresIn:'...',
                    signedRequest:'...',
                    userID:'...'
                }
            }
        ```
        status specifies the login status of the person using the app. The status can be one of the following:
        * connected - the person is logged into Facebook, and has logged into your app.
        * not_authorized - the person is logged into Facebook, but has not logged into your app.
        * unknown - the person is not logged into Facebook, so you don't know if they've logged into your app or FB.logout() was called before and therefore, it cannot connect to Facebook.
        authResponse is included if the status is connected and is made up of the following:
        * accessToken - contains an access token for the person using the app.
        * expiresIn - indicates the UNIX time when the token expires and needs to be renewed.
        * signedRequest - a signed parameter that contains information about the person using the app.
        * userID - the ID of the person using the app.
    * scope: object
        There is an optional scope parameter that can be passed along with the function call that is a comma separated list of permissions to request from the person using the app. Here's how          you would call sociallogin.Facebook.login() with the same scope as the Login Button we used above. In this case, it would ask for a person's email address and a list of friends who also use the app:

        ```javascript
           sociallogin.Facebook.login(function(response){

           }, {scope: 'public_profile,email'});
        ```
        * Default: {scope: 'public_profile'}

##### Get user info #####
If you want to get the user who login in your website, use `sociallogin.Facebook.getUser()`

    ```javascript
       sociallogin.Facebook.getUser(function(response){

    });
     ```
    * response:
        The response object that's provided to your callback contains a number of fields:

        ```javascript
           {
              id: 'YOUR_USER_ID',
              name: 'YOUR_NAME',
              first_name: 'YOUR_FIRST_NAME',
              last_name: 'YOUR_LAST_NAME',
              gender: 'YOUR_GENDER',
              picture:
                data: {
                   url: "YOUR_PICTURE_URL"
                }
            }
        ```

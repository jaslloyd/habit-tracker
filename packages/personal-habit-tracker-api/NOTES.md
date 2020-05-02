# Personal Habit Tracker API
[![Build Status](https://travis-ci.org/TheDeployGuy/personal-habit-tracker-api.svg?branch=master)](https://travis-ci.org/TheDeployGuy/personal-habit-tracker-api)


# OAuth Notes

Passport is what we use to handle the auth for our application. Passport does all the reaching out to the providers for you and will make it easier to use OAuth with a bunch of services.

Passport does this via Strategies e.g.: GoogleStrategy. Each strategy will need a callbackUrl, clientID and a clientSecret, the clientID and clientSecret will be provided to you by the services you are with OAuth, google, twitter, facebook etc will give you these details after you setup an application on their platform. 

callbackUrl will be used by the 3rd party service to 'callback' to your application after the user as signed in using their credentials. This callbackUrl will be a url you have defined on your server e.g. `/auth/google/redirect` for google OAuth. During the redirect the 3rd party service will pass a unique token to your callback url that can then be used to get the users information from google. Passport will handle taking the token from the redirect and will even reach out to google with that token to get the information for the user.

Once you have the users information you can see if its a new user or a returning one and based on that you can create DB records to hold your own information about the user.

# Links
[TheNetNinja OAuth Tutorial](https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=1)

[Learn using JWT with Passport authentication](https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314)

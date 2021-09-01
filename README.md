# Lightbulb #
An idea board built with AngularJS and Firebase.

#### REQUIREMENTS: ####
* Install Node
* Install bower globally: npm install -g bower
* Install gulp globally: npm install -g gulp

## Project Setup ##
----

To install dev dependencies: 
> npm install

To install app dependencies **(run in the "src/" folder)**:
> bower install

#### CONFIGURE ####

1. Create Firebase project: https://firebase.google.com/docs/web/setup

2. Configure Firebase credentials in:
- `./src/modules/app.firebase/firebase.service.js`:  copy credentials from step 1
- `./src/modules/app.firebase/firebase.module.js`: use `authDomain` as `FIREBASE_URL`

3. Import initial realtime db and rules from:
- `firebase/db-export.json`
- `firebase/rules.json`


#### BUILD PROCESS ####
To build app resources during development (less, etc..)
> gulp build

**OR** 

To build and watch for changes:
> gulp

**OR**

To build for deployment:
> gulp dist

This will create the "dist/" folder with all essential app files to be uploaded to a server. (with minified JS)

#### RUN ####

Open http://localhost/lightbulb/src

_(The project folder must be in your web root.)_

#### NOTE ####
Unless stated otherwise, all commands must be run in the project's root folder.

## Signup Secrets ##

Admin: `iamafirebaseadmin`

User: `ilovefirebase`
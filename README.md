# APAC-M18-Campaign Project README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

Install
-------------
First install all global requirements if not already on system
```
npm install -g gulp styledown uglifyjs stylint
cd $project-name
npm install
npm install nodemon@1.3.7
npm install --save-dev gulp-babel babel-preset-es2015
```

Run
-------------

```
cd $project-name

gulp
```
if there is a problem , you can run
```
cd $project-name
gulp js stylus jade locales
gulp -lr
```

Options
-------------
There are some options that can be enabled when running `gulp`:  
- `-lr`   # to enable live reloading with browser-sync    
- `-maps` # enable sourcemaps    
- `-port=#` # change the server port #; default is 5000    
- `-deploy` # app js will not be minified by default, add this option for production/live env  
- `-js`   # Use this option if you are importing an old project for which classic JS (src/js) is used instead of CoffeeScript. For the sake of organisation, a project cannot use both JS and CoffeeScript. If this is a new project, please only use CoffeeScript (src/coffee).

Examples
```
gulp -maps
gulp -lr
gulp js -deploy
```

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
# Angular 2 Starter Kit

## Description 

This is a seed project or template for your Angular 2 projects. Source code is based on TypeScript and uses npm and jspm to handle dependencies as well as gulp to build. 

## Install dependencies

To be able to start development you need to install a few dependencies. To do so, make sure you have [Node.js](http://nodejs.org) installed. Once you have that, open a terminal in the project folder and run this command:

`
npm install # Install run dependencies
npm install -g gulp tsd jspm
jspm install # Install build dependencies
`
This command will run all scripts that are needed to install dependencies, including npm and jspm dependencies needed in order to compile and build the project.

## Building in development mode.

`gulp watch.dev` This will launch a live-server instance and will recompile any source changes then reload the browser.

## Build for production

Once you're done developing, you can create a production version of your project by simply running `gulp build.prod` and this will created a build folder in your project's folder that will have all your project's javascript (and soon css) minified and everything ready for deployment to a live server.

> **NOTE**: ./css, ./images, ./components, ./js are all copied recursively in build. css files are concatinated.

# Extending

This project uses gulp as a build system, so to add more taskss imply edit the gulpfile.js

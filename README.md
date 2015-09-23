# Angular 2 Starter Kit

## Description 

This is a seed project or template for your Angular 2 projects. Source code is based on TypeScript and uses npm and jspm to handle dependencies. 

## Install dependencies

To be able to start development you need to install a few dependencies. To do so, make sure you have [Node.js](http://nodejs.org) installed. Once you have that, open a terminal in the project folder and run this command:

`npm run instal:dep # Install all dependencies`

This command will run all scripts that are needed to install dependencies, including npm and jspm dependencies needed in order to compile and build the project.

## Building in development mode.

Development consits of completeting a few steps.

* Edit main.html as you're starting point, NOT index.html or build.index.html unless you know what you're doing.

* Run `npm run watch:typescript` in order to watch your typescript file as you develop in order to automatically compile code.
2. Run `npm run dev:live-server` in a seperate terminal in the same project to run a live reloading server that will refresh on any chages.
3. Code! Your changes will automatically be reflected in the browser once yous save. If you need to add
4. Templates and Angular 2 components should be in the components.

5. CSS files should be in ./css or ./components/\*\*/\*.css and then added to ,./css/main.css via a @import statement, this is not automatic, yet.

6. Images go in ./images

7. External js files should either be installed using jspm or added to ./js. If adding to ./js you need add a script tag to main.html. Scripts added to ./js will not be minified automatically. We highly recommend you use jspm to install these dependencies.

* You're starting typescript is app.ts, not main.ts! Do not edit main.ts, if you do builds might fail!

> **NOTE**: If using typescript with the external javascript, add the proper typings to ./typings and modifying tsd.d.ts either by using tsd or writting you're own.


## Build for production

Once you're done developing, you can create a production version of your project by simply running `npm run build` and this will created a build folder in your project's folder that will have all your project's javascript (and soon css) minified and everything ready for deployment to a live server.

> **NOTE**: ./css, ./images, ./components, ./js are all copied recursively in build.

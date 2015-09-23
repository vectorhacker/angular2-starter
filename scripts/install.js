#!/usr/bin/env node

var spawn = require('child_process').spawn,
	npm = spawn('npm', ['install']);
	
npm.stdout.pipe(process.stdout);

npm.stderr.pipe(process.stderr);

npm.on('close', function (code) {
	console.log('npm closed with code:', code);
	var jspm = spawn('node', ['./node_modules/jspm/jspm.js', 'install']);
	
		
	jspm.stdout.pipe(process.stdout);
	
	jspm.stderr.pipe(process.stderr);
	
	jspm.on('close', function (code) {
			console.log('jspm closed with code:', code);
			process.exit(0);
	})
});
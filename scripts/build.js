#!/usr/bin/env node
/**
 *     "build:move": "cp main.html build/; cp jspm_packages/system-csp-production.js build/lib/; cp -r components build/; cp build.index.html ./build/index.html; cp text.js build/lib/;",
 * 
    "build": "npm run clean:build; mkdir -p build/lib; cp config.js old.config.js; npm run build:typescript; npm run build:jspm; npm run build:move; rm config.js; mv old.config.js config.js; cp -r css build/; cp -r images build/; cp -rf js build/; cp -r templates build/",
 */


var spawn = require('child_process').spawn,
	fs = require('fs-extra');

fs.remove('./build', function (err) {
	if (err) {
		return console.error(err);
	}
	fs.mkdirs('./build/lib', function (err) {
		if (err) return console.error(err);
		fs.move('./config.js', './old.config.js', function (err) {
			if (err) {
				return console.error(err);
				
			}
			fs.copy('./old.config.js', './config.js', function (err) {
				if (err) return console.error(err);
				buildTs();
			});
		});
	});
});

function buildTs() {
	var ts = spawn('npm', ['run', 'build:typescript']);

	ts.stdout.pipe(process.stdout);

	ts.stderr.pipe(process.stderr);

	ts.on('close', function (code) {
		console.log('npm closed with code:', code);
		buildJspm();
	});
}

function buildJspm() {
	var jspm = spawn('npm', ['run', 'build:jspm']);


	jspm.stdout.pipe(process.stdout);

	jspm.stderr.pipe(process.stderr);

	jspm.on('close', function (code) {
		move();
	});
}

function move() {
	fs.copy('./build.index.html', './build/index.html', function (err) {
		if (err) return console.error(err);


		fs.copy('./jspm_packages/system-csp-production.js', './build/lib/system-csp-production.js', function (err) {
			if (err) return console.error(err);
			fs.copy('./jspm_packages/system-csp-production.js', './build/lib/system-csp-production.js', function (err) {
				if (err) return console.error(err);
				fs.copy('./main.html', './build/main.html', function (err) {
					if (err) return console.error(err);
					fs.copy('./components', './build/components', function (err) {
						if (err) return console.error(err);
						fs.copy('./css', './build/css', function (err) {
							if (err) return console.error(err);
							fs.copy('./images', './build/images', function (err) {
								if (err) return console.error(err);
								fs.copy('./js', './build/js', function (err) {
									if (err) return console.error(err);
									fs.copy('./js', './build/js', function (err) {
										if (err) return console.error(err);
										fs.removeSync('./config.js');
										fs.move('./old.config.js', './config.js', function (err) {
											if (err) return console.errror(err);
											process.exit(0);
										})
									});
								});
							});
						});
					});
				});
			});
		});
		});
}
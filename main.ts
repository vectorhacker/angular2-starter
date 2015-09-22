/// <reference path="typings/tsd.d.ts" />


// dependencies
import 'zone.js';
import 'reflect-metadata';

// app
import main from './app';

// build html
import html from './html';

html(() => {
	main();
});
#!/usr/bin/env node

var program = require('commander'),
	shell = require('shelljs'),
	setting = require("../package.json"),
	config = require("../project.config.json"),
	exec = shell.exec;

var projects = Object.keys( config );

program
	.version( setting.version );

program
	.command('install <name>')
	.alias('i')
	.description('deploy project')
	.action( install )

program
  .parse( process.argv );

function install ( project ){
	if( projects.indexOf( project ) < 0 ) return console.log('not find this project :(');
	//install dependencies
	project = config[ project ];

	var installFailed = [];

	project.dependencies.forEach(function ( dep ){
		var result = exec( dep, {async:false});
		if( result.stderr ){
			installFailed.push( dep );
		}
	});

	console.log(installFailed);
}



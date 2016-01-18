var fs = require("fs");

var done = function() {
	process.stdout.write('\nprompt > ');
};

var ls = function(file){
	fs.readdir('.', function(err, files) {
	  if (err) throw err;
	  files.forEach(function(file) {
	    process.stdout.write(file.toString() + "\n");
	  });
	done();  
	});
};


var pwd = function(file) {
	process.stdout.write(process.env.PWD);
	done();
};

var date = function(file){
	var date = new Date().toString();
	process.stdout.write(date);
	done();
};

var echo = function(args) {
	args.forEach(function(arg) {
		if (arg[0] !== "$") process.stdout.write(arg);
		else process.stdout.write(process.env[arg.slice(1)]);
		process.stdout.write(" ");
	});
	done();
};

var cat = function(args){
	args.forEach(function(arg){
		var fileName = "./" + arg;
		fs.readFile(fileName, function(error, contents){
			if(error) throw error;
			process.stdout.write(contents);
			done();
		});
	});
	
};

var head = function(args){
	args.forEach(function(arg){
		var fileName = "./" + arg;
		fs.readFile(fileName, "utf-8", function(error, contents){
			if(error) throw error;
			var fileContents = contents.split("\n");
			process.stdout.write(fileContents.slice(0,5).join("\n"));
			done();
		});
	});
};

var tail = function(args){
	// args.forEach(function(arg){
	// 	var fileName = "./" + arg;
	// 	fs.readFile(fileName, "utf-8", function(error, contents){
	// 		if(error) throw error;
	// 		var fileContents = contents.split("\n");
	// 		process.stdout.write(fileContents.slice(-5).join("\n"));
	// 		done();
	// 	});
	// });
	var fileContents = getLines(args);
	fileContents.forEach(function(splitFile) {
		process.stdout.write(splitFile.slice(0, 5).join("\n"));
	});
	done();
};

var getLines = function(args) {
	var output = [];
	args.forEach(function(arg) {
		var fileName = "./" + arg;
		fs.readFile(fileName, "utf-8", function(error, contents) {
			if (error) throw error;
			var fileContents = contents.split("\n");
			output.push(fileContents);
		});
	});
	while (output.length < args.length) {}
	return output;
};

var sort = function(args){

};

exports.echo = echo;
exports.pwd = pwd;
exports.date = date;
exports.ls = ls;
exports.cat = cat;
exports.head = head;
exports.tail = tail;
// exports.sort = sort;
// exports.wc = wc;
// exports.uniq = uniq;
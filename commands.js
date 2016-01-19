var fs = require("fs");
var request = require("request");

var commands = {

	done: function(output, done) {
		process.stdout.write(output);
		process.stdout.write('\nprompt > ');
	},

	ls: function(file, done){
		var output = "";
		fs.readdir('.', function(err, files) {
		  if (err) throw err;
		  files.forEach(function(file) {
		  	output += file.toString() + "\n";
		  });
		done(output);
		return output;  
		});
	},


	pwd: function(file, done) {
		var output = "";
		output += process.env.PWD;
		done(output);
		return output;
	},

	date: function(file, done){
		var output = "";
		var date = new Date().toString();
		output += date;
		done(output);
		return output;
	},

	echo: function(args, done) {
		var output = "";
		args.forEach(function(arg) {
			if (arg[0] !== "$") output += arg;
			else output += process.env[arg.slice(1)];
			output += " ";
		});
		done(output);
		return output;
	},

	cat: function(args, done){
		var output = "";
		args.forEach(function(arg){
			var fileName = "./" + arg;
			fs.readFile(fileName, "utf-8", function(error, contents){
				if(error) throw error;
				output += contents;
				done(output);
				return output;
			});
		});
		
	},

	head: function(arg, done){
		var output = "";
		var fileName = "./" + arg[0];
		fs.readFile(fileName, "utf-8", function(error, contents){
			if(error) throw error;
			var fileContents = contents.split("\n");
			output += fileContents.slice(0,5).join("\n");
			done(output);
			return output;
		});
	},

	tail: function(args, done){
		var output = "";
		args.forEach(function(arg){
			var fileName = "./" + arg;
			fs.readFile(fileName, "utf-8", function(error, contents){
				if(error) throw error;
				var fileContents = contents.split("\n");
				output += fileContents.slice(-5).join("\n");
				done(output);
				return output;
			});
		});
	},

	// var getLines = function(args) {
	// 	var output = [];
	// 	args.forEach(function(arg) {
	// 		var fileName = "./" + arg;
	// 		fs.readFile(fileName, "utf-8", function(error, contents) {
	// 			if (error) throw error;
	// 			var fileContents = contents.split("\n");
	// 			output.push(fileContents);
	// 			if (output.length === args.length) {
	// 				console.log("made it");
	// 				return output;
	// 			}
	// 		});
	// 	});
	// };

	sort: function(args, done){
		var output = "";
		args.forEach(function(arg){
			var fileName = "./" + arg;
			fs.readFile(fileName, "utf-8", function(error, contents){
				if(error) throw error;
				var fileContents = contents.split("\n");
				fileContents.sort();
				output += fileContents.join("\n");
				done(output);
				return output;
			});
		});
	},

	wc: function(args, done){
		var output = "";
		args.forEach(function(arg){
			var fileName = "./" + arg;
			fs.readFile(fileName, "utf-8", function(error, contents){
				if(error) throw error;
				var fileContents = contents.split("\n");
				output += fileContents.length + "";
				done(output);
				return output;
			});
		});
	},

	uniq: function(args, done){
		var output = "";
		args.forEach(function(arg){
			var fileName = "./" + arg;
			fs.readFile(fileName, "utf-8", function(error, contents){
				if(error) throw error;
				var fileContents = contents.split("\n");
				fileContents.forEach(function(line, index) {
					if (index > 0 && line === fileContents[index - 1]) {
						fileContents[index] = "";
					}
				});
				output += fileContents.join("\n");
				done(output);
				return output;
			});
		});
	},

	curl: function(args, done){
		var output = "";
		args.forEach(function(arg){
			request(arg, function(error, response, body) {
				if(!error && response.statusCode === 200)
					output += body;
			});
			done(output);
			return output;
		});
	}
};

exports.commands = commands;
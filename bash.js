var commands = require("./commands.js");

process.stdout.write("prompt > ");
process.stdin.on("data", function(data) {
	var inputs = data.toString().trim().split(" ");
	var cmd = inputs[0];
	if (!commands[cmd]) throw new Error("Command not recognized");
	commands[cmd](inputs.slice(1));

});
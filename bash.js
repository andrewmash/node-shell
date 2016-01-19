var commands = require("./commands.js");

process.stdin.on("data", function(data) {
	var inputs = data.toString().trim().split(" ");
	var cmd = inputs[0];
	if (!commands.commands[cmd]) throw new Error("Command not recognized");
	commands.commands[cmd](inputs.slice(1), commands.commands.done);

});

process.stdout.write("prompt > ");
//Test 1
//Test 1
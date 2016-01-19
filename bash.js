var commands = require("./commands.js");

process.stdin.on("data", function(data) {
	var inputs = data.toString().trim();
	var cmdList = inputs.split(/\s*\|\s*/g);

	var initArray = cmdList[0].split(" ");
	if (!commands.commands[initArray[0]]) throw new Error("Command not recognized");

	console.log(initArray[1]);
	console.log(commands.commands.cat(['bash.js']));
	
	return cmdList.slice(1).reduce(function(prevVal, elementFunc){
		var argInArray = [];
		argInArray.push(prevVal);
		console.log(argInArray);
		//if (!commands.commands[elementFunc](prevVal)) throw new Error("Command not recognized");
		return commands.commands[elementFunc](argInArray);
	}, commands.commands[initArray[0]]([initArray[1]]));

	//if (!commands.commands[cmd]) throw new Error("Command not recognized");
	//commands.commands[cmd](inputs.slice(1), commands.commands.done);


});

process.stdout.write("prompt > ");
//Test 1
//Test 1
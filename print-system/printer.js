const printer = require('@thiagoelg/node-printer');

const print = (filename) => {
	printer.printFile({
		filename: filename,
		success: (jobId) => {
			console.log(`Done printing ${jobId}`);
			process.exit(0);
		},
		error: (err) => {
			console.log(`Job errored`);
			console.log(err);
			process.exit(1);
		},
	});
};

const filename = process.argv[process.argv.length - 1]
print(filename)
import printer from '@thiagoelg/node-printer';

export const print = (filename: string) => {
	printer.printFile({
		filename: filename,
		success: (jobId) => {
			console.log(`Done printing ${jobId}`);
		},
		error: (err) => {
			console.log(`Job errored`);
			console.log(err);
		},
	});
};

import express, { Router, Request, Response, NextFunction } from 'express';
import prisma from './prisma';

const router: Router = express.Router();

// Express body-parser
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Ping Pong (test endpoint)
router.get('/ping', (req: Request, res: Response) => {
	res.send('pong! 🏓');
});

router.get('/', async (req: Request, res: Response) => {
	const response = {
		message:
			'Hello World! Welcome to the Express Typescript Simple Boilerplate.',
		boilerplate: {
			repository:
				'https://github.com/garyhtou/express-typescript-simple-boilerplate',
			author: {
				name: 'Gary Tou',
				website: 'https://garytou.com',
			},
		},
	};
	res.json(response);
});

const AUTH_KEY = process.env.AUTH_KEY;
const ensure_auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.query.authKey === AUTH_KEY) {
		return next();
	}

	res.status(403).json({
		message: "woah hold your dino, you're forbidden!!",
	});
};

router.post('/print', ensure_auth, async (req: Request, res: Response) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	let image = req.files.image;
	if (image === undefined || image === null) {
		return res
			.status(400)
			.send('No files were uploaded under the `image` key.');
	}
	if (Array.isArray(image)) {
		image = image[0];
	}

	// Use the mv() method to place the file somewhere on your server
	// image.mv('/somewhere/on/your/server/filename.jpg', function (err) {
	// 	if (err) return res.status(500).send(err);

	// 	res.send('File uploaded!');
	// });

	const name = image.name;
	const size = image.size;
	const md5 = image.md5;
	const mimetype = image.mimetype;
	const path = image.tempFilePath;
	console.log(name);
	console.log(path);

	await prisma.print.create({ data: { file: image.data } });

	res.json({
		name,
		size,
		md5,
		mimetype,
		status: 'QUEUED',
		time: Date(),
	});
});

export default router;

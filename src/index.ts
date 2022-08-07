import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import router from './router';
import errorHandlers from './helpers/errorHandlers';
import fileupload from 'express-fileupload';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

// Secure app with HTTP headers
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Allow CORS
app.use(cors());

app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, '../uploads/'),
	})
);

// Add paths (router)
app.use(router);

// Handle errors
app.use(errorHandlers);

app.listen(PORT, () => {
	console.log(
		'\n=============================\n' +
			`Server listening on port ${PORT}` +
			'\n=============================\n'
	);
});

import { merge } from './helpers/merge';

merge([
	'/Users/garyhtou/Code/hackclub/assemble-print/uploads/35.png',
	'/Users/garyhtou/Code/hackclub/assemble-print/uploads/36.png',
	'/Users/garyhtou/Code/hackclub/assemble-print/uploads/37.png',
	'/Users/garyhtou/Code/hackclub/assemble-print/uploads/38.png',
]);

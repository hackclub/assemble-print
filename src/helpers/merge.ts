import sharp from 'sharp';
import path from 'path';

import images from 'images';

export const merge = async (imagePaths: string[]) => {
	let merged: images.Image = null;

	imagePaths.forEach((p) => {
		if (merged == null) {
			merged = images(p, 0, 0, 4800, 7200);
		}
		merged = merged.draw(images(p), 240, 360);
	});

	const filepath = path.join(
		__dirname,
		'../../prints/',
		new Date().getTime().toString() + '.png'
	);

	await merged.save(filepath);
};

// export const merge = async (imagePaths: string[]) => {
// 	let merged: sharp.Sharp = null;

// 	imagePaths.forEach((p) => {
// 		if (merged == null) {
// 			merged = sharp(p);
// 		}
// 		merged = merged.composite([{ input: p, gravity: 'northwest' }]);
// 	});

// 	const filepath = path.join(
// 		__dirname,
// 		'../../prints/',
// 		new Date().getTime().toString() + '.png'
// 	);

// 	await merged.toFile(filepath);
// };

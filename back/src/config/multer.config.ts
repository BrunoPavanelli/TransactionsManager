import { resolve } from "node:path";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const tmpfolder = resolve(__dirname, "..", "..", "tmp");

const fileSize = 1024 * 1024 * 1024;

export default {
	tmpfolder,

	fileFilter: (
		_: Request,
		file: Express.Multer.File,
		callback: FileFilterCallback
	) => {
		const acceptedTypes = file.mimetype;

		if (acceptedTypes === "text/csv") {
			callback(null, true);
		} else {
			callback(null, false);
			callback(new Error("Only csv format allowed"));
		}
	},

	limits: {
		fileSize,
	},

	storage: multer.diskStorage({
		destination: tmpfolder,
		filename: (_, file, callback) => {
			const filename = `${file.originalname}.csv`;
			return callback(null, filename);
		},
	}),
};
import path from "path";
import crypto from "crypto";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import "dotenv/config.js";
import { getGfs } from "../includes/database.js";

const mongoURI = process.env.ATLAS_URI;
var currentRoot = "item";

export const ui = (req, res) => {
	getGfs()
		.files.find()
		.toArray((err, files) => {
			// Check if files
			if (!files || files.length === 0) {
				res.render("index", { files: false });
			} else {
				files.map((file) => {
					if (
						file.contentType === "image/jpeg" ||
						file.contentType === "image/png"
					) {
						file.isImage = true;
					} else {
						file.isImage = false;
					}
				});
				// res.render("index", { files: files });
			}
		});
};

export function uploadPicture(collection) {
	const storage = new GridFsStorage({
		url: mongoURI,
		file: (req, file) => {
			return new Promise((resolve, reject) => {
				crypto.randomBytes(16, (err, buf) => {
					if (err) {
						return reject(err);
					}
					const filename =
						buf.toString("hex") + path.extname(file.originalname);
					const fileInfo = {
						filename: filename,
						bucketName: collection,
					};
					resolve(fileInfo);
				});
			});
		},
	});
	return multer({ storage });
}

export const uploadFile = (req, res) => {
	const { id, filename, contentType } = req.file;
	return res.send({ id: id, filename: filename, contentType: contentType });
};

export const getFilesJSON = (req, res) => {
	getGfs()
		.files.find()
		.toArray((err, files) => {
			if (!files || files.length === 0) {
				return res.status(404).json({
					err: "No files exist",
				});
			}

			return res.json(files);
		});
};

export const getFile = (req, res) => {
	getGfs().files.findOne({ filename: req.params.filename }, (err, file) => {
		if (!file || file.length === 0) {
			return res.status(404).json({
				err: "No file exists",
			});
		}
		return res.json(file);
	});
};

export const getImageFile = (req, res) => {
	getGfs().files.findOne({ filename: req.params.filename }, (err, file) => {
		if (!file || file.length === 0) {
			return res.status(404).json({
				err: "No file exists",
			});
		}

		if (
			file.contentType === "image/jpeg" ||
			file.contentType === "image/png"
		) {
			const readstream = getGfs().createReadStream(file.filename);
			readstream.pipe(res);
		} else {
			res.status(404).json({
				err: "Not an image",
			});
		}
	});
};

export const deleteFile = (req, res) => {
	getGfs().remove(
		{ _id: req.params.id, root: currentRoot },
		(err, gridStore) => {
			if (err) {
				return res.status(404).json({ err: err });
			}

			res.redirect("/");
		}
	);
};

export function collectionAvatar(req, res, next) {
	getGfs().collection("avatar");
	currentRoot = "avatar";
	next();
}

export function collectionItems(req, res, next) {
	getGfs().collection("item");
	currentRoot = "item";
	next();
}

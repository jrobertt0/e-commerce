import express from "express";
import * as UploadsController from "../controllers/uploadsController.js";

const router = express.Router();

router.route("/").get(UploadsController.collection("items"), UploadsController.ui);

router
	.route("/item")
	.post(
		UploadsController.uploadPicture("items").single("file"),
		UploadsController.uploadFile
	);

router
	.route("/items")
	.get(UploadsController.collection("items"), UploadsController.getFilesJSON);

router
	.route("/item/file/:filename")
	.get(UploadsController.collection("items"), UploadsController.getFile);

router
	.route("/item/image/:filename")
	.get(UploadsController.collection("items"), UploadsController.getImageFile);

router
	.route("/item/delete/:id")
	.delete(UploadsController.collection("items"), UploadsController.deleteFile);

// avatar

router
	.route("/avatar")
	.post(
		UploadsController.uploadPicture("avatar").single("file"),
		UploadsController.uploadFile
	);

router
	.route("/avatars")
	.get(UploadsController.collection("avatar"), UploadsController.getFilesJSON);

router
	.route("/avatar/file/:filename")
	.get(UploadsController.collection("avatar"), UploadsController.getFile);

router
	.route("/avatar/image/:filename")
	.get(UploadsController.collection("avatar"), UploadsController.getImageFile);

router
	.route("/avatar/delete/:id")
	.delete(UploadsController.collection("avatar"), UploadsController.deleteFile);

export default router;

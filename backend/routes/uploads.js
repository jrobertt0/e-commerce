import express from "express";
import * as UploadsController from "../controllers/uploadsController.js";

const router = express.Router();

router.route("/").get(UploadsController.collectionItems, UploadsController.ui);

router
	.route("/item")
	.post(
		UploadsController.uploadPicture("item").single("file"),
		UploadsController.uploadFile
	);

router
	.route("/items")
	.get(UploadsController.collectionItems, UploadsController.getFilesJSON);

router
	.route("/item/file/:filename")
	.get(UploadsController.collectionItems, UploadsController.getFile);

router
	.route("/item/image/:filename")
	.get(UploadsController.collectionItems, UploadsController.getImageFile);

router
	.route("/item/delete/:id")
	.delete(UploadsController.collectionItems, UploadsController.deleteFile);

// avatar

router
	.route("/avatar")
	.post(
		UploadsController.uploadPicture("avatar").single("file"),
		UploadsController.uploadFile
	);

router
	.route("/avatars")
	.get(UploadsController.collectionAvatar, UploadsController.getFilesJSON);

router
	.route("/avatar/file/:filename")
	.get(UploadsController.collectionAvatar, UploadsController.getFile);

router
	.route("/avatar/image/:filename")
	.get(UploadsController.collectionAvatar, UploadsController.getImageFile);

router
	.route("/avatar/delete/:id")
	.delete(UploadsController.collectionAvatar, UploadsController.deleteFile);

export default router;

import express from "express";
import * as UploadsController from "../controllers/uploadsController.js";

const router = express.Router();

router.route("/").get((req, res) => {
    res.render("../views/index");
});

router.route("/").post(UploadsController.uploadPicture("avatars").single("file"), UploadsController.uploadFile);

router.route("/files").get(UploadsController.getFilesJSON);

router.route("/files/:filename").get(UploadsController.getFile);

router.route("/image/:filename").get(UploadsController.getImageFile);

router.route("/files/:id").delete(UploadsController.deleteFile);

export default router;

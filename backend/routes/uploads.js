import express from 'express';
// import * as UploadsController from '../controllers/uploadsController.js';
import path from "path";
import crypto from "crypto";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Provider from '../providers.js'
import 'dotenv/config.js';

const router = express.Router();
const provider = new Provider();
let gfs = provider.getGfs();
const mongoURI = process.env.ATLAS_URI;


const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                    metadata: {userid: "111"}
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

router.route('/').get((req, res) => {
    res.render('../views/index');
});

router.route("/upload").post(upload.single('file'), (req, res) => {
    res.redirect('/uploads');
})

router.route('/files').get((req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        return res.json(files);
    });
});

router.route('/files/:filename').get((req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        return res.json(file);
    });
});

router.route('/image/:filename').get((req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

router.route('/files/:id').delete((req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }

        res.redirect('/');
    });
});

export default router;
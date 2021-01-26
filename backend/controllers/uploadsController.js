import path from "path";
import crypto from "crypto";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import 'dotenv/config.js';
import { getGfs } from '../includes/database.js';


let gfs = getGfs();
const mongoURI = process.env.ATLAS_URI;


const productStorage = new GridFsStorage({
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
                    metadata: { userid: "111" }
                };
                resolve(fileInfo);
            });
        });
    }
});

export const uploadProduct = multer({ productStorage });

export const uploadFile = (req, res) => {
    res.redirect("/");
}

export const getFilesJSON = (req, res) => {
    getGfs().files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        return res.json(files);
    });
}

export const getFile = (req, res) => {
    getGfs().files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        return res.json(file);
    });
}

export const getImageFile = (req, res) => {
    getGfs().files.findOne({ filename: req.params.filename }, (err, file) => {
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
}

export const deleteFile = (req, res) => {
    getGfs().remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }

        res.redirect('/');
    });
}
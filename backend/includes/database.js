import 'dotenv/config.js';
import mongoose from 'mongoose';
import Grid from "gridfs-stream";

const mongoURI = process.env.ATLAS_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

let gfs;
const connection = mongoose.connection;

export const connect = () => {
    connection.once('open', () => {
        console.log('MongoDB conected');
        gfs = Grid(connection.db, mongoose.mongo);
        gfs.collection('uploads');
    });    
}

export const getGfs = () => gfs;
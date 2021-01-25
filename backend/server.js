import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';

import bodyParser from "body-parser";
import Grid from "gridfs-stream";
import Provider from './providers.js'
// import exercisesRouter from './routes/exercises.js'
// import usersRouter from './routes/users.js'
import uploadsRouter from './routes/uploads.js'

const app = express();
const port = process.env.PORT || 5000;
const provider = new Provider();

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const mongoURI = process.env.ATLAS_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB conected');
    let gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
    provider.setGfs(gfs);
})

app.use('/uploads', uploadsRouter);
// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
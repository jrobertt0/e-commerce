import express from 'express';
import cors from 'cors';
import { connect } from './includes/database.js';
import bodyParser from "body-parser";

import uploadsRouter from './routes/uploads.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/upload', uploadsRouter);
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// Database
connect();

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
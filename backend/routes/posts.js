import express from 'express';
const router = express.Router();

import { auth } from './verifyToken.js';

router.get("/", auth, (req, res) => {
    res.json({ post: { title: "myTitle", description: "no perrrooooo" } })
})

export default router;

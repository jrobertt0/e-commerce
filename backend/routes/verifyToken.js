import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Acces Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.username = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}


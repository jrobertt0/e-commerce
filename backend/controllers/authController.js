import User from '../models/user.model.js';
import { registerValidation, loginValidation } from '../includes/validation.js';
import jwt from 'jsonwebtoken'; 

export const register = async (req, res) => {

    const { error } = registerValidation(req.body);

    if (error)
        return res.send({Error: error.details[0].message});

    const newUser = new User();
    newUser.email = req.body.email;
    newUser.username = req.body.username;
    newUser.password = await newUser.encryptPassword(req.body.password);

    newUser.save()
    .then(savedUser => res.send({ user: savedUser._id }))
    .catch(err => res.send({Error: err}))
}

export const login = async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error)
        return res.json({Error: error.details[0].message});
    
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.send({Error: 'Email is wrong'});

    const validPass = await user.comparePassword(req.body.password);
    if(!validPass) return res.send({Error: 'Password is wrong'});

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ token: token });
}
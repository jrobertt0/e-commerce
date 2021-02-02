import User from "../models/user.model.js";
import { registerValidation, loginValidation } from "../includes/validation.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const { error } = registerValidation(req.body);

	if (error) return res.send({ Error: error.details[0].message });

	const existingUser = User.findOne({ email: req.body.email });
	if (existingUser.email) return res.send({ Error: "User already exists" });

	const newUser = new User();
	newUser.email = req.body.email;
	newUser.username = req.body.username;
	newUser.name = req.body.name;
	newUser.password = await newUser.encryptPassword(req.body.password);

	newUser
		.save()
		.then((savedUser) => {
			const token = jwt.sign(
				{ _id: savedUser._id },
				process.env.TOKEN_SECRET
			);
			res.send({ token: token });
		})
		.catch((err) => res.send({ err }));
};

export const login = async (req, res) => {
	const { error } = loginValidation(req.body);

	if (error) return res.json({ Error: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.send({ Error: "Email is wrong" });

	const validPass = await user.comparePassword(req.body.password);
	if (!validPass) return res.send({ Error: "Password is wrong" });

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header("auth-token", token).send({ token: token });
};

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
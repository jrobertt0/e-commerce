import { registerValidation, passwordValidation} from "../includes/validation.js";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
	User.findById(req.username)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json("Error: " + err));
};

export const editUser = async (req, res) => {
	const data = req.body;
	const { error } = registerValidation({
		username: data.username,
		email: data.email,
		name: data.name,
	});

	if (error) return res.send({ Error: error.details[0].message });

	
	if (data.password !== null) {
		const { error } = passwordValidation({ password: data.password });
		if (error) return res.send({ Error: error.details[0].message });
	}

	User.findById(req.username)
		.then(async (user) => {
			user.email = data.email ? data.email : user.email;
			user.username = data.username ? data.username : user.username;
			if (
				data.password !== null &&
				data.password !== user.password
			)
				user.password = await user.encryptPassword(data.password);
			user.admin = data.admin ? data.admin : user.admin;
			user.chart = data.chart ? data.chart : user.chart;
			user.avatar = data.avatar ? data.avatar : user.avatar;
			user.name = data.name ? data.name : user.name;

			user.save()
				.then((savedUser) => res.send({user: savedUser}))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
};

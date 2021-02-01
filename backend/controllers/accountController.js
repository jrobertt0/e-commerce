import User from "../models/user.model.js";

export const getUser = async (req, res) => {
	User.findById(req.username)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json("Error: " + err));
};

export const editUser = async (req, res) => {
	const data = req.body;
	User.findById(req.username)
		.then((user) => {
			user.email = data.email ? data.email : user.email;
			user.username = data.username ? data.username : user.username;
			user.password = data.password ? data.password : user.password;
			user.admin = data.admin ? data.admin : user.admin;
			user.chart = data.chart ? data.chart : user.chart;
			user.avatar = data.avatar ? data.avatar : user.avatar;

			exercise
				.save()
				.then(() => res.json("User updated!"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
};

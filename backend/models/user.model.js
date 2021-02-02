import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			unique: true,
			min: 6,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 25,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 25,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			maxlength: 1024,
		},
		admin: {
			type: Boolean,
			required: true,
			default: false,
		},
		chart: {
			type: Array,
			required: false,
			default: [],
		},
		avatar: {
			type: Object,
            required: false,
			default: {
                id: "xxx-xxx-xxx",
                filename: "default",
                contentType: "image/jpeg"
            }
		},
		date: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.encryptPassword = async (password) => {
	return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

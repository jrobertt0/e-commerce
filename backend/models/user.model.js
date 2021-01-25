import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        }, password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        }, admin: {
            type: Boolean,
            required: true,
            default: false,
        }, chart: {
            type: Array,
            required: false,
            default: [],
        },
        photo: {
            t
        }
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

export default User;

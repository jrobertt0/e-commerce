import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        name: {
            type: String,
            min: 3,
            max: 128,
            required: true,
            trim: true,
        }, description: {
            type: String,
            min: 3,
            max: 1024,
            required: true,
            trim: true,
        }, offer: {
            type: String,
            required: false,
            default: "0"
        }, image: {
            type: String,
            required: false,
        }, date: {
            type: Date,
            default: Date.now,
        }
    }
);

const Item = mongoose.model('Item', userSchema);

export default Item;

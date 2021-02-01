import Item from '../models/item.model.js';
import { itemValidation } from '../includes/validation.js';


export const getItem = async (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
}

export const getItems = async (req, res) => {
    Item.find()
        .then(items => res.status(200).json(items))
            .catch(err => res.status(400).json('Error: ' + err))
}

export const addItem = (req, res) => {
    const data = req.body;
    const { error } = itemValidation(req.body);

    if (error)
        return res.status(400).send(error);

    let newItem = new Item();
    newItem.name = data.name;
    newItem.description = data.description;
    newItem.offer = data.offer;
    newItem.image = data.image;

    newItem.save()
        .then(savedItem => res.status(200).send({ item: savedItem._id }))
        .catch(err => res.status(400).json('Error: ' + err))
}

export const deleteItem = async (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

export const editItem = async (req, res) => {
    const data = req.body;
    Exercise.findById(req.params.id)
        .then(item => {
            item.name = data.name ? data.name : item.name;
            item.description = data.description ? data.description : item.description;
            item.offer = data.offer ? data.offer : item.offer;
            item.image = data.image ? data.image : item.image;

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}
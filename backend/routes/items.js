import express from 'express';
import * as ItemController from '../controllers/itemController.js';

const router = express.Router();

route.route('/item/:id').get(ItemController.getItem)

route.route('/allitems').get(ItemController.getItems)

router.route('/add').post(ItemController.addItem);

route.route('/edit/:id').post(ItemController.editItem)

router.route('/delete/:id').delete(ItemController.deleteItem);

export default router;
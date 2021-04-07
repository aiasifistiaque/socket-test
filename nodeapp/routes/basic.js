import express from 'express';
import City from '../models/cityModel.js';
import { io } from '../app.js';

const router = express.Router();

router.post('/', async (req, res) => {
	const city = City({ name: req.body.name });
	try {
		const saveCity = await city.save();
		res.send(saveCity);
	} catch {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	const cities = await City.find();
	res.status(200).json(cities);
});

router.delete('/:id', async (req, res) => {
	try {
		const cities = await City.deleteOne({ _id: req.params.id });
	} catch (err) {
		console.log(err);
	}

	res.status(200).send('Got a DELETE request at /user');
});

router.get('/:id', async (req, res) => {
	const city = await City.findOne({ _id: req.params.id });
	res.status(200).send('got deleted');
});

export default router;

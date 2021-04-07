import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
	name: String,
});

const model = mongoose.model('city', brandSchema);

export default model;

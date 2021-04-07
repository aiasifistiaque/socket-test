import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb+srv://asifistiaque:01828398225@cluster0.6d6ew.mongodb.net/socket?retryWrites=true&w=majority',
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true,
			}
		);
		console.log(`Mongo DB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;

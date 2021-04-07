import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cityRoute from './routes/basic.js';
import City from './models/cityModel.js';

//dotenv.config();
const app = express();

const httpServer = createServer(app);
export const io = new Server(httpServer, {
	// ...
});

connectDB();

app.use(express.json());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//routes
app.use('/city', cityRoute);

io.on('connection', socket => {
	console.log('a connection was estublished', socket.id);
	City.watch().on('change', doc => {
		console.log(doc);
		if (doc.operationType == 'insert') {
			socket.emit('docChange', doc.fullDocument);
		} else if (doc.operationType == 'delete') {
			socket.emit('docDelete', doc.documentKey);
		}
	});
	socket.on('disconnect', () => {
		console.log('User disconnected...');
	});
});

const port = process.env.PORT || 5000;

httpServer.listen(port, console.log(`server running on port ${port}`));

import mongoose, { ConnectOptions, Mongoose, Connection } from "mongoose";
import { config } from "dotenv";
import RouteModel from "./Route";

config();

let cachedDb: Connection | null = null;

function connectToDatabase(): Connection {
	if (cachedDb) {
		return cachedDb;
	}

	const options: ConnectOptions = {
		ignoreUndefined: true,
	};

	const db: Connection = mongoose.createConnection(
		process.env.MONGODB_CONN_STRING,
		options
	);

	cachedDb = db;
	return db;
}

export { connectToDatabase, RouteModel };

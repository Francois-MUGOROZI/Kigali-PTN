import mongoose, {
	Schema,
	model,
	Document,
	Model,
	ObjectId,
	Connection,
} from "mongoose";
import { config } from "dotenv";

config();

export interface RouteDocument extends Document, RouteData {}

const schema = new Schema<RouteDocument>({
	id: { type: String },
	name: { type: String, required: true },
	startPoint: { type: String, required: true },
	endPoint: { type: String, required: true },
	stops: { type: [], required: false },
});

let routeModel: Model<RouteDocument>;

class RouteModel {
	constructor(connection: Connection) {
		if (!routeModel)
			routeModel = connection.model(process.env.ROUTES_COLLECTION, schema);
	}

	getRoutes = async (): Promise<RouteDocument[]> => {
		return routeModel.find().exec();
	};

	getRouteById = async (routeId: string): Promise<RouteDocument | null> => {
		return routeModel.findById(routeId).exec();
	};

	createRoute = async (routeData: RouteData): Promise<RouteDocument> => {
		return routeModel.create(routeData);
	};

	updateRoute = async (
		routeId: string,
		routeData: Partial<RouteDocument>
	): Promise<RouteDocument | null> => {
		return routeModel
			.findByIdAndUpdate(routeId, routeData, { new: true })
			.exec();
	};

	// Delete a Route by ID
	deleteRoute = async (routeId: string): Promise<void> => {
		await routeModel.findByIdAndDelete(routeId).exec();
	};
}

export default RouteModel;

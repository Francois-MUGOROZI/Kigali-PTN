import { NextResponse } from "next/server";
import { connectToDatabase, RouteModel } from "../models";

export async function GET(req: Request) {
	try {
		const dbConnection = connectToDatabase();
		const Route = new RouteModel(dbConnection);
		const routes = await Route.getRoutes();
		return NextResponse.json(routes);
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}

export async function POST(req: Request) {
	try {
		const dbConnection = connectToDatabase();
		const Route = new RouteModel(dbConnection);
		const data: RouteData = await req.json();
		const route = await Route.createRoute(data);
		return NextResponse.json({
			message: "Route created successfuly!",
			data: route,
		});
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{
				message: error.message || "Internal server error, try again",
			},
			{ status: error.message ? 400 : 500 }
		);
	}
}

export async function PATCH(req: Request) {
	try {
		const dbConnection = connectToDatabase();
		const Route = new RouteModel(dbConnection);
		const data = await req.json();
		const route = await Route.getRouteById(data.id);
		if (!route) {
			return NextResponse.json({ message: "Route not found" }, { status: 404 });
		}
		const updated = await Route.updateRoute(route._id, data);
		return NextResponse.json({
			message: "Route updated successfuly!",
			data: updated,
		});
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{
				message: error.message || "Internal server error, try again",
			},
			{ status: error.message ? 400 : 500 }
		);
	}
}

export async function DELETE(req: Request) {
	try {
		const dbConnection = connectToDatabase();
		const Route = new RouteModel(dbConnection);
		const data = await req.json();
		await Route.deleteRoute(data._id);
		return NextResponse.json({ message: "Route record deleted successfuly!" });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{
				message: error.message || "Internal server error, try again",
			},
			{ status: error.message ? 400 : 500 }
		);
	}
}

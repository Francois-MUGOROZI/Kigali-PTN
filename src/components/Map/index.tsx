"use client";
import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";

import MapView from "./MapView";
import DriverMode from "./DriverMode";

type Props = {
	routes: RouteData[];
};

const Navigator = ({ routes }: Props) => {
	const [state, setState] = useState({
		loading: true,
	});
	const [route, setRoute] = useState<Route>();
	const [mode, setMode] = useState<string>("driver");

	useEffect(() => {
		const destination = routes[0];
		const { name, startPoint, endPoint, stops } = destination;
		const waypoints = stops.map((stop) => {
			const { name, location } = stop;
			const geoPoints = location.split(",");
			const lat = parseFloat(geoPoints[0]);
			const lng = parseFloat(geoPoints[1]);
			return { name, lat, lng };
		});
		const startGeoPoints = startPoint.split(",");
		const endGeoPoints = endPoint.split(",");
		const startLat = parseFloat(startGeoPoints[0]);
		const startLng = parseFloat(startGeoPoints[1]);
		const endLat = parseFloat(endGeoPoints[0]);
		const endLng = parseFloat(endGeoPoints[1]);
		setRoute({
			name,
			startPoint: { name: "Start", lat: startLat, lng: startLng },
			waypoints,
			endPoint: { name: "End", lat: endLat, lng: endLng },
		});
		setState((prev) => ({ ...prev, loading: false }));
	}, [routes]);

	const onRouteRendered = useCallback((mapRouteInfo: MapRouteInfo) => {
		console.log("Route Rendered: ", mapRouteInfo);
	}, []);

	if (state.loading) {
		return <div>Loading...</div>;
	}

	if (!route) {
		return <div>No route found</div>;
	}

	return <Box>{mode === "driver" ? <DriverMode route={route} /> : null}</Box>;
};

export default Navigator;

"use client";
import React from "react";
import Box from "@mui/material/Box";
import {
	APIProvider,
	Map,
	AdvancedMarker,
	Pin,
} from "@vis.gl/react-google-maps";

// Custom components
import Directions from "./Directions";
import Tracking from "./Tracking";

type Props = {
	route: Route;
	onRouteRendered: (mapRouteInfo: MapRouteInfo) => void;
	handleUpdateNextStop: (nextStopInfo: NextStopInfo) => void;
};

export default function MapView({
	route,
	onRouteRendered,
	handleUpdateNextStop,
}: Props) {
	const [mapRouteInfo, setMapRouteInfo] = React.useState<MapRouteInfo>({
		summary: "",
		legs: [],
		totalDistance: 0,
		totalDuration: 0,
	});

	const handleRouteRendered = (mapRouteInfo: MapRouteInfo) => {
		setMapRouteInfo(mapRouteInfo);

		// Call the onRouteRendered callback with the route information
		onRouteRendered(mapRouteInfo);
	};

	return (
		<Box>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
				<Box style={{ height: "100vh", width: "100%" }}>
					<Map
						defaultCenter={route.startPoint}
						defaultZoom={12}
						mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
						fullscreenControl={false}
					>
						<AdvancedMarker position={route.startPoint}>
							<Pin background={"white"}></Pin>
						</AdvancedMarker>
						<AdvancedMarker position={route.endPoint}></AdvancedMarker>
						{route.waypoints.map((waypoint, index) => (
							<AdvancedMarker key={index} position={waypoint}>
								<Pin background={"white"}></Pin>
							</AdvancedMarker>
						))}
						<Directions route={route} onRouteRendered={handleRouteRendered} />
						<Tracking
							route={route}
							mapRouteInfo={mapRouteInfo}
							handleUpdateNextStop={handleUpdateNextStop}
						/>
					</Map>
				</Box>
			</APIProvider>
		</Box>
	);
}

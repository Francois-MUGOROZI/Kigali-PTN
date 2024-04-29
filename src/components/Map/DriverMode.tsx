import React, { useState } from "react";
import Box from "@mui/material/Box";

import MapView from "./MapView";
import InfoView from "./InfoView";

type Props = {
	route: Route;
};

export default function DriverMode({ route }: Props) {
	const [routeInfo, setRouteInfo] = useState<MapRouteInfo>({
		summary: "",
		legs: [],
		totalDistance: 0,
		totalDuration: 0,
	});

	const [nextStopInfo, setNextStopInfo] = React.useState<NextStopInfo>({
		name: "",
		distance: 0,
		duration: 0,
	});

	const handleUpdateNextStop = (nextStopInfo: NextStopInfo) => {
		setNextStopInfo(nextStopInfo);
	};

	const onRouteRendered = (mapRouteInfo: MapRouteInfo) => {
		setRouteInfo(mapRouteInfo);
	};

	return (
		<Box>
			<InfoView
				routeInfo={routeInfo}
				routeName={route.name}
				nextStopInfo={nextStopInfo}
			/>
			<MapView
				route={route}
				onRouteRendered={onRouteRendered}
				handleUpdateNextStop={handleUpdateNextStop}
			/>
		</Box>
	);
}

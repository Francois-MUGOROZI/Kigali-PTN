"use client";
import { useEffect, useState } from "react";
import {
	AdvancedMarker,
	Pin,
	useMap,
	useMapsLibrary,
} from "@vis.gl/react-google-maps";
import BusIcon from "@mui/icons-material/DirectionsBus";

// Custom components
import { SPEAD, UPDATE_INTERVAL } from "@/constants/drive";

type Props = {
	route: Route;
	mapRouteInfo: MapRouteInfo;
	handleUpdateNextStop: (nextStopInfo: NextStopInfo) => void;
};

export default function Tracking({
	mapRouteInfo,
	route,
	handleUpdateNextStop,
}: Props) {
	const map = useMap(); // Get the map instance
	const routesLibrary = useMapsLibrary("routes"); // Get the routes library
	const [directionsServices, setDirectionsServices] =
		useState<google.maps.DirectionsService>();

	useEffect(() => {
		if (!map || !routesLibrary) {
			return;
		}

		setDirectionsServices(new routesLibrary.DirectionsService());
	}, [map, routesLibrary]);

	const [busPosition, setBusPosition] = useState<{
		lat: number;
		lng: number;
	}>(route.startPoint);

	const [nextStopIndex, setNextStopIndex] = useState(0);

	useEffect(() => {
		if (mapRouteInfo.legs.length > 0) {
			const routePath: google.maps.LatLng[] = mapRouteInfo.legs.flatMap((leg) =>
				leg.steps.flatMap((step) =>
					google.maps.geometry.encoding.decodePath(step.encoded_lat_lngs)
				)
			);
			const numUpdates =
				(mapRouteInfo.totalDuration / UPDATE_INTERVAL + 0.1) * 1000;
			let updateIndex = 0;

			const interval = setInterval(() => {
				if (routePath.length > 0) {
					// Move the bus at a constant speed of 40 km/h
					const fraction = updateIndex / numUpdates;
					// Find the two points in the path that the bus is currently between
					const startIndex = Math.floor(fraction * (routePath.length - 1));
					const endIndex = Math.ceil(fraction * (routePath.length - 1));
					// Calculate the fraction of the distance between the two points the bus should have traveled
					const subFraction = (fraction * (routePath.length - 1)) % 1;

					const newPosition = google.maps.geometry.spherical.interpolate(
						routePath[startIndex],
						routePath[endIndex],
						subFraction
					);

					const newPositionData = {
						lat: newPosition.lat(),
						lng: newPosition.lng(),
					};

					setBusPosition(newPositionData);
					updateIndex++;
				}

				if (updateIndex >= numUpdates) {
					console.log("Bus has reached the destination");

					clearInterval(interval);
				}
			}, UPDATE_INTERVAL);

			return () => clearInterval(interval);
		}
	}, [mapRouteInfo]);

	useEffect(() => {
		setTimeout(() => {
			if (directionsServices) {
				directionsServices
					.route({
						origin: busPosition,
						destination: route.waypoints[nextStopIndex],
						travelMode: google.maps.TravelMode.DRIVING,
					})
					.then((result) => {
						if (result) {
							const stopRouteInfo = result.routes[0];
							const stopRoutePath = stopRouteInfo.legs.flatMap((leg) =>
								leg.steps.flatMap((step) =>
									google.maps.geometry.encoding.decodePath(
										step.encoded_lat_lngs
									)
								)
							);
							const nextStopIndexInPath = stopRoutePath.findIndex(
								(point) =>
									google.maps.geometry.spherical.computeDistanceBetween(
										route.waypoints[nextStopIndex],
										point
									) < 10
							);

							const totalDistance =
								google.maps.geometry.spherical.computeLength(stopRoutePath);
							const totalDuration = totalDistance / SPEAD;

							const nextStopInfo: NextStopInfo = {
								name: route.waypoints[nextStopIndex].name,
								distance: totalDistance,
								duration: totalDuration,
							};
							handleUpdateNextStop(nextStopInfo);

							if (nextStopIndexInPath === 0) {
								setNextStopIndex((prev) => prev + 1);
							}
						}
					});
			}
		}, 5000);
	}, [busPosition]);

	return (
		<AdvancedMarker position={busPosition}>
			<Pin background={"white"} scale={2}>
				<BusIcon color="primary" fontSize="large" />
			</Pin>
		</AdvancedMarker>
	);
}

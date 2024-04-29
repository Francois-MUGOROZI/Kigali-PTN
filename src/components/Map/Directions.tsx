"use client";
import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { SPEAD } from "@/constants/drive";

type Props = {
	route: Route;
	onRouteRendered: (mapRouteInfo: MapRouteInfo) => void;
};

export default function Directions({ route, onRouteRendered }: Props) {
	const map = useMap(); // Get the map instance
	const routesLibrary = useMapsLibrary("routes"); // Get the routes library

	const [directionsServices, setDirectionsServices] =
		useState<google.maps.DirectionsService>();
	const [directionsRenderers, setDirectionsRenderers] =
		useState<google.maps.DirectionsRenderer>();

	// useEffect hook to initialize the DirectionsService and DirectionsRenderer
	useEffect(() => {
		if (!map || !routesLibrary) {
			return;
		}

		setDirectionsServices(new routesLibrary.DirectionsService());
		setDirectionsRenderers(new routesLibrary.DirectionsRenderer({ map }));
	}, [map, routesLibrary]);

	// useEffect hook to fetch the route and render it on the map
	useEffect(() => {
		if (!directionsServices || !directionsRenderers) {
			return;
		}
		directionsServices
			.route({
				origin: route.startPoint,
				destination: route.endPoint,
				travelMode: google.maps.TravelMode.DRIVING,
				waypoints: route.waypoints.map((waypoint) => ({
					location: waypoint,
					stopover: true,
				})),
			})
			.then((result) => {
				if (result) {
					directionsRenderers.setDirections(result);
					const routeInfo = result.routes[0];

					const routePath = routeInfo.legs.flatMap((leg) =>
						leg.steps.flatMap((step) =>
							google.maps.geometry.encoding.decodePath(step.encoded_lat_lngs)
						)
					);

					const totalDistance =
						google.maps.geometry.spherical.computeLength(routePath);
					const totalDuration = totalDistance / SPEAD;

					// Call the onRouteRendered callback with the route information
					onRouteRendered({
						summary: routeInfo.summary,
						totalDistance: totalDistance,
						totalDuration: totalDuration,
						legs: routeInfo.legs.map((leg, index) => ({
							steps: leg.steps,
							start: leg.start_address,
							end: leg.end_address,
							duration: leg.duration?.text,
							distance: leg.distance?.text,
						})),
					});
				}
			});
	}, [directionsServices, directionsRenderers, route]);
	return null;
}

export const calculateDistance = (routeInfo: MapRouteInfo) => {
	const { legs } = routeInfo;
	const totalDistance = legs.reduce((acc, leg) => {
		const { distance = "0 km" } = leg;
		const distanceInKm = distance.split(" ")[0];
		const distanceInM = +distanceInKm * 1000;
		return acc + distanceInM;
	}, 0);

	return totalDistance;
};

export const calculateDuration = (routeInfo: MapRouteInfo) => {
	const { legs } = routeInfo;
	const totalDuration = legs.reduce((acc, leg) => {
		const { duration = "0 min" } = leg;
		const durationInMin = duration.split(" ")[0];
		const durationInSec = +durationInMin * 60;
		return acc + durationInSec;
	}, 0);

	return totalDuration;
};

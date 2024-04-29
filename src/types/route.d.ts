export {};

declare global {
	interface Point {
		name: string;
		lat: number;
		lng: number;
	}
	interface Route {
		name: string;
		startPoint: Point;
		waypoints: Point[];
		endPoint: Point;
	}

	interface MapRouteInfo {
		summary: string;
		totalDistance: number;
		totalDuration: number;
		legs: {
			start: string;
			end: string;
			duration?: string;
			distance?: string;
			steps: google.maps.DirectionsStep[];
		}[];
	}

	interface NextStopInfo {
		name: string;
		distance: number;
		duration: number;
	}

	// Route raw data
	interface RouteData {
		name: string;
		startPoint: string; // location is a geo coordinate
		endPoint: string; // location is a geo coordinate
		stops: { name: string; location: string }[]; // location is a geo coordinate
	}
}

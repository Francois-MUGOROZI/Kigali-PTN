import { useState } from "react";

const useTrackLocation = (defaultLatLong: string) => {
	const [locationErrorMsg, setLocationErrorMsg] = useState("");
	const [latLong, setLatLong] = useState(defaultLatLong);

	const success = (position: any) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		setLatLong(`${latitude},${longitude}`);
		setLocationErrorMsg("");
	};
	const error = () => {
		setLocationErrorMsg("Unable to retrieve your location!");
	};
	const handleTrackLocation = () => {
		if (!navigator.geolocation) {
			setLocationErrorMsg("Geolocation is not supported by this browser!");
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	return {
		latLong,
		locationErrorMsg,
		handleTrackLocation,
	};
};

export default useTrackLocation;

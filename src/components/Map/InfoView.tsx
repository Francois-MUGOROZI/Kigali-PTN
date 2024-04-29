import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { calculateDistance, calculateDuration } from "@/utils/route";

type Props = {
	routeInfo: MapRouteInfo;
	routeName: string;
	nextStopInfo: NextStopInfo;
};

export default function InfoView({
	routeInfo,
	routeName,
	nextStopInfo,
}: Props) {
	const totalDistance = (routeInfo.totalDistance / 1000.0).toFixed(2);
	const totalDuration = (routeInfo.totalDuration / 60.0).toFixed(2);

	const nextStepDistance = (nextStopInfo.distance / 1000.0).toFixed(2);
	const nextStepDuration = (nextStopInfo.duration / 60.0).toFixed(2);

	return (
		<Box className="flex flex-row justify-center relative h-fit mx-4">
			<Box
				className="absolute w-full top-4 left-auto right-auto z-40 p-8 rounded-md"
				sx={(theme) => ({
					backgroundColor: theme.palette.background.paper,
				})}
			>
				<Typography variant="h3">{routeName}</Typography>
				<Typography variant="h6">Distance: {totalDistance} km</Typography>
				<Typography variant="h6">Duration: {totalDuration} Mins</Typography>
				<Box className="flex flex-col justify-end items-end">
					<Typography variant="h4">Next Stop</Typography>
					<Typography variant="h5">{nextStopInfo.name}</Typography>
					<Typography variant="h6">Distance: {nextStepDistance} km</Typography>
					<Typography variant="h6">
						Duration: {nextStepDuration} Mins
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

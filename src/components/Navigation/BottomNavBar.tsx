import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationIcon from "@mui/icons-material/Notifications";

export default function BottomNavBar() {
	const [value, setValue] = React.useState(0);

	return (
		<BottomNavigation
			showLabels={false}
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
		>
			<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
			<BottomNavigationAction label="Recents" icon={<InfoIcon />} />
			<BottomNavigationAction
				label="Notifications"
				icon={<NotificationIcon />}
			/>
		</BottomNavigation>
	);
}

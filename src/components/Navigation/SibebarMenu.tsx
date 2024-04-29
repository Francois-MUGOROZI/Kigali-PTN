import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Divider from "@mui/material/Divider";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import LocationIcon from "@mui/icons-material/LocationOn";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { ListSubheader } from "@mui/material";

// custom components
import SearchForm from "../Forms/SearchForm";
import SwitchTheme from "../Forms/SwitchTheme";

//data
import routes from "@/data/routes.json";

type Props = {};

export default function SibebarMenu({}: Props) {
	return (
		<Box
			sx={(theme) => ({
				backgroundColor: theme.palette.background.paper,
				width: "100%",
				height: "100vh",
			})}
		>
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemAvatar>
							<Avatar src="/images/logo.jpg" variant="circular" />
						</ListItemAvatar>
						<ListItemText primary="Kigali PTN" />
					</ListItemButton>
				</ListItem>
			</List>
			<Box
				sx={{
					paddingX: 1,
				}}
			>
				<SearchForm routes={routes} />
			</Box>
			<List className="max-h-[60vh] overflow-y-auto mt-4">
				<ListSubheader>Bus Routes</ListSubheader>
				{routes.map((route) => (
					<ListItem key={route.name} disablePadding>
						<ListItemButton component={Link} href={`/${route.id}`}>
							<ListItemIcon className="min-w-0">
								<LocationIcon />
							</ListItemIcon>
							<ListItemText primary={route.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Box
				sx={(theme) => ({
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					zIndex: 10,
					backgroundColor: theme.palette.background.paper,
				})}
			>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<SwitchTheme />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<HelpIcon />
							</ListItemIcon>
							<ListItemText primary="Help" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary="Settings" />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Box>
	);
}

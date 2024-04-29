"use client";
import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";

// Custom Components
import AppBar from "@/components/Navigation/AppBar";
import SibebarMenu from "@/components/Navigation/SibebarMenu";
import BottomNavBar from "@/components/Navigation/BottomNavBar";

const drawerWidth = 280;

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	useEffect(() => {}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<Box
				component="nav"
				sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="Side navigations"
			>
				<Hidden mdUp implementation="css">
					<Drawer
						variant="temporary"
						open={mobileOpen}
						onTransitionEnd={handleDrawerTransitionEnd}
						onClose={handleDrawerClose}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						<SibebarMenu />
					</Drawer>
				</Hidden>
				<Hidden mdDown implementation="css">
					<Drawer
						variant="permanent"
						sx={{
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
						open
					>
						<SibebarMenu />
					</Drawer>
				</Hidden>
			</Box>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<AppBar toogleDrawer={handleDrawerToggle} />
				{children}
				<Hidden mdUp implementation="css">
					<Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
						<BottomNavBar />
					</Box>
				</Hidden>
			</Box>
		</Box>
	);
}

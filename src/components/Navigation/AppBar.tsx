import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

const settings = ["Profile", "Logout"];

type Props = {
	toogleDrawer: () => void;
};

function ResponsiveAppBar({ toogleDrawer }: Props) {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="sticky" color="transparent" elevation={0}>
			<Toolbar
				disableGutters
				sx={(theme) => ({
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: theme.palette.background.default,
					paddingX: 4,
				})}
			>
				<Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
					<IconButton
						size="large"
						aria-label="toggle navigation menu"
						onClick={toogleDrawer}
						color="inherit"
						sx={{ display: { md: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Kigali PTN
					</Typography>
				</Box>

				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar alt="Francois" src="/static/images/avatar/2.jpg" />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "45px" }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						{settings.map((setting) => (
							<MenuItem key={setting} onClick={handleCloseUserMenu}>
								<Typography textAlign="center">{setting}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Toolbar>
			<Divider />
		</AppBar>
	);
}
export default ResponsiveAppBar;

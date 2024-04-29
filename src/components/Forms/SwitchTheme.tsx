"use client";
import React, { useState, useEffect, use } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchTheme() {
	const [darkMode, setDarkMode] = useState(false);
	useEffect(() => {
		const theme = localStorage.getItem("theme");
		setDarkMode(theme === "dark");
	}, []);

	const onThemeChange = (e: any) => {
		setDarkMode(e.target.checked);
		const theme = e.target.checked ? "dark" : "light";
		localStorage.setItem("theme", theme);
		window.location.reload();
	};
	return (
		<FormGroup>
			<FormControlLabel
				checked={darkMode}
				control={<Switch onChange={onThemeChange} />}
				label="Dark Mode"
			/>
		</FormGroup>
	);
}

"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"; // or `v14-appRouter` if you are using Next.js v14
import { DarkTheme, LightTheme } from "./themes";

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState(LightTheme);
	useEffect(() => {
		const theme = localStorage.getItem("theme");
		setTheme(theme === "dark" ? DarkTheme : LightTheme);
	}, []);

	return (
		<AppRouterCacheProvider
			options={{
				prepend: true,
				key: "css",
			}}
		>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}

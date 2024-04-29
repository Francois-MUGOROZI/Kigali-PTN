import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const LightTheme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: "light",
			primary: {
				main: "#3855A5",
				light: "#5F7CCD",
				dark: "#203D8E",
			},
			secondary: {
				main: "#39B249",
				light: "#68DD77",
				dark: "#0D771B",
			},
			background: {
				default: "#FFFFFF",
				paper: "#F8FAFA",
			},
			text: {
				primary: "rgba(0, 0, 0, 0.87)",
				disabled: "rgba(0, 0, 0, 0.38)",
				secondary: "rgba(0, 0, 0, 0.6)",
			},
			common: {
				black: "#000000",
				white: "#FFFFFF",
			},
			grey: {
				"200": "#F7F8FA",
			},
		},
		typography: {
			fontFamily: ["Roboto", "sans-serif", "Raleway , Arial"].join(","),
		},
	})
);

export const DarkTheme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#B4C5FF",
				light: "#D3DDFF",
				dark: "#99B0FF",
			},
			secondary: {
				main: "#68DF6F",
				light: "#96F49C",
				dark: "#35C23D",
			},
			background: {
				default: "#121212",
				paper: "#4C4A4A",
			},
			text: {
				primary: "#fff",
				disabled: "rgba(255, 255, 255, 0.5)",
				secondary: "rgba(255, 255, 255, 0.7)",
			},
			common: {
				black: "#212121",
				white: "#e8ecef",
			},
			grey: {
				"200": "#F7F8FA",
			},
		},
		typography: {
			fontFamily: ["Roboto", "sans-serif", "Raleway , Arial"].join(","),
		},
	})
);

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AppLayout from "@/components/Layout/AppLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Kigali PTN",
	description:
		"Kigali PTN or Kigali Public Transport Navigator is a web application that helps people in Kigali to find the public transport routes, Bus stops, and tracking the buses in real-time. It also helps the bus drivers.",
	robots: {
		index: false,
		follow: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeRegistry>
					<AppLayout>{children}</AppLayout>
				</ThemeRegistry>
			</body>
		</html>
	);
}

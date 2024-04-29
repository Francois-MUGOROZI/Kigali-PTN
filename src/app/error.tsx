"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<Image
				src="/images/logo.jpg"
				alt="404"
				className="mt-8 w-16 h-16"
				width={200}
				height={200}
			/>
			<h1 className="text-4xl font-bold text-gray-800">Something went wrong</h1>
			<p className="text-gray-600">
				Oops! The page you are looking for has unexpected error, please try
				reloading.
			</p>
			<Link href="/" className="mt-4 text-primary hover:underline">
				Go back to home
			</Link>
		</div>
	);
};

export default NotFound;

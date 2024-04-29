"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";

type Props = {
	routes: RouteData[];
};

export default function SearchForm({ routes }: Props) {
	const router = useRouter();
	return (
		<Autocomplete
			id="search-form"
			size="small"
			options={routes.map((route) => ({
				value: route.endPoint,
				label: route.name,
			}))}
			renderInput={(params) => <TextField {...params} label="Search route" />}
		/>
	);
}

import { Container } from "@mui/material";

// custom components
import Navigator from "@/components/Map";
// data
import routes from "@/data/routes.json";

export default function Home() {
	return (
		<Container>
			<Navigator routes={routes} />
		</Container>
	);
}

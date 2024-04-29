export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
			NEXT_PUBLIC_GOOGLE_MAP_ID: string;
			MONGODB_CONN_STRING: string;
			ROUTES_COLLECTION: string;
		}
	}
}

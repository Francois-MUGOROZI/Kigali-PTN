# Kigali Public Transport Navigator

This is a web application that helps people in Kigali to find public transport
routes, bus stops, and track buses in real-time. It also assists bus drivers.
The project is built using Next.js, a popular React framework for building web
applications.

## Features

- Search for bus routes
- View bus stops
- Real-time bus tracking
- Assistance for bus drivers

## Getting Started

To get started with the project, clone the repository to your local machine.

For the all following commands, you need to create a .env file with the value
specified in the .env.example file.

```bash
git clone <repository-url>
```

Then, install the dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

The project has default routes unders /src/data/routes.json. You can change the
routes or add more if you want.

## Running with Docker

You can also run the project using Docker. First, build the Docker image.

```bash
docker build -t tag_name .
```

Then, run the Docker container.

```bash
docker run -p 3000:3000 tag_name
```

or use the docker-compose file

```bash
docker-compose up -d
```

import app from "./app";

const appPort = 3000 || process.env.APP_PORT;

const server = (port: number) =>
	app.listen(port, () => {
		console.log(`Server is running on port ${port}.`);
	});

server(appPort);

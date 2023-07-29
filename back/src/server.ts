import app from "./app";

const appPort = 3000;

const server = (port: number) =>
	app.listen(port, () => {
		console.log(`Server is running on port ${port}.`);
	});

server(appPort);

import "dotenv/config";
import { Knex } from "knex";

const config: Knex.Config = {
	client: "mysql2",
	connection: {
		host: String(process.env.HOST!),
		port: Number(process.env.PORT!),
		database: String(process.env.DB!),
		user: String(process.env.USER!),
		password: String(process.env.PASSWORD!),
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: "knex_migrations",
		directory: "./src/database/migrations",
	},
};

export default config;

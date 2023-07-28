import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("users", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());
		table.string("username").notNullable().checkLength("<=", 255);
		table.string("email").notNullable().checkLength("<=", 255);
		table.string("password").notNullable().checkLength("<=", 255);
		table.string("role");
		table.string("cpf").unique().notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.boolean("deleted").defaultTo(false);
	});

	await knex.schema.createTable("transactions", (table) => {
		table.uuid("id").primary().defaultTo(knex.fn.uuid());
		table.string("description").notNullable();
		table.bigInteger("date").notNullable();
		table.integer("points_value").notNullable();
		table.integer("value").notNullable();
		table.enu("status", ["Approved", "Reproved", "In Analysis"]);
		table.string("user_id").nullable();
		table.foreign("user_id").references("users.id");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("users");
	await knex.schema.dropTable("transactions");
}
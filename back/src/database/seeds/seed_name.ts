import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("users").del();
	await knex("transactions").del();

	const arr = [1,2,3,4,5];
	const commonUsers = arr.map(i => {
		return {
			username: `common${i}`,
			email: `common${i}@mail.com`,
			password: "1234",
			cpf: `${i}23.423.974-01`,
			role: "common"  
		};
	});

	const admin = [{
		username: "admin",
		email: "admin@mail.com",
		password: "1234",
		cpf: "282.279.300-01",
		role: "admin"        
	}];
            
	// Inserts seed entries
	for (const commonUser of commonUsers) {
		await knex("users").insert(commonUser);
	}
	await knex("users").insert(admin);
}

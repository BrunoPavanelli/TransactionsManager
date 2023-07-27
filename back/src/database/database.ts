import config from "../../knexfile";
import { knex } from "knex";

const database = knex(config)

export default database
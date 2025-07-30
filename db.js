import { Pool } from "pg";

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'authentication',
  password: 'Sultik008',
  port: 5432,
});

export default db

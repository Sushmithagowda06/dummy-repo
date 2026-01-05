const pool = require("./db_pg.cjs");

(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id SERIAL PRIMARY KEY,
      patient_name TEXT,
      email TEXT,
      date TEXT,
      time TEXT
    )
  `);

  console.log("✅ appointments table created");
  process.exit(0);
})();

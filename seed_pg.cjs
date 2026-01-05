const pool = require("./db_pg.cjs");

(async () => {
  await pool.query(`
    INSERT INTO appointments (patient_name, email, date, time)
    VALUES
    ('Rekha Ravi', 'rekharavi909@gmail.com', '2026-01-05', '15:20'),
    ('Test Patient', 'test@example.com', '2026-01-05', '15:30')
  `);

  console.log("✅ test data inserted");
  process.exit(0);
})();

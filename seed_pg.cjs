const pool = require("./db_pg.cjs");

(async () => {
  await pool.query(`
    INSERT INTO public.appointments (patient_name, email, date, time)
    VALUES
    ('Test User', 'test@example.com', CURRENT_DATE, '10:30'),
    ('Demo User', 'demo@example.com', CURRENT_DATE, '11:00')
  `);

  console.log("✅ seed data inserted");
})();

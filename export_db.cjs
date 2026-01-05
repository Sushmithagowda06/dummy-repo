const pool = require("./db_pg.cjs");
const XLSX = require("xlsx");

module.exports = async () => {
  // 1️⃣ Fetch ALL rows
  const result = await pool.query(`
    SELECT
      id,
      phone,
      patient_name AS name,
      date,
      time,
      created_at AS "BookedAt"
    FROM public.appointments
    ORDER BY id ASC
  `);

  console.log("Rows fetched from Postgres:", result.rows.length);

  // 2️⃣ Convert to Excel
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(result.rows);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

  // 3️⃣ Return buffer
  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });

  return buffer;
};

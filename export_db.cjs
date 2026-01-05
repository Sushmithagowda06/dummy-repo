const XLSX = require("xlsx");
const pool = require("./db_pg.cjs");

module.exports = async () => {
  const result = await pool.query(
  "SELECT * FROM public.appointments ORDER BY id"
);


  console.log("Rows fetched from Postgres:", result.rows.length);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(result.rows);

  XLSX.utils.book_append_sheet(wb, ws, "Appointments");

  return XLSX.write(wb, {
    bookType: "xlsx",
    type: "buffer",
  });
};

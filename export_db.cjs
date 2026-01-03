const sqlite3 = require("sqlite3").verbose();
const XLSX = require("xlsx");
const DB_PATH = require("./db");

module.exports = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    db.all("SELECT * FROM appointments", (err, rows) => {
      if (err) return reject(err);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, "Appointments");

      const file = "appointments.xlsx";
      XLSX.writeFile(wb, file);

      db.close(() => resolve(file));
    });
  });
};

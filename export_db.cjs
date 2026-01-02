const sqlite3 = require("sqlite3").verbose();
const XLSX = require("xlsx");
const { DB_PATH } = require("./db.js");

module.exports = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    db.serialize(() => {
      // 🔐 ensure table exists
      db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_name TEXT,
          email TEXT,
          date TEXT,
          time TEXT
        )
      `);

      db.all("SELECT * FROM appointments", (err, rows) => {
        if (err) return reject(err);

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Appointments");

        const file = "appointments.xlsx";
        XLSX.writeFile(wb, file);

        console.log("📄 Exported DB to Excel");
        db.close();
        resolve(file);
      });
    });
  });
};

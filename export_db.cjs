const sqlite3 = require("sqlite3").verbose();
const XLSX = require("xlsx");
const path = require("path");

const DB_PATH = path.join(__dirname, "db.sqlite");

module.exports = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, err => {
      if (err) return reject(err);
    });

   db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      date TEXT,
      time TEXT
    )
  `);

  db.all("SELECT * FROM appointments", (err, rows) => {
    if (err) {
      db.close();
      return reject(err);
    }

    // continue as usual
  });
});


      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(rows || []);
      XLSX.utils.book_append_sheet(wb, ws, "Appointments");

      const buffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "buffer",
      });

      db.close();
      resolve(buffer);
    });
  };
;

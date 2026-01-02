const sqlite3 = require("sqlite3").verbose();
const { DB_PATH } = require("./db.js");

module.exports = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);

    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_name TEXT,
          email TEXT,
          date TEXT,
          time TEXT
        )
      `);

      db.run(`DELETE FROM appointments`);

      const stmt = db.prepare(`
        INSERT INTO appointments (patient_name, email, date, time)
        VALUES (?, ?, ?, ?)
      `);

      for (let i = 1; i <= 15; i++) {
        stmt.run(
          `Patient ${i}`,
          `patient${i}@gmail.com`,
          "2026-01-02",
          "10:00 AM"
        );
      }

      stmt.finalize(() => {
        db.close();
        console.log("🗄️ DB seeded");
        resolve();
      });
    });
  });
};

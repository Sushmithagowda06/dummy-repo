const sqlite3 = require("sqlite3").verbose();
const XLSX = require("xlsx");

module.exports = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("db.sqlite");

    db.all("SELECT * FROM appointments", (err, rows) => {
      if (err) return reject(err);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, "Appointments");

      const filePath = "appointments.xlsx";
      XLSX.writeFile(wb, filePath);

      console.log("📄 Exported DB to Excel");
      resolve(filePath);
    });
  });
};

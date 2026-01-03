db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_name TEXT,
      email TEXT,
      date TEXT,
      time TEXT
    )
  `, () => {
    // Only insert AFTER table exists
  });
});

// StAuth10244: I Mahtabin Tushi, 000952184 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// I have not made my work available to anyone else.

const sqlite3 = require('sqlite3').verbose();

/**
 * Creates a connection to a local SQLite database file (expenses.db).
 * If the file does not exist, it will be created automatically.
 */
const db = new sqlite3.Database('./expenses.db');

/**
 * Creates the "expenses" table if it does not already exist.
 * This table stores all expense records for the application.
 */
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT
    )`,
    (err) => {
      if (err) {
        // Log error if table creation fails
        console.error('Error creating table:', err.message);
      } else {
        // Confirm database is ready for use
        console.log('Database ready.');
      }
    }
  );
});

// Export database connection for use in other files
module.exports = db;
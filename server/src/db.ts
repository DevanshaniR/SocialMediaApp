import sqlite3 from 'sqlite3';

// Initialize SQLite database (this will create the file if it doesn't exist)
const db = new sqlite3.Database('./social_media.db', (err) => {
  if (err) {
    console.error('Error opening the database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create tables for posts and comments if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      text TEXT NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id)
    )
  `);
});

export { db };

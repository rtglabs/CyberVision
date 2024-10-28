const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Create a new database connection
const db = new sqlite3.Database('./database/rover.db', (err) => {
  if (err) {
    return console.error('Error connecting to the database', err);
  }
  console.log('Connected to SQLite database');

  // Create the users table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`,
    (err) => {
      if (err) {
        return console.error('Error creating table:', err);
      }

      console.log('Users table is ready');

      // Users to add
      const users = [
        { username: 'alpha', password: '01apexDefense253' },
        { username: 'prelim-ambler.0q@icloud.com', password: 'jD6ntJ9Z' }
      ];

      // Track how many users have been processed
      let processedCount = 0;

      // Function to hash the password and insert the user
      const addUser = (user) => {
        bcrypt.hash(user.password, 10, (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err);
            return;
          }

          // Use the open database connection to run the insert
          db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [user.username, hash],
            function (err) {
              if (err) {
                console.error('Error adding user:', err);
              } else {
                console.log(`User ${user.username} added successfully`);
              }

              // Increment processedCount after attempting to add each user
              processedCount += 1;

              // If all users are processed, close the database connection
              if (processedCount === users.length) {
                db.close((err) => {
                  if (err) {
                    return console.error('Error closing the database', err);
                  }
                  console.log('Database connection closed');
                });
              }
            }
          );
        });
      };

      // Loop through each user and add them
      users.forEach(addUser);
    }
  );
});

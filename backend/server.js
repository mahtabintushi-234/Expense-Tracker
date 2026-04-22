// StAuth10244: I Mahtabin Tushi, 000952184 certify that  this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available 
// to anyone else.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3001;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

/* ============================
   COLLECTION ROUTES (/api/)
   ============================ */

/**
 * GET /api/
 * Retrieve all expenses from database
 */
app.get('/api/', (req, res) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/**
 * POST /api/
 * Add a new expense
 */
app.post('/api/', (req, res) => {
  const { title, amount, category, date, description } = req.body;

  // Validate required fields
  if (!title || !amount || !category || !date || !description) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  db.run(
    `INSERT INTO expenses (title, amount, category, date, description)
     VALUES (?, ?, ?, ?, ?)`,
    [title, amount, category, date, description],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Return inserted ID
      res.json({
        status: 'CREATE ENTRY SUCCESSFUL',
        id: this.lastID
      });
    }
  );
});

/**
 * PUT /api/
 * Replace entire collection (used for reset sample data)
 */
app.put('/api/', (req, res) => {
  const expenses = req.body;

  if (!Array.isArray(expenses)) {
    return res.status(400).json({ error: 'Body must be an array' });
  }

  db.serialize(() => {
    // Clear existing data
    db.run('DELETE FROM expenses', [], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Insert new collection
      const stmt = db.prepare(
        `INSERT INTO expenses (title, amount, category, date, description)
         VALUES (?, ?, ?, ?, ?)`
      );

      expenses.forEach((item) => {
        stmt.run([
          item.title,
          item.amount,
          item.category,
          item.date,
          item.description
        ]);
      });

      stmt.finalize();

      res.json({ status: 'REPLACE COLLECTION SUCCESSFUL' });
    });
  });
});

/**
 * DELETE /api/
 * Delete all expenses
 */
app.delete('/api/', (req, res) => {
  db.run('DELETE FROM expenses', [], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ status: 'DELETE COLLECTION SUCCESSFUL' });
  });
});

/* ============================
   ITEM ROUTES (/api/:id)
   ============================ */

/**
 * GET /api/:id
 * Retrieve a single expense by ID
 */
app.get('/api/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM expenses WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(row);
  });
});

/**
 * PUT /api/:id
 * Update an existing expense
 */
app.put('/api/:id', (req, res) => {
  const { title, amount, category, date, description } = req.body;
  const id = req.params.id;

  db.run(
    `UPDATE expenses
     SET title = ?, amount = ?, category = ?, date = ?, description = ?
     WHERE id = ?`,
    [title, amount, category, date, description, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ status: 'UPDATE ITEM SUCCESSFUL' });
    }
  );
});

/**
 * DELETE /api/:id
 * Delete a single expense by ID
 */
app.delete('/api/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM expenses WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ status: 'DELETE ITEM SUCCESSFUL' });
  });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Test route to fetch data from the database
router.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
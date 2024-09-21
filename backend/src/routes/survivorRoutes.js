const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET route to fetch all players
router.get('/players', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM players');
        res.json(result.rows);
    } catch (err) {
        console.log('Error fetching players:', err.message);
        res.status(500).json({ error: 'Failed to fetch players' });
    }
});

// GET route to fetch all players on a specific tribe
router.get('/players/tribe/:tribeId', async (req, res) => {
    const { tribeId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM players WHERE current_tribe = $1', [tribeId]);
        res.json(result.rows);
    } catch (err) {
        console.log(`Error fetching players from tribe ${tribeId}:`, err.message);
        res.status(500).json({ error: `Failed to fetch players from tribe ${tribeId}`});
    }
});

// GET route to fetch all tribes
router.get('/tribes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tribes');
        res.json(result.rows);
    } catch (err) {
        console.log('Error fetching tribes:', err.message);
        res.status(500).json({ error: 'Failed to fetch tribes' });
    }
});

module.exports = router;
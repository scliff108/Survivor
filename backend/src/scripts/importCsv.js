const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const pool = require('../config/db');

const csvFilePath = path.join(__dirname, '../../survivorPlayers.csv');

const insertPlayer = async (player) => {
    const { name, age, tribe, hometown, current_residence, occupation, image_url } = player;

    try {
        const res = await pool.query(
            `INSERT INTO players (name, age, hometown, current_residence, image_url, occupation, starting_tribe, current_tribe)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [name, age || null, hometown || null, current_residence || null, image_url || null, occupation || null, tribe || null, tribe || null]
        );
        console.log(`Inserted player: ${name}`);
    } catch (err) {
        console.log(`Error inserting player ${name}:`, err.message);
    }
};

const importCsv = () => {
    let count = 0;
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
            count++;
            await insertPlayer(row);
        } catch (err) {
            console.log(`Error processing row ${count}: ${err.message}`);
        }
      })
      .on('end', () => {
        console.log(`CSV file successfully processed. Total rows processed: ${count}`);
        pool.end();
      })
      .on('error', (err) => {
        console.log(`Error reading the CSV file: ${err.message}`);
      });
};

importCsv();
const express = require('express');
const testRoute = require('./routes/testRoute');
const survivorRoutes = require('./routes/survivorRoutes');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Mount the survivor-related routes at '/api'
app.use('/api', survivorRoutes);

// Mount the test route at '/api/test'
app.use('/api/test', testRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
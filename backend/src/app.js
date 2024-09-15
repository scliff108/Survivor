const express = require('express');
const testRoute = require('./routes/testRoute');

const app = express();

app.use('/api', testRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
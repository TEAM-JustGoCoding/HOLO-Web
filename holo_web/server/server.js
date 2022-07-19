const express = require('express');
const app = express();
const test = require('./router/test');

app.use('/api', test);

const port = 5000;
app.listen(port, () => console.log(`${port}`));

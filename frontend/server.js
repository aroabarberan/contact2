const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('build'));

app.use('*', (req, res) => res.sendFile('index.html', { root: 'build' }));

app.listen(port, () => console.log('Server started'));
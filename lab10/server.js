const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/save', (req, res) => {
    const gameData = req.body;
    const filePath = path.join(__dirname, 'gameData.json');

    fs.writeFile(filePath, JSON.stringify(gameData), (err) => {
        if (err) {
            console.error('Error saving game data:', err);
            res.status(500).send('Error saving game data');
        } else {
            res.send('Game data saved successfully');
        }
    });
});

app.get('/load', (req, res) => {
    const filePath = path.join(__dirname, 'gameData.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error loading game data:', err);
            res.status(500).send('Error loading game data');
        } else {
            const gameData = JSON.parse(data);
            res.send(gameData);
        }
    });
});

app.use(express.static(__dirname));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

//http://localhost:3000/basefinal.html


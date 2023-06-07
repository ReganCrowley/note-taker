const path = require('path');
const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.json());
const port = 3000
const { readFileSync, writeFileSync } = require('fs');
const data = readFileSync('./db/db.json');
const db = JSON.parse(data);

function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
    }

    return arr;
}

app.get('/heimerweiner', (req, res) => {
    res.send('The sweet smell of WEINER!!!')
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.get('/api/notes', (req, res) => {
    res.json(db)
});
app.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.random().toString(36).slice(2)
    }
    db.push(newNote)
    writeFileSync('./db/db.json', JSON.stringify(db))
    console.log(req.body)
    res.json(db)
});

app.delete('/api/notes/:id', (req, res) => {
    removeObjectWithId(db, req.params.id);
    writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})


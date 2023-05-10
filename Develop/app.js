const path = require('path');
const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.json());
const port = 3000
const { readFileSync,writeFileSync } = require('fs');
const data = readFileSync('./db/db.json');
const db = JSON.parse(data);

app.get('/heimerweiner', (req, res) => {
    res.send('The sweet smell of WEINER!!!')
})
app.get('/notes' , (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));   
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.get('/api/notes' , (req, res) => {
    res.json(db)
});
app.post('/api/notes' , (req, res) => {
    const newNote = {
        title: req.body.title,
        text:req.body.text,
        id:db.length+1
    }
    db.push(newNote)
    writeFileSync('./db/db.json',JSON.stringify(db))
    console.log(req.body)
    res.json(db)
});


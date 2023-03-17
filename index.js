const express = require('express');
const fs = require('fs');
const data = require('./data.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/read', (req, res) => {
    res.json(data)
})
app.get('/:id', (req, res) => {
    const date = new Date()
    data.data.push(date+'5:30')
    console.log(data);
    const json = JSON.stringify(data);
    fs.writeFile('./data.json', json, ()=>{
        console.log(data);
    })
    res.send(`hello ${req.params.id}`);
})


app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`);
})
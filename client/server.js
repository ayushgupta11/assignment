const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('**/static',express.static(path.join(__dirname,'/build/static')))
app.use('**/statics', express.static(path.join(__dirname,'/build/statics')))
// app.use(cors())

app.get('**/manifest.json', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build/manifest.json'))
})

app.get('**/', (req, res) => {
    res.sendFile(path.join(__dirname,'/build/index.html'))
})

app.listen(port,() => {
    console.log('listening on port ' + port);
})
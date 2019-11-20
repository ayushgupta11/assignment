import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import socketio from 'socket.io'
import approutes from './routes'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 9000

app.use(bodyParser.json())
app.use(cors())

approutes(app, io)

server.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})
import db from '../helpers/db'
import userRoutes from './users'
import postRoutes from './posts'
import commentRoutes from './comments'
import verifyToken from '../helpers/verifyToken'

export default (app, io) => {
    app.get('/', (request, response) => {
        response.send("Server up & running!!")
    })
    app.get('/authenticate', verifyToken, (request, response) => {
        response.status(200).send({
            data: request.body.data.user
        })
    })
    io.on('connection', () => {
        console.log("User is connected")
    })
    userRoutes(app, db)
    postRoutes(app, io, db)
    commentRoutes(app, io, db)
    return app
}
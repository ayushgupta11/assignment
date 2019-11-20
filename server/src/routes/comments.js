import addApi from '../controllers/comments/add.controller'
import getApi from '../controllers/comments/get.controller'
import verifyToken from '../helpers/verifyToken'

export default (app, io, db) => {
    app.get('/comments/:postId', verifyToken, getApi(db))
    app.post('/comments/add', verifyToken, addApi(db, io))
    return app
}
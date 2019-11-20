import verifyToken from '../helpers/verifyToken'
import getApi from '../controllers/posts/get.controller'
import addApi from '../controllers/posts/add.controller'

export default (app, io, db) => {
    app.get('/posts', verifyToken, getApi(db))
    app.get('/posts/:id', verifyToken, getApi(db))
    app.post('/posts/add', verifyToken, addApi(db, io))
    return app
}
import signupApi from '../controllers/users/add.controller'
import loginApi from '../controllers/users/login.controller'

export default (app, db) => {
    app.post('/user/signup', signupApi(db))
    app.post('/user/login', loginApi(db))
    return app
}
import { success, internalServerError, badRequest, unAuthorized } from '../../helpers/responseTemplate'
import passwordHash from 'password-hash'
import generateToken from '../../helpers/generateToken'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if (data) {
            let { name, email, password } = data
            if (name && email && password) {
                db.users.findOne({
                    email
                }, (err, doc) => {
                    if (err) {
                        internalServerError(response, err)
                    }
                    else {
                        if (doc) {
                            unAuthorized(response, 'User already exists')
                        }
                        else {
                            let query = {
                                name,
                                email,
                                'password': passwordHash.generate(password)
                            }
                            db.users.insert(query, (err, doc) => {
                                if (err) {
                                    internalServerError(response, err)
                                }
                                else {
                                    let userData = { ...doc }
                                    delete userData['password']
                                    generateToken(userData).then((token) => {
                                        success(response, {
                                            token
                                        })
                                    }).catch((err) => {
                                        internalServerError(response, err)
                                    })
                                }
                            })
                        }
                    }
                })
            }
            else{
                badRequest(response)
            }
        }
        else {
            badRequest(response)
        }
    }
}
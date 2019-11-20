import { success, internalServerError, badRequest, unAuthorized } from '../../helpers/responseTemplate'
import passwordHash from 'password-hash'
import generateToken from '../../helpers/generateToken'

export default (db) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { email, password } = data
            if(email && password){
                db.users.findOne({ email }, (err, user) => {
                    if(err){
                        internalServerError(response, err)
                    }
                    else{
                        if(user){
                            if(passwordHash.verify(password, user['password'])){
                                let userData = {...user}
                                delete userData['password']
                                generateToken(userData).then((token) => {
                                    success(response, {
                                        token
                                    })
                                }).catch((err) => {
                                    internalServerError(response, err)
                                })
                            }
                            else{
                                unAuthorized(response, "Invalid Password")
                            }
                        }
                        else{
                            unAuthorized(response, "User doesn't exist")
                        }
                    }
                })
            }
            else{
                badRequest(response)
            }
        }
        else{
            badRequest(response)
        }
    }
}
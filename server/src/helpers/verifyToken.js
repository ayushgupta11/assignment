import jwt from 'jsonwebtoken'
import { unAuthorized } from './responseTemplate'
import { secret } from '../config/secret'

export default (request, response, next) => {
    const authHeader = request.headers["x-access-token"] || request.headers["authorization"]
    if (!authHeader) {
        unAuthorized(response)
    }
    else {
        let token = authHeader.split(' ')[1]
        if (token) {
            jwt.verify(token, secret, (err, user) => {
                if (err || user == undefined) {
                    unAuthorized(response)
                }
                else {
                    if(request.body.data){
                        request.body.data['user'] = user
                    }
                    else{
                        request.body['data'] = {
                            user
                        }
                    }
                    next()
                }
            })
        }
        else {
            unAuthorized(response)
        }
    }
}
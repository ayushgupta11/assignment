import jwt from 'jsonwebtoken'
import { secret } from '../config/secret'

export default (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(data, secret, { expiresIn: '2 days' },(err, token) => {
            if(err){
                reject(err)
            }
            else{
                resolve(token)
            }
        })
    })
}
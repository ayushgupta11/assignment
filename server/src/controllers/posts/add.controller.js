import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db, io) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            if(data.hasOwnProperty('content')){
                let query = {
                    content: data.content,
                    userId: mongojs.ObjectId(data.user._id),
                    likes: [],
                    timestamp: Date.now()
                }
                db.posts.insert(query, (err, doc) => {
                    if(err){
                        internalServerError(response, err)
                    }
                    else{
                        let responseData = {...doc, user: [data.user]}
                        success(response)
                        io.emit('post', responseData)
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
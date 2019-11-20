import { success, internalServerError, badRequest } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db, io) => {
    return (request, response) => {
        let { data } = request.body
        if(data){
            let { content, user, postId, replyTo } = data
            if(content && user && postId){
                let query = {
                    content,
                    userId: mongojs.ObjectId(user._id),
                    'postId': mongojs.ObjectId(postId),
                    'replyTo': replyTo ? mongojs.ObjectId(replyTo) : null,
                    timestamp: Date.now()
                }
                db.comments.insert(query, (err, doc) => {
                    if(err){
                        internalServerError(response, err)
                    }
                    else{
                        let responseData = {...doc, 'user': [user]}
                        success(response)
                        io.emit('comment', responseData)
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
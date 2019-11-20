import { success, internalServerError } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db) => {
    return (request, response) => {
        let { postId } = request.params
        let query = [
            { '$match': { postId: mongojs.ObjectId(postId) } },
            { '$lookup': { 
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'user'
             } }
        ]
        db.comments.aggregate(query, (err, doc) => {
            if(err){
                internalServerError(response, err)
            }
            else{
                success(response, doc)
            }
        })
    }
}
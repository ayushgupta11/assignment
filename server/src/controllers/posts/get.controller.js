import { success, internalServerError } from '../../helpers/responseTemplate'
import mongojs from 'mongojs'

export default (db) => {
    return (request, response) => {
        let { id } = request.params
        let query = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]
        if(id){
            query.push({ $match: { 'userId': mongojs.ObjectId(id) } })
        }
        db.posts.aggregate(query, (err, posts) => {
            if (err) {
                internalServerError(response, err)
            }
            else {
                success(response, posts)
            }
        })
    }
}
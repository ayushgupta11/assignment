import mongo from 'mongojs'
import dbConfig from '../config/db'

const db = mongo(dbConfig.url, dbConfig.collections)

db.on('error', function (err) {
    console.log('database error', err)
})
 
db.on('connect', function () {
    console.log('database connected')
})

export default db
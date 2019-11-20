import getcookie from '@utils/getcookie'
import { getAuth } from '@utils/makeRequest'
class Auth {
    constructor() {
        this.isAuthed = false
    }
    login(cb) {
        this.isAuthed = true
        cb()
    }
    logout(cb) {
        this.isAuthed = false
        cb()
    }
    isAuthenticated() {
        return new Promise((resolve, reject) => {
            // if (getcookie('access_token') != '') {
            //     getAuth('authenticate').then((response) => {
            //         this.isAuthed = true
            //         resolve(this.isAuthed)
            //     }).catch((error) => {
            //         resolve(this.isAuthed)
            //     })
            // }
            // else resolve(this.isAuthed)
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }
}

export default new Auth()
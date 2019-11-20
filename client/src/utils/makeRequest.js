import Axios from 'axios'
import baseUrl from './baseUrl'
import getcookie from './getcookie'

export const post = (url, data) => {
    return new Promise((resolve, reject) => {
        Axios(
            {
                method: 'post',
                url: `${baseUrl}${url}`,
                data,
                responseType: 'json',
                headers: {
                    'content-type': 'application/json'
                }
            }
        )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    }
    )
}

export const get = (url) => {
    return new Promise((resolve, reject) => {
        Axios(
            {
                method: 'get',
                url: `${baseUrl}${url}`,
                responseType: 'json',
                headers: {
                    'content-type': 'application/json'
                }
            }
        )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    }
    )
}

export const getAuth = (url) => {
    return new Promise((resolve, reject) => {
        Axios(
            {
                method: 'get',
                url: `${baseUrl}${url}`,
                responseType: 'json',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${getcookie('access_token')}`
                }
            }
        )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    }
    )
}

export const postAuth = (url, data) => {
    return new Promise((resolve, reject) => {
        Axios(
            {
                method: 'post',
                url: `${baseUrl}${url}`,
                data,
                responseType: 'json',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${getcookie('access_token')}`
                }
            }
        )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    }
    )
}
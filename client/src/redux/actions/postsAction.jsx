import { getAuth } from '@utils/makeRequest'

export const getPosts = () => {
    return (dispatch) => {
        getAuth('posts').then((response) => {
            if(!response.data.error){
                dispatch({
                    type: 'SET_POSTS',
                    payload: response.data.data
                })
            }
        })
    }
}

export const addNewPost = (payload) => {
    return (dispatch) => {
        dispatch({
            type: 'NEW_POST',
            payload
        })
    }
}

export const getTimelinePosts = (user) => {
    return (dispatch) => {
        getAuth(`posts/${user}`).then((response) => {
            if(!response.data.error){
                dispatch({
                    type: 'SET_POSTS',
                    payload: response.data.data
                })
            }
        })
    }
}
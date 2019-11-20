import { getAuth } from '@utils/makeRequest'

export const getUser = () => {
    return (dispatch) => {
        getAuth('authenticate').then((response) => {
            dispatch({
                type: 'SET_USER',
                payload: response.data.data
            })
        })
    }
}
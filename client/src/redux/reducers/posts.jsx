const Posts = (state = [], action) => {
    switch(action.type){
        case 'SET_POSTS':
            return [...action.payload]
        case 'NEW_POST':
            return [...state, {...action.payload}]
    }
    return state
}

export default Posts
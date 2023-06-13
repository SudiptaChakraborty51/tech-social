export const dataReducer = (state, action) => {
    switch(action.type) {
        case "SET_ALL_USERS":
            return {...state, users: action.payload};
        default:
            return state;
    }
}
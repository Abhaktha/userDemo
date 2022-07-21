import initialState from "./initial-state";

export default function (state = initialState.users, action) {
    switch (action.type) {
        case "LOAD_USERS_SUCCESS": {
            let data = action.payload.data;
            let users = data.results;
            state = { ...state, users }
            return state;
        }
        case "DELETE_USERS_SUCCESS": {
            let uuid = action.payload.uuid;
            let userIndex = state.users.findIndex(item => item.login.uuid === uuid)
            state = {
                ...state,
                users: [...state.users.slice(0, userIndex), ...state.users.slice(userIndex + 1)]
            }
            return state;
        }
        default:
            return state
    }
}
import {GET_API_VERSION} from "../actions/types";

const initialState = {};

const ApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_API_VERSION: {
            return action.payload;
        }
        default:
            return state;
    }
};
export default ApiReducer;
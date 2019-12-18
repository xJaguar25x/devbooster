import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import columnsReducer from "./columnsReducer";
import boardsReducer from "./boardsReducer";
import ApiReducer from "./ApiReducer";

export default combineReducers({
    cardsById: cardsReducer,
    columnsById: columnsReducer,
    boardsById: boardsReducer,
    ApiVersion: ApiReducer
})
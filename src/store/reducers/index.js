import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import columnsReducer from "./columnsReducer";
import boardsReducer from "./boardsReducer";

export default combineReducers({
    cardsById: cardsReducer,
    columnsById: columnsReducer,
    boardsById: boardsReducer
})
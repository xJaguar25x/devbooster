import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import columnsReducer from "./columnsReducer";
import boardsReducer from "./boardsReducer";

export default combineReducers({
    cards: cardsReducer,
    columns: columnsReducer,
    boards: boardsReducer
})
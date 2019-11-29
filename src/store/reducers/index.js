import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import columnsReducer from "./columnsReducer";

export default combineReducers({
    cards: cardsReducer.cardsReducer,
    columns: columnsReducer.columnsReducer
})
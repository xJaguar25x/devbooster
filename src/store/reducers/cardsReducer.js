import {
    GET_CARDS,
    ADD_CARD,
    DELETE_CARD, DELETE_COLUMN, EDIT_CARD_TITLE, GET_ALL
} from '../actions/types';
// import State from "./initialState";

// let initialState = State.cardsById;
const initialState = {};

function convertCard(inputData) {
    let outputData = {};
    inputData.forEach(item => {
        // if (item._id){
            outputData = {
                ...outputData,
                [item._id]: {
                    _id: item._id,
                    card_name: item.name
                }
            }
        // } else return;

    });
    return outputData;
}

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL: {
            const data = convertCard(action.payload.cards);
            // console.log("cardsReducer ",data);
            return data;
        }
        case GET_CARDS: {
            const data = convertCard(action.payload);
            // console.log("cardsReducer ",data);
            return data;
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case ADD_CARD: {
            const {cardTitle, cardId} = action.payload;
            // console.log(cardTitle, cardId, columnId);
            return {
                ...state,
                [cardId]: {
                    _id: cardId,
                    card_name: cardTitle
                }
            };
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case DELETE_CARD: {
            const {cardId} = action.payload;
            const {[cardId]: deletedCard, ...restOfCards} = state;
            return restOfCards;
        }
        case DELETE_COLUMN: {
            const {cards: cardIds} = action.payload;
            // console.log("cards ", cardIds);
            return Object.keys(state)
              .filter(cardId => !cardIds.includes(cardId))
              .reduce(
                (newState, cardId) => ({
                    ...newState,
                    [cardId]: state[cardId]
                }),
                {}
              );
        }
        case EDIT_CARD_TITLE: {
            const {cardId, cardTitle} = action.payload;
            return {
                ...state,
                [cardId]: {
                    ...state[cardId],
                    card_name: cardTitle
                }
            };
        }
        default:
            return state;
    }
};


export default cardsReducer;
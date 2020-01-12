import {
    GET_CARDS,
    ADD_CARD,
    DELETE_CARD, DELETE_COLUMN, EDIT_CARD, GET_ALL, ITEMS_LOADING
} from '../actions/types';
// import State from "./initialState";

// let initialState = State.cardsById;
const initialState = {
    cards: {},
    loading: false
};

function convertCard(inputData) {
    let outputData = {};
    inputData.forEach(item => {
        // if (item._id){
        outputData = {
            ...outputData,
            [item._id]: {
                _id: item._id,
                title: item.name,
                description: item.description
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
            return {
                ...state,
                cards: {...data},
                loading: false
            };
        }
        case GET_CARDS: {
            const data = convertCard(action.payload);
            // console.log("cardsReducer ",data);
            return {
                ...state,
                cards: {...data},
                loading: false
            };
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case ADD_CARD: {
            const {cardTitle, cardId} = action.payload;
            // console.log(cardTitle, cardId, columnId);
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [cardId]: {
                        _id: cardId,
                        title: cardTitle
                    }
                }
            };
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case DELETE_CARD: {
            const {cardId} = action.payload;
            const {[cardId]: deletedCard, ...restOfCards} = state.cards;
            return {
                ...state,
                cards: {
                    ...restOfCards
                }
            };
        }
      //TODO: хз как исправить стейт, надо проверить
        case DELETE_COLUMN: {
            const {cards: cardIds} = action.payload;
            // console.log("cards ", cardIds);
            console.log("state.cards ", state.cards);

            // Object.keys нужен, для преобразования объекта к массиву, иначе не будет работать метод filter
            //filter фильтрует массив state.cards так, чтобы полученные cardIds с удаляемой колонки не вошли в набор
            // далее reduce преобразует массив обратно в объект
            const temp = Object.keys(state.cards)
              .filter(cardId => !cardIds.includes(cardId))
              .reduce(
                (newState, cardId) => ({
                    ...newState,
                    [cardId]: state.cards[cardId]
                }),
                {}
              );
            // console.log("temp ", temp);

            return {
                ...state,
                cards: {
                    ...temp
                }
            };
        }
        case EDIT_CARD: {
            const {card} = action.payload;
            // console.log("card ", card);
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [card._id]: {
                        ...state.cards[card._id],
                        ...card._id
                    }
                }
            };
        }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};


export default cardsReducer;
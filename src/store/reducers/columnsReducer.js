import {
    GET_COLUMNS,
    ADD_COLUMN,
    DELETE_COLUMN,
    EDIT_COLUMN_TITLE, ADD_CARD, DELETE_CARD, REORDER_COLUMN
} from '../actions/types';
// import outerState from "./initialState";

// let initialState = outerState.columnsById;

const initialState = {};


function normalizeColumn(inputData) {
    let outputData = {};
    inputData.forEach(item => {
        outputData = {
            ...outputData,
            [item._id]: {
                _id: item._id,
                column_name: item.name,
                cards: item.card_ids
            }
        };
    });

    return outputData;
}

const columnsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COLUMNS:
            const data = normalizeColumn(action.payload);
            // console.log(data);
            return data;

        case EDIT_COLUMN_TITLE: {
            const {columnTitle, columnId} = action.payload;
            console.log(state);
            return {
                ...state,
                [columnId]: {
                    ...state[columnId],
                    column_name: columnTitle
                }
            };
        }
        case ADD_COLUMN: {
            const {columnTitle, columnId} = action.payload;
            return {
                ...state,
                [columnId]: {
                    _id: columnId,
                    column_name: columnTitle,
                    cards: []
                }
            };
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case ADD_CARD: {
            const {cardTitle, cardId, columnId} = action.payload;
            // console.log("cardTitle =%s cardId=%s columnId=%s", cardTitle, cardId, columnId);
            return {
                ...state,
                [columnId]: {
                    ...state[columnId],
                    cards: [
                        // state[columnId].cards.concat(cardId)
                        ...state[columnId].cards,
                        cardId
                    ]
                }
            };
        }
        case DELETE_COLUMN: {
            const {columnId} = action.payload;
            const {[columnId]: deletedList, ...restOfLists} = state;
            return restOfLists
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case DELETE_CARD: {
            const {columnId, cardId} = action.payload;
            console.log("cardId=%s columnId=%s", cardId, columnId);
            return {
                ...state,
                [columnId]: {
                    ...state[columnId],
                    cards: state[columnId].cards.filter(item => item !== cardId)
                }
            };
        }
      // изменение порядка Cards в Columns
        case REORDER_COLUMN: {
            const {
                sourceIndex,
                destinationIndex,
                sourceId,
                destinationId
            } = action.payload;

            // Reorder within the same column
            if (sourceId === destinationId) {
                const newCards = Array.from(state[sourceId].cards);
                // удаляем из исходного массива перемещаемую задачу
                const [removedCard] = newCards.splice(sourceIndex, 1);
                // добавляем в список перемещаемую задачу на новое место
                newCards.splice(destinationIndex, 0, removedCard);
                return {
                    ...state,
                    [sourceId]: {...state[sourceId], cards: newCards}
                };
            }

            const sourceCards = Array.from(state[sourceId].cards);
            // удаляем из исходного массива перемещаемую задачу
            const [removedCard] = sourceCards.splice(sourceIndex, 1);
            const destinationCards = Array.from(state[destinationId].cards);
            // добавляем в список перемещаемую задачу на новое место
            destinationCards.splice(destinationIndex, 0, removedCard);
            return {
                ...state,
                [sourceId]: {...state[sourceId], cards: sourceCards},
                [destinationId]: {...state[destinationId], cards: destinationCards}
            };
        }
        default:
            return state;
    }
};

export default {columnsReducer};
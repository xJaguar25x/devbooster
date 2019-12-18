import {
    GET_COLUMNS,
    ADD_COLUMN,
    DELETE_COLUMN,
    EDIT_COLUMN_TITLE, ADD_CARD, DELETE_CARD, REORDER_COLUMN, GET_COLUMNS_BY_BOARD, GET_ALL, ITEMS_LOADING
} from '../actions/types';
// import outerState from "./initialState";

// let initialState = outerState.columnsById;

const initialState = {
    columns: {},
    loading: false
};


function convertColumn(inputData) {
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
        case GET_ALL: {
            const data = convertColumn(action.payload.columns);
            // console.log(data);
            return {
                ...state,
                columns: {...data},
                loading: false
            };
        }
        case GET_COLUMNS: {
            const data = convertColumn(action.payload);
            // console.log(data);
            return {
                ...state,
                columns: {...data},
                loading: false
            };
        }
        case GET_COLUMNS_BY_BOARD: {
            const data = convertColumn(action.payload);
            // console.log(data);
            return {
                ...state,
                columns: {...data},
                loading: false
            };
        }
        case EDIT_COLUMN_TITLE: {
            const {columnTitle, columnId} = action.payload;
            // console.log(state);
            return {
              ...state,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        column_name: columnTitle
                    }
                }
            };
        }
        case ADD_COLUMN: {
            const {columnTitle, columnId} = action.payload;
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        _id: columnId,
                        column_name: columnTitle,
                        cards: []
                    }
                }
            };
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case ADD_CARD: {
            const { cardId, columnId } = action.payload;
            // console.log("cardTitle =%s cardId=%s columnId=%s", cardTitle, cardId, columnId);
            return {
              ...state,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        cards: [
                            // state[columnId].cards.concat(cardId)
                            ...state.columns[columnId].cards,
                            cardId
                        ]
                    }
                }
            };
        }
        case DELETE_COLUMN: {
            const {columnId} = action.payload;
            const {[columnId]: deletedList, ...restOfLists} = state.columns;
            const temp = {
                ...state,
                columns: {
                    ...restOfLists,
                }
            };
            // console.log("temp ", temp);
            return temp;
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case DELETE_CARD: {
            const {columnId, cardId} = action.payload;
            console.log("cardId=%s columnId=%s", cardId, columnId);
            return {
              ...state,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        cards: state.columns[columnId].cards.filter(item => item !== cardId)
                    }
                }
            };
        }
      // изменение порядка Cards в Columns
        case REORDER_COLUMN: {
            const {
                sourceId,
                destinationId,
                sourceCards,
                destinationCards
            } = action.payload;

            // Reorder within the same column
            if (sourceId === destinationId) {
                return {
                    ...state,
                    columns: {
                        ...state.columns,
                        [sourceId]: {...state.columns[sourceId], cards: sourceCards}
                    }
                };
            } else {
                return {
                    ...state,
                    columns: {
                        ...state.columns,
                        [sourceId]: {...state.columns[sourceId], cards: sourceCards},
                        [destinationId]: {...state.columns[destinationId], cards: destinationCards}
                    }
                };
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

export default columnsReducer;
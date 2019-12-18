import {
    ADD_BOARD,
    ADD_COLUMN,
    DELETE_BOARD,
    DELETE_COLUMN,
    EDIT_BOARD_TITLE,
    GET_ALL,
    GET_BOARDS, ITEMS_LOADING, REORDER_BOARD
} from "../actions/types";

const initialState = {
    boards: {},
    loading: false
};


function convertBoard(inputData) {
    let outputData = {};
    inputData.forEach(item => {
        outputData = {
            ...outputData,
            [item._id]: {
                _id: item._id,
                title: item.name,
                column_ids: item.column_ids
            }
        };
    });

    return outputData;
}

const boardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL: {
            const data = convertBoard(action.payload.boards);
            // console.log("action.payload.boards ", action.payload.boards);
            return {
                ...state,
                boards: {...data},
                loading: false
            };
        }
        case GET_BOARDS: {
            const data = convertBoard(action.payload);
            // console.log(data);
            return {
                ...state,
                boards: {...data},
                loading: false
            };
        }
        case EDIT_BOARD_TITLE: {
            const {boardTitle, boardId} = action.payload;
            console.log(state);
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [boardId]: {
                        ...state.boards[boardId],
                        title: boardTitle
                    }
                }
            };
        }
        case ADD_BOARD: {
            const {boardTitle, boardId} = action.payload;
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [boardId]: {
                        _id: boardId,
                        title: boardTitle,
                        column_ids: []
                    }
                }
            };
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case ADD_COLUMN: {
            const {boardId, columnId} = action.payload;
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [boardId]: {
                        ...state.boards[boardId],
                        column_ids: [
                            // state[columnId].cards.concat(cardId)
                            ...state.boards[boardId].column_ids,
                            columnId
                        ]
                    }
                }
            };
        }
        case DELETE_BOARD: {
            const {boardId} = action.payload;
            const {[boardId]: deletedList, ...restOfLists} = state.boards;
            // console.log("boardId=%s boards=", boardId, restOfLists);
            return {
                ...state,
                boards: {
                    ...restOfLists
                }
            }
        }
      // этот кейс повторяется в 3 редьюсерах, потому что нужно изменять данные в трех местах
        case DELETE_COLUMN: {
            const {boardId, columnId} = action.payload;
            // console.log("boardId=%s columnId=%s", boardId, columnId);
            const temp = {
                ...state,
                boards: {
                    ...state.boards,
                    [boardId]: {
                        ...state.boards[boardId],
                        column_ids: state.boards[boardId].column_ids.filter(item => item !== columnId)
                    }
                }
            };
            // console.log("temp ", temp);
            return temp;
        }
      // изменение порядка Columns в Board
        case REORDER_BOARD: {
            const {
                sourceId,
                destinationId,
                newColumn_ids
            } = action.payload;

            // Reorder within the same Board
            if (sourceId === destinationId) {
                return {
                    ...state,
                    boards: {
                        ...state.boards,
                        [sourceId]: {...state.boards[sourceId], column_ids: newColumn_ids}
                    }
                };
            } else
            //TODO: тут перемещение между досками, скопировано из перемещения  карточек, если нужно будет, нужно будет исправить
            {
                // const sourceCards = Array.from(state[sourceId].cards);
                // // удаляем из исходного массива перемещаемую задачу
                // const [removedCard] = sourceCards.splice(sourceIndex, 1);
                // const destinationCards = Array.from(state[destinationId].cards);
                // // добавляем в список перемещаемую задачу на новое место
                // destinationCards.splice(destinationIndex, 0, removedCard);
                // return {
                //     ...state,
                //     [sourceId]: {...state[sourceId], cards: sourceCards},
                //     [destinationId]: {...state[destinationId], cards: destinationCards}
                // };
            }
            return;
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

export default boardsReducer;
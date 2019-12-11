import {ADD_BOARD, DELETE_BOARD, EDIT_BOARD_TITLE, GET_BOARDS} from "../actions/types";

const initialState = {};


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
        case GET_BOARDS:
            const data = convertBoard(action.payload);
            // console.log(data);
            return data;

        // case EDIT_BOARD_TITLE: {
        //     const {columnTitle, columnId} = action.payload;
        //     console.log(state);
        //     return {
        //         ...state,
        //         [columnId]: {
        //             ...state[columnId],
        //             column_name: columnTitle
        //         }
        //     };
        // }
        case ADD_BOARD: {
            const {boardTitle, boardId} = action.payload;
            return {
                ...state,
                [boardId]: {
                    _id: boardId,
                    title: boardTitle,
                    column_ids: []
                }
            };
        }
    //   // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
    //     case ADD_CARD: {
    //         const { cardId, columnId } = action.payload;
    //         // console.log("cardTitle =%s cardId=%s columnId=%s", cardTitle, cardId, columnId);
    //         return {
    //             ...state,
    //             [columnId]: {
    //                 ...state[columnId],
    //                 cards: [
    //                     // state[columnId].cards.concat(cardId)
    //                     ...state[columnId].cards,
    //                     cardId
    //                 ]
    //             }
    //         };
    //     }
        case DELETE_BOARD: {
            const {boardId} = action.payload;
            const {[boardId]: deletedList, ...restOfLists} = state;
            // console.log("boardId=%s boards=", boardId, restOfLists);
            return restOfLists
        }
    //   // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
    //     case DELETE_CARD: {
    //         const {columnId, cardId} = action.payload;
    //         console.log("cardId=%s columnId=%s", cardId, columnId);
    //         return {
    //             ...state,
    //             [columnId]: {
    //                 ...state[columnId],
    //                 cards: state[columnId].cards.filter(item => item !== cardId)
    //             }
    //         };
    //     }
    //   // изменение порядка Cards в Columns
    //     case REORDER_COLUMN: {
    //         const {
    //             sourceIndex,
    //             destinationIndex,
    //             sourceId,
    //             destinationId
    //         } = action.payload;
    //
    //         // Reorder within the same column
    //         if (sourceId === destinationId) {
    //             const newCards = Array.from(state[sourceId].cards);
    //             // удаляем из исходного массива перемещаемую задачу
    //             const [removedCard] = newCards.splice(sourceIndex, 1);
    //             // добавляем в список перемещаемую задачу на новое место
    //             newCards.splice(destinationIndex, 0, removedCard);
    //             return {
    //                 ...state,
    //                 [sourceId]: {...state[sourceId], cards: newCards}
    //             };
    //         }
    //
    //         const sourceCards = Array.from(state[sourceId].cards);
    //         // удаляем из исходного массива перемещаемую задачу
    //         const [removedCard] = sourceCards.splice(sourceIndex, 1);
    //         const destinationCards = Array.from(state[destinationId].cards);
    //         // добавляем в список перемещаемую задачу на новое место
    //         destinationCards.splice(destinationIndex, 0, removedCard);
    //         return {
    //             ...state,
    //             [sourceId]: {...state[sourceId], cards: sourceCards},
    //             [destinationId]: {...state[destinationId], cards: destinationCards}
    //         };
    //     }
        default:
            return state;
    }
};

export default boardsReducer;
import {
    GET_COLUMNS,
    ADD_COLUMN,
    DELETE_COLUMN,
    EDIT_COLUMN_TITLE,
    GET_CARDS,
    ADD_CARD,
    DELETE_CARD,
    EDIT_CARD_TITLE
} from './types';
import uuid from 'uuid';
// axios - http client используется для отправки запросов
// import axios from 'axios';

export const getColumns = () => {
    return {
        type: GET_COLUMNS
    };
};

// export const reorderList = (
//   cardId,
//   sourceId,
//   destinationId,
//   sourceIndex,
//   destinationIndex,
//   boardId
// ) => dispatch => {
//     dispatch({
//         type: "REORDER_LIST",
//         payload: {
//             sourceId,
//             destinationId,
//             sourceIndex,
//             destinationIndex
//         }
//     });
//
//     axios
//       .put("/api/reorder-list", {
//           cardId,
//           sourceId,
//           destinationId,
//           sourceIndex,
//           destinationIndex,
//           boardId
//       })
//       .then(({ data }) => console.log(data));
// };

export const addColumn = (columnTitle) => {
    const columnId = uuid();
    // console.log("1", columnTitle);
    return {
        type: "ADD_COLUMN",
        payload: {columnTitle, columnId}
    };
};
export const editColumnTitle = (columnTitle, columnId) => {
    return {
        type: "EDIT_COLUMN_TITLE",
        payload: {
            columnTitle,
            columnId
        }
    };
};
export const deleteColumn = (columnId, cards) => {
    return {
        type: "DELETE_COLUMN",
        payload: {columnId, cards}
    };
};
export const reorderColumn = (
  cardId,
  sourceId,
  destinationId,
  sourceIndex,
  destinationIndex
) => {
    return {
        type: "REORDER_COLUMN",
        payload: {
            sourceId,
            destinationId,
            sourceIndex,
            destinationIndex
        }
    };
};


/* ~~~~~~~~~~~~~~~~~~ Cards ~~~~~~~~~~~~~~~~~~~~~~*/
export const getCards = () => {
    return {
        type: GET_CARDS
    };
};
// эта функция вызывает событие в 2 редьюсерах, потому что нужно изменять данные в двух местах
export const addCard = (columnId, cardTitle) => {
    const cardId = uuid();
    // console.log("cardTitle =%s cardId=%s columnId=%s", cardTitle, cardId, columnId);
    return {
        type: "ADD_CARD",
        payload: {columnId, cardTitle, cardId}
    };
};
// эта функция вызывает событие в 2 редьюсерах, потому что нужно изменять данные в двух местах
export const deleteCard = (columnId, cardId) => {
    // console.log("1cardId=%s columnId=%s", cardId, columnId);
    return {
        type: "DELETE_CARD",
        payload: {columnId, cardId}
    };
};
export const editCard = (cardId, cardTitle) => {
    // console.log("cardTitle =%s cardId=%s", cardTitle, cardId);
    return {
        type: "EDIT_CARD_TITLE",
        payload: {cardId, cardTitle}
    };
};

/* ~~~~~~~~~~~~~~~~~~ Boards ~~~~~~~~~~~~~~~~~~~~~~*/
export const reorderBoard = (
  columnId,
  sourceId,
  destinationId,
  sourceIndex,
  destinationIndex
) => {
    // TODO: тут нужно будет доделать при добавлении сущность board в store. Добавить в boardReducer
    return {
        type: "REORDER_BOARD",
        payload: {
            sourceId,
            destinationId,
            sourceIndex,
            destinationIndex
        }
    };
};
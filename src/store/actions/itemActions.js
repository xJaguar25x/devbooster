import {
    GET_COLUMNS,
    ADD_COLUMN,
    DELETE_COLUMN,
    EDIT_COLUMN_TITLE,
    GET_CARDS,
    ADD_CARD,
    DELETE_CARD,
    EDIT_CARD_TITLE, REORDER_COLUMN, REORDER_BOARD, GET_BOARDS, ADD_BOARD, DELETE_BOARD
} from './types';
// axios - http client используется для отправки запросов
import axios from 'axios';

axios.defaults.baseURL = 'https://api.mbdotest.online';

/* ~~~~~~~~~~~~~~~~~~ Boards ~~~~~~~~~~~~~~~~~~~~~~*/
export const getBoards = () => dispatch => {
    axios
      .get('/api/boards')
      .then(res => {
          dispatch({
              type: GET_BOARDS,
              payload: res.data
          })
      })
};
export const addBoard = (boardTitle) => dispatch => {
    //преобразуем к виду для сервера
    // TODO: изменить owner_id на нужный, после добавления пользователей
    const newBoard = {"name": boardTitle, "owner_id": "5dd87b0e0453e1ca59773bc8"};
    axios
    // отправляем запрос на создание колонки
      .post('/api/boards', newBoard)
      .then((res) => {
          console.log("res ", res);
          const boardId = res.data._id;
          dispatch({
              type: ADD_BOARD,
              payload: {boardTitle, boardId}
          })
      })
      .catch((err) => {
          console.log(err);
      });
};
export const editBoardTitle = (board) => dispatch => {
    // const boardId = board._id;
    // const boardTitle = board.title;
    // // console.log("cardTitle =%s cardId=%s", cardTitle, cardId);
    // //преобразуем к виду для сервера
    // const newColumn = {"name": boardTitle, "column_ids": [...board.column_ids]};
    // console.log("newColumn", newColumn);
    // axios
    //   .put(`/api/columns/${boardId}`, newColumn)
    //   .then((res) => {
    //       console.log("res ", res);
    //       dispatch({
    //           type: EDIT_COLUMN_TITLE,
    //           payload: {columnTitle: boardTitle, columnId: boardId}
    //       })
    //   })
    //   .catch((err) => {
    //       console.log(err);
    //   });
};
export const deleteBoard = (boardId) => dispatch => {
    console.log(" boardId=%s", boardId);
    dispatch({
        type: DELETE_BOARD,
        payload: {boardId}
    });
    axios
      .delete(`/api/boards/${boardId}`)
      .then((res) => {
          console.log("Успешно удален, res= ", res);
          // dispatch({
          //     type: DELETE_BOARD,
          //     payload: {boardId}
          // })
      })
      .catch((err) => {
          console.log(err);
      });

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
export const reorderBoard = (
  columnId,
  sourceId,
  destinationId,
  sourceIndex,
  destinationIndex
) => {
    // TODO: тут нужно будет доделать при добавлении сущность board в store. Добавить в boardReducer
    return {
        type: REORDER_BOARD,
        payload: {
            sourceId,
            destinationId,
            sourceIndex,
            destinationIndex
        }
    };
};

/* ~~~~~~~~~~~~~~~~~~ Columns ~~~~~~~~~~~~~~~~~~~~~~*/
export const getColumns = () => dispatch => {
    axios
      .get('/api/columns')
      .then(res => {
          dispatch({
              type: GET_COLUMNS,
              payload: res.data
          })
      })
};
export const addColumn = (columnTitle) => dispatch => {
    //преобразуем к виду для сервера
    const newColumn = {"name": columnTitle};
    axios
    // отправляем запрос на создание колонки
      .post('/api/columns', newColumn)
      .then((res) => {
          console.log("res ", res);
          const columnId = res.data._id;
          dispatch({
              type: ADD_COLUMN,
              payload: {columnTitle, columnId}
          })
      })
      .catch((err) => {
          console.log(err);
      });
};
export const editColumnTitle = (column) => dispatch => {
    const columnId = column._id;
    const columnTitle = column.column_name;
    // console.log("cardTitle =%s cardId=%s", cardTitle, cardId);
    //преобразуем к виду для сервера
    const newColumn = {"name": columnTitle, "card_ids": [...column.cards]};
    console.log("newColumn", newColumn);
    axios
      .put(`/api/columns/${columnId}`, newColumn)
      .then((res) => {
          console.log("res ", res);
          dispatch({
              type: EDIT_COLUMN_TITLE,
              payload: {columnTitle, columnId}
          })
      })
      .catch((err) => {
          console.log(err);
      });
};
export const deleteColumn = (columnId, cards) => dispatch => {
    console.log("1cardId=%o columnId=%s", cards, columnId);
    axios
      .delete(`/api/columns/${columnId}`)
      .then((res) => {
          console.log("res ", res);
          dispatch({
              type: DELETE_COLUMN,
              payload: {columnId, cards}
          })
      })
      .catch((err) => {
          console.log(err);
      });
};
export const reorderColumn = (
  cardId,
  sourceId,
  destinationId,
  sourceIndex,
  destinationIndex,
  columnById
) => dispatch => {

    // Reorder within the same column
    if (sourceId === destinationId) {
        dispatch({
            type: REORDER_COLUMN,
            payload: {
                sourceId,
                destinationId,
                sourceIndex,
                destinationIndex
            }
        });
        const newCards = Array.from(columnById[sourceId].cards);
        // удаляем из исходного массива перемещаемую задачу
        const [removedCard] = newCards.splice(sourceIndex, 1);
        // добавляем в список перемещаемую задачу на новое место
        newCards.splice(destinationIndex, 0, removedCard);
        // собераем и преобразуем к виду для сервера
        const newColumn = {"name": columnById[sourceId].column_name, "card_ids": [...newCards]};
        axios
          .put(`/api/columns/${sourceId}`, newColumn)
          .then((res) => {
              console.log("res ", res);
              // перенес dispatch отсюда, чтобы выглядело более user-friendly
          })
          .catch((err) => {
              console.log(err);
              // из-за переноса dispatch следует при ошибке вызывать метод getColumns(), чтобы восстановить исходные состояние
              getColumns();
          });

    } else {
        dispatch({
            type: REORDER_COLUMN,
            payload: {
                sourceId,
                destinationId,
                sourceIndex,
                destinationIndex
            }
        });
        // При перетаскивании между разными колонками
        const sourceCards = Array.from(columnById[sourceId].cards);
        // удаляем из исходного массива перемещаемую задачу
        const [removedCard] = sourceCards.splice(sourceIndex, 1);
        const destinationCards = Array.from(columnById[destinationId].cards);
        // добавляем в список перемещаемую задачу на новое место
        destinationCards.splice(destinationIndex, 0, removedCard);
        // собераем и преобразуем к виду для сервера две колонки
        const sourceColumn = {"name": columnById[sourceId].column_name, "card_ids": [...sourceCards]};
        const destinationColumn = {"name": columnById[destinationId].column_name, "card_ids": [...destinationCards]};
        axios
          .all([
              axios.put(`/api/columns/${sourceId}`, sourceColumn),
              axios.put(`/api/columns/${destinationId}`, destinationColumn)
          ])
          .then(([
                     firstReq,
                     secondReq
                 ]) => {
              console.log(firstReq, secondReq);
              // перенес dispatch отсюда, чтобы выглядело более user-friendly
          })
          .catch((err) => {
              console.log(err);
              // из-за переноса dispatch следует при ошибке вызывать метод getColumns(), чтобы восстановить исходные состояние
              getColumns();
          });
    }
};


/* ~~~~~~~~~~~~~~~~~~ Cards ~~~~~~~~~~~~~~~~~~~~~~*/
export const getCards = () => dispatch => {
    axios
      .get('/api/cards')
      .then(res => {
          dispatch({
              type: GET_CARDS,
              payload: res.data
          })
      })
};
// эта функция вызывает событие в 2 редьюсерах, потому что нужно изменять данные в двух местах
export const addCard = (column, cardTitle) => dispatch => {
    // объявлеям глобальную переменную для передачи значения в цепочке .then
    let cardId = 0;
    const columnId = column._id;
    //преобразуем к виду для сервера
    const card = {"description": "null", "name": cardTitle};
    axios
    // отправляем запрос на создание карточки
      .post('/api/cards', card)
      .then(res => {
          // дожидаемся ответа и извлекаем _id
          cardId = res.data._id;
          const newColumn = {"name": column.column_name, "card_ids": [...column.cards, res.data._id]};
          // выполняем запрос на добавление созданной карточки в список колонки
          axios.put(`/api/columns/${column._id}`, newColumn);
      })
      .then(() => {
          dispatch({
              type: ADD_CARD,
              payload: {columnId, cardTitle, cardId}
          })
      })
      .catch((err) => {
          console.log(err);
      });
};

// эта функция вызывает событие в 2 редьюсерах, потому что нужно изменять данные в двух местах
export const deleteCard = (column, cardId) => dispatch => {
    // console.log("1cardId=%s columnId=%s", cardId, columnId);
    const columnId = column._id;
    const cards = column.cards;
    const indexOfCard = cards.indexOf(cardId);
    if (indexOfCard !== -1) {
        cards.splice(indexOfCard, 1);
    }
    //преобразуем к виду для сервера
    const newColumn = {"name": column.column_name, "card_ids": [...cards]};
    // console.log("indexOfCard", indexOfCard);
    // console.log("cards", cards);
    axios
      .all([
          axios.delete(`/api/cards/${cardId}`),
          axios.put(`/api/columns/${columnId}`, newColumn)
      ])
      .then(([
                 cardReq,
                 columnReq
             ]) => {
          console.log(cardReq, columnReq);
      })
      .then(() => {
          dispatch({
              type: DELETE_CARD,
              payload: {columnId, cardId}
          })
      })
      .catch((err) => {
          console.log(err);
      });
};
export const editCard = (card) => dispatch => {
    const cardId = card._id;
    const cardTitle = card.card_name;
    // console.log("cardTitle =%s cardId=%s", cardTitle, cardId);
    //преобразуем к виду для сервера
    const newCard = {"description": "null", "name": cardTitle, "comment_ids": []};
    axios
      .put(`/api/cards/${cardId}`, newCard)
      .then((res) => {
          console.log("res ", res);
          dispatch({
              type: EDIT_CARD_TITLE,
              payload: {cardId, cardTitle}
          })
      })
      .catch((err) => {
          console.log(err);
      });
};
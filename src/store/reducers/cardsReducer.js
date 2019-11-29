import uuid from 'uuid';
import {
    GET_CARDS,
    ADD_CARD,
    DELETE_CARD, DELETE_COLUMN, EDIT_CARD_TITLE
} from '../actions/types';
import State from "./initialState";
// previous state
// columns: [
//     {
//         id: uuid(),
//         column_name: "column1",
//         cards: [
//             {id: uuid(), card_name: "card1"},
//             {id: uuid(), card_name: "card2"}
//         ]
//     },
//     {
//         id: uuid(),
//         column_name: "column2",
//         cards: [
//             {id: uuid(), card_name: "card3"}
//         ]
//     },
//     {
//         id: uuid(),
//         column_name: "column3",
//         cards: [
//             {id: uuid(), card_name: "card2"},
//             {id: uuid(), card_name: "card5"},
//             {id: uuid(), card_name: "card6"}
//         ]
//     }
// ]

// example state
// state: {
//     boardsById: {
//         'JF3vk9MXQ': {
//             _id: 'JF3vk9MXQ',
//             title: '123',
//             lists: []
//         },
//         'uno2twW7-': {
//             _id: 'uno2twW7-',
//             title: 'asasasas',
//             lists: [
//                 'av7vfm3aM',
//                 'oSSCWtjZ4'
//             ]
//         }
//     },
//     cardsById: {
//         'CRsan9Wm5': {
//             _id: 'CRsan9Wm5',
//             title: '1'
//         },
//         'k1t2Tteww': {
//             _id: 'k1t2Tteww',
//             title: '2'
//         },
//         'YMEatL6kf': {
//             _id: 'YMEatL6kf',
//             title: '5'
//         },
//         'd8dMQb-6O': {
//             _id: 'd8dMQb-6O',
//             title: '6'
//         }
//     },
//     listsById: {
//         'av7vfm3aM': {
//             _id: 'av7vfm3aM',
//             title: '123',
//             cards: [
//                 'CRsan9Wm5',
//                 'k1t2Tteww'
//             ]
//         },
//         'oSSCWtjZ4': {
//             _id: 'oSSCWtjZ4',
//             title: '234',
//             cards: [
//                 'YMEatL6kf',
//                 'd8dMQb-6O'
//             ]
//         }
//     }
// },

// const initialState = {
//
//     cardsById: {
//         '983f06c9-b14b': {
//             _id: '983f06c9-b14b',
//             card_name: 'card1'
//         },
//         'df0434d9-13fb': {
//             _id: 'df0434d9-13fb',
//             card_name: 'card2'
//         },
//         '8999d6ae-8d19': {
//             _id: '8999d6ae-8d19',
//             card_name: 'card3'
//         },
//         'fe479dd3-2a86': {
//             _id: 'fe479dd3-2a86',
//             card_name: 'card2'
//         },
//         'd00f9855-8dcd': {
//             _id: 'd00f9855-8dcd',
//             card_name: 'card5'
//         },
//         '67b3c197-44ee': {
//             _id: '67b3c197-44ee',
//             card_name: 'card6'
//         }
//     }
// };

const initialState = State;

const columnState = {
    columnsById: {
        '7e306133-4b64': {
            _id: '7e306133-4b64',
            column_name: 'column1',
            cards: [
                '983f06c9-b14b',
                'df0434d9-13fb'
            ]
        },
        '8fd42ffc-4d1a': {
            _id: '8fd42ffc-4d1a',
            column_name: 'column2',
            cards: [
                '8999d6ae-8d19'
            ]
        },
        '94af1f9f-cfaf': {
            _id: '94af1f9f-cfaf',
            column_name: 'column3',
            cards: [
                'fe479dd3-2a86',
                'd00f9855-8dcd',
                '67b3c197-44ee'
            ]
        }
    }
};
const cardState = {
    cardsById: {
        '983f06c9-b14b': {
            _id: '983f06c9-b14b',
            card_name: 'card1'
        },
        'df0434d9-13fb': {
            _id: 'df0434d9-13fb',
            card_name: 'card2'
        },
        '8999d6ae-8d19': {
            _id: '8999d6ae-8d19',
            card_name: 'card3'
        },
        'fe479dd3-2a86': {
            _id: 'fe479dd3-2a86',
            card_name: 'card2'
        },
        'd00f9855-8dcd': {
            _id: 'd00f9855-8dcd',
            card_name: 'card5'
        },
        '67b3c197-44ee': {
            _id: '67b3c197-44ee',
            card_name: 'card6'
        }
    }
};

const cardsReducer = (state = initialState.cardsById, action) => {
    switch (action.type) {
        case GET_CARDS: {
            return {
                ...state
            };
        }
      // этот кейс повторяется в 2 редьюсерах, потому что нужно изменять данные в двух местах
        case ADD_CARD: {
            const {cardTitle, cardId, columnId} = action.payload;
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


export default {cardsReducer};
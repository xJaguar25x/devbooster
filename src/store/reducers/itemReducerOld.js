import uuid from 'uuid';
import {GET_COLUMNS, ADD_COLUMN, DELETE_COLUMN, GET_CARDS, ADD_CARD, DELETE_CARD} from '../actions/types';

const initialState = {
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
    },
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

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case GET_ITEMS:
//             return {
//                 ...state
//             };
//         default:
//             return state;
//     }
// }

const cardsById = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS:
            return {
                ...state
            };
        case "EDIT_CARD_TITLE": {
            const { cardTitle, cardId } = action.payload;
            return { ...state, [cardId]: { title: cardTitle, _id: cardId } };
        }
        case "DELETE_CARD": {
            const { cardId } = action.payload;
            const { [cardId]: deletedCard, ...restOfCards } = state;
            return restOfCards;
        }
        case "DELETE_LIST": {
            const { cards: cardIds } = action.payload;
            return Object.keys(state)
              .filter(cardId => !cardIds.includes(cardId))
              .reduce(
                (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
                {}
              );
        }
        default:
            return state;
    }
};

const columnsById = (state = initialState, action) => {
    switch (action.type) {
        case GET_COLUMNS:
            return {
                ...state
            };
        case "ADD_CARD": {
            const { listId, cardId } = action.payload;
            return {
                ...state,
                [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
            };
        }
        case "DELETE_CARD": {
            const { cardId: newCardId, listId } = action.payload;
            return {
                ...state,
                [listId]: {
                    ...state[listId],
                    cards: state[listId].cards.filter(cardId => cardId !== newCardId)
                }
            };
        }
        case "ADD_LIST": {
            const { listId, listTitle } = action.payload;
            return {
                ...state,
                [listId]: { _id: listId, title: listTitle, cards: [] }
            };
        }
        case "DELETE_LIST": {
            const { listId } = action.payload;
            const { [listId]: deletedList, ...restOfLists } = state;
            return restOfLists;
        }
        case "EDIT_LIST_TITLE": {
            const { listId, listTitle } = action.payload;
            return {
                ...state,
                [listId]: { ...state[listId], title: listTitle }
            };
        }
        case "REORDER_LIST": {
            const {
                sourceIndex,
                destinationIndex,
                sourceId,
                destinationId
            } = action.payload;
            // Reorder within the same list
            if (sourceId === destinationId) {
                const newCards = Array.from(state[sourceId].cards);
                const [removedCard] = newCards.splice(sourceIndex, 1);
                newCards.splice(destinationIndex, 0, removedCard);
                return {
                    ...state,
                    [sourceId]: { ...state[sourceId], cards: newCards }
                };
            }

            const sourceCards = Array.from(state[sourceId].cards);
            const [removedCard] = sourceCards.splice(sourceIndex, 1);
            const destinationCards = Array.from(state[destinationId].cards);
            destinationCards.splice(destinationIndex, 0, removedCard);
            return {
                ...state,
                [sourceId]: { ...state[sourceId], cards: sourceCards },
                [destinationId]: { ...state[destinationId], cards: destinationCards }
            };
        }
        default:
            return state;
    }
};

export default { cardsById, columnsById };
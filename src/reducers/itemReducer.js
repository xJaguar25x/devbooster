import uuid from 'uuid';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM} from '../actions/types';

const initialState = {
    columns: [
        {
            id: uuid(),
            column_name: "column1",
            cards: [
                {id: uuid(), card_name: "card1"},
                {id: uuid(), card_name: "card2"}
            ]
        },
        {
            id: uuid(),
            column_name: "column2",
            cards: [
                {id: uuid(), card_name: "card3"}
            ]
        },
        {
            id: uuid(),
            column_name: "column3",
            cards: [
                {id: uuid(), card_name: "card2"},
                {id: uuid(), card_name: "card5"},
                {id: uuid(), card_name: "card6"}
            ]
        }
    ]

    // newstate = {
    //     cards: [
    //         {id: uuid(), card_name: "task1"},
    //         {id: uuid(), card_name: "task2"},
    //         {id: uuid(), card_name: "task4"},
    //         {id: uuid(), card_name: "task4"},
    //         {id: uuid(), card_name: "task3"},
    //         {id: uuid(), card_name: "task32"}
    //     ],
    //     columns: [
    //         {
    //             id: uuid(),
    //             column_name: "card1",
    //             cards: [
    //                 cards[0].id,
    //                 cards[1].id
    //             ]
    //         },
    //         {
    //             id: uuid(),
    //             column_name: "card2",
    //             cards: [
    //                 cards[2].id
    //             ]
    //         },
    //         {
    //             id: uuid(),
    //             column_name: "card3",
    //             cards: [
    //                 cards[3].id,
    //                 cards[4].id,
    //                 cards[5].id
    //             ]
    //         }
    //     ]
    // };

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state
            };
        default:
            return state;
    }
}
import uuid from 'uuid';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM} from '../actions/types';

const initialState = {
    cards: [
        {
            id: uuid(),
            card_name: "card1",
            tasks: [
                {id: uuid(), task_name: "task1"},
                {id: uuid(), task_name: "task2"}
            ]
        },
        {
            id: uuid(),
            card_name: "card2",
            tasks: [
                {id: uuid(), task_name: "task4"}
            ]
        },
        {
            id: uuid(),
            card_name: "card3",
            tasks: [
                {id: uuid(), task_name: "task4"},
                {id: uuid(), task_name: "task3"},
                {id: uuid(), task_name: "task32"}
            ]
        }
    ]

    // tasks: [
    //     {
    //         id: uuid(),
    //         task_name: "task1"
    //     },
    //     {id: uuid(), task_name: "task2"},
    //     {id: uuid(), task_name: "task4"},
    //     {id: uuid(), task_name: "task4"},
    //     {id: uuid(), task_name: "task3"},
    //     {id: uuid(), task_name: "task32"}
    // ],
    // cards: [
    //     {
    //         id: uuid(),
    //         card_name: "card1",
    //         tasks: [
    //             this.tasks[0].id,
    //             this.tasks[1].id
    //         ]
    //     },
    //     {
    //         id: uuid(),
    //         card_name: "card2",
    //         tasks: [
    //             this.tasks[2].id
    //         ]
    //     },
    //     {
    //         id: uuid(),
    //         card_name: "card3",
    //         tasks: [
    //             this.tasks[3].id,
    //             this.tasks[4].id,
    //             this.tasks[5].id
    //         ]
    //     }
    // ]

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
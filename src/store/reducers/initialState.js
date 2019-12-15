const initialState = {
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
export default initialState;

// state = {
//     boardsById: {
//         "5dd87b6e0453e1ca59773bce": {
//             _id: "5dd87b6e0453e1ca59773bce",
//             column_ids: Array(1),
//             title: "123",
//             owner_id: "5dd87b0e0453e1ca59773bc8"
//         },
//         "5dd9360b8e7577104f773bcc": {
//             _id: "5dd9360b8e7577104f773bcc",
//             column_ids: Array(1),
//             title: "Test board",
//             owner_id: "5dd87b0e0453e1ca59773bc8"
//         },
//         "5dd9360b0453e1ca59773bd5": {
//             _id: "5dd9360b0453e1ca59773bd5",
//             column_ids: Array(1),
//             title: "Test board",
//             owner_id: "5dd87b0e0453e1ca59773bc8"
//         }
//     }
// };
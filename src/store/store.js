import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {getCards} from "./actions/itemActions";

// const cards = dispatch(getCards());
// console.log("cards= ",cards);

const initialState = {
//     columns: columnsReducer.columnsReducer = {
//         '7e306133-4b64': {
//             _id: '7e306133-4b64',
//               column_name: 'column1',
//               cards: [
//                 '983f06c9-b14b',
//                 'df0434d9-13fb'
//             ]
//         }
// }

};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // убрать в релизной версии
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// const cards = store.dispatch(getCards());
// console.log("cards= ",cards);

// const columns = store.getState();
// console.log("columns= ",columns);

export default store;
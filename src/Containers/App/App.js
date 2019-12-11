import React, {Component} from 'react';
import {Board} from "../index";
import './App.scss';

import { Provider } from 'react-redux';
import store from '../../store/store';

export default class App extends Component{
render(){
    return(
      <Provider store={store}>
          <div className="App">
              <header className="App-header">
                  <p>Devbooster</p>
              </header>
              {/*заглушка, вывод вложенных компонентов*/}
              {/*{this.props.children}*/}
              <Board/>
          </div>
      </Provider>
    )
}
};
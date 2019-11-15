import React, {Component} from 'react';
import {Board} from "../index";
import './App.scss';

export default class App extends Component{
render(){
    return(
      <div className="App">
          <header className="App-header">
              <p>Devbooster</p>
          </header>
          {/*заглушка, вывод вложенных компонентов*/}
          {/*{this.props.children}*/}
          <Board/>
      </div>
    )
}
};
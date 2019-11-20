import React, {Component} from 'react';
import './App.scss';

class App extends Component {

    state = {
        lists: [
            {
                list: 'name',
                cards: [ {card: 'name'} ]
            }
        ]
    };

    render() {
        return (
          <div className="App">
              <header className="App-header">
                  <p>Devbooster</p>
              </header>
              <div className="Dashboard">
                  <div className="List">
                      <div className="List-Content">
                          <div className="List-Header">
                              <p>Название колонки</p>
                          </div>
                          <div className="List-Cards">
                              <div className="Cards">
                                  <a href="#">
                                      <div className="list-card-labels">
                                          Карточка 1
                                      </div>
                                  </a>
                              </div>
                              <div className="Cards">
                                  <a href="#">
                                      <div className="list-card-labels">
                                          Карточка 2
                                      </div>
                                  </a>
                              </div>
                          </div>
                          <div className="List-Footer">
                              <a className="open-card-composer " href="#">
                                  <i className="fa fa-plus icon-sm icon-add" aria-hidden="true"></i>
                                  <span className="js-add-another-card">Добавить еще одну карточку</span>
                              </a>
                          </div>
                      </div>
                  </div>

                  <div className="List">
                      <div className="List-Content">
                          <div className="List-Header">
                              <p>Название колонки</p>
                          </div>
                          <div className="List-Cards">
                              <div className="Cards">
                                  <a href="#">
                                      <div className="list-card-labels">
                                          Карточка 1
                                      </div>
                                  </a>
                              </div>
                              <div className="Cards">
                                  <a href="#">
                                      <div className="list-card-labels">
                                          Карточка 2
                                      </div>
                                  </a>
                              </div>
                          </div>
                          <div className="List-Footer">
                              <a className="open-card-composer " href="#">
                                  <i className="fa fa-plus icon-sm icon-add" aria-hidden="true"></i>
                                  <span className="js-add-another-card">Добавить еще одну карточку</span>
                              </a>
                          </div>
                      </div>
                  </div>

                  <div className="List list-wrapper mod-add is-idle">
                      <div className="List-Content">
                          <a className="open-add-list js-open-add-list" href="#">
                              <i className="fa fa-plus icon-sm icon-add" aria-hidden="true"></i>
                              <span className="js-add-another-card">Добавьте еще одну колонку</span>
                          </a>
                      </div>
                  </div>

              </div>
          </div>
        );
    }
}

export default App;

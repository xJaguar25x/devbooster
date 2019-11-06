import React, {Component, Fragment} from 'react';
import {BoardForm, BoardList} from "../index";
import {Typography} from "@material-ui/core/es/index";
import uuid from 'uuid';

export default class Board extends Component {
    state = {
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
    };

    // обработчик удаления из состояния
    deleteCard = send_id => {
        this.setState({
            cards: this.state.cards.filter((item) => item.id !== send_id)
        });
    };
    // обработчик добавления к состоянию
    addCard = item => {
        this.setState({
            cards: [
                ...this.state.cards,
                {
                    id: uuid(),
                    card_name: item,
                    tasks: []
                }
            ]
        })
        ;
        // console.log(this.state);
    };
    // обработчик изменения в состоянии
    changeCard = (item_value, send_id) => {
        this.setState({
            cards: this.state.cards.map((item) => item.id === send_id ? {
                ...item,
                card_name: item_value
            } : item)
        });
    };

    render() {
        const lists = this.state.cards;

        return (
          <div className="Dashboard">
              {/*Вывод списка*/}
              {lists.map((list, index) => (
                <Fragment>
                    {/*{console.log(list)}*/}

                    <BoardList
                      key={list.id}
                      list={list}
                      onChangeCard={this.changeCard}
                      onDeleteCard={this.deleteCard}
                      onAddCard={this.addCard}
                    />
                </Fragment>
              ))}

              {/*Форма с кнопкой*/}
              <BoardForm
                onAddCard={this.addCard}
              />
          </div>

        )
    }
};
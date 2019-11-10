import React, {Component, Fragment} from 'react';
import {BoardForm, BoardList} from "../index";
import {Typography} from "@material-ui/core/es/index";
import uuid from 'uuid';
import './Board.scss';

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

    // обработчик удаления из состояния cards
    deleteCard = card_id => {
        this.setState({
            cards: this.state.cards.filter((item) => item.id !== card_id)
        });
    };
    // обработчик добавления к состоянию cards
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
    // обработчик изменения в состоянии cards
    changeCard = (item_value, card_id) => {
        this.setState({
            cards: this.state.cards.map((item) => item.id === card_id ? {
                ...item,
                card_name: item_value
            } : item)
        });
    };


    // обработчик удаления из состояния Task
    deleteTask = (card_id, task_id) => {


        this.setState({
            cards: this.state.cards.filter((item) => item.id !== card_id)
        });
    };
    // обработчик добавления к состоянию Task
    addTask = (card_id, task_value) => {
        let card = this.state.cards.filter((item) => item.id === card_id );
        console.log(card[0].tasks);
        // listTask.push(task_value);
        console.log(card);

        // this.setState({
        //     cards: this.state.cards.map((item) => item.id === card_id ? {
        //         ...item,
        //         tasks: listTask
        //     } : item)
        // });
        // this.setState({
        //     cards: [
        //         ...this.state.cards,
        //         {
        //             id: uuid(),
        //             card_name: card_id,
        //             tasks: []
        //         }
        //     ]
        // })
        ;
        // console.log(this.state);
    };
    // обработчик изменения в состоянии Task
    changeTask = (item_value, send_id) => {
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
              <div className="lists-wrapper">
                  {lists.map((list, index) => (
                    <Fragment>
                        {/*{console.log(list)}*/}

                        <BoardList
                          key={list.id}
                          list={list}
                          changeCard={this.changeCard}
                          deleteCard={this.deleteCard}
                          addCard={this.addCard}
                          changeTask={this.changeTask}
                          deleteTask={this.deleteTask}
                          addTask={this.addTask}
                        />
                    </Fragment>
                  ))}

                  {/*Форма с кнопкой*/}
                  <BoardForm
                    onAddCard={this.addCard}
                  />
              </div>
          </div>
        )
    }
};
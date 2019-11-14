import React, {Component, Fragment} from 'react';
import {BoardForm, BoardList} from "../index";
import uuid from 'uuid';
import './Board.scss';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

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
        let newState = this.state.cards;
        let newCard = this.state.cards.find((item) => item.id === card_id);
        const temp = newCard.tasks.filter((item) => item.id !== task_id);
        const indexOfList = this.state.cards.findIndex((item) => item.id === card_id);
        // console.log("indexOfList = ",indexOfList);
        // console.log(newCard);
        // console.log(temp);
        newCard.tasks = temp;
        // console.log(newCard);
        newState[indexOfList] = newCard;

        this.setState({
            cards: newState
        });
    };
    // обработчик добавления к состоянию Task
    addTask = (card_id, task_value) => {
        let newState = this.state.cards;
        let editCard = this.state.cards.find((item) => item.id === card_id);
        const indexOfList = this.state.cards.findIndex((item) => item.id === card_id);
        editCard.tasks.push({id: uuid(), task_name: task_value});
        newState[indexOfList] = editCard;

        this.setState({
            cards: newState
        });

    };
    // обработчик изменения в состоянии Task
    changeTask = (item_value, send_id) => {
        // не работает пока

        // this.setState({
        //     cards: this.state.cards.map((item) => item.id === send_id ? {
        //         ...item,
        //         card_name: item_value
        //     } : item)
        // });
    };

    /* ~~~~~~~~~~~~~~~~~~ Методы для перетаскивания ~~~~~~~~~~~~~~~~~~~~~~*/
    onDragEnd = result => {
        //TODO : reorder our columns
    };

    render() {
        const lists = this.state.cards;
        const boardId = "1";

        return (
          <div className="Dashboard">
              {/*Вывод списка*/}

              <DragDropContext
                onDragEnd={this.onDragEnd}
              >
                  <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
                      {droppableProvided => (
                        <div className="lists-wrapper" ref={droppableProvided.innerRef}>
                            {lists.map((list, index) => (
                              <Draggable
                                key={list.id}
                                draggableId={list.id}
                                index={index}
                              >
                                  {provided => (
                                    <Fragment>
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          data-react-beautiful-dnd-draggable="0"
                                          data-react-beautiful-dnd-drag-handle="0"
                                        >
                                            {/*<List*/}
                                            {/*list={list}*/}
                                            {/*boardId={boardId}*/}
                                            {/*style={{height: 'initial'}}*/}
                                            {/*/>*/}
                                            <BoardList
                                              key={list.id}
                                              list={list}
                                              boardId={boardId}
                                              changeCard={this.changeCard}
                                              deleteCard={this.deleteCard}
                                              addCard={this.addCard}
                                              changeTask={this.changeTask}
                                              deleteTask={this.deleteTask}
                                              addTask={this.addTask}
                                            />
                                        </div>
                                        {provided.placeholder}
                                    </Fragment>
                                  )}
                              </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                            {/*{lists.length < 5 &&*/}
                            {/*<ListAdder boardId={boardId} numLeft={5 - lists.length} style={{height: 'initial'}}/>*/}
                            {/*Добавление формы создания списка с задачами*/}
                            {/*}*/}
                        </div>
                      )}
                  </Droppable>
              </DragDropContext>

              {/*Форма с кнопкой*/}
              <BoardForm
                onAddCard={this.addCard}
              />
          </div>
        )
    }
};
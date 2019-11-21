import React, {Component, Fragment} from 'react';
import {Column, Form} from "../index";
import uuid from 'uuid';
import './Board.scss';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import {connect} from 'react-redux';
import {getItems} from '../../actions/itemActions';
import PropTypes from 'prop-types';

class Board extends Component {

    // componentDidMount(){
    //     this.props.getItems();
    //     // console.log( this.props);
    // }

    state = {
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
    };

    // обработчик удаления из состояния columns
    deleteColumn = column_id => {
        this.setState({
            columns: this.state.columns.filter((item) => item.id !== column_id)
        });
    };
    // обработчик добавления к состоянию columns
    addColumn = item => {
        this.setState({
            columns: [
                ...this.state.columns,
                {
                    id: uuid(),
                    column_name: item,
                    cards: []
                }
            ]
        })
        ;
        // console.log(this.state);
    };
    // обработчик изменения в состоянии columns
    changeColumn = (item_value, card_id) => {
        let state = this.state;
        this.setState({
            columns: state.columns.map((item) => item.id === card_id ? {
                ...item,
                column_name: item_value
            } : item)
        });
    };

    // обработчик удаления из состояния Card
    deleteCard = (column_id, card_id) => {
        let newState = this.state.columns;
        let newCard = this.state.columns.find((item) => item.id === column_id);
        const temp = newCard.cards.filter((item) => item.id !== card_id);
        const indexOfList = this.state.columns.findIndex((item) => item.id === column_id);
        // console.log("indexOfList = ",indexOfList);
        // console.log(newCard);
        // console.log(temp);
        newCard.cards = temp;
        // console.log(newCard);
        newState[indexOfList] = newCard;

        this.setState({
            columns: newState
        });
    };

    // обработчик добавления к состоянию Card
    addCard = (column_id, card_value) => {
        let newState = this.state.columns;
        let editCard = this.state.columns.find((item) => item.id === column_id);
        const indexOfList = this.state.columns.findIndex((item) => item.id === column_id);
        editCard.cards.push({id: uuid(), card_name: card_value});
        newState[indexOfList] = editCard;

        this.setState({
            columns: newState
        });

    };
    // обработчик изменения в состоянии Card
    changeCard = (item_value, send_id) => {
        // TODO: сделать изменение задачи

        // this.setState({
        //     columns: this.state.columns.map((item) => item.id === send_id ? {
        //         ...item,
        //         column_name: item_value
        //     } : item)
        // });
    };

    /* ~~~~~~~~~~~~~~~~~~ Методы для перетаскивания ~~~~~~~~~~~~~~~~~~~~~~*/
    onDragEnd = (event) => {
        const {draggableId, source, destination, type} = event;
        // console.log("event = ", event);

        if (!destination) {
            return;
        }
        // если перетащили на то же место
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        if (type === "COLUMN") {
            const newState = this.state;
            // console.log("state = ", newState);
            // создаем копию перемещаемой колонку
            const draggbleColumn = newState.columns.find(item => item.id === draggableId);
            // удаляем из исходного state перемещаемую колонку
            newState.columns.splice(source.index, 1);
            // console.log("tasksSource after = ", tasksSource);
            // добавляем в state перемещаемую колонку на новое место
            newState.columns.splice(destination.index, 0, draggbleColumn);
            // console.log("tasksDestination after = ", tasksDestination);
            // console.log("state = ", newState.columns);

            this.setState(newState);

        } else {
            const state = this.state;
            // создаем копию списка откуда перетаскиваем
            const listSource = this.state.columns.find(item => item.id === source.droppableId);
            // создаем копию списка куда перетаскиваем
            const listDestination = this.state.columns.find(item => item.id === destination.droppableId);
            // создаем копию перемещаемой задачи
            const draggbleCard = listSource.cards.find(item => item.id === draggableId);
            // создаем копию массива с задачами
            let tasksSource = listSource.cards;
            // создаем копию массива с задачами
            let tasksDestination = listDestination.cards;
            // console.log("listSource =", listSource);
            // console.log("listDestination =", listDestination);
            // console.log("draggbleCard =", draggbleCard);
            // console.log("draggableId = ", draggableId);
            // console.log("newTaskIds = ", newTaskIds);
            // удаляем из исходного массива перемещаемую задачу
            tasksSource.splice(source.index, 1);
            // console.log("tasksSource after = ", tasksSource);
            // добавляем в список перемещаемую задачу на новое место
            tasksDestination.splice(destination.index, 0, draggbleCard);
            // console.log("tasksDestination after = ", tasksDestination);

            // обновляем списки назначения и исходный
            const newList = {
                columns: state.columns.map((item) => {
                      if (item.id === source.droppableId) return ({...item, cards: tasksSource});
                      else if (item.id === destination.droppableId) return ({...item, cards: tasksDestination});
                      else return item;
                  }
                )
            };
            // console.log("newList =", newList);

            const newState = {
                columns: [...newList.columns]
            };
            // console.log(newState);
            this.setState(newState);
        }
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        // const list = this.state.columns[source.droppableId];
        // const newTaskIds = Array.from(column.taskIds);
        // newTaskIds.splice(source.index, 1);
        // newTaskIds.splice(destination.index, 0, draggableId);
        //
        // const newColumn = {
        //   ...column,
        //     newTaskIds: newTaskIds,
        // };
        //
        // const newState = {
        //   ...this.state,
        //     columns: {
        //       ...this.state.columns,
        //         [newColumn.id]: newColumn,
        //     },
        // };
        // this.setState(newState);
    };

    render() {
        const columns = this.state.columns;
        // const lists = this.props.item.columns;
        // const { columns } = this.props.item;
        // console.log(columns);
        const boardId = "1";

        return (
          <div className="Dashboard">

              <DragDropContext
                onDragEnd={this.onDragEnd}
              >
                  <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
                      {droppableProvided => (
                        <div className="lists-wrapper" ref={droppableProvided.innerRef}>
                            {columns.map((column, index) => (
                              <Draggable
                                key={column.id}
                                draggableId={column.id}
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
                                            <Column
                                              key={column.id}
                                              column={column}
                                              boardId={boardId}
                                              changeColumn={this.changeColumn}
                                              deleteColumn={this.deleteColumn}
                                              addColumn={this.addColumn}
                                              changeCard={this.changeCard}
                                              deleteCard={this.deleteCard}
                                              addCard={this.addCard}
                                              style={{height: 'initial'}}
                                            />
                                        </div>
                                        {provided.placeholder}
                                    </Fragment>
                                  )}
                              </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                            <Form
                              classNameWrapper="ColumnComposerWrapper"
                              classNameBtn="ColumnComposerWrapperBtn"
                              type="addColumn"
                              addColumn={this.addColumn}
                              btnText="Add new column"
                              btnTextInner="Add column"
                            />
                        </div>
                      )}
                  </Droppable>
              </DragDropContext>
          </div>
        )
    }
}

Board.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    item: state.item
});
export default connect(mapStateToProps, {getItems})(Board);
// export default (Board);
import React, {Component, Fragment} from 'react';
import {Column, Form} from "../index";
import './Board.scss';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import {connect} from 'react-redux';
import {getCards, getColumns, reorderBoard, reorderColumn} from '../../store/actions/itemActions';
import PropTypes from 'prop-types';

class Board extends Component {

    componentDidMount() {
        this.props.getCards();
        this.props.getColumns();
        console.log(this.props);
    }

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
            // const newState = this.state;
            // // console.log("state = ", newState);
            // // создаем копию перемещаемой колонку
            // const draggbleColumn = newState.columns.find(item => item.id === draggableId);
            // // удаляем из исходного state перемещаемую колонку
            // newState.columns.splice(source.index, 1);
            // // console.log("tasksSource after = ", tasksSource);
            // // добавляем в state перемещаемую колонку на новое место
            // newState.columns.splice(destination.index, 0, draggbleColumn);
            // // console.log("tasksDestination after = ", tasksDestination);
            // // console.log("state = ", newState.columns);

            // TODO: тут нужно будет доделать при добавлении сущность board в store
            //this.setState(newState);
            // this.props.reorderBoard(
            //   draggableId,
            //   source.droppableId,
            //   destination.droppableId,
            //   source.index,
            //   destination.index
            // )

        } else {
            let columnById = {};
              this.props.columns.forEach(item => (
                columnById = {...columnById,  [item._id]: {...item}}
            ));
            console.log("columnById ", columnById);
            // перетаскивание Cards
            this.props.reorderColumn(
              draggableId,
              source.droppableId,
              destination.droppableId,
              source.index,
              destination.index
              // boardId
              , columnById
            )
        }
    };

    render() {
        const {columns} = this.props;
        const boardId = "1";
        console.log(this.props);

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
                                key={column._id}
                                draggableId={column._id}
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
                                              key={column._id}
                                              column={column}
                                              boardId={boardId}
                                              style={{height: 'initial'}}
                                            />
                                        </div>
                                        {provided.placeholder}
                                    </Fragment>
                                  )}
                              </Draggable>
                            ))
                            }
                            {droppableProvided.placeholder}
                            <Form
                              classNameWrapper="ColumnComposerWrapper"
                              classNameBtn="ColumnComposerWrapperBtn"
                              type="addColumn"
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
    getCards: PropTypes.func.isRequired,
    getColumns: PropTypes.func.isRequired,
    reorderColumn: PropTypes.func.isRequired,
    reorderBoard: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    // ownProps - при переходе по ссылке на доску, необходим id доски, чтобы отобразить потомков
    board: ownProps.match.params.boardId,
    cards: Object.values(state.cards),
    columns: Object.values(state.columns)
    // columns: state.columns
});
export default connect(
  mapStateToProps,
  {getCards, getColumns, reorderColumn, reorderBoard}
)(Board);
// export default (Board);
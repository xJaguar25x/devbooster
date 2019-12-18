import React, {Component, Fragment} from 'react';
import {Column, Form} from "../index";
import './Board.scss';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import {connect} from 'react-redux';
import {
    getAll,
    reorderBoard,
    reorderColumn
} from '../../store/actions/itemActions';
import PropTypes from 'prop-types';

class Board extends Component {

    componentDidMount() {
        // this.props.getCards();
        // this.props.getColumnsByBoard(this.props.boardId);
        // this.props.getColumns();
        // this.props.getBoards();
        this.props.getAll();
        // console.log("componentDidMount() ", this.props);
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
            // let boardById = {};
            // преобразуем к виду для хранилища, {_id:{_id, title, column_ids}}
            // this.props.boardsById.boards.forEach(item => (
            //   boardById = {...boardById, [item._id]: {...item}}
            // ));

            const boardById = this.props.boardsById.boards;
            // console.log("boardById ", boardById);

            // перетаскивание Columns
            this.props.reorderBoard(
              draggableId,
              source.droppableId,
              destination.droppableId,
              source.index,
              destination.index,
              boardById
            )

        } else {
            // let columnById = {};
            // преобразуем к виду для хранилища, {_id:{_id, name, cards}}
            /*this.props.columnsById.columns.forEach(item => (
              columnById = {...columnById, [item._id]: {...item}}
            ));*/

            const columnById = this.props.columnsById.columns;
            // console.log("columnById ", columnById);

            // перетаскивание Cards
            this.props.reorderColumn(
              draggableId,
              source.droppableId,
              destination.droppableId,
              source.index,
              destination.index,
              columnById
            )
        }
    };

    renderBoard() {
        const {boardId, board} = this.props;
        // console.log("board ", board);
        const columns = (this.props.columnsById.columns);
        // console.log("columns ", columns);

        /* два варианта использования, при этом удобнее работать, при втором данные будут в виде
        массива в пропсах. Чтобы применить второй вариант нужно в mapStateToProps заменить
        columns: Object.values(state.columnsById) и
        в Board.propTypes заменить columns: PropTypes.array.isRequired */
        // const column_ids = (board.column_ids.map(columnId => columns[columnId] ));
        // const column_ids = (board.column_ids.map(columnId => columns.find(item => item._id === columnId) ));

        const column_ids = (board.column_ids.map(columnId => columns[columnId]));
        // console.log("column_ids ", column_ids);
        // console.log("render() ", this.props);

        return (
          <div className="Dashboard">
              <div className="BoardTitle">{board.title}</div>
              <DragDropContext
                onDragEnd={this.onDragEnd}
              >
                  <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
                      {droppableProvided => (
                        <div className="lists-wrapper" ref={droppableProvided.innerRef}>
                            {column_ids.map((column, index) => (
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
                              board={this.props.board}
                              type="addColumn"
                              btnText="Add new column"
                              btnTextInner="Add column"
                            />
                        </div>
                      )}
                  </Droppable>
              </DragDropContext>
          </div>
        );
    };

    render() {
        // console.log("board ", this.props);
        return (
          // проверка на существование данных любой из 3 загружаемых массивов(boards, columns, cards)
          //если их нет, то отображать заглушку
          (!this.props.boardsById.loading && this.props.board)
            ? (
              <Fragment>
                  {/*<TransitionGroup className="orders-list">*/}
                  {this.renderBoard()}
                  {/*</TransitionGroup> */}
              </Fragment>
            )
            : (
              //TODO: сделать спиннер вместо этого
              <h4>данные не получены</h4>
            )

        );
    }
}

Board.propTypes = {
    reorderColumn: PropTypes.func.isRequired,
    reorderBoard: PropTypes.func.isRequired,
    cardsById: PropTypes.object.isRequired,
    columnsById: PropTypes.object.isRequired,
    boardsById: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => {
    const {boardId} = ownProps.match.params;
    // const board = state.boardsById[boardId];
    return {
        // ownProps - при переходе по ссылке на доску, необходим id доски, чтобы отобразить потомков
        board: state.boardsById.boards[boardId],
        boardId: ownProps.match.params.boardId,
        boardsById: state.boardsById,
        cardsById: state.cardsById,
        columnsById: state.columnsById
        // columns: state.columnsById
        // columns: Object.values(board.column_ids.map(columnId => state.columnsById[columnId]))
    }
    //TODO: убрать getColumnsByBoard() и делать как раньше фильтрацию в компоненте, это упростит работу в приложении. Будем грузить данный от главного предка(проект или пользователь).
};
export default connect(
  mapStateToProps,
  {reorderColumn, reorderBoard, getAll}
)(Board);
// export default (Board);
import React, {Component, Fragment} from 'react';
import classes from './ColumnsList.module.scss';
import {Board, Column, Form} from "../index";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import {connect} from 'react-redux';
import {
    getAll,
    reorderBoard,
    reorderColumn
} from '../../store/actions/itemActions';
import PropTypes from 'prop-types';
import {PreloaderWrapper} from "../../hoc";
import {Preloader} from "../../components";

class ColumnsList extends Component {

    componentDidMount() {
        // this.props.getCards();
        // this.props.getColumnsByBoard(this.props.boardId);
        // this.props.getColumns();
        // this.props.getBoards();
        // this.props.getAll();
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

          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
              <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
                  {droppableProvided => (
                    <div className={classes.Columns} ref={droppableProvided.innerRef}>
                        {/* <div className={classes.Columns_content}>
                                <div className={classes.Columns_header}>
                                    <div className={classes.Columns_title}>
                                        Title
                                        <div> 3</div>
                                    </div>
                                    <div className={classes.squareBtn}>
                                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className={classes.Cards}>

                                    <div className={classes.Cards_content}>
                                        <div className={classes.Cards_header}>
                                            <div>21 dec</div>
                                            <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                                        </div>
                                        <div className={classes.Cards_title}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                                            cumque dolor dolorum eum facilis, fugiat in nobis nulla numquam quia
                                            quidem similique tempore, velit veritatis?
                                        </div>
                                        <div className={classes.Cards_groups}>
                                            <div className={classes.groups_item__blue}>Sketching</div>
                                            <div className={classes.groups_item__blue2}>Illustrating</div>
                                            <div className={classes.groups_item__blue3}>3D</div>
                                            <div className={classes.groups_item__blue4}>Low Poly</div>
                                            <div className={classes.groups_item__purple}>Web Design</div>
                                            <div className={classes.groups_item__pink}>Visual</div>
                                            <div className={classes.groups_item__orange}>Matte-painting</div>
                                            <div className={classes.groups_item__gray}>+ 3 more</div>
                                        </div>
                                    </div>

                                    <div className={classes.Cards_content}>
                                        <div className={classes.Cards_header}>
                                            <div>21 dec</div>
                                            <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                                        </div>
                                        <div className={classes.Cards_title}>Card title</div>
                                        <div className={classes.Cards_groups}>
                                            <div className={classes.groups_item__blue}>Sketching</div>
                                            <div className={classes.groups_item__blue2}>Illustrating</div>
                                            <div className={classes.groups_item__blue4}>Low Poly</div>
                                        </div>
                                    </div>

                                    <div className={classes.Cards_content}>
                                        <div className={classes.Cards_title}>No card title yet</div>
                                    </div>

                                    <div className={classes.Cards_content + " " + classes.newCard}>
                                        <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                                    </div>
                                </div>
                            </div>*/}
                        {column_ids.map((column, index) => (
                          <Draggable
                            key={column._id}
                            draggableId={column._id}
                            index={index}
                          >
                              {provided => (
                                <Fragment>
                                    <div
                                      className={classes.Columns_content}
                                      key={column._id} id={column._id}
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
                                          projectId={this.props.match.params.projectId}
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

                        {/*<div className={classes.Columns_content + " " + classes.newColumn}>*/}
                        {/*<button className={classes.circleBtn + " " + classes.newColumn}>*/}
                        {/*<span>+</span>*/}
                        {/*/!*<i className="fa fa-plus" aria-hidden="true"></i>*!/*/}
                        {/*</button>*/}
                        {/*</div>*/}
                        <Form
                          classNameWrapper="Columns_content"
                          classNameBtn="AddColumnBtnCircle"
                          board={this.props.board}
                          type="newColumn"
                          btnText="+"
                          btnTextInner="Add column"
                        />
                    </div>
                  )}
              </Droppable>
          </DragDropContext>
        );
    };


    renderColumnsList() {
        console.log("render() ", this.props);
        return (
          <div className={classes.Columns}>

              <div className={classes.Columns_content}>
                  <div className={classes.Columns_header}>
                      <div className={classes.Columns_title}>
                          Title
                          <div> 3</div>
                      </div>
                      <div className={classes.squareBtn}>
                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </div>
                  </div>
                  <div className={classes.Cards}>

                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_header}>
                              <div>21 dec</div>
                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                          </div>
                          <div className={classes.Cards_title}>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                              cumque dolor dolorum eum facilis, fugiat in nobis nulla numquam quia
                              quidem similique tempore, velit veritatis?
                          </div>
                          <div className={classes.Cards_groups}>
                              <div className={classes.groups_item__blue}>Sketching</div>
                              <div className={classes.groups_item__blue2}>Illustrating</div>
                              <div className={classes.groups_item__blue3}>3D</div>
                              <div className={classes.groups_item__blue4}>Low Poly</div>
                              <div className={classes.groups_item__purple}>Web Design</div>
                              <div className={classes.groups_item__pink}>Visual</div>
                              <div className={classes.groups_item__orange}>Matte-painting</div>
                              <div className={classes.groups_item__gray}>+ 3 more</div>
                          </div>
                      </div>

                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_header}>
                              <div>21 dec</div>
                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                          </div>
                          <div className={classes.Cards_title}>Card title</div>
                          <div className={classes.Cards_groups}>
                              <div className={classes.groups_item__blue}>Sketching</div>
                              <div className={classes.groups_item__blue2}>Illustrating</div>
                              <div className={classes.groups_item__blue4}>Low Poly</div>
                          </div>
                      </div>

                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_title}>No card title yet</div>
                      </div>

                      <div className={classes.Cards_content + " " + classes.newCard}>
                          <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                      </div>
                  </div>
              </div>

              <Board {...this.props}/>

              <div className={classes.Columns_clear}/>
          </div>
        );
    }

    render() {
        // console.log("ColumnsList() ", this.props);

        /*return (
          // проверка на существование данных boards
          // если их нет, то отображать заглушку
          /!*!this.props.boardsById.loading
            ? (
              <Fragment>
                  {/!*<TransitionGroup className="orders-list">*!/}
                  {this.renderColumns()}
                  {/!*</TransitionGroup> *!/}
              </Fragment>
            )
            : (
              //TODO: сделать спиннер вместо этого
              <h4>данные не получены</h4>
            )*!/
          this.renderColumnsList()

        );*/

        return (
          <Fragment>
              {/* // проверка на существование данных любой из 3 загружаемых массивов(boards, columns, cards)
              //если их нет, то отображать заглушку*/}
              {(!this.props.boardsById.loading && this.props.board)
                ? (
                  <Fragment>
                      {/*<TransitionGroup className="orders-list">*/}
                      {this.renderBoard()}
                      {/*</TransitionGroup>*/}
                  </Fragment>
                )
                : (
                  <Preloader color="black"/>
                )
              }
              {/*< PreloaderWrapper
                isLoading={this.props.boardsById.loading}
                isError="false"
                isEmpty={this.props.board}
                // fetch={this.fetchOrdersList}
                emptyText="You don't have any columns."
                color="gray"
                size="200px"
              >
                  {this.renderBoard(this.props)}
                  <h1>asdsada</h1>
              </PreloaderWrapper>*/}
          </Fragment>

        );
    };
}

ColumnsList.propTypes = {
    reorderColumn: PropTypes.func.isRequired,
    reorderBoard: PropTypes.func.isRequired,
    cardsById: PropTypes.object.isRequired,
    columnsById: PropTypes.object.isRequired,
    boardsById: PropTypes.object.isRequired,
    boardId: PropTypes.string.isRequired,
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
        columnsById: state.columnsById,
        // boardId: ownProps.match.params.projectId
        // columns: state.columnsById
        // columns: Object.values(board.column_ids.map(columnId => state.columnsById[columnId]))
    }
    //TODO: убрать getColumnsByBoard() и делать как раньше фильтрацию в компоненте, это упростит работу в приложении. Будем грузить данный от главного предка(проект или пользователь).
};

export default connect(
  mapStateToProps,
  {reorderColumn, reorderBoard, getAll}
)(ColumnsList);
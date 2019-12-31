import React, {Component, Fragment} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {Form, Card} from "../index";
import classes from './Column.module.scss';
import {Button, Textarea} from "../../components/index";
import {Droppable} from 'react-beautiful-dnd';

import {connect} from 'react-redux';
import {deleteColumn, editColumnTitle} from '../../store/actions/itemActions';
import PropTypes from 'prop-types';

class Column extends Component {

    // componentDidMount() {
    //     this.props.getCards();
    //     console.log( this.props);
    // }

    state = {
        isColumnTitleInEdit: false,
        newColumnTitle: ""
    };

    /* ~~~~~~~~~~~~~~~~~~ Обработчики событий UI ~~~~~~~~~~~~~~~~~~~~~~*/
    //~~~~ Обработчик нажатия кнопки редактировать заголовок ColumnTitleButton ~~~~
    openTitleEditor = () => {
        this.setState({
            isColumnTitleInEdit: true,
            newColumnTitle: this.props.column.column_name
        });
    };
    handleColumnTitleEditorChange = (event) => {
        this.setState({newColumnTitle: event.target.value});
    };
    handleColumnTitleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleSubmitColumnTitle();
        }
    };
    handleSubmitColumnTitle = () => {
        const {newColumnTitle} = this.state;
        // const {column, boardId, dispatch} = this.props;
        const {column} = this.props;
        // console.log("column =", column);
        if (newColumnTitle === column.column_name) {
            this.setState({
                isColumnTitleInEdit: false
            });
        }
        else {
            // dispatch(editListTitle(newColumnTitle, list._id, boardId));
            this.changeColumn(newColumnTitle);
            console.log("id =", column._id);
            this.setState({
                isColumnTitleInEdit: false,
                newColumnTitle: ""
            });
        }
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~ Методы обработки state ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // обработчик изменения в состоянии columns
    changeColumn = (value) => {
        //используя общее состояние Redux
        const newColumn = {...this.props.column, column_name: value, cards: [...this.props.column.cards]};
        this.props.editColumnTitle(newColumn);
    };
    // обработчик удаления из состояния columns
    handleDeleteColumn = () => {
        const {column, boardId} = this.props;
        const currentBoard = this.props.boardsById.boards[boardId];
        this.props.deleteColumn(currentBoard, column._id, this.props.column.cards);
    };

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    render() {
        const {column} = this.props;
        const cards = (this.props.cardsById.cards);
        const {
            isColumnTitleInEdit,
            newColumnTitle
        } = this.state;

        // console.log("Column", column);
        const card_ids = (column.cards.map(cardId => cards[cardId]));
        // console.log("render() ", this.props);

        return (
          <Fragment>
          {/*<div className={classes.Columns_content} key={column._id} id={column._id}>*/}
              <div className={classes.Columns_header}>
                  <div className={classes.Columns_title}>
                      {column.column_name}
                      <div className={classes.Columns_title_number}>
                          {this.props.column.cards.length}
                      </div>
                  </div>
                  <div className={classes.squareBtn}>
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </div>
              </div>
              {/*<div className={classes.Cards}>*/}
                  <Droppable droppableId={this.props.column._id}>
                      {provided => (
                        <div className={classes.Cards}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                            {/*функцией map раскрываем список всех задачь из состояния*/}
                            {card_ids.map((card, index) => (
                              //Вывод компонента Задачи
                              <Card
                                key={index}
                                card={card}
                                column={column}
                                index={index}
                                // state={this.state}
                                // openCardEditor={this.openCardEditor}
                              />
                            ))}
                            {provided.placeholder}

                            {/*~~~~~~~~~~ Footer ~~~~~~~~~~~*/}
                            {/*<Form*/}
                            {/*classNameBtn="ComposerWrapper"*/}
                            {/*column={this.props.column}*/}
                            {/*type="addCard"*/}
                            {/*btnText="Add new card"*/}
                            {/*btnTextInner="Add card"*/}
                            {/*/>*/}
                            <div className={classes.Cards_content + " " + classes.newCard}>
                                <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                            </div>
                        </div>
                      )}
                  </Droppable>

              {/*</div>*/}
          {/*</div>*/}
          </Fragment>
        );
    }
}

Column.propTypes = {
    // Проверка типов
    deleteColumn: PropTypes.func.isRequired,
    cardsById: PropTypes.object.isRequired,
    editColumnTitle: PropTypes.func.isRequired,
    boardsById: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    // ownProps,
    // get default state from reducers/index.js file
    // cards: Object.values(state.cardsById)
    cardsById: state.cardsById,
    boardsById: state.boardsById
});
export default connect(
  mapStateToProps,
  {editColumnTitle, deleteColumn}
)(Column);
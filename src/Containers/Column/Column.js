import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {Form, Card} from "../index";
import classes from './Column.module.scss';
import {Button, Textarea} from "../../components";
import {Droppable} from 'react-beautiful-dnd';

import {connect} from 'react-redux';
import {deleteColumn, editColumnTitle, getCards} from '../../store/actions/itemActions';
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
            isBoardTitleInEdit: true,
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
                isBoardTitleInEdit: false
            });
        }
        else {
            // dispatch(editListTitle(newColumnTitle, list._id, boardId));
            this.changeColumn(newColumnTitle, column._id);
            console.log("id =", column._id);
            this.setState({
                isBoardTitleInEdit: false,
                newColumnTitle: ""
            });
        }
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~ Методы обработки state ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // обработчик изменения в состоянии columns
    changeColumn = (value, column_id) => {
        //используя общее состояние Redux
        const newColumn = {...this.props.column, column_name: value, cards: [...this.props.column.cards]};
        this.props.editColumnTitle(newColumn);
    };
    // обработчик удаления из состояния columns
    handleDeleteColumn = () => {
        const {column} = this.props;
        this.props.deleteColumn(column._id, this.props.column.cards);
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    render() {
        const {column} = this.props;
        const {
            isColumnTitleInEdit,
            newColumnTitle
        } = this.state;
        // console.log("Column", column);

        return (
          <div className={classes.Column_Content} key={column._id} id={column._id}>
              {isColumnTitleInEdit ? (
                <div className={classes.ColumnTitleTextareaWrapper}>
                    <Textarea
                      className="ColumnTitleTextarea"
                      autoFocus
                      // useCacheForDOMMeasurements
                      value={newColumnTitle}
                      onChange={this.handleColumnTitleEditorChange}
                      onKeyDown={this.handleColumnTitleKeyDown}
                      onBlur={this.handleSubmitColumnTitle}
                    />
                </div>
              ) : (
                <div className={classes.ColumnTitle}>
                    <Button
                      className="ListTitleButton"
                      onFocus={this.openTitleEditor}
                      onClick={this.openTitleEditor}
                    >
                        {column.column_name}
                    </Button>
                    <Button
                      className="DeleteCardButton"
                      onClick={this.handleDeleteColumn}
                    >
                        <DeleteIcon/>
                    </Button>
                </div>
              )}
              <Droppable droppableId={this.props.column._id}>
                  {provided => (
                    <div className="List-Cards"
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        {/*функцией map раскрываем список всех задачь из состояния*/}
                        {column.cards.map((card, index) => (
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
                        <Form
                          classNameBtn="ComposerWrapper"
                          column={this.props.column}
                          type="addCard"
                          btnText="Add new card"
                          btnTextInner="Add card"
                        />
                    </div>
                  )}
              </Droppable>
          </div>
        )
    }
}
Column.propTypes = {
    // Проверка типов
    getCards: PropTypes.func.isRequired,
    deleteColumn: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    editColumnTitle: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    // ownProps,
    // get default state from reducers/index.js file
    cards: Object.values(state.cards)
    // cards: (state.cards)
});
export default connect(
  mapStateToProps,
  {editColumnTitle, deleteColumn, getCards}
)(Column);
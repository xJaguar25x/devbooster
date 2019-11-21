import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {Form, Card} from "../index";
import classes from './Column.module.scss';
import {Button, Textarea} from "../../components";
import {Droppable} from 'react-beautiful-dnd';

export default class Column extends Component {

    state = {
        cardInEdit: null,
        editableCardTitle: "",
        isColumnTitleInEdit: false,
        newColumnTitle: ""
    };

    openCardEditor = card => {
        // console.log("card = ",task.id);
        this.setState({cardInEdit: card.id, editableCardTitle: card.card_name});
    };

    handleCardEditorChange = (event) => {
        this.setState({editableCardTitle: event.target.value});
    };

    handleEditKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleSubmitCardEdit();
        }
    };

    handleSubmitCardEdit = () => {
        const {editableCardTitle, cardInEdit} = this.state;
        const {list, boardId, dispatch} = this.props;
        if (editableCardTitle === "") {
            this.deleteCardHandler(cardInEdit);
        } else {
            // dispatch(editCardTitle(editableCardTitle, cardInEdit, list, boardId));
        }
        this.setState({editableCardTitle: "", cardInEdit: null});
    };

    deleteCardHandler = cardId => {
        const {dispatch, column, id} = this.props;
        // dispatch(deleteColumn(cardId, list._id, boardId));
        // console.log(column.id, cardId);
        this.props.deleteCard(column.id, cardId);
    };

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
        const {column, boardId, dispatch} = this.props;
        if (newColumnTitle === this.props.column.column_name) {
            this.setState({
                isColumnTitleInEdit: false
            });
        }
        else {
            // dispatch(editListTitle(newColumnTitle, list._id, boardId));
            this.props.changeColumn(newColumnTitle, this.props.column.id);
            console.log("id =", this.props.column.id);
            this.setState({
                isColumnTitleInEdit: false,
                newColumnTitle: ""
            });
        }

    };
    // Обработчик вызова "Удаления списка"
    deleteColumnHandler = () => {
        // console.log(this.props);
        const {column} = this.props;
        this.props.deleteColumn(column.id)
    };
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    render() {
        const stateColumn = this.props.column;
        const {
            isColumnTitleInEdit,
            newColumnTitle
        } = this.state;

        return (
          <div className={classes.Column_Content} key={stateColumn.id} id={stateColumn.id}>
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
                        {stateColumn.column_name}
                    </Button>
                    <Button
                      className="DeleteCardButton"
                      onClick={this.deleteColumnHandler}
                    >
                        <DeleteIcon/>
                    </Button>
                </div>
              )}
              <Droppable droppableId={this.props.column.id}>
                  {provided => (
                    <div className="List-Cards"
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        {/*функцией map раскрываем список всех задачь из состояния*/}
                        {stateColumn.cards.map((card, index) => (
                          //Вывод компонента Задачи
                          <Card
                            key={index}
                            card={card}
                            index={index}
                            state={this.state}
                            deleteCard={this.deleteCardHandler}
                            openCardEditor={this.openCardEditor}

                          />
                        ))}
                        {provided.placeholder}

                        {/*~~~~~~~~~~ Footer ~~~~~~~~~~~*/}
                        <Form
                          classNameBtn="ComposerWrapper"
                          addCard={this.props.addCard}
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
};
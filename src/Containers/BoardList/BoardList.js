import React, {Component, Fragment} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {BoardForm, CardForm, CardList, Task} from "../index";
import classes from './BoardList.module.scss';
import {Button, Textarea} from "../../components";
import {ClickOutsideWrapper} from "../../hoc/";
import {Droppable} from 'react-beautiful-dnd';

export default class BoardList extends Component {

    state = {
        newCardFormIsOpen: false,
        newCardTitle: "",
        cardInEdit: null,
        editableCardTitle: "",
        isListTitleInEdit: false,
        newListTitle: ""
    };

    toggleCardComposer = () => {
        this.setState({newCardFormIsOpen: !this.state.newCardFormIsOpen});
    };

    handleCardComposerChange = (event) => {
        this.setState({newCardTitle: event.target.value});
    };

    handleKeyDown = (event) => {
        // при нажатии Enter
        if (event.keyCode === 13) {
            this.handleSubmitCard(event);
        }
    };
    handleOnClickButtonAdd = (event) => {
        this.handleSubmitCard(event);
    };

    handleSubmitCard = event => {
        event.preventDefault();
        const {newCardTitle} = this.state;
        const {list, boardId, dispatch} = this.props;
        if (newCardTitle === "") return;
        // dispatch(addCard(newCardTitle, list._id, boardId));
        // console.log(this.props);
        this.props.addTask(list.id, newCardTitle);
        this.setState({newCardTitle: "", newCardFormIsOpen: false});
    };

    openCardEditor = task => {
        // console.log("card = ",task.id);
        this.setState({cardInEdit: task.id, editableCardTitle: task.task_name});
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
            this.deleteCard(cardInEdit);
        } else {
            // dispatch(editCardTitle(editableCardTitle, cardInEdit, list, boardId));
        }
        this.setState({editableCardTitle: "", cardInEdit: null});
    };

    deleteCard = cardId => {
        const {dispatch, list, id} = this.props;
        // dispatch(deleteCard(cardId, list._id, boardId));
        console.log(list.id, cardId);
        this.props.deleteTask(list.id, cardId);
    };

    //~~~~ Обработчик нажатия кнопки редактировать заголовок ListTitleButton ~~~~
    openTitleEditor = () => {
        this.setState({
            isListTitleInEdit: true,
            newListTitle: this.props.list.card_name
        });
    };
    handleListTitleEditorChange = (event) => {
        this.setState({newListTitle: event.target.value});
    };

    handleListTitleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleSubmitListTitle();
        }
    };
    handleSubmitListTitle = () => {
        const {newListTitle} = this.state;
        const {list, boardId, dispatch} = this.props;
        if (newListTitle === this.props.list.card_name) {
            this.setState({
                isListTitleInEdit: false
            });
        }
        else {
            // dispatch(editListTitle(newListTitle, list._id, boardId));
            this.props.changeCard(newListTitle, this.props.list.id);
            console.log("id =", this.props.list.id);
            this.setState({
                isListTitleInEdit: false,
                newListTitle: ""
            });
        }

    };
    // Обработчик вызова "Удаления списка"
    deleteList = () => {
        const {list} = this.props;
        this.props.deleteCard(list.id)
    };

    // ~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~


    render() {
        const stateList = this.props.list;
        const {
            newCardFormIsOpen,
            newCardTitle,
            cardInEdit,
            editableCardTitle,
            isListTitleInEdit,
            newListTitle
        } = this.state;

        return (
          <div className={classes.List} key={stateList.id} id={stateList.id}>
              <div className={classes.List_Content} key={stateList.id} id={stateList.id}>
                  <div className={classes.List_Header}>
                      {isListTitleInEdit ? (
                        <div className={classes.ListTitleTextareaWrapper}>
                                <Textarea
                                  className="ListTitleTextarea"
                                  autoFocus
                                  // useCacheForDOMMeasurements
                                  value={newListTitle}
                                  onChange={this.handleListTitleEditorChange}
                                  onKeyDown={this.handleListTitleKeyDown}
                                  onBlur={this.handleSubmitListTitle}
                                />
                        </div>
                      ) : (
                        <div className={classes.ListTitle}>
                            <Button
                              className="ListTitleButton"
                              onFocus={this.openTitleEditor}
                              onClick={this.openTitleEditor}
                            >
                                {stateList.card_name}
                            </Button>
                            <Button
                              className="DeleteCardButton"
                              onClick={this.deleteList}
                            >
                                <DeleteIcon/>
                            </Button>
                        </div>
                      )}
                  </div>
                  <Droppable droppableId={this.props.list.id}>
                      {provided => (
                        <Fragment>
                            <div className="List-Cards"
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                            >
                                {/*функцией map раскрываем список всех задачь из состояния*/}
                                {stateList.tasks.map((task, index) => (
                                  //Вывод компонента Задачи
                                  <Task
                                    task={task}
                                    index={index}
                                    state={this.state}
                                  />
                                ))}
                                {provided.placeholder}
                            </div>


                            < div className="List-Footer">
                                {/*Форма с кнопкой*/}
                                {/*<BoardForm*/}
                                {/*onAddCard={this.addCard}*/}
                                {/*/>*/}

                                {newCardFormIsOpen && (
                                  <ClickOutsideWrapper handleClickOutside={this.toggleCardComposer}>
                                      <div className={classes.TextareaWrapper}>
                                          <form
                                            className={classes.CardTextareaForm}
                                            onSubmit={this.handleSubmitCard}
                                          >
                                        <Textarea
                                          className="ListTitleTextarea"
                                          autoFocus
                                          // useCacheForDOMMeasurements
                                          onChange={this.handleCardComposerChange}
                                          onKeyDown={this.handleKeyDown}
                                          value={newCardTitle}
                                        />
                                              <Button
                                                className={"ListTitleButton", "Add"}
                                                type="submit"
                                                disabled={newCardTitle === ""}
                                                onClick={this.handleOnClickButtonAdd}
                                              >
                                                  Add Task
                                              </Button>
                                          </form>
                                      </div>
                                  </ClickOutsideWrapper>
                                )}
                                {newCardFormIsOpen || (
                                  <div className={classes.ComposerWrapper}>
                                      <Button
                                        className="CardButton"
                                        text="Add new card"
                                        onClick={this.toggleCardComposer}
                                      >
                                          Add new task
                                      </Button>
                                  </div>
                                )}
                            </div>
                        </Fragment>
                      )}
                  </Droppable>
              </div>
          </div>
        )
    }
};
import React, {Component, Fragment} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {BoardForm, CardForm, CardList} from "../index";
import {
    ListItem,
    ListItemSecondaryAction,
    IconButton,
    Input
} from "@material-ui/core/es/index";
import classes from './BoardList.module.scss';
import {Button, Textarea} from "../../components";
import {ClickOutsideWrapper} from "../../hoc/";

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

    openCardEditor = card => {
        this.setState({cardInEdit: card._id, editableCardTitle: card.title});
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
        const {dispatch, list, boardId} = this.props;
        // dispatch(deleteCard(cardId, list._id, boardId));
    };

    //~~~~ Обработчик нажатия кнопки редактировать заголовок ListTitleButton ~~~~
    openTitleEditor = () => {
        this.setState({
            isListTitleInEdit: true,
            newListTitle: this.props.list.title
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
        if (newListTitle === "") return;
        // dispatch(editListTitle(newListTitle, list._id, boardId));
        this.setState({
            isListTitleInEdit: false,
            newListTitle: ""
        });
    };
    // Обработчик вызова "Удаления списка"
    deleteList = () => {
        const {list} = this.props;
        this.props.deleteCard(list.id)
    };
    // ~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~

    //Обработчик нажатия кнопки удалить
    DeleteButtonOnClickHandler(index) {
        // console.log(index);
        this.props.onDeleteCard(index);
    };

    //Обработчик изменения инпута
    changeTextareaHandler(value, index) {
        // console.log(index);
        this.props.onChangeCard(value, index);
    };

    //Обработчик добавления инпута
    addTextareaHandler(value) {
        // console.log(index);
        this.props.onChangeCard(value);
    };

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

        // console.log(this.props);

        return (
          <Fragment>
              <div className={classes.List} key={stateList.id} id={stateList.id}>
                  <div className={classes.List_Content} key={stateList.id} id={stateList.id}>
                      <div className={classes.List_Header}>
                          {isListTitleInEdit ? (
                            <div className={classes.ListTitleTextareaWrapper}>
                                <Textarea
                                  class="ListTitleTextarea"
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
                                  class="ListTitleButton"
                                  onFocus={this.openTitleEditor}
                                  onClick={this.openTitleEditor}
                                >
                                    {stateList.card_name}
                                </Button>
                                <Button
                                  class="DeleteCardButton"
                                  onClick={this.deleteList}
                                >
                                    <DeleteIcon/>
                                </Button>
                            </div>
                          )}
                      </div>
                      <div className="List-Cards">
                          {/*функцией map раскрываем список всех задачь из состояния*/}
                          {stateList.tasks.map((task) => (
                            <div key={task.id} className="task">
                                {/*<input*/}
                                {/*value={item.task_name}*/}
                                {/*// inputProps={{*/}
                                {/*//     'aria-label': 'description',*/}
                                {/*// }}*/}
                                {/*onChange={(event) => {*/}
                                {/*this.InputOnChangeHandler(event.target.value, item.id)*/}
                                {/*}}*/}
                                {/*/>*/}
                                {/*<IconButton*/}
                                {/*aria-label="Delete"*/}
                                {/*onClick={() => {*/}
                                {/*this.DeleteButtonOnClickHandler(item.id);*/}
                                {/*}}*/}
                                {/*>*/}
                                {/*<DeleteIcon/>*/}
                                {/*</IconButton>*/}
                                {cardInEdit !== task._id ? (
                                  <div
                                    className={classes.card_title}
                                  >
                                      <span>{task.task_name}</span>
                                      <div>
                                          <Button
                                            class="DeleteCardButton"
                                            onClick={() => this.deleteCard(task._id)}
                                          >
                                              <DeleteIcon/>
                                          </Button>
                                          <Button
                                            class="EditCardButton"
                                            onClick={() => this.openCardEditor(task)}
                                          >
                                              <EditIcon/>
                                          </Button>
                                      </div>

                                  </div>
                                ) : (
                                  <div className={classes.ListTitleTextareaWrapper}>
                                    <Textarea
                                      class="ListTitleTextarea"
                                      autoFocus
                                      // useCacheForDOMMeasurements
                                      value={editableCardTitle}
                                      onChange={this.handleCardEditorChange}
                                      onKeyDown={this.handleEditKeyDown}
                                      onBlur={this.handleSubmitCardEdit}
                                    />
                                  </div>
                                )}
                            </div>
                          ))}
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
                                          class="ListTitleTextarea"
                                          autoFocus
                                          // useCacheForDOMMeasurements
                                          onChange={this.handleCardComposerChange}
                                          onKeyDown={this.handleKeyDown}
                                          value={newCardTitle}
                                        />
                                        <Button
                                          class={"ListTitleButton", "Add"}
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
                                  class="CardButton"
                                  text="Add new card"
                                  onClick={this.toggleCardComposer}
                                >
                                    Add new task
                                </Button>
                            </div>
                          )}
                      </div>
                  </div>
              </div>

          </Fragment>
        )
    }
};
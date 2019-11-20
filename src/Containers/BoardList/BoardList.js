import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {Form, Task} from "../index";
import classes from './BoardList.module.scss';
import {Button, Textarea} from "../../components";
import {Droppable} from 'react-beautiful-dnd';

export default class BoardList extends Component {

    state = {
        cardInEdit: null,
        editableCardTitle: "",
        isListTitleInEdit: false,
        newListTitle: ""
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
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    render() {
        const stateList = this.props.list;
        const {
            cardInEdit,
            editableCardTitle,
            isListTitleInEdit,
            newListTitle
        } = this.state;

        return (
          <div className={classes.List_Content} key={stateList.id} id={stateList.id}>
              {isListTitleInEdit ? (
                <div className={classes.ListTitleTextareaWrapper}>
                    <Textarea
                      className="ListTitleTextarea"
                      autoFocus
                      useCacheForDOMMeasurements
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
              <Droppable droppableId={this.props.list.id}>
                  {provided => (
                    <div className="List-Cards"
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        {/*функцией map раскрываем список всех задачь из состояния*/}
                        {stateList.tasks.map((task, index) => (
                          //Вывод компонента Задачи
                          <Task
                            key={index}
                            task={task}
                            index={index}
                            state={this.state}
                            deleteCard={this.deleteCard}
                            openCardEditor={this.openCardEditor}

                          />
                        ))}
                        {provided.placeholder}

                        {/*~~~~~~~~~~ Footer ~~~~~~~~~~~*/}
                        <Form
                          classNameBtn="ComposerWrapper"
                          addTask={this.props.addTask}
                          list={this.props.list}
                          type="addTask"
                          btnText="Add new task"
                          btnTextInner="Add task"
                        />
                    </div>
                  )}
              </Droppable>
          </div>
        )
    }
};
import React, {Component, Fragment} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {BoardForm, CardForm, CardList} from "../index";
import {
    ListItem,
    ListItemSecondaryAction,
    IconButton,
    Input
} from "@material-ui/core/es/index";
import './BoardList.scss';

export default class BoardList extends Component {

    state = {
        newCardFormIsOpen: false,
        newCardTitle: "",
        cardInEdit: null,
        editableCardTitle: "",
        isListTitleInEdit: false,
        newListTitle: ""
    };

    openTitleEditor = () => {
        this.setState({
            isListTitleInEdit: true,
            newListTitle: this.props.list.title
        });
    };
    deleteList = () => {
        // const { list, boardId, dispatch } = this.props;
        // dispatch(deleteList(list.cards, list._id, boardId));
    };

    //Обработчик нажатия кнопки удалить
    DeleteButtonOnClickHandler(index) {
        // console.log(index);
        this.props.onDeleteCard(index);
    };

    //Обработчик изменения инпута
    InputOnChangeHandler(value, index) {
        // console.log(index);
        this.props.onChangeCard(value, index);
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

        console.log(this.props);

        return (
          <Fragment>
              <div className="List" id={stateList.id}>
                  <div className="List-Content" key={stateList.id} id={stateList.id}>
                      <div className="List-Header">
                          {isListTitleInEdit ? (
                            <div className="ListTitleTextareaWrapper">
                                <textarea className="ListTitleTextarea"
                                  autoFocus
                                  // useCacheForDOMMeasurements
                                  value={newListTitle}
                                  onChange={this.handleListTitleEditorChange}
                                  onKeyDown={this.handleListTitleKeyDown}
                                  onBlur={this.handleSubmitListTitle}
                                />
                            </div>
                          ) : (
                            <div className="ListTitle">
                                <button
                                  onFocus={this.openTitleEditor}
                                  onClick={this.openTitleEditor}
                                >
                                    text={stateList.card_name}
                                </button>
                                <button onClick={this.deleteList} />
                            </div>
                          )}
                          {/*<input*/}
                            {/*value={stateList.card_name}*/}
                            {/*onChange={(event) => {*/}
                                {/*this.InputOnChangeHandler(event.target.value, stateList.id)*/}
                            {/*}}*/}
                          {/*/>*/}
                          {/*<IconButton*/}
                            {/*aria-label="Delete"*/}
                            {/*onClick={() => {*/}
                                {/*this.DeleteButtonOnClickHandler(stateList.id);*/}
                            {/*}}*/}
                          {/*>*/}
                              {/*<DeleteIcon/>*/}
                          {/*</IconButton>*/}
                          {/*<button className="delete"></button>*/}

                          {/*<p>{stateList.card_name}</p>*/}
                      </div>
                      <div className="List-Cards">
                          {/*функцией map раскрываем список всех задачь из состояния*/}
                          {stateList.tasks.map((item, index) => (
                            <Fragment>
                                {/*{stateList.map((item, index) => (*/}
                                {/*// TO DO: сделать внутренних компонентов*/}
                                {/*1*/}
                                {/*))}*/}
                                <input
                                  value={item.task_name}
                                  // inputProps={{
                                  //     'aria-label': 'description',
                                  // }}
                                  onChange={(event) => {
                                      this.InputOnChangeHandler(event.target.value, item.id)
                                  }}
                                />
                                <IconButton
                                  aria-label="Delete"
                                  onClick={() => {
                                      this.DeleteButtonOnClickHandler(item.id);
                                  }}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                                {/*<button className="delete"></button>*/}
                            </Fragment>
                          ))}
                      </div>

                      < div className="List-Footer">
                          {/*Форма с кнопкой*/}
                          <BoardForm
                          onAddCard={this.addCard}
                          />
                      </div>
                  </div>
              </div>

          </Fragment>
        )
    }
};
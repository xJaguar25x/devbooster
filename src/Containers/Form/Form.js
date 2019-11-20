import React, {Component} from 'react';
import classes from './Form.module.scss';
import {Button, Textarea} from "../../components";
import {ClickOutsideWrapper} from "../../hoc";

export default class Form extends Component {
    state = {
        newCardFormIsOpen: false,
        newCardTitle: "",
    };

    // показать/скрыть форму
    toggleCardComposer = () => {
        this.setState({newCardFormIsOpen: !this.state.newCardFormIsOpen});
    };
    // подтвердить отправку формы
    handleSubmitCard = event => {
        event.preventDefault();
        const {newCardTitle} = this.state;
        const {list, boardId, dispatch} = this.props;
        if (newCardTitle === "") return;
        // dispatch(addCard(newCardTitle, list._id, boardId));
        // console.log(this.props);
        if (!this.props.list) {
            this.props.addCard(newCardTitle);
        }
        else {
            this.props.addTask(list.id, newCardTitle);
        }
        this.setState({newCardTitle: "", newCardFormIsOpen: false});
    };
    // записать новое значение в state
    handleCardComposerChange = (event) => {
        this.setState({newCardTitle: event.target.value});
    };
    // при нажатии Enter вызвать обработчик отправки формы
    handleKeyDown = (event) => {
        // при нажатии Enter
        if (event.keyCode === 13) {
            this.handleSubmitCard(event);
        }
    };
    // при нажатии на кнопку "добавить" вызвать обработчик отправки формы
    handleOnClickButtonAdd = (event) => {
        this.handleSubmitCard(event);
    };

    render() {
        const {
            newCardTitle,
            newCardFormIsOpen
        } = this.state;

        const clsBtn = [
            // classes.Form,
            classes[this.props.classNameBtn]
        ];
        const clsWrapper = [
            classes.Form,
            classes[this.props.classNameWrapper]
        ];

        return (
          <div className={clsWrapper.join(' ')}>
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
                                {this.props.btnTextInner}
                            </Button>
                        </form>
                    </div>
                </ClickOutsideWrapper>
              )}
              {/*{newCardFormIsOpen || this.props.type === "addTask" && (*/}
                {/*<div className={classes.ComposerWrapper}>*/}
                    {/*<Button*/}
                      {/*className="CardButton"*/}
                      {/*onClick={this.toggleCardComposer}*/}
                    {/*>*/}
                        {/*{this.props.btnText}*/}
                    {/*</Button>*/}
                {/*</div>*/}
              {/*)}*/}
              {/*{newCardFormIsOpen || this.props.type === "addCard" && (*/}
                {/*<div className={cls.join(' ')}>*/}
                    {/*<Button*/}
                      {/*className="CardButton"*/}
                      {/*onClick={this.toggleCardComposer}*/}
                    {/*>*/}
                        {/*{this.props.btnText}*/}
                    {/*</Button>*/}
                {/*</div>*/}
              {/*)}*/}
              {newCardFormIsOpen || (
                <div className={clsBtn.join(' ')}>
                    <Button
                      className="CardButton"
                      onClick={this.toggleCardComposer}
                    >
                        {this.props.btnText}
                    </Button>
                </div>
              )}
          </div>
        )
    }
};
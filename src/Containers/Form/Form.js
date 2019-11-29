import React, {Component} from 'react';
import classes from './Form.module.scss';
import {Button, Textarea} from "../../components";
import {ClickOutsideWrapper} from "../../hoc";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addColumn, addCard} from '../../store/actions/itemActions';

class Form extends Component {
    state = {
        newColumnFormIsOpen: false,
        newColumnTitle: "",
    };

    // показать/скрыть форму
    toggleCardComposer = () => {
        this.setState({newColumnFormIsOpen: !this.state.newColumnFormIsOpen});
    };
    // подтвердить отправку формы
    handleSubmitCard = event => {
        event.preventDefault();
        const {newColumnTitle} = this.state;
        const {column, boardId, dispatch} = this.props;
        if (newColumnTitle === "") return;
        // dispatch(addColumn(newColumnTitle, column._id, boardId));
        // console.log(this.props);

        // Если добавляем column то передаем только имя
        if (this.props.type === "addColumn") {
            this.props.addColumn(newColumnTitle);
        }
        else if (this.props.type === "addCard") {
            // console.log(this.props);
            this.props.addCard(column._id, newColumnTitle);
        }
        this.setState({newColumnTitle: "", newColumnFormIsOpen: false});
    };
    // записать новое значение в state
    handleCardComposerChange = (event) => {
        this.setState({newColumnTitle: event.target.value});
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
            newColumnTitle,
            newColumnFormIsOpen
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
              {newColumnFormIsOpen && (
                <ClickOutsideWrapper handleClickOutside={this.toggleCardComposer}>
                    <div className={classes.TextareaWrapper}>
                        <form
                          className={classes.CardTextareaForm}
                          onSubmit={this.handleSubmitCard}
                        >
                            <Textarea
                              className="ColumnTitleTextarea"
                              autoFocus
                              // useCacheForDOMMeasurements
                              onChange={this.handleCardComposerChange}
                              onKeyDown={this.handleKeyDown}
                              value={newColumnTitle}
                            />
                            <Button
                              className={"ColumnTitleButton", "Add"}
                              type="submit"
                              disabled={newColumnTitle === ""}
                              onClick={this.handleOnClickButtonAdd}
                            >
                                {this.props.btnTextInner}
                            </Button>
                        </form>
                    </div>
                </ClickOutsideWrapper>
              )}
              {/*{newCardFormIsOpen || this.props.type === "addCard" && (*/}
              {/*<div className={classes.ComposerWrapper}>*/}
              {/*<Button*/}
              {/*className="CardButton"*/}
              {/*onClick={this.toggleCardComposer}*/}
              {/*>*/}
              {/*{this.props.btnText}*/}
              {/*</Button>*/}
              {/*</div>*/}
              {/*)}*/}
              {/*{newCardFormIsOpen || this.props.type === "addColumn" && (*/}
              {/*<div className={cls.join(' ')}>*/}
              {/*<Button*/}
              {/*className="CardButton"*/}
              {/*onClick={this.toggleCardComposer}*/}
              {/*>*/}
              {/*{this.props.btnText}*/}
              {/*</Button>*/}
              {/*</div>*/}
              {/*)}*/}
              {newColumnFormIsOpen || (
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
}

Form.propTypes = {
    addColumn: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired
};
// const mapStateToProps = (state, ownProps) => ({
//     ownProps
// });
export default connect(null, {addColumn, addCard})(Form);
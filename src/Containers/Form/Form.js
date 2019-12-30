import React, {Component} from 'react';
import classes from './Form.module.scss';
import {Button, Textarea} from "../../components/index";
import {ClickOutsideWrapper} from "../../hoc/index";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addColumn, addCard, addBoard} from '../../store/actions/itemActions';

class Form extends Component {
    state = {
        formIsOpen: false,
        newTitle: "",
    };

    // показать/скрыть форму
    toggleCardComposer = () => {
        this.setState({formIsOpen: !this.state.formIsOpen});
    };
    // подтвердить отправку формы
    handleSubmitCard = event => {
        event.preventDefault();
        const {newTitle} = this.state;
        // const {column, boardId, dispatch} = this.props;
        const {column, board} = this.props;
        if (newTitle === "") return;
        // dispatch(addColumn(newTitle, column._id, boardId));
        // console.log("Form props column ",column);
        // console.log("Form props ",this.props);

        // Если добавляем column то передаем только имя
        if (this.props.type === "addColumn") {
            this.props.addColumn(board, newTitle);
        }
        else if (this.props.type === "addCard") {
            this.props.addCard(column, newTitle);
        } else if (this.props.type === "addBoard") {
            this.props.addBoard(newTitle);
        }
        this.setState({newTitle: "", formIsOpen: false});
    };
    // записать новое значение в state
    handleCardComposerChange = (event) => {
        this.setState({newTitle: event.target.value});
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
            newTitle,
            formIsOpen
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
              {formIsOpen && (
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
                              value={newTitle}
                            />
                            <Button
                              className={"ColumnTitleButton", "Add"}
                              type="submit"
                              disabled={newTitle === ""}
                              onClick={this.handleOnClickButtonAdd}
                            >
                                {this.props.btnTextInner}
                            </Button>
                        </form>
                    </div>
                </ClickOutsideWrapper>
              )}
              {formIsOpen || (
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
    addBoard: PropTypes.func.isRequired,
    addColumn: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired
};
// const mapStateToProps = (state, ownProps) => ({
//     ownProps
// });
export default connect(null, {addBoard, addColumn, addCard})(Form);
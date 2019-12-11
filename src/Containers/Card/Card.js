import React, {Component} from 'react';
import classes from '../Card/Card.module.scss';
import {Draggable} from "react-beautiful-dnd";
import {Button, Textarea} from "../../components";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {deleteCard, editCard} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class Card extends Component {

    componentDidMount() {
        // console.log("Card.props", this.props);
        // console.log("Card.state", this.state);
    }

    state = {
        cardInEdit: null,
        editableCardTitle: "",
        currentCard : this.props.cards[this.props.card]
    };

    /* ~~~~~~~~~~~~~~~~~~ Обработчики событий UI ~~~~~~~~~~~~~~~~~~~~~~*/
    openCardEditor = card => {
        // console.log("cardId=%s CardTitle=%s", card._id, card.card_name );
        this.setState({cardInEdit: card._id, editableCardTitle: card.card_name});
    };

    handleCardEditorChange = (event) => {
        // console.log("editableCardTitle=%s ", event.target.value );
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
        if (editableCardTitle === "") {
            // Удалять карточку если стерли имя
            this.deleteCardHandler(cardInEdit);
        } else {
            // Или обновлять ее имя, если введено новое
            console.log("22cardTitle =%s cardId=%s ", editableCardTitle, cardInEdit);
            let newCard = this.state.currentCard;
            newCard = {...newCard, card_name: editableCardTitle};
            this.changeCard(newCard);
            // this.changeCard(cardInEdit, editableCardTitle);
            // dispatch(editCardTitle(editableCardTitle, cardInEdit, column, boardId));
        }
        this.setState({editableCardTitle: "", cardInEdit: null});
    };

    /* ~~~~~~~~~~~~~~~~~~ Методы обработки state ~~~~~~~~~~~~~~~~~~~~~~*/
    // обработчик изменения в состоянии Card
    changeCard = (newCard) => {
        this.props.editCard(newCard);
        // this.props.editCard(editableCardTitle, cardInEdit);
    };
    deleteCardHandler = cardId => {
        // const {dispatch, column, card} = this.props;
        const {column, card} = this.props;
        // dispatch(deleteColumn(cardId, list._id, boardId));
        console.log("cardId=%s columnId=%s column=", card, column._id, column);
        this.props.deleteCard(column, card);
    };

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    render() {
        // console.log("Card.props", this.props);
        // console.log("Card.state", this.state);

        const stateList = this.state;
        const {
            cardInEdit,
            editableCardTitle
        } = stateList;

        // извлекаем карточку из массива полученного от редакс с помощью переданного свойства card
        const currentCard = this.props.cards[this.props.card];
        // console.log("currentCard ",currentCard);

        // TODO:
        return (
          <Draggable
            key={currentCard._id}
            className="task"
            draggableId={currentCard._id}
            index={this.props.index}
          >
              {providedCard => (
                <div
                  // TODO: исправить ошибку Invariant failed: providedCard.innerRef has not been providedCard with a HTMLElement. аботает, если сюда перенести свойства. Но тогда плохо работает перетаскивание
                  //                   ref={providedCard.innerRef}
                  //               {...providedCard.draggableProps}
                  //             {...providedCard.dragHandleProps}
                  //           data-react-beautiful-dnd-draggable="0"
                  //         data-react-beautiful-dnd-drag-handle="0"
                >
                    {cardInEdit !== currentCard._id ? (
                      <div
                        // key={currentCard._id}
                        // id={currentCard._id}
                        className={classes.card_title}
                        ref={providedCard.innerRef}
                        {...providedCard.draggableProps}
                        {...providedCard.dragHandleProps}
                        // data-react-beautiful-dnd-draggable="0"
                        // data-react-beautiful-dnd-drag-handle="0"
                      >
                          <span>{currentCard.card_name}</span>
                          <div>
                              <Button
                                className="DeleteCardButton"
                                onClick={() => this.deleteCardHandler(currentCard)}
                              >
                                  <DeleteIcon/>
                              </Button>
                              <Button
                                className="EditCardButton"
                                onClick={() => this.openCardEditor(currentCard)}
                              >
                                  <EditIcon/>
                              </Button>
                          </div>

                      </div>
                    ) : (
                      <div className={classes.CardTitleTextareaWrapper}>
                        <Textarea
                          className="CardTitleTextarea"
                          autoFocus
                          // useCacheForDOMMeasurements
                          value={editableCardTitle}
                          onChange={this.handleCardEditorChange}
                          onKeyDown={this.handleEditKeyDown}
                          onBlur={this.handleSubmitCardEdit}
                        />
                      </div>
                    )}
                    {providedCard.placeholder}
                </div>
              )}
          </Draggable>
        )
    }
}

Card.propTypes = {
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
    cards: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    // ownProps,
    cards: (state.cards)
});
export default connect(
  mapStateToProps,
  {deleteCard, editCard}
)(Card);
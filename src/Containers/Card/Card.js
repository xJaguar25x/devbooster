import React, {Component, Fragment} from 'react';
import classes from './Card.module.scss';
import {Draggable} from "react-beautiful-dnd";
import {Button, Textarea} from "../../components/index";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {deleteCard, editCard} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Layout} from "../../hoc";
import {NavLink} from "react-router-dom";

class Card extends Component {

    componentDidMount() {
        // console.log("Card.props", this.props);
        // console.log("Card.state", this.state);
    }

    state = {
        cardInEdit: null,
        editableCardTitle: "",
        currentCard: this.props.cardsById.cards[this.props.card._id]
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
        // console.log("cardId=%s columnId=%s column=", card._id, column._id, column);
        this.props.deleteCard(column, card._id);
    };

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    render() {
        console.log("Card.props", this.props);
        // console.log("Card.state", this.state);

        const stateList = this.state;
        const {
            cardInEdit,
            editableCardTitle
        } = stateList;

        // извлекаем карточку из массива полученного от редакс с помощью переданного свойства card
        const currentCard = this.props.cardsById.cards[this.props.card._id];
        // console.log("currentCard ",currentCard);

        // TODO:
        return (
          <Draggable
            key={currentCard._id}
            // className="task"
            draggableId={currentCard._id}
            index={this.props.index}
          >
              {providedCard => (
                <div
                  className={classes.Cards_content}
                  ref={providedCard.innerRef}
                  {...providedCard.draggableProps}
                  {...providedCard.dragHandleProps}
                  data-react-beautiful-dnd-draggable="0"
                  data-react-beautiful-dnd-drag-handle="0"
                >
                    {cardInEdit !== currentCard._id ? (
                      <NavLink
                        to={`/p${this.props.projectId}/b${this.props.boardId}/c${currentCard._id}`}
                        className={classes.CardLink}
                      >
                          {/*<div className={classes.Cards_content}>*/}
                          <div className={classes.Cards_header}>
                              <div>21 dec</div>
                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                          </div>
                          <div className={classes.Cards_title}>
                              {currentCard.card_name}
                          </div>
                          {/* <div className={classes.Cards_groups}>
                            <div className={classes.groups_item__blue}>Sketching</div>
                            <div className={classes.groups_item__blue2}>Illustrating</div>
                            <div className={classes.groups_item__blue3}>3D</div>
                            <div className={classes.groups_item__blue4}>Low Poly</div>
                            <div className={classes.groups_item__purple}>Web Design</div>
                            <div className={classes.groups_item__pink}>Visual</div>
                            <div className={classes.groups_item__orange}>Matte-painting</div>
                            <div className={classes.groups_item__gray}>+ 3 more</div>
                        </div>*/}
                          {/*</div>*/}
                      </NavLink>
                    ) : (
                      <Layout>
                          {/* <div className={classes.CardTitleTextareaWrapper}>
                        <Textarea
                          className="CardTitleTextarea"
                          autoFocus
                          // useCacheForDOMMeasurements
                          value={editableCardTitle}
                          onChange={this.handleCardEditorChange}
                          onKeyDown={this.handleEditKeyDown}
                          onBlur={this.handleSubmitCardEdit}
                        />
                      </div>*/}

                      </Layout>
                    ) }

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
    cardsById: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    ownProps,
    cardsById: state.cardsById
});
export default connect(
  mapStateToProps,
  {deleteCard, editCard}
)(Card);
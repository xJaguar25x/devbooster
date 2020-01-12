import React, {Component} from 'react';
import classes from './Card.module.scss';
import {Draggable} from "react-beautiful-dnd";

import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Layout} from "../../hoc";
import {NavLink} from "react-router-dom";

class Card extends Component {

    componentDidMount() {
        // console.log("Card.props", this.props);
        // console.log("Card.state", this.state);
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    render() {
        console.log("Card.props", this.props);

        // извлекаем карточку из массива полученного от редакс с помощью переданного свойства card
        const currentCard = this.props.cardsById.cards[this.props.card._id];
        // console.log("currentCard ",currentCard);

        return (
          <Draggable
            key={currentCard._id}
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
                    <NavLink
                      to={`/p${this.props.projectId}/b${this.props.boardId}/col${this.props.column._id}/c${currentCard._id}`}
                      className={classes.CardLink}
                    >
                        <div className={classes.Cards_header}>
                            <div>{ new Date(currentCard.date * 1000).toLocaleDateString()}</div>
                            <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                        </div>
                        <div className={classes.Cards_title}>
                            <p>{currentCard.title}</p>
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
                    </NavLink>

                    {providedCard.placeholder}
                </div>
              )}
          </Draggable>
        )
    }
}

Card.propTypes = {
    cardsById: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    // ownProps,
    cardsById: state.cardsById
});
export default connect(
  mapStateToProps,
  {}
)(Card);
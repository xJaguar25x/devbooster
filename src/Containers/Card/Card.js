import React, {Component, Fragment} from 'react';
import classes from '../Card/Card.module.scss';
import {Draggable} from "react-beautiful-dnd";
import {Button, Textarea} from "../../components";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default class Card extends Component {

    render() {
        const stateList = this.props.state;
        const {
            cardInEdit,
            editableCardTitle
        } = stateList;

        return (
          <Draggable
            key={this.props.card.id}
            className="task"
            draggableId={this.props.card.id}
            index={this.props.index}
          >
              {({
                    innerRef,
                    draggableProps,
                    dragHandleProps,
                    placeholder
                }) => (
                <Fragment>
                    {cardInEdit !== this.props.card.id ? (
                      <div
                        key={this.props.card.id}
                        id={this.props.card.id}
                        className={classes.card_title}
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                        data-react-beautiful-dnd-draggable="0"
                        data-react-beautiful-dnd-drag-handle="0"
                      >
                          <span>{this.props.card.card_name}</span>
                          <div>
                              <Button
                                className="DeleteCardButton"
                                onClick={() => this.props.deleteCard(this.props.card.id)}
                              >
                                  <DeleteIcon/>
                              </Button>
                              <Button
                                className="EditCardButton"
                                // onClick={() => this.props.openCardEditor(this.props.card)}
                                // TODO: сделать изменение задачи
                              >
                                  <EditIcon/>
                              </Button>
                          </div>

                      </div>
                    ) : (
                      <div className={classes.ColumnTitleTextareaWrapper}>
                        <Textarea
                          className="ColumnTitleTextarea"
                          autoFocus
                          // useCacheForDOMMeasurements
                          value={editableCardTitle}
                          onChange={this.handleCardEditorChange}
                          onKeyDown={this.handleEditKeyDown}
                          onBlur={this.handleSubmitCardEdit}
                        />
                      </div>
                    )}
                    {placeholder}
                </Fragment>
              )}
          </Draggable>
        )
    }
};
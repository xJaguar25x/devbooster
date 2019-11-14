import React, {Component, Fragment} from 'react';
import classes from '../BoardList/BoardList.module.scss';
import {Draggable} from "react-beautiful-dnd";
import {Button, Textarea} from "../../components";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default class Task extends Component {

    render() {
        const stateList = this.props.state;
        const {
            cardInEdit,
            editableCardTitle
        } = stateList;

        return (
          <Fragment>
              <Draggable
                key={this.props.task.id}
                className="task"
                draggableId={this.props.task.id}
                index={this.props.index}
              >
                  {({
                        innerRef,
                        draggableProps,
                        dragHandleProps,
                        placeholder
                    }) => (
                    <Fragment>
                        {/*<div*/}
                          {/*key={this.props.task.id}*/}
                          {/*id={this.props.task.id}*/}
                          {/*className={classes.card_title}*/}
                          {/*{...draggableProps}*/}
                          {/*{...dragHandleProps}*/}
                          {/*ref={innerRef}*/}
                          {/*data-react-beautiful-dnd-draggable="0"*/}
                          {/*data-react-beautiful-dnd-drag-handle="0"*/}
                        {/*>*/}
                            {/*<span>{this.props.task.task_name}</span>*/}

                        {/*</div>*/}
                        {/*{placeholder}*/}
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
                        {cardInEdit !== this.props.task.id ? (
                          <div
                            key={this.props.task.id}
                            id={this.props.task.id}
                            className={classes.card_title}
                            {...draggableProps}
                            {...dragHandleProps}
                            ref={innerRef}
                            data-react-beautiful-dnd-draggable="0"
                            data-react-beautiful-dnd-drag-handle="0"
                          >
                              <span>{this.props.task.task_name}</span>
                              <div>
                                  <Button
                                    className="DeleteCardButton"
                                    onClick={() => this.deleteCard(this.props.task.id)}
                                  >
                                      <DeleteIcon/>
                                  </Button>
                                  <Button
                                    className="EditCardButton"
                                    onClick={() => this.openCardEditor(this.props.task)}
                                  >
                                      <EditIcon/>
                                  </Button>
                              </div>

                          </div>
                        ) : (
                          <div className={classes.ListTitleTextareaWrapper}>
                        <Textarea
                          className="ListTitleTextarea"
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
          </Fragment>
        )
    }
};
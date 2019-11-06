import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    List,
    Checkbox,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    Input
} from "@material-ui/core/es/index";

export default class CardList extends Component {

    //Обработчик нажатия кнопки удалить
    ButtonOnClickHandler(index) {
        this.props.onDelete(index);
    };

    //Обработчик изменения инпута
    InputOnChangeHandler(value, index) {
        // console.log(index);
        this.props.onChange(value, index);
    };


    render() {
        const stateList = this.props.state.items;

        return (
          <List>
              {/*функцией map раскрываем список всех задачь из состояния*/}
              {stateList.map((task, index) => (
                <ListItem key={index.toString()} dense button>
                    {/*<ListItemText primary={task.task_name}/>*/}
                    <Input
                      // defaultValue={task.task_name}
                      value={task.task_name}
                      inputProps={{
                          'aria-label': 'description',
                      }}
                      onChange={(event) => {
                          this.InputOnChangeHandler(event.target.value, index)
                      }}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Delete"
                          onClick={() => {
                              this.ButtonOnClickHandler(index);
                          }}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        );
    }
};
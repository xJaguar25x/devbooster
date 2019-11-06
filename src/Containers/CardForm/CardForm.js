import React, {Component, Fragment, useState} from 'react';
import TextField from '@material-ui/core/TextField';

export default class CardForm extends Component {

    state = {
        value: ""
    };


    // сохраняем введенное значение
    setValue = (event) => {
        // console.log(event.target.value);
        this.setState({value: event});
    };

    //Обработчик нажатия кнопки удалить
    onSubmitHandler(event) {
        //прекращаем стандартное поведение
        event.preventDefault();

        //Отправляем значение поля для создания задачи
        // console.log(this.state.value);
        this.props.onAdd(this.state.value);

        // очищаем поле ввода
        this.setValue('');
    };

    render() {

        return (
          <form
            onSubmit={(event) => {
                this.onSubmitHandler(event)
            }}
          >
              <TextField
                variant="outlined"
                placeholder="Добавить задачу"
                margin="normal"
                onChange={event => {
                    this.setValue(event.target.value);
                }}
                value={this.state.value}
              />
          </form>
        );
    }

};

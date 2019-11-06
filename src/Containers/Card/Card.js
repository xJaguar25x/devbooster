import React, {Component, Fragment} from "react";
import {CardForm, CardList} from "../index";
import {Typography} from "@material-ui/core/";


export default class Card extends Component {
    state = {
        items: [
            {task_name: "task1"},
            {task_name: "task2"}
        ]
    };

    // обработчик удаления из состояния
    deleteTask = id => {
        this.setState({
            items: this.state.items.filter((_, index) => index !== id)
        });
    };
    // обработчик добавления к состоянию
    addTask = item => {
        this.setState({
            items: [...this.state.items, {task_name: item}]
        });
        // console.log(this.state);
    };
    // обработчик изменения в состоянии
    changeTask = (item_value, id) => {
        // console.log("item_value = ", item_value, ", id = ", id);

        // this.setState(state => {
        //     return {
        //         // state: state.todos.map(todo => todo.id === id ? {...todo, complete: !todo.complete} : todo)
        //         items: state.items.map((elem, index) => index === id ? {...elem, task_name: item_value} : elem)
        //     }
        // });
        // console.log("after changes: ", this.state);

        this.setState({
            items: this.state.items.map((element, index) => index === id ? {...element, task_name: item_value} : element)
        });
    };


    render() {
        return (
          <Fragment>
              {/*Заголовок*/}
              <Typography component="h5" variant="h5">
                  Задачи
              </Typography>

              {/*Вывод списка*/}
              <CardList
                state={this.state}
                onChange={this.changeTask}
                onDelete={this.deleteTask}
              />

              {/*Форма с кнопкой*/}
              <CardForm
                onAdd={this.addTask}
              />

          </Fragment>
        );
    }

};
import React, {Component} from 'react';
import {TextField} from "@material-ui/core/es/index";
import './BoardForm.scss';

export default class BoardForm extends Component {
    state = {
        value: "",
        newCardFormIsOpen: false
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
        this.props.onAddCard(this.state.value);

        // очищаем поле ввода
        this.setValue('');
    };

    render() {

        return (
          <div className="List list-wrapper mod-add is-idle">

              {/*{newCardFormIsOpen && (*/}
                {/*<ClickOutside handleClickOutside={this.toggleCardComposer}>*/}
                    {/*<CardTextareaForm*/}
                      {/*// onSubmit={this.handleSubmitCard}*/}
                      {/*onSubmit={(event) => {*/}
                          {/*this.onSubmitHandler(event)*/}
                      {/*}}*/}
                      {/*className="List-Content"*/}
                    {/*>*/}
                        {/*<CardTextarea*/}
                          {/*autoFocus*/}
                          {/*useCacheForDOMMeasurements*/}
                          {/*onChange={this.handleCardComposerChange}*/}
                          {/*onKeyDown={this.handleKeyDown}*/}
                          {/*value={newCardTitle}*/}
                        {/*/>*/}
                        {/*<Button*/}
                          {/*add*/}
                          {/*type="submit"*/}
                          {/*text="Add"*/}
                          {/*disabled={newCardTitle === ""}*/}
                        {/*/>*/}
                    {/*</CardTextareaForm>*/}
                {/*</ClickOutside>*/}
              {/*)}*/}
              {/*{newCardFormIsOpen || (*/}
                {/*<ComposerWrapper>*/}
                    {/*<Button*/}
                      {/*card*/}
                      {/*text="Add new card"*/}
                      {/*onClick={this.toggleCardComposer}*/}
                    {/*>*/}
                        {/*Add new card*/}
                    {/*</Button>*/}
                {/*</ComposerWrapper>*/}
              {/*)}*/}

              <form
                onSubmit={(event) => {
                    this.onSubmitHandler(event)
                }}
                className="List-Content"
              >
                  <TextField
                    variant="outlined"
                    placeholder="Добавьте еще одну колонку"
                    margin="normal"
                    onChange={event => {
                        this.setValue(event.target.value);
                    }}
                    value={this.state.value}
                  />
              </form>
          </div>
        );
    }
};
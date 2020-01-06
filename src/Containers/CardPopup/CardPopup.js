import React, {Component, Fragment} from 'react'
import classes from './CardPopup.module.scss'
import {ClickOutsideWrapper, Layout, PreloaderWrapper} from "../../hoc";
import {Link, Redirect} from "react-router-dom";
import {deleteCard, editCard} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Button, Preloader} from "../../components";

class CardPopup extends Component {
    // состояние navigate нужно, для переключение контента, который будет отрендерен в ClickOutsideWrapper при клике за пределами нашего окна(компонента)
    state = {
        navigate: false
    };
    handleCloseClick = () => {
        this.setState({navigate: true});
    };
    renderRedirect = () => {
        const {projectId, boardId} = this.props.match.params;
        // Redirect используется для перехода по ссылке без клика
        return <Redirect to={`/p${projectId}/b${boardId}/`}/>;
    };

    /* ~~~~~~~~~~~~~~~~~~ Методы обработки state ~~~~~~~~~~~~~~~~~~~~~~*/

    deleteCardHandler = () => {
        const column = this.props.columnsById.columns[this.props.match.params.columnId];
        const card = this.props.match.params.cardId;
        // console.log("cardId=%s columnId=%s column=", card,  column._id);
        this.props.deleteCard(column, card);

        //вызываем принудительный редирект, после запроса на удаление
        this.handleCloseClick();
    };

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    renderCardPopup() {
        console.log("CardPopup", this.props);
// извлекаем карточку из массива полученного от редакс с помощью переданного свойства card
        const currentCard = this.props.cardsById.cards[this.props.match.params.cardId];
        // console.log("currentCard", currentCard);
//TODO:
        return (
          <Fragment>
              <div className={classes.CardPopup_Header}>
                  <textarea
                    className={classes.CardPopup_Header_Title}
                    defaultValue={currentCard.title}
                  />
                  <button
                    onClick={this.handleCloseClick}
                  >
                      X
                  </button>
              </div>
              <div className={classes.CardPopup_Content}>
                  <div className={classes.CardPopup_Content_LeftSide}>
                      <div className={classes.LeftSide_Members}>
                          <h3>Members</h3>
                          <div className={classes.Members_Users}>
                              <div className={classes.Comments_UserAvatar}>ava</div>
                              <div className={classes.Comments_UserAvatar}>+</div>
                          </div>

                      </div>
                      <div className={classes.LeftSide_Description}>
                          <h3 className={classes.Description_Title}>Description</h3>
                          <textarea
                            className={classes.Description_Textarea}
                            placeholder="Добавить более подробное описание…"
                            defaultValue={currentCard.description}
                          />
                          {/*TODO: нужно доделать логику для изменения описания и заголовка карточки. Так же нужно исправить спиннер при перезагрузке страницы с открытой карточкой*/}
                      </div>
                      <div className={classes.LeftSide_Comments}>
                          <div className={classes.Comments_Header}>
                              <h3>
                                  Comments
                              </h3>
                          </div>
                          <div className={classes.Comments_NewComment}>
                              <div className={classes.Comments_UserAvatar}>ava</div>
                              <textarea
                                placeholder="Напишите комментарий…"
                              />
                          </div>
                          <div className={classes.Comments_Content}>

                              <div className={classes.Content_Msg}>
                                  <div className={classes.Comments_UserAvatar}>ava</div>
                                  <div className={classes.Msg_Main}>
                                      <div className={classes.Msg_Main_Header}>
                                          <div className={classes.Header_Nickname}>nick</div>
                                          <div className={classes.Header_Date}>1 дек 2019 г. в 14:33</div>
                                      </div>

                                      <div className={classes.Msg_Main_Message}>
                                          <p>Lorem ipsum possimus!</p>
                                      </div>
                                      <div className={classes.Msg_Main_Reactions}>
                                          <button>smiles</button>
                                          <button disabled>change</button>
                                          <button disabled>delete</button>
                                      </div>
                                  </div>
                              </div>

                              <div className={classes.Content_Msg}>
                                  <div className={classes.Comments_UserAvatar}>ava</div>
                                  <div className={classes.Msg_Main}>
                                      <div className={classes.Msg_Main_Header}>
                                          <div className={classes.Header_Nickname}>nick</div>
                                          <div className={classes.Header_Date}>29 ноя 2019 г. в 22:42</div>
                                      </div>

                                      <div className={classes.Msg_Main_Message}>
                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab dicta ipsum
                                              molestias saepe tenetur ullam voluptas? Cum, molestiae, possimus!</p>
                                      </div>
                                      <div className={classes.Msg_Main_Reactions}>
                                          <button>smiles</button>
                                          <button disabled>reply</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className={classes.CardPopup_Content_RightSide}>
                      <Button
                        className="Card_Action_Btn"
                        onClick={() => this.deleteCardHandler()}
                      >
                          Delete card
                      </Button>
                      <Button className="Card_Action_Btn" disabled>Subscribe</Button>
                      <Button className="Card_Action_Btn" disabled>Join</Button>
                  </div>
              </div>
          </Fragment>
        )
    };

    render() {
        // console.log("CardPopup", this.props);
        const cards = Object.values(this.props.cardsById.cards);
        // получаем длину объекта, для проверки на пустоту, 0 == false, >0 == true
        const cardsLength = cards.length;
        // let temp = (!this.props.cardsById.loading  && !!cardsLength );

        return (
          <Layout>
              {/*// передаем обработчик состояния*/}
              <ClickOutsideWrapper
                handleClickOutside={this.handleCloseClick}
                className=""
              >
                  {/* простое условие, если состояние поменялось, пользователя перекинет на другую страницу. В нашем случае просто закроется окно, так как состояние остальных компонентов не поменяется.*/}
                  {
                      this.state.navigate === false
                        ? (
                          <div className={classes.CardPopup}>

                              {/*{console.log("loading = ", this.props.cardsById.loading, this.props.cardsById.cards, cardsLength, temp)}*/}
                              {
                                  //если не загружается и не пустой объект
                                  (!this.props.cardsById.loading && !!cardsLength)
                                    ? (this.renderCardPopup())
                                    : (<Preloader/>)
                              }


                          </div>
                        )
                        : (this.renderRedirect())
                  }

              </ClickOutsideWrapper>
          </Layout>
        )
    }
}

CardPopup.propTypes = {
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
    columnsById: PropTypes.object.isRequired,
    cardsById: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    ownProps,
    columnsById: state.columnsById,
    cardsById: state.cardsById
});
export default connect(
  mapStateToProps,
  {deleteCard, editCard}
)(CardPopup);
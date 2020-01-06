import React, {Component, Fragment} from 'react'
import classes from './CardPopup.module.scss'
import {ClickOutsideWrapper, Layout, PreloaderWrapper} from "../../hoc";
import {Link, Redirect} from "react-router-dom";
import {deleteCard, editCard} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Preloader} from "../../components";

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

    renderCardPopup() {
        // console.log("CardPopup", this.props);
// извлекаем карточку из массива полученного от редакс с помощью переданного свойства card
        const currentCard = this.props.cardsById.cards[this.props.match.params.cardId];
        // console.log("currentCard", currentCard);

        return (
          <Fragment>
              <div className={classes.CardPopup_Header}>
                  <div>{currentCard.card_name}</div>
                  <button
                    onClick={this.handleCloseClick}
                  >
                      X
                  </button>
              </div>
              <div className={classes.CardPopup_Content}>
                  <div className={classes.CardPopup_Description}>Description</div>
                  <div className={classes.CardPopup_Chat}>Chat</div>
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
    cardsById: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({
    ownProps,
    cardsById: state.cardsById
});
export default connect(
  mapStateToProps,
  {deleteCard, editCard}
)(CardPopup);
// CardPopup

import React, {Component} from 'react'
import classes from './CardPopup.module.scss'
import {ClickOutsideWrapper, Layout} from "../../hoc";
import {Link, Redirect} from "react-router-dom";

class CardPopup extends Component {
    // состояние нужно, для переключение контента, который будет отрендерен в ClickOutsideWrapper при клике за пределами нашего окна(компонента)
    state = {
        navigate: false
    };
    handleClick = () => {
        this.setState({navigate: true});
    };
    renderRedirect = () => {
        const {projectId, boardId} = this.props.match.params;
        // Redirect используется для перехода по ссылке без клика
        return <Redirect to={`/p${projectId}/b${boardId}/`}/>;
    };

    render() {
        console.log("CardPopup", this.props);

        return (
          //
          <Layout>
              {/*// передаем обработчик состояния*/}
              <ClickOutsideWrapper
                handleClickOutside={this.handleClick}
                className=""
              >
                  {/* простое условие, если состояние поменялось, пользователя перекинет на другую страницу. В нашем случае просто закроется окно, так как состояние остальных компонентов не поменяется.*/}
                  {
                      this.state.navigate === false
                        ? (
                          <div className={classes.CardPopup}>
                              <div className={classes.CardPopup_Header}>
                                  <div>Name</div>
                                  <button>X</button>
                              </div>
                              <div className={classes.CardPopup_Content}>
                                  <div>Description</div>
                                  <div>Chat</div>
                              </div>
                          </div>
                        )
                        : (this.renderRedirect())
                  }

              </ClickOutsideWrapper>
          </Layout>
        )
    }
}

export default CardPopup;
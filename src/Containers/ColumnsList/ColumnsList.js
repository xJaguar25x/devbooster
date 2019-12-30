// ColumnsList
import React, {Component, Fragment} from 'react';
import classes from './ColumnsList.module.scss';
import {getAll} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class ColumnsList extends Component {

    componentDidMount() {
    }

    renderColumnsList() {

        return (
          <div className={classes.Columns}>

              <div className={classes.Columns_content}>
                  <div className={classes.Columns_header}>
                      <div className={classes.Columns_title}>
                          Title
                          <div> 3</div>
                      </div>
                      <div className={classes.squareBtn}>
                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </div>
                  </div>
                  <div className={classes.Cards}>

                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_header}>
                              <div>21 dec</div>
                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                          </div>
                          <div className={classes.Cards_title}>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                              cumque dolor dolorum eum facilis, fugiat in nobis nulla numquam quia
                              quidem similique tempore, velit veritatis?
                          </div>
                          <div className={classes.Cards_groups}>
                              <div className={classes.groups_item__blue}>Sketching</div>
                              <div className={classes.groups_item__blue2}>Illustrating</div>
                              <div className={classes.groups_item__blue3}>3D</div>
                              <div className={classes.groups_item__blue4}>Low Poly</div>
                              <div className={classes.groups_item__purple}>Web Design</div>
                              <div className={classes.groups_item__pink}>Visual</div>
                              <div className={classes.groups_item__orange}>Matte-painting</div>
                              <div className={classes.groups_item__gray}>+ 3 more</div>
                          </div>
                      </div>

                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_header}>
                              <div>21 dec</div>
                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                          </div>
                          <div className={classes.Cards_title}>Card title</div>
                          <div className={classes.Cards_groups}>
                              <div className={classes.groups_item__blue}>Sketching</div>
                              <div className={classes.groups_item__blue2}>Illustrating</div>
                              <div className={classes.groups_item__blue4}>Low Poly</div>
                          </div>
                      </div>

                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_title}>No card title yet</div>
                      </div>

                      <div className={classes.Cards_content + " " + classes.newCard}>
                          <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                      </div>
                  </div>
              </div>

              <div className={classes.Columns_content}>
                  <div className={classes.Columns_header}>
                      <div className={classes.Columns_title}>
                          Title
                          <div> 3</div>
                      </div>
                      <div className={classes.squareBtn}>
                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </div>
                  </div>
                  <div className={classes.Cards}>
                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_header}>
                              <div>21 dec</div>
                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                          </div>
                          <div className={classes.Cards_title}>Card title</div>
                          <div className={classes.Cards_groups}>
                              <div className={classes.groups_item__blue}>Sketching</div>
                              <div className={classes.groups_item__blue2}>Illustrating</div>
                              <div className={classes.groups_item__blue4}>Low Poly</div>
                          </div>
                      </div>

                      <div className={classes.Cards_content}>
                          <div className={classes.Cards_title}>No card title yet</div>
                      </div>

                      <div className={classes.Cards_content + " " + classes.newCard}>
                          <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                      </div>
                  </div>
              </div>

              <div className={classes.Columns_content}>
                  <div className={classes.Columns_header}>
                      <div className={classes.Columns_title}>
                          Title
                          <div> 3</div>
                      </div>
                      <div className={classes.squareBtn}>
                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </div>
                  </div>
                  <div className={classes.Cards}>

                      <div className={classes.Cards_content + " " + classes.newCard}>
                          <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                      </div>
                  </div>
              </div>

              <div className={classes.Columns_content}>
                  <div className={classes.Columns_header + " " + classes.newColumn}>
                      <div className={classes.circleBtn}>
                          <span>+</span>
                          {/*<i className="fa fa-plus" aria-hidden="true"></i>*/}
                      </div>
                  </div>
              </div>

              <div className={classes.Columns_clear}/>
          </div>
        );
    }

    render() {
        console.log("render() ", this.props);

        return (
          // проверка на существование данных boards
          // если их нет, то отображать заглушку
          /*!this.props.boardsById.loading
            ? (
              <Fragment>
                  {/!*<TransitionGroup className="orders-list">*!/}
                  {this.renderColumns()}
                  {/!*</TransitionGroup> *!/}
              </Fragment>
            )
            : (
              //TODO: сделать спиннер вместо этого
              <h4>данные не получены</h4>
            )*/
          this.renderColumnsList()

        );
    };
}
ColumnsList.propTypes = {
};
const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
  {}
)(ColumnsList);
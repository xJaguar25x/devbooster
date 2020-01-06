import React, {Component, Fragment} from 'react';
import classes from './Project.module.scss';
import {deleteBoard, editBoardTitle, getAll} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Link, Switch, Route} from "react-router-dom";
import {BoardsList, CardPopup, ColumnsList, MembersList, ProjectsList} from "../index";


class Project extends Component {

    componentDidMount() {
        this.props.getAll();
    }

    render() {
        console.log("render() ", this.props);

        return(
          this.renderProject()
        )
       /* return (
          // проверка на существование данных boards
          // если их нет, то отображать заглушку
          !this.props.boardsById.loading
            ? (
              <Fragment>
                  {/!*<TransitionGroup className="orders-list">*!/}
                  {this.renderProject()}
                  {/!*</TransitionGroup> *!/}
              </Fragment>
            )
            : (
              //TODO: сделать спиннер вместо этого
              <h4>данные не получены</h4>
            )

        );*/
    };

    renderProject() {

        // console.log(this.props);

        return (
          <div className={classes.Project}>

              <div className={classes.left_side}>
                  <div className={classes.Wrapper + " " + classes.left}>
                      <div className={classes.left_block}>
                          <div className={classes.left_Name}>
                              <div>
                                  <Link to="/">Devbooster</Link>
                              </div>
                              <div>{this.props.projectId}</div>
                          </div>

                          <ProjectsList/>

                          <BoardsList projectId={this.props.projectId}/>

                          <MembersList/>
                      </div>
                  </div>
              </div>
              <div className={classes.right_side}>
                  <div className={classes.Wrapper + " " + classes.right}>
                      <div className={classes.right_block}>

                          <div className={classes.menu}>
                              <div className={classes.menu_left}>
                                  <a href="#"
                                     className={classes.menu_inner + " " + classes.menu_inner__checked}>Cards</a>
                                  <a href="#" className={classes.menu_inner}>Reports</a>
                              </div>
                              <div className={classes.menu_right}>
                                  <div>UserName</div>
                                  <div className={classes.menu_right + " " + classes.avatar}>ava</div>
                              </div>
                          </div>

                          {/*<Switch>*/}
                          <Route  path="/p:projectId/b:boardId" component={ColumnsList}/>
                          <Route  path="/p:projectId/b:boardId/c:cardId" component={CardPopup}/>
                          {/*</Switch>*/}
                      </div>
                  </div>

              </div>
          </div>
        );
    }
}

Project.propTypes = {
    // deleteBoard: PropTypes.func.isRequired,
    // editBoardTitle: PropTypes.func.isRequired,
    boardsById: PropTypes.object.isRequired,
    cardsById: PropTypes.object.isRequired,
    columnsById: PropTypes.object.isRequired,
    getAll: PropTypes.func.isRequired,
    projectId: PropTypes.string.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
    boardsById: state.boardsById,
    cardsById: state.cardsById,
    columnsById: state.columnsById,
    projectId: ownProps.match.params.projectId
});

export default connect(
  mapStateToProps,
  {getAll}
)(Project);
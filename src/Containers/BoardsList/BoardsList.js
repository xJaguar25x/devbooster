import React, {Component}  from 'react';
import classes from './BoardsList.module.scss';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";


class BoardsList extends Component{
    componentDidMount() {
        // this.props.getAll();
    }

    render(){
        const boards = Object.values(this.props.boardsById.boards);
        console.log("BoardsList ", this.props);

        return(
          <div className={classes.left_Boards}>

              <div className={classes.left_Boards_header}>
                  <div>
                      Boards
                      <div className={classes.grayText}> ({boards.length})</div>
                  </div>
                  <div className={classes.squareBtn}>+</div>
              </div>

              <div className={classes.left_Boards_content}>

                  {boards.map(board => (
                    <div className={classes.Boards_content_inner}>
                        <NavLink
                          to={`/p${this.props.projectId}/b${board._id}/`}
                          className={classes.Link}
                          activeClassName={classes.whiteText}
                        >
                            {board.title}
                        </NavLink>
                        <div><i className="fa fa-bell-o" aria-hidden="true"></i></div>
                    </div>
                  ))}

              </div>
          </div>

        );
    }
}

BoardsList.propTypes = {
    // deleteBoard: PropTypes.func.isRequired,
    // editBoardTitle: PropTypes.func.isRequired,
    boardsById: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    boardsById: state.boardsById
});

export default connect(
  mapStateToProps,
  {}
)(BoardsList);
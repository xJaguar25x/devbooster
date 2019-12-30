// ProjectsList
import React, {Component} from 'react';
import classes from './ProjectsList.module.scss';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";


class ProjectsList extends Component {
    componentDidMount() {
        // this.props.getAll();
    }

    state = {
        projects: ["Dev", "Design"]
    };

    render() {
        // const boards = Object.values(this.props.boardsById.boards);
        // console.log("ProjectsList ", this.props);

        return (
          <div className={classes.left_Projects}>

              <div className={classes.left_Projects_header}>
                  <div>
                      Projects
                      <div className={classes.grayText}> ({this.state.projects.length})</div>
                  </div>
                  <div className={classes.squareBtn}>+</div>
              </div>

              <div className={classes.left_Projects_content}>

                  <div className={classes.Projects_content_inner}>
                      <NavLink
                        to={`/p${this.state.projects[0]}/`}
                        className={classes.Link}
                        activeClassName={classes.whiteText}
                      >
                          {this.state.projects[0]}
                      </NavLink>
                  </div>
                  <div className={classes.Projects_content_inner}>
                      <NavLink
                        to={`/p${this.state.projects[1]}/`}
                        className={classes.Link}
                        activeClassName={classes.whiteText}
                      >
                          {this.state.projects[1]}
                      </NavLink>
                  </div>

              </div>
          </div>

        );
    }
}

ProjectsList.propTypes = {};
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(ProjectsList);
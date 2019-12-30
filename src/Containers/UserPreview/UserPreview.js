import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import classes from './UserPreview.module.scss';
import {connect} from "react-redux";
import {getUserInfo, logOut} from "../../store/actions/authorizationActions";


class UserPreview extends Component {
    state = {
        isLoggedIn: false
    };

    componentDidMount() {
        this.props.getUserInfo();
    }

    isLoggedIn() {
        return this.props.user.username !== undefined;
    }

    render() {
        return this.isLoggedIn() ? (
            <div className={classes.Wrapper}>
                <div
                    className={classes.UserInfoWrapper}
                >
                    <Link to={`/register`}
                          className={classes.Link}
                    >
                        <p
                            className={classes.Username}
                        >
                            {this.props.user.username}
                        </p>
                    </Link>
                    <p
                        className={classes.FullName}
                    >
                        {this.props.user.full_name}
                    </p>
                </div>
            </div>
        ) :
            (
                <Link
                    to={`/register`}
                    className={classes.Link}
                >Log In</Link>
            )
    }
}

const mapStateToProps = state => ({
    user: state.userInfo
});
export default connect(
    mapStateToProps,
    {getUserInfo, logOut}
)(UserPreview);
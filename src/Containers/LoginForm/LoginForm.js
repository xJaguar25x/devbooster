import React, {Component} from "react";
import classes from "./LoginFrom.module.scss";
import {ClickOutsideWrapper} from "../../hoc/index";
import {Button, LabeledInput} from "../../components/index";
import {postUser, loginUser, logOut, getUserInfo } from "../../store/actions/authorizationActions";
import FormTypeTitle from "../../components/FormTypeTitle/FormTypeTitle";
import {connect} from "react-redux";

class LoginForm extends Component {
    state = {
        formIsOpen: true,
        login: '',
        pwd: '',
        fullName: '',
        username: '',
        email: '',
        formType: 'Login'
    };

    componentDidMount() {
        this.props.getUserInfo();
    }

    // показать/скрыть форму
    toggleCardComposer = () => {
        this.setState({formIsOpen: !this.state.formIsOpen});
    };
    // подтвердить отправку формы
    handleLoginSubmit = event => {
        event.preventDefault();
        console.log('Login Submit');
        if (this.state.formType === "Register") {
            this.registerUser();
        }

        else if (this.state.formType === "Login") {
            this.authorizeUser();
        }

    };

    registerUser = () => {
        const {email, fullName, pwd, username} = this.state;
        if (email === "" || pwd === "" || username === "") return;
        const register_data = {
            username: username,
            full_name: fullName,
            email: email,
            pwd: pwd
        };
        postUser(register_data);
    };

    authorizeUser = () => {
        const {login, pwd} = this.state;
        if (login === "" || pwd === "") return;
        const login_data = {
            login: login,
            pwd: pwd
        };
        this.props.loginUser(login_data);
    };

    // при нажатии Enter вызвать обработчик отправки формы
    handleKeyDown = (event) => {
        // при нажатии Enter
        if (event.keyCode === 13) {
            this.handleLoginSubmit(event);
        }
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    };

    handleLogout = (event) => {
        event.preventDefault();
        this.props.logOut();
    };


    setRegistrationType = () => {
        this.setState({formType: 'Register'});
    };

    setLoginType = () => {
        this.setState({formType: 'Login'});
    };

    isLogin = () => {
        return this.state.formType === 'Login';
    };

    isRegistration = () => {
        return this.state.formType === 'Register';
    };

    closeLoginForm = () => {
        this.setState({formIsOpen: false});
    };


    render() {
        const {
            email,
            username,
            fullName,
            login,
            pwd,
            formIsOpen,
            formType,
        } = this.state;
        console.log(this.state);


        return formIsOpen && (
                    <div className={classes.FormWrapper}>
                        <p>You are now logged as {this.props.user.username}</p>
                        <div className={classes.ButtonWrapper}>
                            <FormTypeTitle
                                title={'Login'}
                                isActive={this.isLogin()}
                                onClick={this.setLoginType}
                            />
                            <FormTypeTitle
                                title={'Sign Up'}
                                isActive={this.isRegistration()}
                                onClick={this.setRegistrationType}
                            />
                        </div>
                        {formType === 'Login' && (
                                <div className={classes.FieldWrapper}>
                                    <form
                                        onSubmit={this.handleSubmitCard}
                                    >
                                        <LabeledInput
                                            autoFocus
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}
                                            name={'login'}
                                            value={login}
                                            title={'Username or E-mail'}
                                        />
                                        <LabeledInput
                                            autoFocus
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}
                                            name={'pwd'}
                                            value={pwd}
                                            title={'Password'}
                                        />
                                        <Button
                                            className="LoginFormTextarea"
                                            type="submit"
                                            onClick={this.handleLoginSubmit}
                                        >
                                            {"Log in"}
                                        </Button>
                                        <Button
                                            className="LoginFormTextarea"
                                            type="submit"
                                            onClick={this.handleLogout}
                                        >
                                            {"Log out"}
                                        </Button>
                                    </form>
                                </div>
                        )}
                        {formType === 'Register'  && (
                                <div className={classes.FieldWrapper}>
                                    <form
                                        onSubmit={this.handleSubmitCard}
                                    >
                                        <LabeledInput
                                            autoFocus
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}
                                            name={'email'}
                                            value={email}
                                            title={'E-mail'}
                                        />
                                        <LabeledInput
                                            autoFocus
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}
                                            name={'username'}
                                            value={username}
                                            title={'Username'}
                                        />
                                        <LabeledInput
                                            autoFocus
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}
                                            name={'fullName'}
                                            value={fullName}
                                            title={'Your full name'}
                                        />
                                        <LabeledInput
                                            autoFocus
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}
                                            name={'pwd'}
                                            value={pwd}
                                            title={'Password'}
                                        />
                                        <Button
                                            className={"LoginFormButton"}
                                            type="submit"
                                            disabled={pwd === "" || email === "" || username === ""}
                                            onClick={this.handleLoginSubmit}
                                        >
                                            {"Sign Up"}
                                        </Button>
                                    </form>
                                </div>
                        )}
                    </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userInfo
});
export default connect(
    mapStateToProps,
    {loginUser, getUserInfo, logOut}
)(LoginForm);
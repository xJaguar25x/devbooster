import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import classes from './Home.module.scss';
import {Button, Textarea} from "../../components";
import DeleteIcon from '@material-ui/icons/Delete';

import {addBoard, deleteBoard, editBoardTitle, getBoards} from '../../store/actions/itemActions';
import PropTypes from 'prop-types';


const StyledLink = styled(Link)`
text-decoration: none;
color: black;
  &:hover,
  &:focus,
  &:active {
    opacity: 0.85;
  }
`;

const StyledForm = styled.form`
  margin: 12px 0 0 0;
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 400px;
  color: rgb(46, 68, 78);
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(0,0,0,0.1);
  border: none;
  padding: 8px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: inherit;
  outline: none;
  resize: none;
  font-size: 16px;
  margin-right: 12px;

  &:hover,
  &:focus,
  &:active {
    box-shadow: inset 0 0 0 2px rgba(0,0,0,0.3);
  }
`;

class Home extends Component {

    state = {
        isBoardTitleInEdit: false,
        newBoardTitle: ''
    };

    componentDidMount() {
        this.props.getBoards();
        // console.log(this.props);
    }

    /* ~~~~~~~~~~~~~~~~~~ Обработчики событий UI ~~~~~~~~~~~~~~~~~~~~~~*/
    //~~~~ Обработчик нажатия кнопки редактировать заголовок ColumnTitleButton ~~~~
    openTitleEditor = (board) => {
        this.setState({
            isBoardTitleInEdit: true,
            newBoardTitle: board.title
        });
    };
    handleColumnTitleEditorChange = (event) => {
        this.setState({newBoardTitle: event.target.value});
    };
    handleColumnTitleKeyDown = (event, board) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleSubmitColumnTitle(board);
        }
    };
    handleSubmitColumnTitle = (board) => {
        const {newBoardTitle} = this.state;
        // const {column, boardId, dispatch} = this.props;
        // const {column} = this.props;
        // console.log("column =", column);
        if (newBoardTitle === board.title) {
            this.setState({
                isBoardTitleInEdit: false
            });
        }
        else {
            // dispatch(editListTitle(newBoardTitle, list._id, boardId));
            this.changeBoard(newBoardTitle, board);
            console.log("id =", board._id);
            this.setState({
                isBoardTitleInEdit: false,
                newBoardTitle: ""
            });
        }
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /* ~~~~~~~~~~~~~~~~~~ Обработчики событий UI ~~~~~~~~~~~~~~~~~~~~~~*/
    handleTitleChange = (event) => {
        this.setState({newBoardTitle: event.target.value});
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~ Методы обработки state ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // обработчик изменения в состоянии columns
    changeBoard = (value, board) => {
        //используя общее состояние Redux
        const newBoard = {...board, title: value, column_ids: [...board.column_ids]};
        this.props.editBoardTitle(newBoard);
    };
    addBoard = (boardTitle, event) => {
        event.preventDefault();
        this.setState({newBoardTitle: ''});
        // const {dispatch} = this.props;
        // dispatch(addBoard(boardTitle));
        this.props.addBoard(boardTitle);
    };
    deleteBoard = boardId => {
        // const {dispatch} = this.props;
        // dispatch(deleteBoard(boardId));
        this.props.deleteBoard(boardId);
    };

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    render() {
        const {boards} = this.props;
        const {
            isBoardTitleInEdit,
            newBoardTitle
        } = this.state;
        // const {boards} = this.state;
        console.log(this.props);
        // console.log("boards", boards);
        return (
          <div className={classes.Home}>
              {/*<Helmet>*/}
              {/*<title>juggle & drop</title>*/}
              {/*</Helmet>*/}
              <div className={classes.HomeTitle}>Pick a board...</div>
              <div className={classes.HomeList}>
                  {boards.map(board => (
                    <div className={classes.HomeRow} key={`row-${board._id}`}>
                        {/*{isBoardTitleInEdit ? (
                          <div className={classes.ColumnTitleTextareaWrapper}>
                    <Textarea
                      className="ColumnTitleTextarea"
                      autoFocus
                      // useCacheForDOMMeasurements
                      value={newBoardTitle}
                      onChange={this.handleColumnTitleEditorChange}
                      onKeyDown={(event) => this.handleColumnTitleKeyDown(event, board)}
                      onBlur={this.handleSubmitColumnTitle}
                    />
                          </div>
                        ) : (
                          <div className={classes.ColumnTitle}>
                              <Button
                                className="ListTitleButton"
                                onFocus={() => this.openTitleEditor(board)}
                                onClick={() => this.openTitleEditor(board)}
                              >
                                  {board.title}
                              </Button>
                              <Button
                                className="DeleteCardButton"
                                onClick={this.handleDeleteColumn}
                              >
                                  <DeleteIcon/>
                              </Button>
                          </div>
                        )}*/}

                        <StyledLink
                          to={`board/${board._id}`}
                        >
                            {board.title}
                        </StyledLink>
                        <Button
                          className={"DeleteBoardButton"}
                          onClick={() => this.deleteBoard(board._id)}
                        >
                            <DeleteIcon/>
                        </Button>
                    </div>
                  ))}
                  <StyledForm onSubmit={(e) => this.addBoard(newBoardTitle, e)}>
                      <StyledInput
                        value={newBoardTitle}
                        onChange={this.handleTitleChange}
                        placeholder="Add a new board"
                      />
                      <Button
                        className={"ColumnTitleButton", "Add"}
                        type="submit"
                        value="Submit"
                        disabled={!newBoardTitle}
                      >
                          Add
                      </Button>
                  </StyledForm>
              </div>
          </div>
        );
    };
}

Home.propTypes = {
    getBoards: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    addBoard: PropTypes.func.isRequired,
    editBoardTitle: PropTypes.func.isRequired,
    boards: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    // boards: Object.values(state.boardsById)
    boards: Object.values(state.boards)
});

export default connect(
  mapStateToProps,
  {getBoards, deleteBoard, addBoard, editBoardTitle}
)(Home);

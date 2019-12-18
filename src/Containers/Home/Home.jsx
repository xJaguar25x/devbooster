import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import classes from './Home.module.scss';
import {Button, Textarea} from "../../components";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {
    deleteBoard,
    editBoardTitle,
    getAll,
} from '../../store/actions/itemActions';
import PropTypes from 'prop-types';
import {Form} from "../index";


const StyledLink = styled(Link)`
text-decoration: none;
color: black;
  &:hover,
  &:focus,
  &:active {
    opacity: 0.85;
  }
`;

/*const StyledForm = styled.form`
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
`;*/

class Home extends Component {

    state = {
        boardInEdit: null,
        editableBoardTitle: "",
    };

    componentDidMount() {
        // this.props.getBoards();
        // this.props.getCards();
        // this.props.getColumns();
        this.props.getAll();
        // console.log(this.props);
    }

    /* ~~~~~~~~~~~~~~~~~~ Обработчики событий UI ~~~~~~~~~~~~~~~~~~~~~~*/
    //~~~~ Обработчик нажатия кнопки редактировать заголовок ColumnTitleButton ~~~~
    openTitleEditor = (board) => {
        // console.log("board =", board);
        this.setState({
            boardInEdit: board._id,
            editableBoardTitle: board.title
        });
    };
    handleColumnTitleEditorChange = (event) => {
        this.setState({editableBoardTitle: event.target.value});
    };
    handleColumnTitleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.handleSubmitColumnTitle();
        }
    };
    handleSubmitColumnTitle = () => {
        const {editableBoardTitle, boardInEdit} = this.state;
        // const currentBoard = this.props.boardsById.boards.find(item => item._id === boardInEdit);
        const currentBoard = this.props.boardsById.boards[boardInEdit];
        if (editableBoardTitle === "") {
            // Удалять доску если стерли имя
            this.deleteBoard(currentBoard._id);
        } else if (editableBoardTitle === currentBoard.title) {
            // ничего не делать
        }
        else {
            // Или обновлять ее имя, если введено новое
            const newBoard = {...currentBoard, title: editableBoardTitle};
            this.changeBoard(editableBoardTitle, newBoard);
            console.log("id =", newBoard);
        }
        this.setState({editableBoardTitle: "", boardInEdit: null});
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~ Методы обработки state ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // обработчик изменения в состоянии columns
    changeBoard = (value, board) => {
        //используя общее состояние Redux
        // console.log("id =", typeof(board.column_ids));
        const newBoard = {...board, title: value};
        this.props.editBoardTitle(newBoard);
    };
    deleteBoard = boardId => {
        // const {dispatch} = this.props;
        // dispatch(deleteBoard(boardId));
        this.props.deleteBoard(boardId);
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    render() {
        console.log("render() ", this.props);

        return (
          // проверка на существование данных boards
          // если их нет, то отображать заглушку
          !this.props.boardsById.loading
            ? (
              <Fragment>
                  {/*<TransitionGroup className="orders-list">*/}
                  {this.renderHome()}
                  {/*</TransitionGroup> */}
              </Fragment>
            )
            : (
              //TODO: сделать спиннер вместо этого
              <h4>данные не получены</h4>
            )

        );
    };

    renderHome() {
        const boards = Object.values(this.props.boardsById.boards);
        // console.log("boards ", boards);

        const {
            boardInEdit,
            editableBoardTitle
        } = this.state;

        // return 1;
        return (
          <div className={classes.Home}>
              {/*<Helmet>*/}
              {/*<title>juggle & drop</title>*/}
              {/*</Helmet>*/}
              <div className={classes.HomeTitle}>Pick a board...</div>
              <div className={classes.HomeList}>
                  {boards.map(board => (
                    <div className={classes.HomeBlockRow} key={`row-${board._id}`}>
                        {boardInEdit === board._id ? (
                          <div className={classes.HomeRow}>
                            <Textarea
                              className="ColumnTitleTextarea"
                              autoFocus
                              // useCacheForDOMMeasurements
                              value={editableBoardTitle}
                              onChange={this.handleColumnTitleEditorChange}
                              onKeyDown={this.handleColumnTitleKeyDown}
                              onBlur={this.handleSubmitColumnTitle}
                            />
                          </div>
                        ) : (
                          <div className={classes.HomeRow}>
                              <StyledLink
                                to={`board/${board._id}`}
                              >
                                  {board.title}
                              </StyledLink>
                              <div className={classes.HomeRow_BtnBlock}>
                                  <Button
                                    className="DeleteCardButton"
                                    onClick={() => this.deleteBoard(board._id)}
                                  >
                                      <DeleteIcon/>
                                  </Button>
                                  <Button
                                    className="EditCardButton"
                                    onClick={() => this.openTitleEditor(board)}
                                  >
                                      <EditIcon/>
                                  </Button>
                              </div>
                          </div>
                        )}

                        {/*<StyledLink
                          to={`board/${board._id}`}
                        >
                            {board.title}
                        </StyledLink>
                        <Button
                          className={"DeleteBoardButton"}
                          onClick={() => this.deleteBoard(board._id)}
                        >
                            <DeleteIcon/>
                        </Button>*/}
                    </div>
                  ))}
                 {/* <StyledForm onSubmit={(e) => this.addBoard(newBoardTitle, e)}>
                      <StyledInput
                        value={newBoardTitle}
                        onChange={this.handleNewTitleChange}
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
                  </StyledForm>*/}
                  <Form
                    classNameWrapper="ColumnComposerWrapper"
                    classNameBtn="ColumnComposerWrapperBtn"
                    board={this.props.board}
                    type="addBoard"
                    btnText="Add new board"
                    btnTextInner="Add board"
                  />
              </div>
          </div>
        );
    }
}

Home.propTypes = {
    deleteBoard: PropTypes.func.isRequired,
    editBoardTitle: PropTypes.func.isRequired,
    boardsById: PropTypes.object.isRequired,
    cardsById: PropTypes.object.isRequired,
    columnsById: PropTypes.object.isRequired,
    getAll: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    boardsById: state.boardsById,
    cardsById: state.cardsById,
    columnsById: state.columnsById
});

export default connect(
  mapStateToProps,
  {deleteBoard, editBoardTitle, getAll}
)(Home);

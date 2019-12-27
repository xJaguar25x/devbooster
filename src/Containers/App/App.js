import React, {Component} from 'react';
import {Board, Home, Versions, Project} from "../index";
import './App.scss';
import {Link, Route} from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
text-decoration: none;
color: white;
  &:hover,
  &:focus,
  &:active {
    opacity: 0.85;
  }
`;
const StyledLink2 = styled(Link)`
text-decoration: underline ;
color: white;
  &:hover,
  &:focus,
  &:active {
    opacity: 0.85;
  }
`;

export default class App extends Component {
    render() {
        return (
          <div className="App">
              <header className="App-header">
                  <Versions/>
                  <div className="Header-menu">
                      <StyledLink2  to={`/project`}>
                          <p>New UI</p>
                      </StyledLink2>
                      <StyledLink  to={`/`}>
                          <p>Devbooster</p>
                      </StyledLink>
                  </div>

              </header>
              <Route exact path="/" component={Home} />
              <Route path="/board/:boardId" component={Board} />
              <Route path="/project" component={Project} />
              {/*<Route exact path="/" component={Board} />*/}
          </div>
        )
    }
};
import React, {Component} from 'react';
import {Board, Home} from "../index";
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

export default class App extends Component {
    render() {
        return (
          <div className="App">
              <header className="App-header">
                  <StyledLink  to={`/`}>
                      <p>Devbooster</p>
                  </StyledLink>
              </header>
              <Route exact path="/" component={Home} />
              <Route path="/board/:boardId" component={Board} />
              {/*<Route exact path="/" component={Board} />*/}
          </div>
        )
    }
};
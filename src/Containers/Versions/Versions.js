import React, {Component} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {getBackendVersion} from "../../store/actions/itemActions";

const StyledDiv = styled.div`
font-size: 13px;
font-weight: bold;
color: black;
display: flex;
flex-flow: row wrap;
justify-content: flex-start;
`;
const StyledInnerDiv = styled.div`
width: 100%;
display: flex;
flex-flow: column wrap;
justify-content: flex-start;
align-items: flex-start;
`;

class Versions extends Component {

    componentDidMount() {
        this.props.getBackendVersion();
    }
    getApiVersion(){
        const APIver = this.props.backendVersion;
        if (APIver === undefined) {return APIver.ver;} else {return "?";}
    }
    render() {

        return (
          <StyledDiv>
              <StyledInnerDiv>
                  ver.= {process.env.REACT_APP_VERSION}
              </StyledInnerDiv>
              <StyledInnerDiv>
                  backend ver.= {this.getApiVersion()}
              </StyledInnerDiv>
          </StyledDiv>
        )
    }
}
const mapStateToProps = state => ({
    backendVersion: Object.values(state.ApiVersion)
});
export default connect(
  mapStateToProps,
  {getBackendVersion}
)(Versions);
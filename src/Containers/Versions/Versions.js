import React, {Component} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {getBackendVersion} from "../../store/actions/itemActions";

const StyledDiv = styled.div`
position: absolute;
bottom: 0;
right: 0;
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

    getApiVersion() {
        const APIver = this.props.backendVersion;
        if (APIver !== undefined) {
            return APIver;
        } else {
            return "?";
        }
    }

    render() {
        // console.log("ver ", this.props);
        return (
          <StyledDiv>
              <StyledInnerDiv>
                  ver.= {process.env.REACT_APP_VERSION || "0.3.2"}
              </StyledInnerDiv>
              <StyledInnerDiv>
                  backend ver.= {this.getApiVersion()}
              </StyledInnerDiv>
          </StyledDiv>
        )
    }
}

const mapStateToProps = state => ({
    backendVersion: state.ApiVersion.ver
});
export default connect(
  mapStateToProps,
  {getBackendVersion}
)(Versions);
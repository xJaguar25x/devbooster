import React, {Component}  from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {Columns} from "../index";


class Projects extends Component{
    render(){
        return(
          <div>
              <h1>Projects list</h1>
              <Link to={`/pDev/`}>project Dev</Link>&nbsp;&nbsp;&nbsp;
              <Link to={`/pDesign/`}>project Design</Link>
          </div>
        );
    }
}
export default Projects;
// Preloader
import React from 'react';
import classes from './Preloader.module.scss';

function Preloader() {

    return (
      <div className={classes.holder}>
          <div className={classes.preloader}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>
    );
}

export default Preloader;
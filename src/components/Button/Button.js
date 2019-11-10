import React, {Component} from 'react';
import classes from './Button.scss';

const Button = props => {
    const cls = [
        classes.Button,
        classes[props.type]
    ];

    return (
      <button
        {...props}
        className={cls.join(' ')}
        disabled={props.disabled}
      >
          {/*{this.props.text}*/}
          {props.children}
      </button>
    );

};
export default Button;
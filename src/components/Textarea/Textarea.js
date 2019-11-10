import React from 'react';
import classes from './Textarea.module.scss';

const Textarea = props => {
    const cls = [
        classes.Textarea,
        classes[props.class]
    ];
    // console.log(cls);

    return (
      <textarea
        {...props}
        className={cls.join(' ')}
        disabled={props.disabled}
      >
          {props.children}
      </textarea>
    );

};
export default Textarea;
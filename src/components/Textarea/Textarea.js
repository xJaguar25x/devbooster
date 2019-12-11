import React from 'react';
import classes from './Textarea.module.scss';

const Textarea = props => {
    const cls = [
        classes.Textarea,
        classes[props.className]
    ];
    // console.log(cls);

    return (
      <textarea
        {...props}
        className={cls.join(' ')}
      >
          {props.children}
      </textarea>
    );

};
export default Textarea;
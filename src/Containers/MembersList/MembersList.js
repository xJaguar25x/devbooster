import React, {Component} from 'react';
import classes from './MembersList.module.scss';


class MembersList extends Component {
    render() {
        return (
          <div className={classes.left_Members}>
              <div className={classes.Members_title}>Members</div>
              <div className={classes.Members_users}>
                  <div className={classes.Members_users_user + " " + classes.avatar}>u1</div>
                  <div className={classes.Members_users_user + " " + classes.avatar}>u2</div>
                  <div className={classes.Members_users_user + " " + classes.avatar}>u3</div>
                  <div className={classes.Members_users_user + " " + classes.avatar}>u4</div>
                  <div className={classes.Members_users_user + " " + classes.avatar}>u5</div>
                  <div className={classes.Members_users_user + " " + classes.avatar}>u6</div>
                  <div className={classes.Members_users_user + " " + classes.circleBtn}>
                      <span>+</span>
                  </div>
              </div>
          </div>
        );
    }
}

export default MembersList;
import React, {Component, Fragment} from 'react';
import classes from './Project.module.scss';


class Project extends Component {
    render() {
        return (
          <div className={classes.Project}>

              <div className={classes.left_side}>
                  <div className={classes.Wrapper + " " + classes.left}>
                      <div className={classes.left_block}>
                          <div className={classes.left_Name}>
                              Name project<br/>Name
                          </div>
                          <div className={classes.left_Boards}>
                              <div className={classes.left_Boards_header}>
                                  <div>
                                      Boards
                                      <div className={classes.grayText}> (5)</div>
                                  </div>
                                  <div className={classes.squareBtn}>+</div>
                              </div>
                              <div className={classes.left_Boards_content}>
                                  <div className={classes.Boards_content_inner}>
                                      <div>Design</div>
                                      <div><i className="fa fa-bell-o" aria-hidden="true"></i></div>
                                  </div>
                                  <div className={classes.Boards_content_inner}>
                                      <div>Backend</div>
                                      <div><i className="fa fa-bell-o" aria-hidden="true"></i></div>
                                  </div>
                                  <div className={classes.Boards_content_inner}>
                                      <div className={classes.grayText}>Finance</div>
                                      <div><i className="fa fa-bell-o" aria-hidden="true"></i></div>
                                  </div>
                                  <div className={classes.Boards_content_inner}>
                                      <div className={classes.grayText}>Frontend</div>
                                      <div><i className="fa fa-bell-o" aria-hidden="true"></i></div>
                                  </div>
                                  <div className={classes.Boards_content_inner}>
                                      <div className={classes.grayText}>Marketing</div>
                                      <div><i className="fa fa-bell-o" aria-hidden="true"></i></div>
                                  </div>
                              </div>
                          </div>
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
                      </div>
                  </div>
              </div>
              <div className={classes.right_side}>
                  <div className={classes.Wrapper + " " + classes.right}>
                      <div className={classes.right_block}>
                          <div className={classes.menu}>
                              <div className={classes.menu_left}>
                                  <a href="#"
                                     className={classes.menu_inner + " " + classes.menu_inner__checked}>Cards</a>
                                  <a href="#" className={classes.menu_inner}>Reports</a>
                              </div>
                              <div className={classes.menu_right}>
                                  <div className={classes.menu_right + " " + classes.avatar}>ava</div>
                              </div>
                          </div>
                          <div className={classes.Columns}>

                              <div className={classes.Columns_content}>
                                  <div className={classes.Columns_header}>
                                      <div className={classes.Columns_title}>
                                          Title
                                          <div> 3</div>
                                      </div>
                                      <div className={classes.squareBtn}>
                                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                      </div>
                                  </div>
                                  <div className={classes.Cards}>

                                      <div className={classes.Cards_content}>
                                          <div className={classes.Cards_header}>
                                              <div>21 dec</div>
                                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                                          </div>
                                          <div className={classes.Cards_title}>
                                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                                              cumque dolor dolorum eum facilis, fugiat in nobis nulla numquam quia
                                              quidem similique tempore, velit veritatis?
                                          </div>
                                          <div className={classes.Cards_groups}>
                                              <div className={classes.groups_item__blue}>Sketching</div>
                                              <div className={classes.groups_item__blue2}>Illustrating</div>
                                              <div className={classes.groups_item__blue3}>3D</div>
                                              <div className={classes.groups_item__blue4}>Low Poly</div>
                                              <div className={classes.groups_item__purple}>Web Design</div>
                                              <div className={classes.groups_item__pink}>Visual</div>
                                              <div className={classes.groups_item__orange}>Matte-painting</div>
                                              <div className={classes.groups_item__gray}>+ 3 more</div>
                                          </div>
                                      </div>

                                      <div className={classes.Cards_content}>
                                          <div className={classes.Cards_header}>
                                              <div>21 dec</div>
                                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                                          </div>
                                          <div className={classes.Cards_title}>Card title</div>
                                          <div className={classes.Cards_groups}>
                                              <div className={classes.groups_item__blue}>Sketching</div>
                                              <div className={classes.groups_item__blue2}>Illustrating</div>
                                              <div className={classes.groups_item__blue4}>Low Poly</div>
                                          </div>
                                      </div>

                                      <div className={classes.Cards_content}>
                                          <div className={classes.Cards_title}>No card title yet</div>
                                      </div>

                                      <div className={classes.Cards_content + " " + classes.newCard}>
                                          <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                                      </div>
                                  </div>
                              </div>

                              <div className={classes.Columns_content}>
                                  <div className={classes.Columns_header}>
                                      <div className={classes.Columns_title}>
                                          Title
                                          <div> 3</div>
                                      </div>
                                      <div className={classes.squareBtn}>
                                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                      </div>
                                  </div>
                                  <div className={classes.Cards}>
                                      <div className={classes.Cards_content}>
                                          <div className={classes.Cards_header}>
                                              <div>21 dec</div>
                                              <div className={classes.Cards_header + " " + classes.avatar}>ava</div>
                                          </div>
                                          <div className={classes.Cards_title}>Card title</div>
                                          <div className={classes.Cards_groups}>
                                              <div className={classes.groups_item__blue}>Sketching</div>
                                              <div className={classes.groups_item__blue2}>Illustrating</div>
                                              <div className={classes.groups_item__blue4}>Low Poly</div>
                                          </div>
                                      </div>

                                      <div className={classes.Cards_content}>
                                          <div className={classes.Cards_title}>No card title yet</div>
                                      </div>

                                      <div className={classes.Cards_content + " " + classes.newCard}>
                                          <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                                      </div>
                                  </div>
                              </div>

                              <div className={classes.Columns_content}>
                                  <div className={classes.Columns_header}>
                                      <div className={classes.Columns_title}>
                                          Title
                                          <div> 3</div>
                                      </div>
                                      <div className={classes.squareBtn}>
                                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                      </div>
                                  </div>
                                  <div className={classes.Cards}>

                                      <div className={classes.Cards_content + " " + classes.newCard}>
                                          <div className={classes.Cards_title + " " + classes.newCard}>Add card</div>
                                      </div>
                                  </div>
                              </div>

                              <div className={classes.Columns_content}>
                                  <div className={classes.Columns_header + " " + classes.newColumn}>
                                      <div className={classes.circleBtn}>
                                          <span>+</span>
                                          {/*<i className="fa fa-plus" aria-hidden="true"></i>*/}
                                      </div>
                                  </div>
                              </div>

                              <div className={classes.Columns_clear}/>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
        );
    }
}

export default Project;
import React, { Component } from 'react';
import {Switch,Route,NavLink} from 'react-router-dom';
import Adminviewguest from './adminviewguest';
import Adminviewsport from './adminviewcourt';
import '../Style/admincreate.css';
import classroom from './user/classview';
import seminar  from './user/seminarview';
import sports from './user/sports';
import guest from './user/guest';

class adminhomepage extends Component {
       
        constructor(){
        super();
        this.state={
            username:''
        };
       }
      
        componentDidMount(){
            const username_=sessionStorage.getItem('username');
            this.setState({username:username_})
        }
        

        render() {
            const {username}=this.state;
        return (
            <div>
                <div class="adminhomepage">
                    <div class="page">
                        <div class="viewslots">
                            <div class="view-slot-header">bookings</div>
                            <hr/>
                            <div class="view-bookings">
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/user">
                                        <div class="slot-font-admin">classroom</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/user/hall">
                                        <div class="slot-font-admin">seminarhall</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/user/guest">
                                        <div class="slot-font-admin">Guest</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/user/sport">
                                        <div class="slot-font-admin">Sports</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/user/hall">
                                        <div class="slot-font-admin">Mess</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/user/hall">
                                        <div class="slot-font-admin">Hostel</div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div class="bookslots">
                            <div class="book-slot-header">Details</div>
                            <hr/> 
                            <div class="slot-page">
                                
                                <React.Fragment>
                                    <Switch>
                                        <Route exact path="/user" component={classroom}/>
                                        <Route path="/user/guest" component={guest}/>
                                        <Route path="/user/hall" component={seminar}/>
                                        <Route path="/user/sport" component={sports}/>
                                    </Switch>
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="circle circle1"></div>
                <div class="circle circle2"></div>
                <div class="circle circle3"></div>
                <div class="circle circle4"></div>
                <div class="circle circle5"></div>
                <div class="circle circle6"></div>
                <div class="circle circle7"></div>
            </div>
        )
    }
}

export default adminhomepage

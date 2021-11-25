import React, { Component } from 'react';
import {Switch,Route,NavLink} from 'react-router-dom';
import adminviewclass from './adminviewclass';
import Adminviewguest from './adminviewguest';
import Adminviewhall from './adminviewhall';
import Adminviewsport from './adminviewcourt';
import '../Style/adminhomepage.css';
import react from 'react';


class adminhomepage extends Component {
    render() {
        return (
            <div>
                <div class="adminhomepage">
                    <div class="page">
                        <div class="viewslots">
                            <div class="view-slot-header">Bookings</div>
                            <hr/>
                            <div class="view-bookings">
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/admin">
                                        <div class="slot-font-admin">classroon</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/admin/hall">
                                        <div class="slot-font-admin">seminarhall</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/admin/guest">
                                        <div class="slot-font-admin">Guest</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/admin/sport">
                                        <div class="slot-font-admin">Sports</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/admin/hall">
                                        <div class="slot-font-admin">Mess</div>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName="active-class" className="slot-admin" to="/admin/hall">
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
                                        <Route exact path="/admin" component={adminviewclass}/>
                                        <Route path="/admin/guest" component={Adminviewguest}/>
                                        <Route path="/admin/hall" component={Adminviewhall}/>
                                        <Route path="/admin/sport" component={Adminviewsport}/>
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

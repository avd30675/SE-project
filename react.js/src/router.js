import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Enter from './components/Enter';
import admin from './components/adminhomepage';

//-------------------------------------------------------------------------------------------



import user from './components/userhomepage';


import Userclassbookings from './components/user/view_details/Userclassbookings';
import Userbookingsclass from './components/user/userbookings.js/Userbookingsclass';

import Userbookinghall from './components/user/userbookings.js/Userbookinghall';
import Singlehall from './components/user/view_details/Singlehall';

import Singleguest from './components/user/view_details/Singleguest';
import Userbookingguest from './components/user/userbookings.js/Userbookingguest';

import Singlesports from './components/user/view_details/Singlesports';
import Userbookingsports from './components/user/userbookings.js/Userbookingsports';

const router =()=>{
    return(
        <BrowserRouter>
            <Route exact path='/' component={Enter} /> 


            <Route path='/user' component={user} />



            <Route path='/userclassbook' component={Userclassbookings} />
            <Route path='/userclassbookings' component={Userbookingsclass} />

            <Route path='/singlehall' component={Singlehall}/>
            <Route path='/userhallbooking' component={Userbookinghall} />

            <Route path='/singleguest' component={Singleguest} />
            <Route path='/usergestbooking' component={Userbookingguest} />

            <Route path='/singlesports' component={Singlesports}/>
            <Route path='/usersportsbooking' component={Userbookingsports}/>
            
   
        
        </BrowserRouter>
    )
}
export default router;
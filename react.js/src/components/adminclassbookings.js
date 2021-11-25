import React, { Component } from 'react';
import '../Style/adminclassbookings.css';
import queryString from 'query-string';
import axios from 'axios';

export class adminclassbookings extends Component {
    constructor(){
        super();
        this.state={
           bookings:[],
           blockNo:null,
           roomNo:null
        }
    }
    componentDidMount(){
        const queryParams = queryString.parse(this.props.location.search);
        const block=queryParams.block;
        const room=queryParams.room;
        this.setState({blockNo:block,roomNo:room});
        const obj={
            block:block,
            room:room
        }
        axios({
            method :'POST',
            url : 'http://localhost:9000/adminviewbooking/classroom',
            headers :{'Content-Type':'application/json'},
            data:obj
        }).then(response =>{this.setState({bookings: response.data.login[0].bookings});
            console.log(response);})
        .catch(err => console.log(err))
    }
    render() {
        const{bookings,roomNo,blockNo}=this.state;
        return (
            <div>
               <div class="adminbookpage">
                    <div class="bookpage">
                        <div class="booking-header">
                            <span class="booking-header-block">Block: {blockNo}</span>
                            <span class="booking-header-room">Room: {roomNo}</span>
                        </div>
                        <hr></hr>
                        <div class="booked-slot-list">
                            {bookings.map((item)=>{
                                return <div class="booked-slot-list-slots">
                                            <span class="booked-slot-list-items">Bookedby: {item.user_name}</span>
                                            <span class="booked-slot-list-items">From: {item.start}</span>
                                            <span class="booked-slot-list-items">To: {item.end}</span>
                                            <span class="admin-button">Delete</span>
                                        </div>
                            })}
                                
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

export default adminclassbookings;

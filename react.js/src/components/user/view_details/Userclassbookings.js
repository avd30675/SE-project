import React, { useState } from 'react';
import queryString from 'query-string';
import '../../../Style/adminclassbookings.css';
import axios from 'axios';
import Modal from 'react-modal'


const createStyles = {
    overlay:{
        'background-color': 'rgba(0, 0, 0, 0.6)',
        'z-index':'3'
    },
    content : {
        width: '350px',
        height: '420px',
        background:'linear-gradient(to right bottom,rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.4))',
        'backdrop-filter':'blur(2rem)',
        'border-radius':'3rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
       ' box-shadow' : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        'box-sizing': 'border-box',
        padding:' 0 40px',
        border:'none',
        outline:'none',
        
    }
  };

export default function  Userclassbookings (props) {

    const [c_bookings,setbook]=useState([]);
    const [room,setroom]=useState(null);
    const [block_no,setblockno]=useState(null);
    const [bookopen,setbopen]=useState(false);
    const [start_d,setstart]=useState(null);
    const [end_d,setend]=useState(null);
    const [username,setuser]=useState('');
    const [classroom_id,setclassroom]=useState(null);
    

    
    React.useEffect(() => {
      
      const queryParams = queryString.parse(props.location.search);
      const r_id=queryParams.id;
      setclassroom(r_id);

      const username_=sessionStorage.getItem('username');
      setuser(username_);
      
    axios({
            method :'GET',
            url : 'http://localhost:9000/userget/classroom/'+r_id,
            headers :{'Content-Type':'application/json'}
        }).then(response =>{

            setroom( response.data.login.room);
            setblockno(response.data.login.room.block);
            setbook(response.data.login.bookings);
            console.log(response.data.login.bookings);

        }).catch(err => console.log(err))
  }, []);
  
  
      //handle newbookings
    const opennewbooking=()=>{
          setbopen(true);
      }
     const closenewbooking=()=>{
          setbopen(false);
      }
      
    const handlecreatechange=(event,field)=>{

        if(field=='start'){
              setstart(event.target.value);
              console.log(event.target.value);
        }
        else if(field=='end'){
               setend(event.target.value);
        }
        else {
            setuser(event.target.value);
        }

    }

    const handleuserbookings=()=>{

         props.history.push(`/userclassbookings/?user=${username}&room=${classroom_id}`);
         
    }

    const handlecreatesubmit=(event)=>{

        const obj={
            classroom:classroom_id,
            start:start_d,
            end:end_d,
            user:username
        }
        console.log(obj);
        axios({
            method :'post',
            url : 'http://localhost:9000/userget/classroom/booking',
            headers :{'content-type':'application/json'},
            data: obj
        }).then(response=>{
            if(response.data.result==1){
                alert('book created');
                event.preventDefault();
                setbopen(false);
                setstart(null);
                setend(null);
                setuser(null);

            }
            else{
                alert('not possible to book');
                event.preventDefault();
                setbopen(false);
                setstart(null);
                setend(null);
                setuser(null);

            }
        }).catch();
        window.location.reload ()
    }


      //--------------------------------------------------------------------------------------------------------------------------
        return (
            <div>
               <div class="adminbookpage">
                    <div class="bookpage">
                        <div class="booking-header">
                            <span class="booking-header-block">room:{room}</span>
                            <span class="booking-header-room">block:{1}</span>
                        </div>
                        <hr></hr>
                        <div class="admin-create">
                        <span class="admin-button sub-admin-create" onClick={opennewbooking}>create</span>
                         </div>
                         <div class="admin-create">
                        <span class="admin-button sub-admin-create" onClick={()=>handleuserbookings()} >my bookings</span>
                         </div>
                        <div class="booked-slot-list">
                            {c_bookings.map((item)=>{
                                //convert(item.start,item.end);
                                return <div class="booked-slot-list-slots">
                                            <span class="booked-slot-list-items">Bookedby: {item.user_name}</span>
                                            <span class="booked-slot-list-items">date: {item.start.slice(0,10)}</span>
                                            <span class="booked-slot-list-items">From: {item.start.slice(11,19)} </span>
                                            <span class="booked-slot-list-items">To: {item.end.slice(11,19)}</span>
                                        </div>

                            })}

                            <Modal
                              isOpen={bookopen}
                              style={createStyles}
                              onRequestClose={closenewbooking}
                             >
                            <div className="create-main">
                                <div className="create-class">Create</div>
                                <div className="contain">
                                    <input type="datetime-local" id="blockno-class" placeholder="Start Date" onChange={(event)=>handlecreatechange(event,'start')}/>
                                    <input type="datetime-local" id="blockno-class" placeholder="end Date" onChange={(event)=>handlecreatechange(event,'end')}></input>

                                </div>
                                <div className="submit">
                                    <input type="button" id ="submit" value="create" onClick={(event)=>handlecreatesubmit(event)} />
                                </div>
                                
                            </div>   
                    </Modal>
                                
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
        );
    
}


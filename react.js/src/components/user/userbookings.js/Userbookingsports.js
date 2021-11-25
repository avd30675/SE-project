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
export default function  Userbookingsports (props) {

      
      const [user,setuser]=useState('');
      const [court,setroom]=useState('');
      const [c_bookings,setbook]=useState([]);
      const [updateopen,setopen]=useState(false);
      const [start,setstart]=useState(null);
      const [end,setend]=useState(null);
      const [book,setbook_]=useState(null);

      React.useEffect(() => {
         const queryParams = queryString.parse(props.location.search); 

         const r_id=queryParams.court;
         const u=queryParams.user;
         console.log(r_id,u);
         setroom(r_id);
         setuser(u); 

         const obj={
             court:r_id,
             user:u
        }
        console.log(obj);
         axios({
            method :'post',
            url : 'http://localhost:9000/userget/sports/booking/userbookings',
            headers :{'Content-Type':'application/json'},
            data:obj
        }).then(response =>{
            if(response.data.login[0]!="")
                setbook(response.data.login);

        }).catch(err => console.log(err))
      
      }, [])

    const handeldelete=(book_,room_)=>{
          if(window.confirm('Are you sure you want to delete')){
              const obj={
                  sports:room_,
                  book:book_
              }
              axios({
                  method:'POST',
                  url:'http://localhost:9000/userget/sports/bookings_delete',
                  header:{'Content-Type':'application/json'},
                  data:obj
              }).then(response=>{
                  if(response.data.deletion){
                    alert("successfully deleted");
                }else{
                    alert("some error occured");
                }
              }).catch(err => console.log(err));

              window.location.reload();
          }
      }
    const handelupdateopen=(start_,end_,book_)=>{
        setstart(start_);
        setbook_(book_);
        setend(end);
        
          setopen(true);
    }
    const closeupdate=()=>{
        setopen(false);
    }  

    const handlecreatechange=(event ,field)=>{
        if(field=='start'){
            setstart(event.target.value);
        }
        else{
            setend(event.target.value)
        }
    }

    const handleupdate=(event)=>{
        const obj={
            class:court,
            book:book,
            start:start,
            end:end
        }
        
        axios({
            method :'post',
            url : 'http://localhost:9000/userget/classroom/booking_update',
            headers :{'content-type':'application/json'},
            data: obj
        }).then(response=>{
            if(response.data.result==1){
                alert('book updated');
                event.preventDefault();
                setopen(false);
                setstart(null);
                setend(null);
                setbook_(null);

            }
            else{
                alert('not possible to update');
                event.preventDefault();
                setopen(false);
                setstart(null);
                setend(null);
                setbook_(null);
            }
        }).catch();
        window.location.reload ()

    }

      return (
            <div>
               <div class="adminbookpage">
                    <div class="bookpage">
                        
                        <div class="booking-header">
                            <span class="booking-header-block">{user}</span>
                        </div>
                        <div class="booked-slot-list">
                            {c_bookings.map((item)=>{
                                //convert(item.start,item.end);
                                return <div class="booked-slot-list-slots">
                                            <span class="booked-slot-list-items">date: {item.start.slice(0,10)}</span>
                                            <br/>
                                            <span class="booked-slot-list-items">From: {item.start.slice(11,19)} </span>
                                            <span class="booked-slot-list-items">To: {item.end.slice(11,19)}</span>
                                            <div class="admin-create">
                                               <span class="admin-button sub-admin-create" onClick={()=>handeldelete(item._id,court)}>delete</span>
                                               <span class="admin-button sub-admin-create" onClick={()=>handelupdateopen(item.start,item.end,item._id)}>update</span>
                                            </div>
                                        </div>

                            })}
                          
                            <Modal
                              isOpen={updateopen}
                              style={createStyles}
                              onRequestClose={closeupdate}
                             >

                               <div className="create-class">Update</div>
                                <div className="contain">
                                    <input type="datetime-local" id="blockno-class" placeholder={start} onChange={(event)=>handlecreatechange(event,'start')}/>
                                    <input type="datetime-local" id="blockno-class" placeholder={end} onChange={(event)=>handlecreatechange(event,'end')}></input>

                                </div>
                                <div className="submit">
                                    <input type="button" id ="submit" value="create" onClick={(event)=>handleupdate(event)} />
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
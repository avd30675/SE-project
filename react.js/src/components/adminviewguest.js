import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import '../Style/adminviewclass.css';
import axios from 'axios';
import '../Style/admincreate.css';
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

export class adminviewguest extends Component {
    constructor(){
        super();
        this.state={
            guest:[],
            Iscreateopen:false,
            roomno:null,
            capacity:null
        }
    }
    componentDidMount(){
        axios({
            method :'GET',
            url : 'http://localhost:9000/adminget/guest',
            headers :{'Content-Type':'application/json'}
        }).then(response =>{this.setState({guest: response.data.login});
            console.log(response);})
        .catch(err => console.log(err))
    }
    handlecreateopen=()=>{
        this.setState({Iscreateopen:true})
    }
    closecreate=()=>{
        this.setState({Iscreateopen:false})
    }
    handledelete=(id)=>{
        if(window.confirm('Are you sure you want to delete')){
            const obj={
                id:id
            }
            axios({
                method :'POST',
                url : 'http://localhost:9000/admindel/guest',
                headers :{'Content-Type':'application/json'},
                data:obj
            }).then(response =>{
                if(response.data.deletion){
                    alert("successfully deleted");
                }else{
                    alert("some error occured");
                }
                
            })
            
            .catch(err => console.log(err))
            window.location.reload ()
        }
        
    }
    render() {
        const{guest,Iscreateopen}=this.state;
        return (
            <div>
                <div class="admin-classroom">
                    <div class="admin-create">
                        <span class="admin-button sub-admin-create" onClick={this.handlecreateopen}>create</span>
                    </div>
                    <div class="scroll">
                        {guest.map((item)=>{
                            return <div class="admin-class-items">
                                        <div class="admin-class-sub-items">
                                            <span class="admin-obj-font admin-item-block">Room No:{item.room}</span>
                                            <span class="admin-obj-font admin-item-block">capacity:{item.capacity}</span>
                                        </div>
                                        <div class="admin-class-sub-items">
                                            <span class="admin-item-block admin-button ">Update</span>
                                            <span class="admin-item-block admin-button " onClick={()=>this.handledelete(item._id)}>Delete</span>
                                            <span class="admin-item-block admin-button ">Bookings</span>
                                        </div>
                                    </div>
                            
                        })}
                    </div>
                    {/* <div class="admin-class-items">
                        <span class="admin-obj-font admin-item-block">Room No:1</span>
                        <span class="admin-obj-font admin-item-block">capacity:4</span>
                        <span class="admin-item-block admin-button ">Update</span>
                        <span class="admin-item-block admin-button ">Delete</span>
                    </div> */}

                    <Modal
                        isOpen={Iscreateopen}
                        style={createStyles}
                        onRequestClose={this.closecreate}
                    >
                            <div className="create-main">
                                <div className="create-class">Create</div>
                                <div className="contain">
                                    <input type="number" id="roomno-class" placeholder="RoomNo" onChange={(event)=>this.handleloginchange(event,'loginpassword')}/>
                                    <input type="number" id="capacity-class" placeholder="Capacity" onChange={(event)=>this.handleloginchange(event,'loginpassword')}/>

                                </div>
                                <div className="submit">
                                    <input type="button" id ="submit" value="create" onClick={this.handleloginsubmit} />
                                </div>
                                
                            </div>   
                    </Modal>
                </div>
                
            </div>
        )
    }
}

export default withRouter(adminviewguest);
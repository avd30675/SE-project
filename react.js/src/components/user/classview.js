import React ,{Component} from "react";
import {withRouter} from 'react-router-dom';
import '../../Style/adminviewclass.css'
import axios from 'axios';
import '../../Style/admincreate.css'
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


  export class classroom extends Component {
    constructor(){
        super();
        this.state={
            rooms:[],
            blockNo:null,
            roomNo:null,
            capacity:null
        }
    }
    componentDidMount(){
        axios({
            method :'GET',
            url : 'http://localhost:9000/userget/classroom',
            headers :{'Content-Type':'application/json'}
        }).then(response =>{this.setState({rooms: response.data.login});
            console.log(response);})
        .catch(err => console.log(err))
    }
 
    handlebookings=(id)=>{
        this.props.history.push(`/userclassbook/?id=${id}`);
    }
    render() {
        const{rooms}=this.state;
        return (
            <div>
                <div class="admin-classroom">
                    <h1 class="admin-item-block admin-button" >Classroom</h1>
                    <div class="scroll">
                        {rooms.map((item)=>{
                            return <div class="admin-class-items">
                                        <div class="admin-class-sub-items">
                                            <span class="admin-obj-font admin-item-block">Block No:{item.block}</span>
                                            <span class="admin-obj-font admin-item-block">Room No:{item.room}</span>
                                            <span class="admin-obj-font admin-item-block">capacity:{item.capacity}</span>
                                        </div>
                                        <div class="admin-class-sub-items">
                                            <span class="admin-item-block admin-button" onClick={()=>this.handlebookings(item._id)}>Bookings</span>
                                        </div>
                                    </div>
                            
                        })}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(classroom);
import React from 'react';
import '../Style/Enter.css';
import '../Style/login.css';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
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

  class Enter extends React.Component{
      constructor(){
          super();
          this.state={
            signInOpen:false,
            whosigned:0,
            IsloggedIn:false,
            loginemail:'',
            loginpassword:null,
            username:''
          }
      }
      componentDidMount(){
        sessionStorage.setItem('IsloggedIn',false);
      }
      //----------------------login functions-------------------
      handlelogin=(event,state)=>{
          const {IsloggedIn}=this.state;
          if(IsloggedIn){
              alert("you are already loggedIn")
          }else{
            this.setState({signInOpen :true,whosigned:state})
          }
      }
      closelogin=()=>{
          this.setState({signInOpen:false})
      }
      handleloginchange=(event,state)=>{
          this.setState({[state]:event.target.value})
      }
      handleloginsubmit=(event)=>{
        const {loginemail,loginpassword,whosigned}=this.state;
        const loginobj={
            email:loginemail,
            password:loginpassword,
            whosigned:whosigned
        }
        axios({
            method :'post',
            url : 'http://localhost:9000/login',
            headers :{'content-type':'application/json'},
            data: loginobj
        }).then(response=>{
            if(response.data.autheciation){
                if(whosigned==1){
                    alert('You logedin as admin successfully');
                }else if(whosigned==2){
                    alert('You logedin as user successfully');
                }else{
                    alert('signed in successfully');
                }
                event.preventDefault();
                this.setState({signInOpen:false, IsloggedIn :response.data.autheciation});
                if(whosigned==1){
                    this.props.history.push(`/admin`)
                }else{
                    sessionStorage.setItem('username',response.data.rest_string.email)
                    this.props.history.push(`/user`)
                }
            }else{
                alert('user not present check your email and password');
                this.setState({
                    email:'',
                    password:null
                })
                event.preventDefault();
               
            }
        }).catch()
        
      }
      //---------------------------login --------------------------


      render(){
        const {signInOpen,loginemail,loginpassword}=this.state;
          return (
                <div>
                    <div class="loginhomepage">
                        <header class="loginheader">
                            Welcome
                        </header>
                        <div class="userlogin">
                            <div class="admin btn-spac" onClick={(event)=>this.handlelogin(event,1)}>
                                <img class="userimage" src="../Images/icon6.png"/>
                                <div class="username">Admin</div>
                            </div>
                            <div class="user btn-spac" onClick={(event)=>this.handlelogin(event,2)}>
                                <img class="userimage" src="../Images/icon7.png"/>
                                <div class="username">user</div>
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
                    <div className="loginmodal">
                    <Modal
                        isOpen={signInOpen}
                        style={customStyles}
                        onRequestClose={this.closelogin}
                    >
                            <div className="loginmain">
                                <div className="login">Login</div>
                                <div className="contain">
                                    <input type="text" id="username" placeholder="Email" onChange={(event)=>this.handleloginchange(event,'loginemail')}/>
                                    <input type="password" id="password" placeholder="password" onChange={(event)=>this.handleloginchange(event,'loginpassword')}/>
                                </div>
                                <div className="submit">
                                    <input type="button" id ="submit" value="submit" onClick={this.handleloginsubmit} />
                                </div>
                                <div className="bottom">
                                    <input type="checkbox" id="remember" checked="checked"/>
                                    <label for="remember">Remember me</label>
                                    
                                </div>   
                                    
                                <div className="footer">forget password?</div>
                            </div>   
                    </Modal>
                    </div>
                </div>
          )
      }
  }
  export default Enter;
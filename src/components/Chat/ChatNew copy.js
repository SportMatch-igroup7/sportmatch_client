import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import './Chat.css';
import $ from 'jquery';


  export default function Chat() {

    const [userCode , setUserCode] = useState(0);
    const [branchData,setBranchData]= useState([]);
    const [trainerhData,setTrainerData]= useState([]);
    const [contactList,setContact]= useState([]);
    const [chosenContact , setChosenContact] = useState([]);


    useEffect(() => {

      $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
      });


      const user = JSON.parse(localStorage["userDetails"]);
      let code = "" 
      if(user.type === "Branch")
                      code = user.BranchCode;
                  else  
                      code = user.TrainerCode;
        setUserCode (code);
      
      

      fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Branch",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then( (res)=> {console.log(res);
    setBranchData(res)})
    .catch((error)=>console.log(error))


    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Trainer",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then( (res)=> {console.log(res);
  setTrainerData(res);
  })
  .catch((error)=>console.log(error))

    },[]);


    const sendData =()=>{

    //   const chatId = userCode + chosenContact.Code;
    //   firebase.database().ref(`/${chatId}`).push().set({
    //     //image: loginUser.FirstName,
    //     userId: chatId,
    //     message: $("#message").val(),
    //     date: ((new Date()).getTime() / 1000),
    //     //id: listTo[0]

    // })


  //   <div className="d-flex justify-content-end mb-4">
  //   <div className="msg_cotainer_send">
  //     ${message}
  //     <span className="msg_time_send"></span>
  //   </div>
  //   <div className="img_cont_msg">
  // </div>
  // <img src=""></img>
  // </div>

  


  //   $('<li class="sent"><img src="img/chatSent.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
  //   $('.message-input input').val(null);
  //   $('.contact.active .preview').html('<span>You: </span>' + message);
  //   $(".messages").animate({ scrollTop: $(document).height() }, "fast");
      
    }

    return (
      <div className="container-fluid h-100" className="main">
			<div className="row justify-content-center h-100">
				<div className="col-md-4 col-xl-3 chat">
          <div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header">
						<div className="input-group">
							<input type="text" placeholder="Search..." name="" className="form-control search"/>
							<div className="input-group-prepend">
								<span className="input-group-text search_btn">
                  <i className="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div className="card-body contacts_body">
						<ui className="contacts">
              {
              branchData.map(val => (
                <li className="active" onClick={(e) => setChosenContact({Code:val.BranchCode, Name: val.Name, Image:val.Logo})}>
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={val.Logo} className="rounded-circle user_img"></img>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>{val.Name}</span>
                  </div>
                </div>
              </li>))   
              }

              {
              trainerhData.map(val => (
                <li className="active" onClick={(e) => setChosenContact({Code:val.TrainerCode, Name: val.FirstName +" "+ val.LastName, Image:val.Image})}>
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={val.Image} className="rounded-circle user_img"></img>
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>{val.FirstName +" "+ val.LastName}</span>
                  </div>
                </div>
              </li>))   
              }
						</ui>
					</div>
					<div className="card-footer"></div>
				</div></div>
				<div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={chosenContact.Image} className="rounded-circle user_img"></img>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
            <span>Chat with {chosenContact.Name}</span>
								</div>
							</div>
							<span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
							<div className="action_menu">
								<ul>
									<li><i className="fas fa-user-circle"></i> View profile</li>
									<li><i className="fas fa-users"></i> Add to close friends</li>
									<li><i className="fas fa-plus"></i> Add to group</li>
									<li><i className="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div className="card-body msg_card_body">
							{/* <div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"></img>
								</div>
								<div className="msg_cotainer">
									Hi, how are you samim?
									<span className="msg_time">8:40 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									Hi Khalid i am good tnx how about you?
									<span className="msg_time_send">8:55 AM, Today</span>
								</div>
								<div className="img_cont_msg">
							</div>
              <img src=""></img>
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"></img>
								</div>
								<div className="msg_cotainer">
									I am good too, thank you for your chat template
									<span className="msg_time">9:00 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									You are welcome
									<span className="msg_time_send">9:05 AM, Today</span>
								</div>
								<div className="img_cont_msg">
                <img src=""></img>
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"></img>
								</div>
								<div className="msg_cotainer">
									I am looking for your next templates
									<span className="msg_time">9:07 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									Ok, thank you have a good day
									<span className="msg_time_send">9:10 AM, Today</span>
								</div>
								<div className="img_cont_msg">
                <img src=""></img>
               </div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"></img>
								</div>
								<div className="msg_cotainer">
									Bye, see you
									<span className="msg_time">9:12 AM, Today</span>
								</div>
							</div> */}
						</div>
						<div className="card-footer">
							<div className="input-group">
								<textarea id="message" name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
								<div className="input-group-append">
									<span onClick={()=>sendData()} className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>      
      </div>      
    );
  }
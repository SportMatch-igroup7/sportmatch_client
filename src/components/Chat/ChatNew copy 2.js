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
import firebase from 'firebase';


  export default function Chat() {

    const [userCode , setUserCode] = useState(0);
    const [branchData,setBranchData]= useState([]);
    const [trainerhData,setTrainerData]= useState([]);
    const [contactList,setContact]= useState([]);
	const [chosenContact , setChosenContact] = useState([]);
	const [chatId, setChatId] = useState(0);
	const [chatIdRev, setChatIdRev] = useState(0);
	const [radio, setRadio] = useState("trainer");
	const [search, setSearch] = useState("");
	const [flag, setFlag] = useState(true);
	const [messages, setMessages] = useState([]);

    useEffect(() => {

      $('#action_menu_btn').click(function(){
		$('.action_menu').toggle();
	  });

	  const user = JSON.parse(localStorage["userDetails"]);
      let code = 0;
      if(user.Type === "Branch")
                      code = user.BranchCode;
                  else
                      code = user.TrainerCode;
	  setUserCode (code);
	  console.log("userCode",code);

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

		let a =  $("#message").val();
      //const chatId = userCode + chosenContact.Code;
      firebase.database().ref(`/${chatId}`).push().set({
        //image: loginUser.FirstName,
        message:a,
        date: ((new Date()).getTime() / 1000),
		code: userCode,
		//image: "",
	})

	firebase.database().ref(`/${chatIdRev}`).push().set({
        //image: loginUser.FirstName,
        message:a,
        date: ((new Date()).getTime() / 1000),
		code: userCode,
		//image: "",
	})

	$(`<div className="d-flex justify-content-start mb-4"><div className="img_cont_msg">
	<img src="" className="rounded-circle user_img_msg"></img>
	</div><div className="msg_cotainer">${a}</div></div>`).appendTo($('#hh'));
	$("#message").val('');
	
	
}

	const getData= () =>{
		var x = true;
		console.log(chatId);
		firebase.database().ref(`/${chatId}`).on('child_added',  (snapshot) => {
			setInterval(() => {
					var message = snapshot.child("message").val();
					var code = snapshot.child("code").val();
					var last = snapshot.child("date").val();
					//var image = snapshot.child("image").val();
					//var flag = true;
					var lastDate = new Date(0);
					

					
				//  if (last > lastDate)
				//  {
					if ((parseInt(code) === parseInt(userCode))&&(x === true)) {
						//alert(code+"==="+userCode);

						$(`<div className="d-flex justify-content-start mb-4"><div className="img_cont_msg">
						<img src="" className="rounded-circle user_img_msg"></img>
						</div><div className="msg_cotainer">${message}</div></div>`).appendTo($('#hh'));
						// $('.message-input input').val(null);
						// $('.msg_cotainer .rounded-circle.user_img_msg').html('<span>You: </span>' + message);
						 //$(".messages").animate({ scrollTop: $(document).height() }, "fast");
					}
					else if (parseInt(code) != parseInt(userCode)){
						console.log('my flag is false')
						// if (name != loginUser.FirstName)
						$(`<div className="d-flex justify-content-end mb-4"><div className="msg_cotainer_send">${message}
						</div><div className="img_cont_msg"></div><img src=""></img></div>`).appendTo($('#hh'));
						// $('.message-input input').val(null);
						// $('.contact.active .preview').html('<span>You: </span>' + message);
						// $(".messages").animate({ scrollTop: $(document).height() }, "fast");
					 }

					lastDate = last;
					x = false;
					setTimeout(()=> {x=false}, 5000);
				//  }
			}, 3000);
		})
	}


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

	
	const setChatDeatails =(code, name, image) =>
	{

	$("#hh").html('');
		setChosenContact({Code:code, Name: name, Image:image});
		console.log("userCode:",userCode);
		console.log("code:",code);
		let x = (userCode.toString()+code.toString());
		let xRev = (code.toString()+userCode.toString());


		setChatId(x);
		setChatIdRev(xRev);
		console.log(x);
		console.log(xRev);
		
		getData();
	
	}


	const showList =()=>{
		if(radio === "trainer")
			{
				return(
				trainerhData.filter(val => val.FirstName.includes(search)|| val.LastName.includes(search)).map(val => (
					<li className="active" onClick={(code,name,image) => setChatDeatails(val.TrainerCode, val.FirstName +" "+ val.LastName, val.Image)}>
					<div className="d-flex bd-highlight"></div>
					<div className="d-flex bd-highlight">
					  <div className="img_cont">
						<img src={val.Image} className="rounded-circle user_img"></img>
						<span className="online_icon"></span>
					  </div>
					  <div className="user_info">
						<span>{val.FirstName +" "+ val.LastName}</span>
					  </div>
					</div>
				  </li>)));
			}
		else
		return(
			branchData.filter(val => val.Name.includes(search)).map(val => (
                <li className="active" onClick={(code,name,image) => setChatDeatails(val.BranchCode, val.Name,val.Logo)}>
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
		)
	}

    return (
      <div className="container-fluid h-100" className="main">
			<div className="row justify-content-center h-100">
				<div className="col-md-4 col-xl-3 chat">
          <div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header">
						<div className="input-group">
							<input type="text" placeholder="Search..." name="" className="form-control search" on onChange={(e) => setSearch(e.target.value)}   />
							<div className="input-group-prepend">
								<span className="input-group-text search_btn">
                  			<i className="fas fa-search"></i></span>
							</div>
						</div>

						<div className="input-group">
							<label>
            				<input type="radio" value="trainer" name="choose" onClick={(e) => setRadio(e.target.value)} checked={true} />
            				מאמנים
          					</label>
							  <label>
            				<input type="radio" value="branch" name="choose" onClick={(e) => setRadio(e.target.value)} />
            				מועדונים
          					</label>
						</div>
					</div>
					<div className="card-body contacts_body">
						<ui className="contacts">
              {
				  	showList()
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
						<div className="card-body msg_card_body" id="hh">
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
  
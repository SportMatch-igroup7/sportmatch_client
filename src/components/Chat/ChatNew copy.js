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
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';


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
	const [messages, setMessages] = useState([]);
	const [userType, SetUserType] =useState("");

    useEffect(() => {

	  const user = JSON.parse(localStorage["userDetails"]);
      let code = 0;
	   if(user.Type === "Branch")
		{
			SetUserType("branch")
			code = user.BranchCode;
		}           
		else
		{
			SetUserType("trainer")
			code = user.TrainerCode;
		}
                      
	   setUserCode (code);
	  console.log("userCode",code);

       fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Branch",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then((res)=> {console.log(res);
     setBranchData(res)})
    .catch((error)=>console.log(error))


     fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Trainer",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res);
   setTrainerData(res);
  })
  .catch((error)=>console.log(error))
	},[]);
	
	useEffect(() => {
		if (userCode === 0) {
			return;
		}
		const fromProfile = JSON.parse(localStorage["fromProfile"]);
		if(fromProfile === true)
			detailsFromProfile();
	}, [userCode]);

	

		const detailsFromProfile = async () =>
	{
		const code = JSON.parse(localStorage["chat"]).Code;
		const name = JSON.parse(localStorage["chat"]).Name;
		const image = JSON.parse(localStorage["chat"]).Image;

		console.log(code,name,image);


		await setMessages([]);
		await setChosenContact({Code:code, Name: name, Image:image});
		console.log("userCode:",userCode);
		console.log("code:",code);
		let x = (userCode.toString()+code.toString());
		let xRev = (code.toString()+userCode.toString());


		await setChatId(x);
		await setChatIdRev(xRev);
		console.log(x);
		console.log(xRev);

		getData(x,image);
	}


    const sendData =()=>{

		setMessages([]);
		let photo="";
		if(userType ==="branch")
			photo = branchData.filter(val => val.BranchCode === userCode).map(val => val.Logo)
		else
			photo = trainerhData.filter(val => val.TrainerCode === userCode).map(val => val.Image)
		
		console.log(photo);


		let mes =  $("#message").val();
      firebase.database().ref(`/${chatId}`).push().set({
        message:mes,
        date: ((new Date()).getTime() / 1000),
		code: userCode,
		image: photo,
	})

	firebase.database().ref(`/${chatIdRev}`).push().set({
        message:mes,
        date: ((new Date()).getTime() / 1000),
		code: userCode,
		image: photo,
	})

	let m = (<div className="d-flex justify-content-start mb-4"><div className="img_cont_msg">
	<img src={photo} className="rounded-circle user_img_msg"></img>
	</div><div className="msg_cotainer">{mes}</div></div>);
	setMessages([...messages,m])
	$("#message").val('');

}

	const getData= (chat,im) =>{
		var x = true;
		setMessages([])
		console.log(chat);
		firebase.database().ref(`/${chat}`).on('child_added',  (snapshot) => {
					var message = snapshot.child("message").val();
					var code = snapshot.child("code").val();
					var image = snapshot.child("image").val();


									

					if ((parseInt(code) === parseInt(userCode))){
						let m = (<div className="d-flex justify-content-start mb-4"><div className="img_cont_msg">
						<img src={image} className="rounded-circle user_img_msg"></img>
						</div><div className="msg_cotainer">{message}</div></div>)
						setMessages(prevState => [...prevState,m])
					}
					else if (parseInt(code) != parseInt(userCode)){
						let m= (<div className="d-flex justify-content-end mb-4"><div className="msg_cotainer_send">{message}
						</div><div className="img_cont_msg"></div><img src={im} className="rounded-circle user_img_msg"></img></div>);
						setMessages(prevState => [...prevState,m])
					 }
		})
	}

	
	const setChatDeatails =async (code, name, image) =>
	{
		console.log("messages:",messages)

		await setMessages([]);
		await setChosenContact({Code:code, Name: name, Image:image});
		console.log("userCode:",userCode);
		console.log("code:",code);
		let x = (userCode.toString()+code.toString());
		let xRev = (code.toString()+userCode.toString());


		await setChatId(x);
		await setChatIdRev(xRev);
		console.log(x);
		console.log(xRev);



		getData(x,image);
	}

	const check = (x, xRev) =>{
		if(x === chatId && xRev ===chatIdRev)
			getData();
		else
		setTimeout(()=> {check()}, 1000);

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
				<div className=" col-xs-4 col-md-4 col-xl-3 chat">
          <div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header">
						<div className="input-group">
							<input type="text" label='&#x1F50D;' placeholder="Search..." name="" className="form-control search" on onChange={(e) => setSearch(e.target.value)}   />
							<div className="input-group-prepend">
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
				<div className=" col-xs-8 col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={chosenContact.Image} className="rounded-circle user_img"></img>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
            				<span> {chosenContact.Name}</span>
								</div>
							</div>
						</div>
						<div className="card-body msg_card_body" id="hh">
							{messages}
						</div>
						<div className="card-footer">
							<div className="input-group">
								<textarea id="message" name="" className="form-control type_msg" placeholder="רשום את ההודעה שלך כאן..."></textarea>
								<div className="input-group-append">
									<span onClick={()=>sendData()} className="input-group-text send_btn"><SendIcon/></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
      </div>
	);
}
  
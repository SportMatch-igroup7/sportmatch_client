import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import swal from 'sweetalert'
import Modal from '@material-ui/core/Modal';
import TrainerProfile from '../TrainerProfiles/ChosenTrainerProfile';
import '../TrainerDashboard/cards.css';
import Carousel from "react-elastic-carousel";
import Req from './RequestForReplacementView';
import NewRequests from './RequestsManagement/NewRequests';
import WaitingRequests from './RequestsManagement/WaitingRequests';
import ApprovedRequests from './RequestsManagement/ApprovedRequests';
import HistoricalRequests from './RequestsManagement/HistoricalRequests';

//import './CarStyle.css';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    direction:"rtl",
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height:"20%",
  },
  cardContent: {
    flexGrow: 1,
    direction:"rtl",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function Album() {
  const classes = useStyles();
  const history = useHistory();

  const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;

  const [requests, setRequests] = useState();
 
  const [reqCode, setReqCode] = useState(0);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [index, setIndex] = useState(0);

  
  const handleSelectCarousel = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  useEffect(() => {

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestDetails/getTrainerRequests/" + trainerCode + '/',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res);
   setRequests(res);
   localStorage["trainerReq"] = JSON.stringify(res);
  })
  .catch((error)=>console.log(error))
  
  },[]);


  const approveTrainer = (replacmentCode, trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      IsApprovedByTrainer: "true"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutIsApprovedTrainer",{
      method:'PUT',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(req)
  })
  .then((response)=>response.json())
  .then((res)=> console.log(res),
    setTimeout(() => {
      refreshPage()
    }, 2000))
  .catch((error)=>console.log(error))
  }

  const declineTrainer = (replacmentCode,trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      IsApprovedByTrainer: "false",
      RequestStatus: "closed"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutIsApprovedTrainerFalse",{
      method:'PUT',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(req)
  })
  .then((response)=>response.json())
  .then((res)=> console.log(res),
    setTimeout(() => {
      refreshPage()
    }, 2000))
  .catch((error)=>console.log(error))
  }

  const refreshPage= () => {
    window.location.reload(false);
  }

  return (
    <React.Fragment >
        <NewRequests req={requests} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
        <WaitingRequests req={requests} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
        <ApprovedRequests req={requests} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
        <HistoricalRequests req={requests} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
      
    </React.Fragment>
  );
}
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
  })
  .catch((error)=>console.log(error))
  
  },[]);


  const approveTrainer = (replacmentCode, trainerCode) =>{
    let req = {
      ReplacmentCode: replacmentCode,
      TrainerCode: trainerCode,
      IsAprrovedByTrainer: true
    }
    //בעיקרון כאן מה שצריך לעשות זה לשנות את הסטטוס של המאמן הזה למאושר ושל שאר המאמנים תחת ההודעה הזאת לסגור

  }

  const declineTrainer = (replacmentCode,trainerCode) =>{
    let req = {
      ReplacmentCode: replacmentCode,
      TrainerCode: trainerCode,
      IsAprrovedByTrainer: false
    }
  }


  return (
    <React.Fragment >
      <CssBaseline />
      <hr/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>בקשות החלפה חדשות שטרם נענו:</h1></Grid>
            {requests && requests.filter((card)=>(card.IsHistory===false && card.IsAprrovedByTrainer == false && card.RequestStatus == "Sent")).map((card) => (
              <Grid item key={card.ReplacmentCode} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.TypeName}
                    </Typography>
                    <Typography>
                      תאריך ההחלפה: {card.ReplacementDate}
                    </Typography>
                    <Typography>
                      שעות ההחלפה: {card.ToHour} - {card.FromHour}  
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          console.log("code:" ,card.ReplacementCode)
                          setReqCode(card.ReplacementCode);
                          console.log(reqCode);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={modalStyle} className={classes.paper}>
                    <Req approveTrainer={(replacmentCode, trainerCode) => approveTrainer(replacmentCode, trainerCode)} declineTrainer={(replacmentCode, trainerCode) => declineTrainer(replacmentCode, trainerCode)} req={requests.filter((val)=>(val.ReplacmentCode === card.ReplacmentCode))} stage="1"/>
                    </div>                  
                  </Modal>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <hr/>

      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>בקשות ממתינות לאישור מועדון:</h1></Grid>
            {requests && requests.filter((card)=>(card.IsHistory===false && card.IsAprrovedByTrainer == true && card.RequestStatus == "Sent")).map((card) => (
              <Grid item key={card.ReplacmentCode} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.TypeName}
                    </Typography>
                    <Typography>
                      תאריך ההחלפה: {card.ReplacementDate}
                    </Typography>
                    <Typography>
                      שעות ההחלפה:{card.ToHour} - {card.FromHour}  
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          // let request = {
                          //   TrainerCode: card.ReplacmentCode
                          // }
                          // localStorage["request"] = JSON.stringify(trainer);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={modalStyle} className={classes.paper}>
                    <Req approveTrainer={(replacmentCode, trainerCode) => approveTrainer(replacmentCode, trainerCode)} declineTrainer={(replacmentCode, trainerCode) => declineTrainer(replacmentCode, trainerCode)} req={requests.filter((val)=>(val.ReplacmentCode === card.ReplacmentCode))} stage="2"/>
                    </div>                  
                  </Modal>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <hr/>


      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>ההחלפות העתידיות שלי :</h1></Grid>
            {requests && requests.filter((card)=>(card.IsHistory===false && card.RequestStatus == "approved" && card.IsAprrovedByTrainer == true)).map((card) => (
              <Grid item key={card.ReplacmentCode} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.TypeName}
                    </Typography>
                    <Typography>
                      תאריך ההחלפה: {card.ReplacementDate}
                    </Typography>
                    <Typography>
                      שעות ההחלפה:{card.ToHour} - {card.FromHour}  
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          // let request = {
                          //   TrainerCode: card.ReplacmentCode
                          // }
                          // localStorage["request"] = JSON.stringify(trainer);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={modalStyle} className={classes.paper}>
                    <Req approveTrainer={(replacmentCode, trainerCode) => approveTrainer(replacmentCode, trainerCode)} declineTrainer={(replacmentCode, trainerCode) => declineTrainer(replacmentCode, trainerCode)} req={requests.filter((val)=>(val.ReplacmentCode === card.ReplacmentCode))} stage="3"/>
                    </div>                  
                  </Modal>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <hr/>


      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>היסטוריית החלפות:</h1></Grid>
            {requests && requests.filter((card)=>(card.IsHistory ===true && card.RequestStatus == "approved" && card.IsAprrovedByTrainer == true)).map((card) => (
              <Grid item key={card.ReplacmentCode} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.TypeName}
                    </Typography>
                    <Typography>
                      תאריך ההחלפה: {card.ReplacementDate}
                    </Typography>
                    <Typography>
                      שעות ההחלפה:{card.ToHour} - {card.FromHour}  
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          // let request = {
                          //   TrainerCode: card.ReplacmentCode
                          // }
                          // localStorage["request"] = JSON.stringify(trainer);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={modalStyle} className={classes.paper}>
                    <Req approveTrainer={(replacmentCode, trainerCode) => approveTrainer(replacmentCode, trainerCode)} declineTrainer={(replacmentCode, trainerCode) => declineTrainer(replacmentCode, trainerCode)} req={requests.filter((val)=>(val.ReplacmentCode === card.ReplacmentCode))} stage="4"/>
                    </div>                  
                  </Modal>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      
    </React.Fragment>
  );
}
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
import Req from '../TrainerDashboard/RequestForReplacementView';
import ReqTrainers from './RequestTrainers';
import ChosenTrainer from '../TrainerProfiles/ChosenTrainerProfile';
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

  const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;

  const [requests, setRequests] = useState();

  const [distinctReq, setDistinctReq] = useState();
  
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

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestDetails/getBranchRequests/" + branchCode + '/',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res);
   setRequests(res);
   setDistinctRequests(res);
  })
  .catch((error)=>console.log(error))
  
  },[]);


  const setDistinctRequests = (res) => {
    const distinctReq = [];
    let request = "";
    const reqCodes = [];
  
    const arr = [...new Set(res.map((x) => {
      if (!reqCodes.includes(x.ReplacmentCode) && x.RequestStatus === "initial") 
      {
        request = {
          ReplacmentCode: x.ReplacmentCode,
          Logo: x.Logo,
          TypeName: x.TypeName,
          ReplacementDate: x.ReplacementDate,
          FromHour: x.FromHour,
          ToHour: x.ToHour,
          IsHistory: x.IsHistory,
        }
        reqCodes.push(x.ReplacmentCode)
        distinctReq.push(request)
      } 
    }))]
    console.log(distinctReq)
    setDistinctReq(distinctReq);
  }
 

  const approveTrainer = (replacmentCode, trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      RequestStatus: "approved"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutRequestTrainer",{
      method:'PUT',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(req)
  })
  .then((response)=>response.json())
  .then((res)=>console.log(res))
  .catch((error)=>console.log(error))

  }

  const declineTrainer = (replacmentCode,trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      RequestStatus: "closed"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutRequestTrainer",{
      method:'PUT',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(req)
  })
  .then((response)=>response.json())
  .then((res)=>console.log(res))
  .catch((error)=>console.log(error))
  }


  return (
    <React.Fragment >
      <CssBaseline />
      <hr/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>בקשות ממתינות לאישור:</h1></Grid>
            {distinctReq && distinctReq.filter((card)=>(card.IsHistory===false )).map((card) => (
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
                          setReqCode(card.ReplacementCode);
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
                    <ReqTrainers approveTrainer={approveTrainer} declineTrainer={declineTrainer} req={requests.filter((val)=>(val.ReplacmentCode === card.ReplacmentCode && val.RequestStatus === "open" && val.IsAprrovedByTrainer ==="true"))}/>
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

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>החלפות שאישרתי:</h1></Grid>
            {requests && requests.filter((card)=>(card.IsHistory===false && card.IsAprrovedByTrainer === "true" && card.RequestStatus === "approved" )).map((card) => (
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
                          setReqCode(card.ReplacementCode);
                          let fil=requests.filter((val)=>(val.ReplacmentCode === card.ReplacmentCode && val.RequestStatus === "approved" && val.IsAprrovedByTrainer ==="true"))
                          let trainerCode = fil[0].TrainerCode;
                          console.log(trainerCode);
                          localStorage["trainer"] = JSON.stringify(trainerCode);
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
                    <ChosenTrainer/>
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

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>היסטוריית החלפות:</h1></Grid>
            {requests && requests.filter((card)=>(card.IsHistory===true && card.IsApprovedByTrainer === "true" && card.RequestStatus === "approved" )).map((card) => (
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
                          setReqCode(card.ReplacementCode);
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
                    <ReqTrainers approveTrainer={approveTrainer} declineTrainer={declineTrainer} req={requests && requests.filter((val)=>(val.ReplacmentCode === card.ReplacmentCode))}/>
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
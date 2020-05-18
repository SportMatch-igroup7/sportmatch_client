import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import $ from 'jquery';
import swal from 'sweetalert'
import Modal from '@material-ui/core/Modal';
import TrainerProfile from '../TrainerProfiles/ChosenTrainerProfile';
import '../TrainerDashboard/cards.css';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    trainersData:[]
  });

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Trainer",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res); setState({...state,trainersData:res})})
  .catch((error)=>console.log(error))
  
  },[]);


  return (
    <React.Fragment >
      <CssBaseline />
      <hr/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} className="card">
            <Grid item xs={12}><h1>בקשות ממתינות לאישור</h1></Grid>
            {state.trainersData.slice(0,4).map((card) => (
              <Grid item key={card.TrainerCode} xs={6} md={3} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.FirstName} {card.LastName}
                    </Typography>
                    <Typography>
                      {card.AboutMe}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          let trainer = {
                            TrainerCode: card.TrainerCode
                          }
                          localStorage["trainer"] = JSON.stringify(trainer);
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
                    <TrainerProfile/>
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
            <Grid item xs={12}><h1>החלפות שאישרתי</h1></Grid>
            {state.trainersData.slice(0,4).map((card) => (
              <Grid item key={card.TrainerCode} xs={6} md={3} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.FirstName} {card.LastName}
                    </Typography>
                    <Typography>
                      {card.AboutMe}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          let trainer = {
                            TrainerCode: card.TrainerCode
                          }
                          localStorage["trainer"] = JSON.stringify(trainer);
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
                    <TrainerProfile/>
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
            <Grid item xs={12}><h1>היסטוריית החלפות</h1></Grid>
            {state.trainersData.slice(0,4).map((card) => (
              <Grid item key={card.TrainerCode} xs={6} md={3} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.FirstName} {card.LastName}
                    </Typography>
                    <Typography>
                      {card.AboutMe}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          let trainer = {
                            TrainerCode: card.TrainerCode
                          }
                          localStorage["trainer"] = JSON.stringify(trainer);
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
                    <TrainerProfile/>
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
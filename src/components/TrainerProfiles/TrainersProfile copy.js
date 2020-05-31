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
import {ajaxCall} from '../../commons/ajaxCall';
import swal from 'sweetalert'
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import TrainerProfile from '../../components/TrainerProfiles/ChosenTrainerProfile';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    direction:"rtl",
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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

    //ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Trainer", "", successGetTrainer, errorGetTrainer);
  },[]);

  // const successGetTrainer=(data)=>{
  //   setState({...state,trainersData:data});
  // }

  // const errorGetTrainer=(err)=>{
  //   console.log(err);
  // }


  return (
    <React.Fragment >
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              מאגר מאמנים
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {state.trainersData.map((card) => (
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
                          console.log("trainer:",trainer)
                          localStorage["trainer"] = JSON.stringify(trainer);
                          handleShow();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                    <Modal show={show} onHide={handleClose} animation={false} > 
                    <TrainerProfile/>               
                  </Modal>
                    <Button  size="small" color="primary">
                      חסום
                    </Button>
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
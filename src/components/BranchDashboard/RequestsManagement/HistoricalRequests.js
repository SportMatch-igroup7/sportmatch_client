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
import Modal from 'react-bootstrap/Modal';
import ChosenTrainer from '../../TrainerProfiles/ChosenTrainerProfile';
import '../../TrainerDashboard/cards.css';
import Carousel from "react-elastic-carousel";
import ReqTrainers from '../RequestTrainers';
//import './CarStyle.css';
import Rating from './ReplacementRating';


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
    textAlign:'right',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignSelf:'center',
    marginTop:'50px',
  },
    paper2: {
    //width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignSelf:'center',
    marginTop:'80px',
  },
}));



export default function Album(props) {
  const classes = useStyles();
  const history = useHistory();

  const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;

  //const requests = JSON.parse(localStorage["branchReq"]);
  const requests = props.req;
  
  const [reqCode, setReqCode] = useState(0);
  const [chosenTrainerCode, setChosenTrainerCode] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [index, setIndex] = useState(0);

  
  const handleSelectCarousel = (selectedIndex, e) => {
      setIndex(selectedIndex);
    }; 


  const btn = () => {
  if(requests && requests.filter((card)=>(card.IsHistory===true && card.IsAprrovedByTrainer === "true" && card.RequestStatus === "approved" && card.IsRate === null )))
    return(
      <Grid style={{textAlign:'right',paddingRight: '1em'}}>    
      <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submit}
      style={{backgroundColor:"rgb(235, 135, 218)",margin:'2px'}}
      onClick={() =>handleOpen2()}
    >
     דרג מאמן
    </Button>
    </Grid>);
}


  return (
    <React.Fragment >
                  <Modal
                    show={open}
                    onHide={handleClose}
                  >
                    <div className={classes.paper}>
                    {btn()}
                    <ChosenTrainer/>
                    </div>                  
                  </Modal>

                   <Modal
                    show={open2}
                    onHide={handleClose2}
                  >
                    <div className={classes.paper2}>
                    <Rating requestCode = {reqCode} trainerCode={chosenTrainerCode} close={handleClose2} />
                    </div>                  
                  </Modal >
                  <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12}><h3 style={{textAlign:'center'}}>היסטוריית החלפות:</h3></Grid>
            {requests && requests.filter((card)=>(card.IsHistory===true && card.IsAprrovedByTrainer === "true" && card.RequestStatus === "approved" )).map((card) => (
              <Grid item key={card.ReplacmentCode} xs={6} sm={4} md={3} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" style={{textAlign: "center"}}>
                      {card.TypeName}
                      <hr/>
                    </Typography>
                    <Typography style={{fontWeight:"bold"}}>
                      תאריך ההחלפה:
                    </Typography>
                    <Typography>
                     {card.ReplacementDate}
                    </Typography>
                    <Typography style={{fontWeight:"bold"}}>
                      שעות ההחלפה:
                    </Typography>
                    <Typography>
                      {card.ToHour} - {card.FromHour}  
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button onClick={()=>{
                          setReqCode(card.ReplacementCode);
                          let fil=requests.filter((val)=>(val.IsHistory===true && val.ReplacmentCode === card.ReplacmentCode && val.RequestStatus === "approved" && val.IsAprrovedByTrainer ==="true"))
                          let trainerCode = {TrainerCode: fil[0].TrainerCode}
                          setChosenTrainerCode(trainerCode);// new
                          console.log(trainerCode);
                          localStorage["trainer"] = JSON.stringify(trainerCode);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
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
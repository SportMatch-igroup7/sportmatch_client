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
import swal from 'sweetalert'
import Modal from 'react-bootstrap/Modal';
import TrainerProfile from '../TrainerProfiles/ChosenTrainerProfile';

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
    textAlign:'right',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
   // width: 800,
    //backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    //alignSelf:'center',
    marginTop:'50px',
  },
}));


export default function Album(props) {
  console.log(props.req);
  const classes = useStyles();
  const history = useHistory();

  const [trainersData, setTrainersData] = useState([]);

  const [chosenTrainers, setChosenTrainers] = useState([]);

  const [open, setOpen] = React.useState(false);

  const requestData = props.req;

  const user = JSON.parse(localStorage["userDetails"]).Type;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {

  fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Trainer/GetTrainerMatchRequest",{
    method:'POST',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
    body:JSON.stringify(requestData)
})
.then((response)=>response.json())
.then((res)=> getMatches(res))
.catch((error)=>console.log(error));


  },[]);

  const getMatches=(res)=>{
    console.log(res);
    if(res.length > 0)
      setTrainersData(res);
    else
      swal("לא נמצאו מאמנים מתאימים")
    }

  const addTrainer=(Item)=>{
    let t = chosenTrainers;
    if(t.includes(Item))
    {
        t=t.filter(item=>item !== Item)
    }
        
    else
    {
        t.push(Item);   
    }
    setChosenTrainers([...t]);
    console.log(t);  
  }

  const setRequest= () =>{
    let list = [];
    let trainer = "";
    if(chosenTrainers.length>0)
    {
      chosenTrainers.map(val=>
        {
            trainer = {
            RequestCode: requestData.ReplacementCode,
            TrainerCode: val,
            IsApprovedByTrainer: "initial",
            RequestStatus: "open"
          }
          console.log(trainer);
          list.push(trainer);
        });
        fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer",{
      method:'POST',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(list)
      })
      .then((response)=>response.json())
      .then((res)=> swal("הבקשה נשלחה למאמנים הנבחרים"),
      setTimeout(() => {
        refreshPage()
      }, 3000))
      .catch((error)=>console.log(error));
    }
    else
      swal("לא נבחרו מאמנים");   
  }

  const allTrainers = () => {
    let trainers = trainersData && trainersData.map((card) => (card.TrainerCode));
    if(chosenTrainers.length === trainers)
      setChosenTrainers([]);
    else
      setChosenTrainers(trainers);
  }

  const refreshPage= () => {
    window.location.reload(false);
  }


  return (
    <React.Fragment >

        <Modal
          show={open}
          onHide={handleClose}
        >
          <div className={classes.paper}>
          <TrainerProfile comp={props.comp}/>
          </div>                  
        </Modal>


    <CssBaseline />
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
           המאמנים המתאימים ביותר עבורך
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <div style={{textAlign:'right'}}>
        <Button
            spacing={2}
            type="submit"
            size="medium"
            variant="contained"
            style={{backgroundColor:'rgb(235, 135, 218)', color:'white',marginBottom:'15px'}}
            onClick={allTrainers}
          >
            בחר את כל המאמנים
          </Button>
          </div>
        <Grid container spacing={2}>
          {trainersData && trainersData.sort((a, b) => a.MatchRating < b.MatchRating ? 1 : -1).map((card) => (
            <Grid item key={card.TrainerCode} xs={6} md={3} >
              <Card className={classes.card} style={{border: chosenTrainers.includes(card.TrainerCode) ? 'solid rgb(235, 135, 218)': ''}}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.Image}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                <Typography style={{backgroundColor:'rgb(235, 135, 218)', color:'white',textAlign:'center'}}>
                    אחוזי התאמה: {card.MatchRating}%
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2" style = {{textAlign:'center'}}>
                    {card.FirstName} {card.LastName}
                  </Typography>
                  <Typography>
                    {card.AboutMe}
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" color="primary" onClick={(e)=>addTrainer(card.TrainerCode)}>
                    בחר
                  </Button>
                  <Button onClick={()=>{
                        let trainer = {
                          TrainerCode: card.TrainerCode
                        }
                        localStorage["trainer"] = JSON.stringify(trainer);
                        handleOpen();
                  }} size="small" color="primary">
                    צפה
                  </Button>
                  <Button onClick={()=>{
                      let trainerChat = {
                      Code: card.TrainerCode,
                      Name:card.FirstName +" "+ card.LastName,
                      Image:card.Image
                      }
                      localStorage["chat"] = JSON.stringify(trainerChat);
                      localStorage["fromProfile"] = true;
                      if(user === "Branch")
                        props.comp(8);
                      else
                        props.comp(6);
                    }} size="small" color="primary">
                      שלח הודעה
                </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
            <Button
            spacing={2}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:'15px'}}
            onClick={setRequest}
          >
            שלח הודעת החלפה
          </Button>
      
        </Grid>
      </Container>
    </main>
  </React.Fragment>
  );
}
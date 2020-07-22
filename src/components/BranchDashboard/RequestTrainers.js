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
  console.log(props);
  console.log(props.req);
  const matchTrainers = props.req;
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    trainersData:[]
  });

  const [trainers, setTrainers] = useState();

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
  .then((res)=> {console.log(res);
   setState({...state,trainersData:res})
   getRelevantTrainers(res);
  })
  .catch((error)=>console.log(error))

  },[]);

  const getRelevantTrainers = (res) =>{
    let trainersCode = matchTrainers.map(val => val.TrainerCode);
    console.log(trainersCode);
    let arr = [];
    let filterTrainers = res.filter((val)=>{
      if (trainersCode.includes(val.TrainerCode))
        arr.push(val);
    })
    console.log(arr);
    setTrainers(arr);
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
              פרטי מאמנים
            </Typography>
            <hr/>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {trainers && trainers.map((card) => (
              <Grid item key={card.TrainerCode} xs={6} md={6} >
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

                    <Button  size="small" color="black" style={{backgroundColor:"green"}} onClick={() => props.approveTrainer(matchTrainers[0].ReplacmentCode,card.TrainerCode)}>
                      אשר
                    </Button>
                    <Button  size="small" color="black" style={{backgroundColor:"red"}} onClick={() => props.declineTrainer(matchTrainers[0].ReplacmentCode,card.TrainerCode)}>
                      סרב
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
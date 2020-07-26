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
import TrainerProfile from '../../TrainerProfiles/ChosenTrainerProfile';
import '../../TrainerDashboard/cards.css';
import Carousel from "react-elastic-carousel";
import ReqTrainers from '../RequestTrainers';
import Badge from '@material-ui/core/Badge';
//import './CarStyle.css';



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
  const classes = useStyles();
  const history = useHistory();

  const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;

  const requests = props.req;
  const distinctReq = props.distinctReq;
  const [badgeCounter, setBadgeCounter] = useState(0);

  
  const [reqCode, setReqCode] = useState(0);

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

  const bedgeNum = (num) => {
    
  }


  return (
    <React.Fragment >

    <Modal
      show={open}
      onHide={handleClose}
    >
      <div className={classes.paper} dir="rtl" style = {{textAlign:'right'}} >
      <Button
          spacing={2}
          type="submit"
          size="medium"
          variant="contained"
          style={{backgroundColor:'rgb(235, 135, 218)', color:'white',marginBottom:'15px'}}
          onClick={()=>
            swal({
              title: "האם אתה בטוח שברצונך למחוק את הודעת ההחלפה?",
              text: "לאחר מחיקה לא יתאפשר שחזור של ההודעה",
              icon: "warning",
              buttons: {
                cancel: {
                    text: 'בטל מחיקה',
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: false,
                },
                confirm: {
                    text: 'אשר',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: false,
                }
            },
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                console.log(reqCode);
                props.deleteRequest(reqCode);
                swal("ההודעה נמחקה בהצלחה", {
                  icon: "success",
                });
              } else {
                swal("לא בוצעה מחיקה");
              }
            })
          }
          //onClick={()=>props.deleteRequest(reqCode)}
        >
          מחק הודעת החלפה
        </Button>
      <ReqTrainers close={handleClose} comp={props.comp} approveTrainer={props.approveTrainer} declineTrainer={props.declineTrainer} req={requests && requests.filter((val)=>(val.ReplacmentCode === reqCode && val.RequestStatus === "open" && val.IsAprrovedByTrainer ==="true"))}/>
      </div>                  
    </Modal>


      <CssBaseline />
      <hr/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12}><h4 style={{textAlign:'right'}}>בקשות ממתינות לאישור</h4></Grid>
            {distinctReq && distinctReq.sort((a, b) => a.ReplacementDate > b.ReplacementDate ? 1 : -1).filter((card)=>(card.IsHistory===false )).map((card) => (
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
                          setReqCode(card.ReplacmentCode);
                          console.log(card.ReplacmentCode);
                          console.log(reqCode);
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
      <hr/>
      
    </React.Fragment>
  );
}



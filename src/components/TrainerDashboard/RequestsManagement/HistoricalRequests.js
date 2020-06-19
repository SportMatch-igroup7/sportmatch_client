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
import Req from '../RequestForReplacementView';

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
    width: '80%',
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

  const requests = props.req;

  const [reqCode, setReqCode] = useState(0);

  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage["userDetails"]).Type;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment >

                  <Modal
                    show={open}
                    onHide={handleClose}
                  >
                    <div className={classes.paper}>
                    <Req approveTrainer={props.approveTrainer} declineTrainer={props.declineTrainer} req={requests && requests.filter((val)=>(val.ReplacmentCode === reqCode))} stage="4"/>
                    </div>                  
                  </Modal>


     <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12}><h4 style={{textAlign:'right'}}>היסטוריית החלפות</h4></Grid>
            {requests && requests.sort((a, b) => a.ReplacementDate > b.ReplacementDate ? 1 : -1).filter((card)=>(card.IsHistory ===true && card.RequestStatus == "approved" && card.IsAprrovedByTrainer == "true")).map((card) => (
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
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                        <Button onClick={()=>{
                        let branchChat = {
                        Code: card.BranchCode,
                        Name:card.Name,
                        Image:card.Logo
                          }
                        localStorage["chat"] = JSON.stringify(branchChat);
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
          </Grid>
        </Container>
      </main>
      
    </React.Fragment>
  );
}
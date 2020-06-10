import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import TextField from '@material-ui/core/TextField';
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
import BranchProfile from './ChosenBranchProfile';
import SearchIcon from '@material-ui/icons/Search';



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
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignSelf:'center',
    marginTop:'50px',
  },

}));


export default function Album() {
  const classes = useStyles();
  const history = useHistory();

  const [branchCode, setBranchCode] = useState(0);

  const [state, setState] = useState({
    branchData:[]
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Branch",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res); setState({...state,branchData:res})})
  .catch((error)=>console.log(error))
  
 
  },[]);

  const viewProfile = (branchCode) =>{
    let branch = {
      BranchCode: branchCode
    }
    localStorage["branch"] = JSON.stringify(branch);
    //history.push("/BranchProfile");
  }

  return (
    <React.Fragment >

                    <Modal
                    show={open}
                    onHide={handleClose}
                  >
                    <div className={classes.paper}>
                    <BranchProfile/>
                    </div>                  
                  </Modal>

      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              מאגר מועדונים
            </Typography>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
            <div className={classes.search}>
            <TextField variant='outlined'
            fullWidth
            lable='חיפוש לפי שם סניף'     
            />
          </div>
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
        
          <Grid container spacing={4}>
            {state.branchData.map((card) => (
              <Grid item key={card.BranchCode} xs={6} md={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                      {card.Name} 
                    </Typography>
                    <Typography>
                      {card.Description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          let branch = {
                            BranchCode: card.BranchCode
                          }
                          localStorage["branch"] = JSON.stringify(branch);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>

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


{/* <InputBase
placeholder="חיפוש"
fullWidth
style={{backgroundColor:"lightblue"}}
classes={{
  root: classes.inputRoot,
  input: classes.inputInput,
}}
inputProps={{ 'aria-label': 'search' }}
/> */}
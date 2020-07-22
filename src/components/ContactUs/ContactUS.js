import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ContactUs() {
  const history = useHistory();
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    body: "",
  });

  const [userCode , setUserCode] = useState(0);
  const [sender, SetSender] =useState("");


  useEffect(() => {

    const user = JSON.parse(localStorage["userDetails"]);
    let code = 0;
     if(user.Type === "Branch")
      {
          code = user.BranchCode;
          fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Branch/getBranch/'+code+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log(res);SetSender(res.Email)})
        .catch((error)=>console.log(error))
      }           
      else
      {
          code = user.TrainerCode;
          fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Trainer/getTrainer/'+code+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log("data:",res);SetSender(res.Email)})
        .catch((error)=>console.log(error))
      }
                    
     setUserCode (code);
    
  },[]);
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
  }


  const validate = ()=>{
    const { title, body } = state;
   if(title === "")
        swal("נא למלא כותרת")
    if(body === "")
        swal("נא למלא את גוף ההודעה")
    else
        swal("סבבה")
}


  return (
    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         צור קשר
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="subject"
            label="כותרת"
            name="subject"
            autoComplete="subject"
            autoFocus
            onChange= {(e) => setState({...state, title: e.target.value})}
          />
          <TextField
            
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="text"
            label="גוף ההודעה"
            type="text"
            id="text"
            autoComplete="text"
            onChange= {(e) => setState({...state, body: e.target.value})}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            <SendIcon/>

          </Button>
          <Grid container>
            <Grid item>
				<h6 >ניתן לפנות בכל עת לכתובת sportmatch8@gmail.com </h6>
                <hr/>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
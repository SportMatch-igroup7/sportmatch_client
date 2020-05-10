import React, { useState } from 'react';
import {useHistory} from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import RI from '../commons/RoundedImage';
//event listener react 


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function SignIn({props = ""}) {
  const history = useHistory();
  const classes = useStyles();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
  }

  //setState({...state, password: 'dfdsfds'});

  const validate = ()=>{
    const { email, password } = state;
    console.log(email,password)
    let e = validateEmail(email);
    let p = validatePassword(password);
    if(!e)
            swal("הוכנס אימייל לא חוקי");
    if(!p)
            swal ("אורך הסיסמה המינימלי הוא 6 תווים")    
    if(e==true &&p==true)
    {
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/User/getUser/'+email+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        successGetUser(res))
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got users'))
    }       
}

 const validateEmail=(email)=> {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const validatePassword=(password)=>{
    if (password.length >=6)
    return true;
    else
    return false;
}


  const successGetUser=(data)=>{
    console.log(data);
    console.log("success");
    if (data.length < 1)
        swal("האימייל לא קיים במערכת");
    else
        checkPassword(data);
}

// const errorGetUser=(err)=>{
//     console.log(err);
// }

const checkPassword=(data)=> {
    console.log(data.Password)
    if (state.password == data.Password)
        checkType(data);
    else
        swal("הסיסמה שהוזנה אינה נכונה")
}

const checkType=(data) =>{
    if (data.Type == 'Branch')
    {
        console.log('Branch'); 
        let branch= {
        BranchCode: data.Code,
        Email: data.Email,
        Type: data.Type
        }
        localStorage["userDetails"] = JSON.stringify(branch);
        history.push("/BranchMain");
    }
    else
    {
        console.log('Trainer');
        let trainer= {
            TrainerCode: data.Code,
            Email: data.Email,
            Type: data.Type
            }
        localStorage["userDetails"] = JSON.stringify(trainer);
        history.push("/TrainerMain");
    }
        
}

const trainerRegistration=()=>{
    history.push("/TrainerSignUp");
}

const branchRegistration=()=>{
    history.push("/BranchSignUp");
}

  return (
    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          כניסת רשומים
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="אימייל"
            name="email"
            autoComplete="email"
            autoFocus
            onChange= {(e) => setState({...state, email: e.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange= {(e) => setState({...state, password: e.target.value})}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            התחבר
          </Button>
          <Grid container>
            <Grid item>
							<h4>עדיין לא רשום? הירשם כעת </h4>
            </Grid>
          </Grid>
          <Grid container>
          <Grid item xs={6} className="pic">
            הירשם כמאמן
            <RI action={trainerRegistration}  value="trainer" image='images/trainer.jpg' width="110" height="110" size="8" color='#6666ff' />
            </Grid>
            <Grid item xs={6} className="pic" >
              הירשם כמועדון
            <RI action={branchRegistration}  value="gym" image='images/gym.jpg' width="110" height="110" size="8" color='#6666ff' />
            </Grid>
          </Grid>
          
        </form>
      </div>
    </Container>
  );
}
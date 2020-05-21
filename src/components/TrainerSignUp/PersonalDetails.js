import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RI from '../../commons/RoundedImage';
import FileUploaded from '../../commons/fileUpload';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import {ajaxCall} from '../../commons/ajaxCall';
import swal from 'sweetalert';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import Qualification from '../OLD/Qualifications';
import { store } from '../../store/MainStore';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PersonalDetails({onDone = () => {}}) {
  
  const classes = useStyles();

  const [ mainState, dispatch]  = useContext(store);

  // useEffect(() => {
  //   dispatch({
  //     type: 'SET_TRAINER_CODE',
  //     value: 12345,
  //   });
  // }, []);

    const [state, setState] = useState({
        email:'',
        password:'',
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsyuHcX3SjjrV1IDflNLxre1r2b-jqFKefrWEQpOnUsbbajv1J&usqp=CAU',
        firstName:'',
        lastName:'',
        bDate:'',
        gender:'',
        phoneNo1:'',
        phoneNo2:'',
        aboutMe:'',
        pricePerHour:0,
      })

    const [flag, setFlag ] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
      }

      const next = (e) => {
        handleSubmit(e);
        validate();
      };

      const validate = ()=>{
        const email = state.email;
        const password = state.password;
        let e = validateEmail(email);
        let p = validatePassword(password);
        let v = validateDetails();
        if(!e)
            swal("האימייל שהוזן אינו תקין");
        if(!p)
            swal("אורך הסיסמה חייב להיות 6 תווים לפחות")
        if(e === true && p === true && v === true)
        {
          setFlag(true);
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

    const validateDetails=()=>
    {
        if(state.firstName ==='')
            {
                swal('הזן שם פרטי');
                return false
            }

        if(state.lastName ==='')
        {
            swal('הזן שם משפחה');
            return false
        }
        if(!validateDate(state.bDate))
        {
            swal('הוזן תאריך לידה לא תקין');
            return false
        }

        if(state.gender ==='')
        {
            swal('בחר מין');
            return false
        }

        if(state.PhoneNo1 ==='')
        {
            swal('הזן מספר טלפון');
            return false
        }
        

        // if(state.PricePerHour<=0)
        // {
        //     swal('הזן מחיר לשעה');
        //     return false
        // }
        else return true;

    }

    const validateDate=(d)=>{
      let todayDate = new Date().toISOString().substr(0, 10);
      if(d<=todayDate)
      return true;
      else return false;
  }
    
    const successGetUser=(data)=>{
      console.log(data.Code);
      if (data.Code>0)
            swal("האימייל כבר קיים במערכת");
      else
            SignInTrainer();
    }

    const SignInTrainer=()=> {
        //const {Email, Password, FirstName, LastName, BDate, Gender, PhoneNo1, PhoneNo2, AboutMe, PricePerHour,Photo} = this.state;
        let trainer = {
            FirstName: state.firstName,
            LastName: state.lastName,
            Email: state.email,
            DateOfBirth:state.bDate,
            Phone1: state.phoneNo1,
            Phone2: state.phoneNo2,
            Gender: state.gender,
            Password: state.password,
            AboutMe: state.aboutMe,
            PricePerHour: state.pricePerHour,
            Image:state.photo
        }
        console.log(trainer);

        fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Trainer",{
          method:'POST',
          headers:{
              Accept:'application/json','Content-Type':'application/json',
          },
          body:JSON.stringify(trainer)
      })
      .then((response)=>response.json())
      .then((res)=>successSignInTrainer(res))
      .catch((error)=>console.log(error));
      
        //ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/Trainer", JSON.stringify(trainer), successSignInTrainer, errorSignInTrainer);
    }


    const successSignInTrainer=(data)=> {
        localStorage["userDetails"] = JSON.stringify(data);
        dispatch({
          type: 'SET_TRAINER_CODE',
          value: data.TrainerCode,
        });
        swal("success");
        console.log(data);
        onDone();
    }

    
     const fileUploaded=(filePath)=>{
        if(filePath.includes('jpg' || 'png' || 'jpeg'))
                {
                    console.log('img:'+filePath);
                    setState({...state,photo:filePath})
                }
        else
        {
            console.log(filePath);
            setState({...state,docPath:filePath}) 
        }
       
    }

    const marks = [
        {
          value: 0,
          label: '0₪',
        },
        {
            value: 100,
            label: '100₪',
          },
        {
          value: 250,
          label: '250₪',
        },
        {
          value: 400,
          label: '400₪',
        },
        {
          value: 500,
          label: '500₪',
        },
      ];

    const valuetext=(value) => {
        return `${value}₪`;
      }

    // const setPrice=(value)=>{
    //   console.log(value);
    //   setState({...state,pricePerHour:value})
    //   //ariaValueNow
    // }

  return (
    <Container component="main" maxWidth="xs" dir="rtl">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        פרטים אישיים
      </Typography>
      <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="אימייל"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setState({...state,email:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setState({...state,password:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
            <label >תמונה</label>
            <FileUploaded onFileUploaded={(filePath) => fileUploaded(filePath)}/>
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="שם פרטי"           
                onChange={(e) => setState({...state,firstName:e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setState({...state,lastName:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
             id="date"
            label="תאריך לידה"
             type="date"
            defaultValue="2017-05-24"
            onChange={(e) => setState({...state,bDate:e.target.value})}
            InputLabelProps={{
            shrink: true,
        }}
      />
            </Grid>
            <Grid item xs={6} className="pic">
            <RI action={(e) => setState({...state,gender:"נקבה"})} value="נקבה" image='images/female.jpg' width="120" height="120" size="8" color={state.gender.includes("נקבה") ? '#6666ff': "lightgray"}/>
                 <p>אני אישה</p>
            </Grid>
            <Grid item xs={6} className="pic">
            <RI action={(e) => setState({...state,gender:"זכר"})} value="זכר" image='images/male.jpg' width="120" height="120" size="8" color={state.gender.includes("זכר") ? '#6666ff': "lightgray"}/>
                 <p>אני גבר</p>
            </Grid>
            <Grid item xs={6}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="phone1"
                label="טלפון1"
                name="phone1"
                autoComplete="phone1"
                onChange={(e) => setState({...state,phoneNo1:e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
                variant="outlined"
                fullWidth
                id="phone2"
                label="טלפון2"
                name="phone2"
                autoComplete="phone2"
                onChange={(e) => setState({...state,phoneNo2:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
                מחיר לשעה
            <Slider
            defaultValue={100}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slivaluetextder-custom"
             step={10}
             valueLabelDisplay="auto"
             marks={marks}
             max={500}
             onChange={(e) => setState({...state,pricePerHour:parseInt(e.target.ariaValueNow)})}          
      />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                id="aboutMe"
                label="קצת עליי"
                name="aboutMe"
                autoComplete="aboutMe"
                onChange={(e) => setState({...state,aboutMe:e.target.value})}
              />
            </Grid>   
          </Grid>
          <div className={classes.buttons} style={{direction:"initial"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={next}
                    className={classes.button}
                  >
                    המשך
                  </Button>
                  </div>
    </React.Fragment>
    </Container>
  );
}
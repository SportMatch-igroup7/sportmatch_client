import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RI from '../../../commons/RoundedImage';
import FileUploaded from '../../../commons/fileUpload';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import swal from 'sweetalert';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { store } from '../../../store/MainStore';
import Paper from '@material-ui/core/Paper';


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
  const history = useHistory();

  const [ mainState, dispatch]  = useContext(store);

  const [trainerData, setTrainerData] = useState([]);

  const [emailFlag, setEmailFlag] = useState(false);

  const [price, setPrice] = useState(0);




  useEffect(() => {

      const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;
      //const trainerCode = 117;
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Trainer/getTrainer/'+trainerCode+"/",{
          method:'GET',
          headers:{
              Accept:'application/json','Content-Type':'application/json',
          },
      })
      .then((response)=>response.json())
      .then((res)=>
      {console.log("data:",res);setTrainerData(res);
      })
      .catch((error)=>console.log(error))

      },[]);

    const [flag, setFlag ] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
      }

      const next = (e) => {
        handleSubmit(e);
        validate();
      };

      const onChangeEmail = (e) =>
      {
        setTrainerData({...trainerData,Email:e.target.value});
        setEmailFlag(true);
      }


      const validate = ()=>{
        const email = trainerData.Email;
        const password = trainerData.Password;

        let p = validatePassword(password);
        let v = validateDetails();

        if(!p)
            swal("אורך הסיסמה חייב להיות 6 תווים לפחות")
        if( p === true && v === true)
          saveChanges();      
    }


    const validatePassword=(password)=>{
        if (password.length >=6)
        return true;
        else
        return false;
    }

    const validateDetails=()=>
    {
        if(trainerData.FirstName ==='')
            {
                swal('הזן שם פרטי');
                return false
            }

        if(trainerData.LastName ==='')
        {
            swal('הזן שם משפחה');
            return false
        }
        if(!validateDate(trainerData.DateOfBirth))
        {
            swal('הוזן תאריך לידה לא תקין');
            return false
        }

        if(trainerData.Gender ==='')
        {
            swal('בחר מין');
            return false
        }

        if(trainerData.Phone1 ==='')
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
    

    const saveChanges=()=> {
      setTrainerData({...trainerData,PricePerHour:price});
        //const {Email, Password, FirstName, LastName, BDate, Gender, PhoneNo1, PhoneNo2, AboutMe, PricePerHour,Photo} = this.state;
        // let trainer = {
        //     FirstName: state.firstName,
        //     LastName: state.lastName,
        //     Email: state.email,
        //     DateOfBirth:state.bDate,
        //     Phone1: state.phoneNo1,
        //     Phone2: state.phoneNo2,
        //     Gender: state.gender,
        //     Password: state.password,
        //     AboutMe: state.aboutMe,
        //     PricePerHour: state.pricePerHour,
        //     Image:state.photo
        // }
        console.log(trainerData);
        fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Trainer/UpdateTrainerPersonalDetails",{
          method:'PUT',
          headers:{
              Accept:'application/json','Content-Type':'application/json',
          },
          body:JSON.stringify(trainerData)
      })
      .then((response)=>response.json())
      .then((res)=>{console.log("success update trainer details");
      setTimeout(() => {
        history.push("/TrainerNav");
      }, 3000)})
      .catch((error)=>console.log(error));
        
    }


    const successSignInTrainer=(data)=> {
        localStorage["userDetails"] = JSON.stringify(data);
        swal("success");
        console.log(data);
        onDone();
    }

    const errorSignInTrainer=(err)=> {
        console.log(err);
    }
    
     const fileUploaded=(filePath)=>{
        if(filePath.includes('jpg' || 'png' || 'jpeg'))
                {
                    console.log('img:'+filePath);
                    setTrainerData({...trainerData,Image:filePath})
                }
        else
                swal("הועלתה תמונה בפורמט לא תקין, אנא נסה שנית")
    }

   

    const valuetext=(value) => {
        setPrice(value);
        return `${value}₪`;
      }


    const check = () =>{
      console.log(trainerData);
    }

    const refreshPage= () => {
      window.location.reload(false);
    }

    const back = () =>{
      history.goBack()
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

  return (
    <Container component="main" maxWidth="xs" dir="rtl" >
    <main className={classes.layout}>
      <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom style={{textAlign:'center',fontWeight:'bold'}}>
        עריכת פרטים אישיים
        <hr/>
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} style={{textAlign:'center'}}>
        <img
          src={trainerData.Image}
          alt="avatar"
          className="avatar-img"
          />
        </Grid>
          {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="אימייל"
                name="email"
                autoComplete="email"
                placeholder={trainerData.Email}
                autoFocus
                onChange={onChangeEmail}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                placeholder={trainerData.Password}
                autoComplete="current-password"
                onChange={(e) => setTrainerData({...trainerData,Password:e.target.value})}
              />
            </Grid>
            <Grid item xs={12} style={{textAlign:'right'}}>
            <label >טען תמונה חדשה</label>
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
                placeholder={trainerData.FirstName}         
                onChange={(e) => setTrainerData({...trainerData,FirstName:e.target.value})}
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
                placeholder={trainerData.LastName}
                onChange={(e) => setTrainerData({...trainerData,LastName:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
             id="date"
            label="תאריך לידה"
            fullWidth
            type="date"
            defaultValue={trainerData.DateOfBirth}
            onChange={(e) => setTrainerData({...trainerData,DateOfBirth:e.target.value})}
            InputLabelProps={{
            shrink: true,
        }}
      />
            </Grid>
            <Grid item xs={6} className="pic">
            <RI action={(e) => setTrainerData({...trainerData,Gender:"נקבה"})} value="נקבה" image='images/female.jpg' width="120" height="120" size="8" color={trainerData.Gender === "נקבה" ? '#6666ff': "lightgray"}/>
                 <p>אני אישה</p>
            </Grid>
            <Grid item xs={6} className="pic">
            <RI action={(e) => setTrainerData({...trainerData,Gender:"זכר"})} value="זכר" image='images/male.jpg' width="120" height="120" size="8" color={trainerData.Gender === "זכר" ? '#6666ff': "lightgray"}/>
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
                placeholder={trainerData.Phone1}
                onChange={(e) => setTrainerData({...trainerData,Phone1:e.target.value})}
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
                placeholder={trainerData.Phone2}
                onChange={(e) => setTrainerData({...trainerData,Phone2:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}style={{textAlign:'right'}}>
                מחיר לשעה
            <Slider
            defaultValue={trainerData.PricePerHour}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slivaluetextder-custom"
             step={10}
             valueLabelDisplay="auto"
             marks={marks}
             max={500}
            // onChange={setPrice}
             
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
                placeholder={trainerData.AboutMe}
                onChange={(e) => setTrainerData({...trainerData,AboutMe:e.target.value})}
              />
            </Grid>   
          </Grid>
          <div className={classes.buttons} style={{direction:"initial"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={back}
                    className={classes.button}
                  >
                    ביטול
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={next}
                    className={classes.button}
                  >
                    שמור שינויים
                  </Button>
                  </div>
          </Paper>
    </main>
    </Container>
  );
}
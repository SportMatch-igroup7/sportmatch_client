import React, { useState, useEffect, useContext } from 'react';
import { store } from '../../store/MainStore';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import swal from 'sweetalert';
import Slider from '@material-ui/core/Slider';
import TrainersMatches from './TrainersMatch';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    direction:'rtl',
    textAlign:'right'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [ mainState, dispatch]  = useContext(store);

  const [qualData , setQualData] = useState({dataQual:[],});
  const [diffData , setDiffData] = useState({dataDiffLevel:[],});
  const [langData , setLangData] = useState({dataLang:[],});
  const [popData , setPopData] = useState({dataPop:[],});
  const [popCode, setPopCode] = useState(0);
  const [langCode, setLangCode] = useState(0);
  const [classCode, setClassCode] = useState(0);
  const [diffCode, setDiffCode] = useState(0);

  const [nextFlag, setNextFlag] = useState(false);

  const [contactName, setContactName] = useState("");
  const [classTypeCode, setClassTypeCode] = useState("");
  const [city, setCity] = useState("");
  const [fromHour, setFromHour] = useState("");
  const [toHour, setToHour] = useState("");
  const [replacementDate, setReplacementDate] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [comments, setComments] = useState("");
  const [difficultyLevelCode, setDifficultyLevelCode] = useState("");
  const [maxPrice, setMaxPrice] = useState(150);
  const [languageCode, setLanguageCode] = useState("");
  const [populationCode, setPopulationCode] = useState("");
  const [requestData, setRequestData] = useState("");

  const [state, setState] = useState({
    publishDateTime: new Date().toISOString(),
    contactName:'',
    branchCode: JSON.parse(localStorage["userDetails"]).BranchCode,
    classTypeCode:'',
    city:'',
    fromHour:'',
    toHour:'',
    replacementDate:'',
    classDescription:'',
    comments:'',
    difficultyLevelCode:'',
    maxPrice:150,
    languageCode:'',
    populationCode:'',
  });

  useEffect(() => {
    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Qualification',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{console.log(res); setQualData({qualData,dataQual:res})})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got qualifications'));
    
    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/DifficultyLevel',{
          method:'GET',
          headers:{
              Accept:'application/json','Content-Type':'application/json',
          },
      })
      .then((response)=>response.json())
      .then((res)=>{console.log(res); setDiffData({diffData,dataDiffLevel:res})})
      .catch((error)=>console.log(error))
      .finally(()=>console.log('got diff'));
    
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Language",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then((res)=>{console.log(res); setLangData({langData,dataLang:res})})
    .catch((error)=>console.log(error))
    .finally(()=>console.log('got lang'));

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Population",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=>{console.log(res); setPopData({popData,dataPop:res})})
  .catch((error)=>console.log(error))
  .finally(()=>console.log('got pop'));

  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
  }

  const prevent = async (e) =>{
    e.preventDefault();
  }


const validate=()=>{
    if( validateHours() &&  validateReplacementDate())
         Request();
}


const Request=()=> {

    let request = {
        PublishDateTime: new Date().toISOString(),
        ContactName: contactName,
        BranchCode: JSON.parse(localStorage["userDetails"]).BranchCode,
        ClassTypeCode: classCode,
        FromHour: fromHour,
        ToHour: toHour,
        ReplacementDate: replacementDate,
        ClassDescription: classDescription,
        Comments: comments,
        DifficultyLevelCode: diffCode,
        MaxPrice: maxPrice,
        LanguageCode: langCode,
        PopulationCode: popCode
    }
    console.log(request);

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestForReplacement",{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(request)
    })
    .then((response)=>response.json())
    .then((res)=>{console.log(res); setRequestData(res); setNextFlag(true)})
    .catch((error)=>console.log(error))
}


const validateHours=()=>{
    if( fromHour< toHour)
    return true;
    else
{
    swal("שעות ההחלפה אינן תקינות");
    return false;
}
    
}

const validateReplacementDate=()=>{
    let todayDate = new Date().toISOString().substr(0, 10);
    if( replacementDate>=todayDate)
    return true;
    else
    {
        swal("תאריך ההחלפה לא תקין");
        return false;
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

function valuetext(value) {
  setMaxPrice(value);
  return `${value}₪`;
}

function price(value){
  console.log("price:",value)
  setMaxPrice(value);
}

if (nextFlag === false)
  return (
    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הודעת החלפה
        </Typography>
        <form className={classes.form} noValidate dir="rtl" onSubmit={prevent}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="שם איש קשר"
                name="contact"
                autoComplete="contact"
                onChange={(e) => setContactName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              סוג שיעור
            </Grid>
            {qualData.dataQual.map(val =>
               <Button variant="outlined" color="primary" onClick={(e)=>setClassCode(val.TypeCode)} style={{margin:'2px', color:'black', backgroundColor: classCode===(val.TypeCode) ? 'rgb(235, 135, 218)': ''}} value = {val.TypeCode} key = {val.TypeCode}>{val.TypeName} </Button> )}
          
          <Grid item xs={12}>
          <TextField
        id="repDate"
        label="תאריך ההחלפה"
        type="date"
        className={classes.textField}
        onChange={(e)=>setReplacementDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
          </Grid>
          <Grid item xs={6}>
          <TextField
        id="fromHour"
        label="משעה"
        type="time"
        //className={classes.textField}
        onChange={(e)=>setFromHour(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
          </Grid>
          <Grid item xs={6}>
          <TextField
        id="toHour"
        label="עד שעה"
        type="time"
        //className={classes.textField}
        onChange={(e)=>setToHour(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
          </Grid>
      <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="classDesc"
            label="תיאור השיעור"
            name="classDesc"
            autoComplete="classDesc"
            onChange={(e) => setClassDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="com"
            label="הערות נוספות"
            name="com"
            autoComplete="com"
            onChange={(e) => setComments(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
              רמת קושי
            </Grid>
            {diffData.dataDiffLevel.map(val =>
               <Button variant="outlined" color="primary" onClick={(e)=>setDiffCode(val.LevelCode)} style={{margin:'2px', color:'black', backgroundColor: diffCode===(val.LevelCode) ? 'rgb(235, 135, 218)': ''}} value = {val.LevelCode} key = {val.LevelCode}>{val.LevelName} </Button> )}
          
          <Grid item xs={12}>
                מחיר לשעה
            <Slider
            defaultValue={100}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
             step={10}
             valueLabelDisplay="auto"
             marks={marks}
             max={500}
             //onChange={price}
             
      />
            </Grid>
            <Grid item xs={12}>
              שפת השיעור
            </Grid>
            {langData.dataLang.map(val =>
               <Button variant="outlined" color="primary" onClick={(e)=>setLangCode(val.LanCode)} style={{margin:'2px', color:'black', backgroundColor: langCode===(val.LanCode) ? 'rgb(235, 135, 218)': ''}} value = {val.LanCode} key = {val.LanCode}>{val.LanName} </Button> )}
          
          <Grid item xs={12}>
              אוכלוסיית יעד
            </Grid>
            {popData.dataPop.map(val =>
               <Button variant="outlined" color="primary" onClick={(e)=>setPopCode(val.Code)} style={{margin:'2px', color:'black', backgroundColor: popCode===(val.Code) ? 'rgb(235, 135, 218)': ''}} value = {val.Code} key = {val.Code}>{val.PName} </Button> )}
          
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            מצא מאמנים מתאימים
          </Button>
        </form>
      </div>
    </Container>
  );
  else
  return (<TrainersMatches req={requestData}/>)
}
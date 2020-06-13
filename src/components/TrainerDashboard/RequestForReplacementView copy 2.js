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
import TrainersMatches from '../BranchDashboard/TrainersMatch';

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

export default function RequestForReplacementView(props) {
  console.log(props);
  console.log(props.req[0].ReplacmentCode);
  console.log("stage:",props.stage);
  const replacmentCode = props.req[0].ReplacmentCode;
  console.log("replacementCode:",replacmentCode);
  const trainerCode = props.req[0].TrainerCode;
  console.log("trainerCode:",trainerCode);
  const data = props.req[0];
  const classes = useStyles();
  const history = useHistory();
  const [branchData,setBranchData] = useState();
const branchCode = props.req[0].BranchCode;

  useEffect(() => {
    console.log(branchCode);
    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Branch/getBranch/'+branchCode+"/",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then((res)=>
    {console.log(res);setBranchData(res)})
    .catch((error)=>console.log(error))
    .finally(()=>console.log('got branch details'))
  
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate();
  }

  const prevent = async (e) =>{
    e.preventDefault();
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
  return `${value}₪`;
}

const btn = () => {
  if(props.stage === "1")
    return(
      <Grid>    
      <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submit}
      style={{backgroundColor:"green"}}
      onClick={() =>props.approveTrainer(replacmentCode,trainerCode)}
    >
      אשר בקשה
    </Button>

    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submit}
      style={{backgroundColor:"red"}}
      onClick={() =>props.declineTrainer(replacmentCode,trainerCode)}
    >
      סרב
    </Button>
    </Grid>);

    else if (props.stage === "2")
     return (
   <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submit}
      style={{backgroundColor:"red"}}
      onClick={() => props.declineTrainer(replacmentCode,trainerCode)}
    >
      סרב
    </Button>);
}


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
        <form className={classes.form} noValidate dir="rtl">
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled={true}
                fullWidth
                id="contact"
                label="שם הסניף"
                name="contact"
                autoComplete="contact"
                value = {branchData && branchData.Name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled={true}
                fullWidth
                id="contact"
                label="כתובת הסניף"
                name="contact"
                autoComplete="contact"
                value = {branchData && branchData.Address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled={true}
                fullWidth
                id="contact"
                label="טלפון"
                name="contact"
                autoComplete="contact"
                value = {branchData && branchData.PhoneNo}
              />
            </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled={true}
                fullWidth
                id="contact"
                label="שם איש קשר"
                name="contact"
                autoComplete="contact"
                value = {data.ContactName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled={true}
                fullWidth
                id="classType"
                label="סוג שיעור"
                name="classType"
                autoComplete="classType"
                value = {data.TypeName}
              />
            </Grid>

          <Grid item xs={12}>
          <TextField
              id="repDate"
              disabled={true}
              label="תאריך ההחלפה"
              type="date"
              className={classes.textField}
              //onChange={(e)=>setReplacementDate(e.target.value)}
              value = {data.ReplacementDate}
      />
          </Grid>

          <Grid item xs={6}>
          <TextField
              id="fromHour"
              disabled={true}
              label="משעה"
              type="time"
              //className={classes.textField}
              value = {data.FromHour}
            />
          </Grid>

          <Grid item xs={6}>
          <TextField
              id="toHour"
              disabled={true}
              label="עד שעה"
              type="time"
              //className={classes.textField}
              value = {data.ToHour}
            />
      </Grid>

      <Grid item xs={12}>
          <TextField
            variant="outlined"
            disabled={true}
            fullWidth
            id="classDesc"
            label="תיאור השיעור"
            name="classDesc"
            autoComplete="classDesc"
            value = {data.ClassDescription}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            disabled={true}
            fullWidth
            id="com"
            label="הערות נוספות"
            name="com"
            autoComplete="com"
            value = {data.Comments}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            disabled={true}
            fullWidth
            id="dif"
            label="רמת קושי"
            name="dif"
            autoComplete="dif"
            value = {data.LevelName}
          />
        </Grid>

          <Grid item xs={12}>
                מחיר לשעה
            <Slider
            defaultValue={100}
            getAriaValueText={props.MaxPrice} //check how to get the value
            aria-labelledby="discrete-slider-custom"
             step={10}
             valueLabelDisplay="auto"
             marks={marks}
             max={500}
             
      />
            </Grid>

            <Grid item xs={12}>
          <TextField
            variant="outlined"
            disabled={true}
            fullWidth
            id="lang"
            label="שפת השיעור"
            name="lang"
            autoComplete="lang"
            value = {data.LName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            disabled={true}
            fullWidth
            id="pop"
            label="אוכלוסיית יעד"
            name="pop"
            autoComplete="pop"
            value = {data.PName}
          />
        </Grid>

          </Grid>
{btn()}
        </form>
      </div>
    </Container>
  );
}
import React, { useState, useEffect } from 'react';
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
import {ajaxCall} from '../../commons/ajaxCall';
import swal from 'sweetalert';
import $ from 'jquery';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    email:'',
    password:'',
    company:'',
    branchName:'',
    city:'',
    address:'',
    phoneNum:'',
    description:'',
    branchCodeFromDB:'',
    links:[],
    dataArea:[],
    dataCompany:[],
    dataLinks: [],
    numOfParameters : 0,
    parametersCode : [],
    isFlippedLink:false,
  });

  useEffect(() => {

    const promise = Promise.all([
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Area',{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    }),
    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Company',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      }),
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Company',{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        })
    ]);

    promise
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([dataArea, dataCompany, dataLinks]) => {
      setState({...state, dataArea, dataCompany, dataLinks});
    })
    .catch(e => {});


    // fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Area',{
    //         method:'GET',
    //         headers:{
    //             Accept:'application/json','Content-Type':'application/json',
    //         },
    //     })
    //     .then((response)=>response.json())
    //     .then((res)=>{console.log(res); setState({...state,dataArea:res})})
    //     .catch((error)=>console.log(error))
    //     .finally(()=>console.log('got areas'))

    // fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Company',{
    //   method:'GET',
    //   headers:{
    //       Accept:'application/json','Content-Type':'application/json',
    //   },
    //   })
    //   .then((response)=>response.json())
    //   .then((res)=>{console.log(res); setState({...state,dataCompany:res})})
    //   .catch((error)=>console.log(error))
    //   .finally(()=>console.log('got companies'))

    // fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Link",{
    //     method:'GET',
    //     headers:{
    //         Accept:'application/json','Content-Type':'application/json',
    //     },
    //     })
    //     .then((response)=>response.json())
    //     .then((res)=>{console.log(res); setState({...state,dataLinks:res})})
    //     .catch((error)=>console.log(error))
    //     .finally(()=>console.log('got links'))

    //   fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Parameter",{
    //       method:'GET',
    //       headers:{
    //           Accept:'application/json','Content-Type':'application/json',
    //       },
    //       })
    //     .then((response)=>response.json())
    //     .then((res)=>{console.log(res); successGetParameters(res)})
    //     .catch((error)=>console.log(error))
    //     .finally(()=>console.log('got parameters'))

  },[]);

  //setState({...state, password: 'dfdsfds'});

  const handleSubmit = async (e) => {
    e.preventDefault();
  }


  return (
    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמת מועדון
        </Typography>
        <form className={classes.form} noValidate dir="rtl">
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
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">בחר עיר</InputLabel>
              <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={state.city}
              onChange={(e) => setState({...state,city:e.target.value})}
        >
              {state.dataArea && state.dataArea.map(area =>
                 <MenuItem key = {area.AreaCode} value = {area.AreaCode}>{area.AreaName} </MenuItem> )}
        </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label={"כתובת"}
                type="text"
                id="address"
                autoComplete="current-address"
                onChange={(e) => setState({...state,address:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="מספר טלפון"
                type="text"
                id="phone"
                autoComplete="current-phone"
                onChange={(e) => setState({...state,phoneNum:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              {state.dataCompany&& state.dataCompany.map(val =>
                 <button onClick={(e) => setState({...state,company:val.CompanyNo})} style={{margin:'2px', backgroundColor: state.company===(val.CompanyNo) ? 'lightblue': ''}} value = {val.CompanyNo} key = {val.CompanyNo}>{val.Name} </button> )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            הירשם
          </Button>
          <Grid container justify="flex-end" >
            <Grid item>
              <Link href='/' variant="body2">
                כבר רשום? לחץ כאן כדי להתחבר
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
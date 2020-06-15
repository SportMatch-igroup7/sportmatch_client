import React, { useState, useEffect, useContext } from 'react';
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
    border: 'dotted rgb(235, 135, 218)',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  text: {
    fontSize:'20px',
    textAlign:'right',
    paddingRight: '1em',
    direction:'rtl'
  }
}));

export default function RequestForReplacementView(props) {
  console.log(props);
  console.log(props.req[0]);
  const data = (props.req[0]);


  const replacmentCode = props.ReplacmentCode;;
  const classes = useStyles();
  const history = useHistory();
  const [branchData,setBranchData] = useState();
  const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;

  useEffect(() => {
  
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const prevent = async (e) =>{
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
          הודעת החלפה
        </Typography>
        <form className={classes.form} noValidate dir="rtl">
          <Grid container spacing={2} className={classes.text}>
          <Grid item xs={12}>
          <p>שם איש קשר: {data.ContactName}</p>
            </Grid>

            <Grid item xs={12}>
            <p>סוג שיעור: {data.TypeName}</p>
            </Grid>

          <Grid item xs={12}>
          <p>תאריך ההחלפה: {data.ReplacementDate}</p>
          </Grid>

          <Grid item xs={6}>
          <p>משעה: {data.FromHour}</p>
          </Grid>

          <Grid item xs={6}>
          <p>עד שעה: {data.ToHour}</p>
      </Grid>

      <Grid item xs={12}>
      <p>תיאור השיעור: {data.ClassDescription}</p>
        </Grid>

        <Grid item xs={12}>
        <p>הערות נוספות: {data.Comments}</p>
        </Grid>

        <Grid item xs={12}>
        <p>רמת קושי: {data.LevelName}</p>
        </Grid>

          <Grid item xs={12}>
          <p>שפת השיעור: {data.LName}</p>
          </Grid>

        <Grid item xs={12}>
        <p>אוכלוסיית יעד: {data.PName}</p>
        </Grid>

        </Grid>
        </form>
      </div>
    </Container>
  );
}
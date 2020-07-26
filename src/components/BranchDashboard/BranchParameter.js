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
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  lable:{
    fontSize:'15px',
    fontWeight:'bold',
    textAlign:'right',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [ mainState, dispatch]  = useContext(store);

  const [paramData , setParamData] = useState([]);
  //const [paramCode, setParamCode] = useState(0);

  const [state, setState] = useState({
    branchCode: JSON.parse(localStorage["userDetails"]).BranchCode
  });

  useEffect(() => {

    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/BranchParameter/GetBranchParameter/'+state.branchCode+"/",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then((res)=> {console.log(res);
                    setParamData(res);
                    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log('got branch parameters'))
  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    checkValid();
  }

  const SaveParameter = (e,code) =>{
    let paramCode = code;
    let arr = paramData;
    console.log(arr);
    let isExists = false;
    if(arr.length == 0)
    setParamData([...paramData,{BranchCode:state.branchCode,ParameterCode:paramCode, ParameterWeight: e.target.value}])
    else
  {  arr.map(val => {if (val.ParameterCode == paramCode){
      val.ParameterWeight = e.target.value
      isExists = true;
      }
    else
    setParamData([...paramData,{BranchCode:state.branchCode,ParameterCode:paramCode, ParameterWeight: e.target.value}])
  })}
  if ( isExists ===true)
  setParamData([...arr]);
  console.log(arr);
  }

  const checkValid=()=> {
    let arr = paramData;
    let sum = 0;
    paramData.map(val =>{
      sum += parseInt(val.ParameterWeight,10);
    })

    console.log(sum);
    if (sum != 100) {
        swal("כל הערכים צריכים להשלים ל100");
    }
    else
    {
      fetch("http://proj.ruppin.ac.il/igroup7/proj/api/BranchParameter",{
        method:'PUT',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(paramData)
    })
    .then((response)=>response.json())
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error))
    }
}

  return (
    <div>
    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ניהול פרמטרים
        </Typography>
          <Grid item xs={12}>
            <h6>* סכום כל הפרמטרים חייב להיות שווה ל-100</h6>
            </Grid>
        <form className={classes.form} noValidate dir="rtl">
          <Grid container spacing={1}>
            {
                paramData.map(val =>
                    <Grid item xs={12} key={val.ParameterCode}>
                      <p className={classes.lable}>{val.ParameterName1}</p>
                    <TextField
                      variant="outlined"
                      type="number"
                      fullWidth
                      id={val.parameterCode}
                      label= {`משקל נוכחי : ${val.ParameterWeight}`}
                      placeholder={`משקל נוכחי : ${val.ParameterWeight}`}
                      name="param"
                      autoComplete="param"
                      onChange={(e) => SaveParameter(e,val.ParameterCode)}
                    />
                  </Grid>
                    )
            }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            סיום
          </Button>
        </form>
      </div>
    </Container>
    <footer className="footer">
         <Typography variant="subtitle1" align="center" color="textSecondary" style={{fontWeight:'bold'}} component="p">
          sportmatch8@gmail.com <MailOutlineIcon/>
         </Typography>
       </footer>
      </div>

    
  );
}
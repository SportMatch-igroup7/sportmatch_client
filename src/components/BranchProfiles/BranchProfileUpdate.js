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
import RI from '../../commons/RoundedImage';
import swal from 'sweetalert';
import Popper from '@material-ui/core/Popper';

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
  popper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
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
  const [branchData, setBranchData] = useState([]);
  const [branchLinks, setBranchLinks] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const [ mainState, dispatch]  = useContext(store);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPopper = (event, code) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setLinkCode(code);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const [areaData , setAreaData] = useState({dataArea:[],});
  const [companyData , setCompanyData] = useState({dataCompany:[],});
  const [linksData , setLinksData] = useState([]);
  const [linksPath, setLinkPath] = useState([]);
  const [linkCode, setLinkCode] = useState(0);
  const [params, setParams] = useState([]);

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
    numOfParameters : 0,
    parametersCode : [],
    isFlippedLink:false,
  });

  const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;

  useEffect(() =>{
    console.log(linksPath);
  },[linksPath]);

  useEffect(() => {

    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Area',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>{console.log(res); setAreaData({areaData,dataArea:res})})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got areas'))

    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Company',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      })
      .then((response)=>response.json())
      .then((res)=>{console.log(res); setCompanyData({companyData,dataCompany:res})})
      .catch((error)=>console.log(error))
      .finally(()=>console.log('got companies'))

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Link",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        })
        .then((response)=>response.json())
        .then((res)=>{console.log(res); setLinksData([...res])})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got links'))

        fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Parameter",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        })
        .then((response)=>response.json())
        .then((res)=>{console.log("parameters:",res); setParams([...res])})
        .catch((error)=>console.log(error))

        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Branch/getBranch/'+branchCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {  console.log("the res is: "+JSON.stringify(res));
            setBranchData(res)
            setState({
                email: res.Email,
                password:res.Password,
                company:res.Company,
                branchName:res.Name,
                 /*city:res.Email,*/
                address:res.Address,
                phoneNum:res.PhoneNo,
                description:res.Description,
              /*  branchCodeFromDB:res.Email,
                numOfParameters : res.Email,
                parametersCode : res.Email,
                isFlippedLink:res.Email,*/
              }) 
        })
        .catch((error)=>{console.log("this is error: "+error)})
        }
  ,[]);


  const handleSave = async (e) => {
    e.preventDefault();
    validate();
  }

  const changePath = (e) =>{
    console.log(linkCode);
    let check = linksPath;
    let isExists = false;
    if(check.length == 0)
      setLinkPath([...linksPath,{linkCode:linkCode, path: e.target.value}])
    else
  {  check.map(val => {if (val.linkCode == linkCode){
      val.path = e.target.value
      isExists = true;
      }
    else
    setLinkPath([...linksPath,{linkCode:linkCode, path: e.target.value}])
  })}
  if ( isExists ===true)
  setLinkPath([...check]);
  console.log(check);
  }


const validate = ()=>{
    const email = state.email;
    const password = state.password;
   // let e = validateEmail(email);
    let p = validatePassword(password);
    //console.log(e,p);
    //if(!e)
      //  swal("הוכנס אימייל לא חוקי");
    if(!p)
        swal ("אורך הסיסמה המינימלי הוא 6 תווים")    
    if( p === true) //&& this.validateDetails()=== true) //
    {
    //   fetch('http://proj.ruppin.ac.il/igroup7/proj/api/User/getUser/'+email+"/",{
    //         method:'GET',
    //         headers:{
    //             Accept:'application/json','Content-Type':'application/json',
    //         },
    //     })
    //     .then((response)=>response.json())
    //     .then((res)=>
    //     successGetUser(res))
    //     .catch((error)=>console.log(error))
    //     .finally(()=>console.log('got users'))
    SignInBranch();
    }
}

// const validateEmail=(email)=> {
//     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
//   }

const validatePassword=(password)=>{
    if (password.length >=6)
    return true;
    else
    return false;
}

// const successGetUser=(data)=>{
//   if (data.Code)
//       swal("האימייל כבר קיים במערכת");
//   else
//       SignInBranch();
// }


const SignInBranch=()=> {
  let branch = {
      Name: state.branchName,
      Address: state.address,
      PhoneNo: state.phoneNum,
      Email: state.email,
      Description: state.description,
      CompanyNo: state.company,
      Password: state.password,
      AreaCode: state.city
  }
  console.log(branch);
//first update
//    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Branch",{
//         method:'POST',
//         headers:{
//             Accept:'application/json','Content-Type':'application/json',
//         },
//         body:JSON.stringify(branch)
//     })
fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Branch",{
    method:'PUT',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
    body:JSON.stringify(branch)
})
    .then((response)=>response.json())
    .then((res)=>successSignInBranch(res))
    .catch((error)=>console.log(error))
    .finally(()=>console.log('update branch'))
}

const successSignInBranch=(data)=> {
  let links = linksPath;
  let linksToDB = [];
   swal("success");
  console.log(data);
  setState({...state,branchCodeFromDB : data.BranchCode})
  
  //localStorage["userDetails"] = JSON.stringify(data);

  links.map(link =>{
    let branchLink = {
      BranchCode: data.BranchCode,
      LinkName: link.path,
      LinkCode: link.linkCode
    }
    linksToDB.push(branchLink)
  })
  console.log(linksToDB);
  fetch("http://proj.ruppin.ac.il/igroup7/proj/api/LinksTo",{
    method:'POST',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
    body:JSON.stringify(linksToDB)
})
.then((response)=>response.json())
.then((res)=>console.log("success post branch links"))
.catch((error)=>console.log(error));

console.log("params:",params);

params.map(param => {
  let branchParam = {
    BranchCode: data.BranchCode,
    ParameterCode: param.Pcode,
    ParameterWeight: params.length
  }
  console.log("branchParam:", branchParam)
 /* fetch("http://proj.ruppin.ac.il/igroup7/proj/api/BranchParameter",{
  method:'POST',
  headers:{
      Accept:'application/json','Content-Type':'application/json',
  },
  body:JSON.stringify(branchParam)
})*/
.then((response)=>response.json())
.then((res)=>console.log("success post branch parameters"), history.push("/BranchNav"))
.catch((error)=>console.log(error));
})
}



  return (
    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <div className={classes.paper}>
      <img
                        src={branchData.Logo}
                        alt="avatar"
                        className="avatar-img"
                        />

        <Typography component="h1" variant="h5">
          עריכת פרופיל מועדון
        </Typography>
        <form className={classes.form} noValidate dir="rtl">
          <Grid container spacing={2}>
          <Grid item xs={12}>
         
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label={state.email}
                name="email" 
                placeholder={state.email}
                autoComplete="email"
                disabled="true"
                onChange={(e) => setState({...state,email:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                placeholder={state.password}
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setState({...state,password:e.target.value})}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="branchName"
                label="שם הסניף"
                name="branchName"
                placeholder={state.branchName}
                autoComplete="branchName"
                onChange={(e) => setState({...state,branchName:e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">בחר אזור</InputLabel>
              <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={state.city}
               placeholder={branchData.AreaName}
              onChange={(e) => setState({...state,city:e.target.value})}
        >
              {areaData.dataArea && areaData.dataArea.map(area =>
                 <MenuItem key = {area.AreaCode} value = {area.AreaCode}>{area.AreaName} </MenuItem> )}
        </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                placeholder={state.address}
                label={"כתובת מלאה"}
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
                placeholder={state.phoneNum}
                label="מספר טלפון"
                type="text"
                id="phone"
                autoComplete="current-phone"
                onChange={(e) => setState({...state,phoneNum:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="desc"
                label="תיאור הסניף"
                name="desc"
                placeholder={state.description}
                autoComplete="desc"
                onChange={(e) => setState({...state,description:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              לינקים
            </Grid>
              {linksData && linksData.map((val,key) =>
                <Grid item xs={3} className="pic" key={key}>
                  <RI action = {(e) => handleClickPopper(e,val.LinkCode)} value={val.LinkCode} image={`images/${val.LinkName}.png`} key={val.LinkCode} width="60" height="60" size="8" color="#6666ff" />
                  <Popper id={id} open={open} anchorEl={anchorEl}>
                  <div className={classes.popper}> <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id={`link${val.LinkCode}`}
                label="הכנס קישור"
                name="link"
                autoComplete="link"
                value={linksPath[linkCode-1] && linksPath[linkCode-1].path}
                onChange={(e) => changePath(e,val.LinkCode)}
              />
            </Grid>
            </div>
                </Popper>
                </Grid>
              )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSave}
          >
            שמור
          </Button>
          <Grid container justify="flex-end" style={{direction: "initial"}} >
            <Grid item >
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
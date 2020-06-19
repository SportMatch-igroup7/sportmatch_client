import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import swal from 'sweetalert'
import Modal from '@material-ui/core/Modal';
import TrainerProfile from '../TrainerProfiles/ChosenTrainerProfile';
import '../TrainerDashboard/cards.css';
import Carousel from "react-elastic-carousel";
import Req from './RequestForReplacementView';
import NewRequests from './RequestsManagement/NewRequests';
import WaitingRequests from './RequestsManagement/WaitingRequests';
import ApprovedRequests from './RequestsManagement/ApprovedRequests';
import HistoricalRequests from './RequestsManagement/HistoricalRequests';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

//import './CarStyle.css';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
    border: 'dotted rgb(63, 81, 181)',
    textAlign:'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    direction:"rtl",
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height:"20%",
  },
  cardContent: {
    flexGrow: 1,
    direction:"rtl",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
      formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));



export default function Album(props) {
  const classes = useStyles();
  const history = useHistory();

  const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;
  const [requests, setRequests] = useState();
  const [reqCode, setReqCode] = useState(0);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [qualData, setQualData] = useState([]);
  const [qualName, setQualName] = React.useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [companyName, setCompanyName] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [index, setIndex] = useState(0);

  
  const handleSelectCarousel = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(qualName, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(qualName) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  useEffect(() => {

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestDetails/getTrainerRequests/" + trainerCode + '/',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res);
   setRequests(res);
   localStorage["trainerReq"] = JSON.stringify(res);
  })
  .catch((error)=>console.log(error))

    .catch((error)=>console.log(error))

        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Qualification',{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then((res)=>{console.log(res); setQualData(res)})
    .catch((error)=>console.log(error))

        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Company',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      })
      .then((response)=>response.json())
      .then((res)=>{console.log(res); setCompanyData(res)})
      .catch((error)=>console.log(error))
  
  },[]);


  const approveTrainer = (replacmentCode, trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      IsApprovedByTrainer: "true"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutIsApprovedTrainer",{
      method:'PUT',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(req)
  })
  .then((response)=>response.json())
  .then((res)=> console.log(res),
    setTimeout(() => {
      refreshPage()
    }, 2000))
  .catch((error)=>console.log(error))
  }

  const declineTrainer = (replacmentCode,trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      IsApprovedByTrainer: "false",
      RequestStatus: "closed"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutIsApprovedTrainerFalse",{
      method:'PUT',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(req)
  })
  .then((response)=>response.json())
  .then((res)=> console.log(res),
    setTimeout(() => {
      refreshPage()
    }, 2000))
  .catch((error)=>console.log(error))
  }

  const refreshPage= () => {
    window.location.reload(false);
  }

    const filterArr = (data) => {
    const QualRes = qualName.length === 0 ? true : qualName.includes(data.TypeName); 
    const CompanyRes = companyName.length === 0 ? true : companyName.includes(data.CompanyName); 
    return QualRes && CompanyRes;
  };

  return (
    <React.Fragment >
            <div className={classes.heroContent}>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              ניהול הודעות החלפה
            </Typography>

        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">הכשרות</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={qualName}
          onChange={(e) => setQualName(e.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {qualData && qualData.map((qual) => (
            <MenuItem key={qual.TypeCode} value={qual.TypeName}>
              <Checkbox checked={qualName.indexOf(qual.TypeName) > -1} />
              <ListItemText primary={qual.TypeName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">חברות</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {companyData && companyData.map((company) => (
            <MenuItem key={company.CompanyNo} value={company.Name}>
              <Checkbox checked={companyName.indexOf(company.Name) > -1} />
              <ListItemText primary={company.Name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </div>

      
        <NewRequests comp={props.comp} req={requests && requests.filter(filterArr)} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
        <WaitingRequests comp={props.comp} req={requests && requests.filter(filterArr)} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
        <ApprovedRequests comp={props.comp} req={requests && requests.filter(filterArr)} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
        <HistoricalRequests comp={props.comp} req={requests && requests.filter(filterArr)} approveTrainer={approveTrainer} declineTrainer={declineTrainer}/>
      
    </React.Fragment>
  );
}
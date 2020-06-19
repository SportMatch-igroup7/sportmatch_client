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
import '../TrainerDashboard/cards.css';
import Carousel from "react-elastic-carousel";
import OpenRequests from './RequestsManagement/OpenRequests';
import ApprovedRequests from './RequestsManagement/ApprovedRequests';
import HistoricalRequests from './RequestsManagement/HistoricalRequests';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


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

  const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;

  const [requests, setRequests] = useState();

  const [distinctReq, setDistinctReq] = useState();
  
  const [reqCode, setReqCode] = useState(0);

  const [open, setOpen] = React.useState(false);

  const [qualData, setQualData] = useState([]);

  const [qualName, setQualName] = React.useState([]);

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

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestDetails/getBranchRequests/" + branchCode + '/',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res);
   setRequests(res);
   setDistinctRequests(res);
  })
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
  
  },[]);


  const refreshPage= () => {
    window.location.reload(false);
  }

  const setDistinctRequests = (res) => {
    const distinctReq = [];
    let request = "";
    const reqCodes = [];
  
    const arr = [...new Set(res.map((x) => {
      if (!reqCodes.includes(x.ReplacmentCode) && x.RequestStatus === "open") 
      {
        request = {
          ReplacmentCode: x.ReplacmentCode,
          Logo: x.Logo,
          TypeName: x.TypeName,
          ReplacementDate: x.ReplacementDate,
          FromHour: x.FromHour,
          ToHour: x.ToHour,
          IsHistory: x.IsHistory,
        }
        reqCodes.push(x.ReplacmentCode)
        distinctReq.push(request)
      } 
    }))]
    console.log(distinctReq)
    setDistinctReq(distinctReq);
  }
 

  const approveTrainer = (replacmentCode, trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      RequestStatus: "approved"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutRequestTrainer",{
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
    }, 1000))
  .catch((error)=>console.log(error))
  }

  const declineTrainer = (replacmentCode,trainerCode) =>{
    let req = {
      RequestCode: replacmentCode,
      TrainerCode: trainerCode,
      RequestStatus: "closed"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/PutRequestTrainer",{
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

  const deleteRequest = (replacmentCode) =>{
    let req = {
      RequestCode: replacmentCode,
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/DeleteRequest",{
      method:'DELETE',
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

  const reopenRequest = (replacmentCode) =>{
    let req = {
      RequestCode: replacmentCode,
      IsApprovedByTrainer: 'initial',
      RequestStatus: "open"
    }
    console.log(req);
    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestTrainer/ReopenRequest",{
      method:'PUT',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      body:JSON.stringify(req)
  })
  .then((response)=>response.json())
  .then((res)=> console.log(res),
    )
  .catch((error)=>console.log(error))
  }

  const filterArr = (data) => {
    const QualRes = qualName.length === 0 ? true : qualName.includes(data.TypeName); 
    return QualRes;
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
            </div>

        <OpenRequests comp={props.comp} req={requests && requests.filter(filterArr)} distinctReq={distinctReq} approveTrainer={approveTrainer} declineTrainer={declineTrainer} deleteRequest={deleteRequest} />
        <ApprovedRequests comp={props.comp} req={requests && requests.filter(filterArr)} reopenRequest={reopenRequest}/>
        <HistoricalRequests comp={props.comp} req={requests && requests.filter(filterArr)}/>
    </React.Fragment>
  );
}

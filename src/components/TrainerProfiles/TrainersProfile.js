import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import $ from 'jquery';
import swal from 'sweetalert'
import Modal from 'react-bootstrap/Modal';
import TrainerProfile from '../../components/TrainerProfiles/ChosenTrainerProfile';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ChatIcon from '@material-ui/icons/Chat';
import VisibilityIcon from '@material-ui/icons/Visibility';


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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    direction:"rtl",
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    direction:"rtl",
    textAlign:'right',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
   // width: 800,
    //backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    //alignSelf:'center',
    marginTop:'50px',
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
  const [search, setSearch] = useState("");
  const [qualData, setQualData] = useState();
  const [areaData, setAreaData] = useState();
  const [qualName, setQualName] = React.useState([]);
  const [areaName, setAreaName] = React.useState([]);
  const user = JSON.parse(localStorage["userDetails"]).Type;

  const [state, setState] = useState({
    trainersData:[]
  });

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

  const modalStyle = 
  {
    alignSelf:'center',
    marginTop:'50px',
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterArr = (trainerData) => {
    let tCode = 0;
    if(user === "Trainer")
      tCode = JSON.parse(localStorage["userDetails"]).TrainerCode;
      
    const removeMe = trainerData.TrainerCode !== tCode;
    const SerachRes = trainerData.FirstName.includes(search) || trainerData.LastName.includes(search);
    const QualRes = qualName.length === 0 ? true : trainerData.TrainerQuals.some(qual => qualName.includes(qual.TypeName)); 
    const AreaRes = areaName.length === 0 ? true : trainerData.TrainerArea.some(area => areaName.includes(area.AreaName)); 

    return removeMe && SerachRes && QualRes && AreaRes;
  };


  useEffect(() => {

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Trainer",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then(async (res)=> {
    const fullData = await Promise.all(res.map(async data =>{

    const [TrainerArea, TrainerQuals] = await Promise.all([
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerArea/getTrainerArea/'+data.TrainerCode+"/",{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
      })
      .then((response)=>response.json()),
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification/getTrainerQualifications/'+data.TrainerCode+"/",{
          method:'GET',
          headers:{
              Accept:'application/json','Content-Type':'application/json',
          },
      })
      .then((response)=>response.json())
    ]).catch((error)=>console.log(error));

    return {...data, TrainerArea, TrainerQuals};
  }))

  console.log('Full Data => ', fullData)
   setState({...state,trainersData:fullData})
  })
  .catch((error)=>console.log(error))



  fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Qualification',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=>{console.log("Quals:",res); setQualData(res)})
  .catch((error)=>console.log(error))


  fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Area',{
    method:'GET',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
})
.then((response)=>response.json())
.then((res)=>{console.log("Areas:",res); setAreaData([...res])})
.catch((error)=>console.log(error))


  },[]);

  const handleChange = (event) => {
    console.log("event:",event.target.value)
    setQualName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setQualName(value);
  };

  return (
    <React.Fragment >

                <Modal
                    className={modalStyle}
                    show={open}
                    onHide={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div className={classes.paper}>
                    <TrainerProfile comp={props.comp} close={handleClose}/>
                    </div>                  
                  </Modal>

      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              מאגר מאמנים
            </Typography>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
            <div className={classes.search}>
            <TextField variant='outlined'
            fullWidth
            label='&#x1F50D;'
            on onChange={(e) => setSearch(e.target.value)}    
            />
          </div>
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
        <InputLabel id="demo-mutiple-checkbox-label">אזורי עבודה</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {areaData && areaData.map((area) => (
            <MenuItem key={area.AreaCode} value={area.AreaName}>
              <Checkbox checked={areaName.indexOf(area.AreaName) > -1} />
              <ListItemText primary={area.AreaName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {state.trainersData.filter(filterArr).map((card) => (
              <Grid item key={card.TrainerCode} xs={6} sm={4} md={3} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" style = {{textAlign:'center'}}>
                      {card.FirstName} {card.LastName}
                    </Typography>
                    <Typography>
                      {card.AboutMe}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          let trainer = {
                            TrainerCode: card.TrainerCode
                          }
                          localStorage["trainer"] = JSON.stringify(trainer);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                    <Button onClick={()=>{
                      let trainerChat = {
                     Code: card.TrainerCode,
                     Name:card.FirstName +" "+ card.LastName,
                     Image:card.Image
                      }
                      localStorage["chat"] = JSON.stringify(trainerChat);
                      localStorage["fromProfile"] = true;
                      if(user === "Branch")
                        props.comp(8);
                      else
                        props.comp(6);
                    }} size="small" color="primary">
                      שלח הודעה
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
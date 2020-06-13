import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RI from '../../../commons/RoundedImage';
import FileUploaded from '../../../commons/fileUpload';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import { store } from '../../../store/MainStore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Popper from '@material-ui/core/Popper';
import Doc from '@material-ui/icons/Assignment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const useStyles = makeStyles((theme) => ({
  buttons: {
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
   cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
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
    textAlign:"center",
    fontSize: "10px",
    fontWeight:"bold",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  popper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
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
}));


export default function Qualifications({onDone = () => {}}) {
  const classes = useStyles();
  const history = useHistory();
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const [mainState] = useContext(store);
  const [qualData, setQualData] = useState([]);
  const [popData, setPopData] = useState([]);
  const [qualCode, setQualCode] = useState(0);
  const [trainerQual, setTrainerQual] = useState([]);
  const [quals, setQuals] = useState([]);
  const [distinctQual,setDistinctQual] = useState();
  const [trainerQualsCode, setTrainerQualsCode] = useState();

  const [docFlag, setDocFlag] = useState();
  const [isChanged, setIsChanged] = useState(false);

  const [qualForDelete, setQualsForDelete] = useState();

  const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;


  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <Button
        type="button"
        style={{ backgroundColor: 'rgb(235, 135, 218)', marginBottom:'10px' }}
        onClick={decoratedOnClick}
      >
        {children}
      </Button>
    );
  }

    useEffect(() => {

      const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;
      //const trainerCode = 117;

      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification/getTrainerQualifications/'+trainerCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log("quals:",res);
        setQuals(res);
        getTrainerQualsCode(res)})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got trainer qual'))

      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Qualification',{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
    })
    .then((response)=>response.json())
    .then((res)=>{console.log(res); setQualData(res)})
    .catch((error)=>console.log(error))
    .finally(()=>console.log('got qualifications'));


    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Population",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=>{console.log(res); setPopData(res)})
  .catch((error)=>console.log(error))
  .finally(()=>console.log('got pop'));


  },[]);

  const handleClickPopper = (event, code) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setQualCode(code);
  };


  const fileUploaded=(filePath,code,loc)=>{
 
    console.log(filePath);
    let qualCode= code;
    if(loc ===1)
    updateQualDocumentPath(filePath,qualCode);
    if(loc === 2)
    changeQualDocumentPath(filePath,qualCode);
}

    const handleSubmit = async (e) => {
      e.preventDefault();
    }

    const next = (e) => {
      handleSubmit(e);
      onDone();
      if(trainerQual.length>0)
        postQual();
      if(isChanged === true)
        updateQual();

        setTimeout(() => {
          back()
        }, 3000)
    };

    const validatQualtDate=(date)=>{
      let todayDate = new Date().toISOString().substr(0, 10);
      if( date<=todayDate)
      return true;
      else
      {
          swal("תאריך ההכשרה אינו תקין");
          return false;
      } 
  }

    const updateQualDate= (e,code) =>{
      setIsChanged(true);
      let qualCode= code;
      let check = quals;
      console.log(e.target.value);
      let isExists = false;
      if(validatQualtDate(e.target.value) === true)
      {
        if(check.length == 0)
        setQuals([...quals,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, FromDate: e.target.value}])
      else
    {  check.map(val => {if (val.QualificationTypeCode == qualCode){
        val.FromDate = e.target.value
        isExists = true;
        }
      else
      setQuals([...quals,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, FromDate: e.target.value}])
    })}
        if ( isExists ===true)
        setQuals([...check]);
        console.log(check);
      }
     
    }

    const updateQualPop= (e,code) =>{
      setIsChanged(true);
      let qualCode= code;
      console.log(qualCode);
      let check = quals;
      console.log(e.target.value);
      let isExists = false;
      if(check.length == 0)
      setQuals([...quals,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, PopulationCode: e.target.value}])
      else
    {  check.map(val => {if (val.QualificationTypeCode == qualCode){
      val.PopulationCode = e.target.value
      isExists = true;
        }
      else
      setQuals([...quals,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, PopulationCode: e.target.value}])
    })}
    if ( isExists ===true)
    setQuals([...check]);
    console.log(check);
    }

    const updateQualDocumentPath= (filePath,qualCode) =>{
      setIsChanged(true);
      console.log(qualCode);
      let check = quals;
      let isExists = false;
      if(check.length == 0)
      setQuals([...quals,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, DocumentPath: filePath}])
      else
    {  check.map(val => {if (val.QualificationTypeCode == qualCode){
      val.DocumentPath = filePath;
      isExists = true;
        }
      else
      setQuals([...quals,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, DocumentPath: filePath}])
    })}
    if ( isExists ===true)
    setQuals([...check]);
    console.log(check);
    }

    const changeQualDate= (e,code) =>{
      let qualCode= code;
      let check = trainerQual;
      console.log(e.target.value);
      let isExists = false;
      if(validatQualtDate(e.target.value) === true)
      {
        if(check.length == 0)
        setTrainerQual([...trainerQual,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, FromDate: e.target.value}])
      else
    {  check.map(val => {if (val.QualificationTypeCode == qualCode){
        val.FromDate = e.target.value
        isExists = true;
        }
      else
      setTrainerQual([...trainerQual,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, FromDate: e.target.value}])
      })}
      if ( isExists ===true)
      setTrainerQual([...check]);
      console.log(check);
      }
    }

    const changeQualPop= (e,code) =>{
      let qualCode= code;
      console.log(qualCode);
      let check = trainerQual;
      console.log(e.target.value);
      let isExists = false;
      if(check.length == 0)
      setTrainerQual([...trainerQual,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, PopulationCode: e.target.value}])
      else
    {  check.map(val => {if (val.QualificationTypeCode == qualCode){
      val.PopulationCode = e.target.value
      isExists = true;
        }
      else
      setTrainerQual([...trainerQual,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, PopulationCode: e.target.value}])
    })}
    if ( isExists ===true)
    setTrainerQual([...check]);
    console.log(check);
    }

    const changeQualDocumentPath= (filePath,qualCode) =>{
      console.log(qualCode);
      let check = trainerQual;
      let isExists = false;
      if(check.length == 0)
      setTrainerQual([...trainerQual,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, DocumentPath: filePath}])
      else
    {  check.map(val => {if (val.QualificationTypeCode == qualCode){
      val.DocumentPath = filePath;
      isExists = true;
        }
      else
      setTrainerQual([...trainerQual,{TrainerCode: trainerCode, QualificationTypeCode:qualCode, DocumentPath: filePath}])
    })}
    if ( isExists ===true)
    setTrainerQual([...check]);
    console.log(check);
    }

    const setDelete= (e,code) =>{
      let qualCode= code;
      console.log(qualCode);
      let check = qualForDelete;
      console.log(e.target.value);
      if(check.length == 0)
      setQualsForDelete([...qualForDelete,{TrainerCode: trainerCode, QualificationTypeCode:qualCode}])

      setQualsForDelete([...check]);
      console.log(check);
    }

    const postQual = () =>{
      fetch("http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification",{
        method:'POST',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(trainerQual)
    })
    .then((response)=>response.json())
    .then((res)=>console.log("success post trainer qualifications"))
    .catch((error)=>console.log(error));
    }

    const updateQual = () =>{
      fetch("http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification/updateQualifications",{
        method:'PUT',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(quals)
    })
    .then((response)=>response.json())
    .then((res)=>console.log("success update trainer qualifications"))
    .catch((error)=>console.log(error));
    }

    
    const deleteQual = (code) =>{
      let deleteQual =
       {
        TrainerCode: trainerCode,
        QualificationTypeCode: code
       }
       console.log(deleteQual);
      fetch("http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification/DeleteTrainerQualification",{
        method:'DELETE',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        body:JSON.stringify(deleteQual)
    })
    .then((response)=>response.json())
    .then((res)=>console.log(res),
    setTimeout(() => {
      refreshPage()
    }, 3000))
    .catch((error)=>console.log(error));
    }


    const getTrainerQualsCode = (res) =>{

      let qualCodes = res && res.map((qual)=>qual.QualificationTypeCode);
      console.log("trainer existing quals code:",qualCodes);
      setTrainerQualsCode(qualCodes);
    }

    const refreshPage= () => {
      window.location.reload(false);
    }

    const back = () =>{
      history.goBack()
    }

  return (
    <Container component="main" maxWidth="xs" dir="rtl" >
     <main className={classes.layout}>
      <Paper className={classes.paper}>
    <React.Fragment>
      <Typography variant="h5" gutterBottom style={{textAlign:"center",fontWeight:"bold"}}>
      עריכה - תעודות והכשרות
      <hr/>
      </Typography>
      <React.Fragment>
      <main>
          <Container className={classes.cardGrid} maxWidth="md">
          <h6 style={{textAlign:"right"}}>ההכשרות שלי</h6>
          {/* End hero unit */}
          <Grid container spacing={4} style={{direction:"rtl"}}>
              {quals.map((card,key) => (
              <Grid item key={card.QualificationTypeCode} xs={6}>
                  <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                      {card.TypeName} 
                      <hr className="dividerQual"/>
                      </Typography>
                      <div>
                      <Typography style={{color:"black", fontSize:"15px"}}>
                        תאריך ההכשרה
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="qualDate"
                      name="qualDate"
                      autoComplete="qualDate"
                      type="date"
                      autoFocus
                      defaultValue={card.FromDate}
                      onChange={(e,code) => updateQualDate(e,card.QualificationTypeCode)}
                    />
                      </Typography>
                      <Typography style={{color:"black", fontSize:"15px"}}>
                      קהל יעד:
                      <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={card.PopulationCode}
                      onChange={(e,code) => updateQualPop(e,card.QualificationTypeCode)}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      {popData.map(val =>
                      <MenuItem value={val.Code} key={val.Code}>{val.PName}</MenuItem>)}
                    </Select>
                      </Typography>
                      <Typography style={{color:"black", fontSize:"15px", display: "contents"}}>
                      <a href={card.DocumentPath} target="_blank" rel="noopener noreferrer">
                      <Doc color="secondary" />
                          </a><br/>
                      </Typography>
                      <Typography style={{color:"black", fontSize:"15px", display: "contents"}}>
                      טען תעודה חדשה
                      <div> 
                      <FileUploaded onFileUploaded={(filePath,code,loc) => fileUploaded(filePath,card.QualificationTypeCode,1)}/>
                      </div> 
                      </Typography>
                      </div>
                  </CardContent>
                  <CardActions style={{direction:"rtl"}}>
                  <Button size="small" color="primary" onClick= {(code) => deleteQual(card.QualificationTypeCode)} >
                    מחק הכשרה
                  </Button>
                </CardActions>
                
                  </Card>
              </Grid>
              ))}
          </Grid>
          </Container>
      </main>
      </React.Fragment>
      <hr className="dividerQual"/>

      <Container className={classes.cardGrid} style={{textAlign:'right'}} maxWidth="md">
      <Accordion defaultActiveKey="">
      <CustomToggle  eventKey="0"> הוסף הכשרות + </CustomToggle>
      <Accordion.Collapse eventKey="0">
          <Grid container spacing={4} style={{direction:"rtl"}}>
            {qualData && qualData.filter((card)=> !trainerQualsCode.includes(card.TypeCode)).map((card,key) => (
                <Grid item key={card.TypeCode} xs={6} sm={6} >
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                      {card.TypeName} 
                      <hr className="dividerQual"/>
                  </Typography>
                  <div>
                  <Typography style={{color:"black", fontSize:"15px"}}>
                    תאריך ההכשרה
                  <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="qualDate"
                  name="qualDate"
                  autoComplete="qualDate"
                  type="date"
                  autoFocus
                  onChange={(e,code) => changeQualDate(e,card.TypeCode)}
                />
                  </Typography>
                  <Typography style={{color:"black", fontSize:"15px"}}>
                  קהל יעד:
                  <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={card.PopulationCode}
                  onChange={(e,code) => changeQualPop(e,card.TypeCode)}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {popData.map(val =>
                  <MenuItem value={val.Code} key={val.Code}>{val.PName}</MenuItem>)}
                </Select>
                  </Typography>
                  <Typography style={{color:"black", fontSize:"15px", display: "contents"}}>
                  טען תעודת הכשרה
                  <FileUploaded onFileUploaded={(filePath,code,loc) => fileUploaded(filePath,card.TypeCode,2)}/>
                  </Typography>
                  </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Accordion.Collapse>
          </Accordion>
        </Container>
      <div className={classes.buttons} style={{textAlign:"right"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={next}
                    className={classes.button}
                  >
                    שמור שינויים
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={back}
                    className={classes.button}
                  >
                    ביטול
                  </Button>
                  </div>
    </React.Fragment>
    </Paper>                
    </main>
    </Container>
  );
}
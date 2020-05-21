import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RI from '../../commons/RoundedImage';
import FileUploaded from '../../commons/fileUpload';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import { store } from '../../store/MainStore';
import ReactCardFlip from 'react-card-flip';
import QualificationForm from '../OLD/QualificationForm';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Popper from '@material-ui/core/Popper';


const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
   cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
}));


export default function Qualifications({onDone = () => {}}) {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const [mainState] = useContext(store);
  const [qualData, setQualData] = useState([]);
  const [popData, setPopData] = useState([]);
  const [qualCode, setQualCode] = useState(0);
  const [trainerQual, setTrainerQual] = useState([]);

  const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;


    useEffect(() => {
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


  const fileUploaded=(filePath)=>{
 
          console.log(filePath);
          changeQualDocumentPath(filePath);
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
    }

    const next = (e) => {
      handleSubmit(e);
      onDone();
      postQual();

    };


    const changeQualDate= (e) =>{
      console.log(qualCode);
      let check = trainerQual;
      console.log(e.target.value);
      let isExists = false;
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

    const changeQualPop= (e) =>{
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

    const changeQualDocumentPath= (filePath) =>{
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

  

  return (
    <React.Fragment >
      <Typography variant="h6" gutterBottom>
      הכשרות ותעודות
      </Typography>
      <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {qualData.map((card,key) => (
              <Grid item key={card.TypeCode} xs={4} sm={4} md={3}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom >
                      {card.TypeName} 
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={(e) => handleClickPopper(e,card.TypeCode)}>
                      בחר
                    </Button>
                  </CardActions>
                </Card>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                  <div className={classes.popper}> 
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                    פרטי הכשרה -
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                variant="outlined"
                required
                fullWidth
                id="qualDate"
                label="תאריך הכשרה"
                name="qualDate"
                autoComplete="qualDate"
                type="date"
                autoFocus
                value={trainerQual[qualCode-1] && trainerQual[qualCode-1].FromDate}
                onChange={(e) => changeQualDate(e)}
              />
              </Grid>
              <Grid item xs={12}>
              {popData.map(val =>
                 <button onClick={(e) => changeQualPop(e)} value = {val.Code} key = {val.Code}>{val.PName} </button> )}
              </Grid>
              <Grid item xs={12}>
            <label >הוסף תעודה</label>
            <FileUploaded onFileUploaded={(filePath) => fileUploaded(filePath)}/>
            </Grid>
            <Button size="small" color="primary" onClick={(e) => handleClickPopper(e,card.TypeCode)}>
                      שמור וסגור
                    </Button>
            </Grid>
            </div>
                </Popper>
              </Grid>
            ))}
          </Grid>
        </Container>
      <div className={classes.buttons} style={{direction:"initial"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={next}
                    className={classes.button}
                  >
                    המשך
                  </Button>
                  </div>
    </React.Fragment>
  );
}
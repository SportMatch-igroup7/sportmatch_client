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
import Doc from '@material-ui/icons/Assignment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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
  const [quals, setQuals] = useState([]);

  const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;

  const a = 1;


    useEffect(() => {

      //const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;
      const trainerCode = 117;

      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification/getTrainerQualifications/'+trainerCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log("quals:",res);setQuals(res)})
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
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      הכשרות ותעודות
      </Typography>
      <h3>ההכשרות שלי</h3>
                        <React.Fragment   >
                            <main>
                                <Container className={classes.cardGrid} maxWidth="md">
                                {/* End hero unit */}
                                <Grid container spacing={4} style={{direction:"rtl"}}>
                                    {quals.map((card,key) => (
                                    <Grid item key={card.QualificationTypeCode} xs={6} md={3}>
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
                                           // label="תאריך הכשרה"
                                            name="qualDate"
                                            autoComplete="qualDate"
                                            type="date"
                                            autoFocus
                                            value={trainerQual[qualCode-1] && trainerQual[qualCode-1].FromDate}
                                           // onChange={(e) => changeQualDate(e)}
                                          />
                                            </Typography>
                                            <Typography style={{color:"black", fontSize:"15px"}}>
                                            קהל יעד:
                                            <Select
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id="demo-simple-select-placeholder-label"
                                            value={card.PopulationCode}
                                            //onChange={handleChange}
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
                                            <FileUploaded onFileUploaded={(filePath) => fileUploaded(filePath)}/>
                                            </Typography>
                                            </div>
                                        </CardContent>
                                        <CardActions style={{direction:"rtl"}}>
                                        <Button size="small" color="primary" onClick= {()=>{
                                          let x = quals;
                                          console.log(key);
                                          console.log(x);
                                          x.splice(key,1);
                                          console.log(x);
                                          setQuals(x); 
                                          console.log(quals[key].TypeName);              
                                          }} >
                                          מחק
                                        </Button>
                                      </CardActions>
                                      
                                        </Card>
                                    </Grid>
                                    ))}
                                </Grid>
                                </Container>
                            </main>
                            </React.Fragment>
                            <hr className="divider"/>

      <Container className={classes.cardGrid} maxWidth="md">
          <h3>הוסף הכשרות</h3>
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
      <div className={classes.buttons} style={{direction:"rtl"}}>
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
                    onClick={next}
                    className={classes.button}
                  >
                    ביטול
                  </Button>
                  </div>
    </React.Fragment>
  );
}
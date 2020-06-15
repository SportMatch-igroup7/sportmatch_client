import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RI from '../../../commons/RoundedImage';
import FileUploaded from '../../../commons/fileUpload';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
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

export default function AdditionalDetails() {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPopper = (event, code) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setLinkCode(code);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const [linksData , setLinksData] = useState([]);
  const [areaData , setAreaData] = useState([]);
  const [langData , setLangData] = useState([]);

  const [linksPath, setLinkPath] = useState([]);
  const [linkCode, setLinkCode] = useState(0);

  const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;

  const [links, setLinks] = useState([]);

  const [areas, setAreas] = useState([]);
  const [areasCode, setAreasCode] = useState([]);


  const [lang, setLangs] = useState([]);
  const [langCode, setLangsCode] = useState([]);




  useEffect(() => {
    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Area',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=>{console.log(res); setAreaData([...res])})
  .catch((error)=>console.log(error))
  .finally(()=>console.log('got areas'))

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

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Language",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=>{console.log(res); setLangData([...res])})
  .catch((error)=>console.log(error))
  .finally(()=>console.log('got lang'));

  fetch('http://proj.ruppin.ac.il/igroup7/proj/api/LinksTrainer/getLinksTrainer/'+trainerCode+"/",{
    method:'GET',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
})
.then((response)=>response.json())
.then((res)=>
{console.log("links:",res);setLinks(res)})
.catch((error)=>console.log(error))


fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerArea/getTrainerArea/'+trainerCode+"/",{
    method:'GET',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
})
.then((response)=>response.json())
.then((res)=>
{console.log("areas:",res);
setAreas(res);
const areaRes = res.map(val => val.AreaCode)
setAreasCode(areaRes);
})
.catch((error)=>console.log(error))


fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerLanguage/getTrainerLang/'+trainerCode+"/",{
    method:'GET',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
})
.then((response)=>response.json())
.then((res)=>
{console.log("langs:",res);
setLangs(res);
const langRes = res.map(val => val.LCode)
setLangsCode(langRes);
})
.catch((error)=>console.log(error))

  },[]);

const handleSubmit = async (e) => {
  e.preventDefault();
  checkOut();
}

const changePath = (e) =>{
  console.log("linkCode:",linkCode);
  let check = links;
  let isExists = false;
  if(check.length == 0)
    setLinks([...links,{LinkCode:linkCode, TrainerCode:trainerCode, Link: e.target.value}])
  else
{  check.map(val => {if (val.LinkCode == linkCode){
    val.Link = e.target.value
    isExists = true;
    }
  else
  setLinks([...links,{LinkCode:linkCode, TrainerCode:trainerCode, Link: e.target.value}])
})}
if ( isExists ===true)
setLinks([...check]);
console.log("links:",check);
}

const addArea=(Item)=>{
  let newArea = areasCode;
  if(newArea.includes(Item))
  {
      newArea=newArea.filter(item=>item !== Item)
  }
      
  else
  {
      newArea.push(Item);   
  }
  setAreasCode(newArea);
  console.log(newArea);
 
}

const addLanguage=(Item)=>{
  let newLang = langCode;
  if(newLang.includes(Item))
  {
      newLang=newLang.filter(item=>item !== Item)
  }
      
  else
  {
      newLang.push(Item);   
  }
  setLangsCode(newLang);
  console.log(newLang);
 
}

const checkOut=()=>{
  let linksToDB = [];
  let areas = areasCode;
  let areasToDB = [];
  let langs = langCode;
  let langsToDB = [];

  links.map(link =>{
    let trainerLinks = {
      LinkCode: link.LinkCode,
      TrainerCode: trainerCode,
      Link: link.Link,
      
    }
    linksToDB.push(trainerLinks)
  });

  areas.map(area =>{
    let trainerAreas = {
      TrainerCode: trainerCode,
      AreaCode: area,
    }
    areasToDB.push(trainerAreas)
  });

  langs.map(lang =>{
    let trainerLangs = {
      LCode:lang,
      TrainerCode: trainerCode
    }
    langsToDB.push(trainerLangs)
  });
  console.log("areas:",areasToDB);
  console.log("lang:",langsToDB);
  console.log("links:",linksToDB);

  fetch("http://proj.ruppin.ac.il/igroup7/proj/api/LinksTrainer/UpdateLinksTrainer",{
    method:'PUT',
    headers:{
        Accept:'application/json','Content-Type':'application/json',
    },
    body:JSON.stringify(linksToDB)
})
.then((response)=>response.json())
.then((res)=>console.log("success post trainer links"))
.catch((error)=>console.log(error));

fetch("http://proj.ruppin.ac.il/igroup7/proj/api/TrainerArea/UpdateTrainerArea",{
  method:'PUT',
  headers:{
      Accept:'application/json','Content-Type':'application/json',
  },
  body:JSON.stringify(areasToDB)
})
.then((response)=>response.json())
.then((res)=>console.log("success post trainer areas"))
.catch((error)=>console.log(error));

fetch("http://proj.ruppin.ac.il/igroup7/proj/api/TrainerLanguage/UpdateTrainerLang",{
  method:'PUT',
  headers:{
      Accept:'application/json','Content-Type':'application/json',
  },
  body:JSON.stringify(langsToDB)
})
.then((response)=>response.json())
.then((res)=>console.log("success post trainer languages"))
.catch((error)=>console.log(error));


setTimeout(() => {
  history.push("/TrainerNav");
}, 4000);

swal("הפרטים עודכנו בהצלחה");


}

const back = () =>{
  history.goBack()
}

const next = (e) => {
  handleSubmit(e);
};


  return (
    <React.Fragment>
      <main className={classes.layout}>
      <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom style={{textAlign:'center',fontWeight:'bold'}}>
        עריכת נתונים נוספים
        <hr/>
      </Typography>
      <Grid container spacing={2} style={{direction:'rtl',textAlign:'right'}}>
              <Grid item xs={6}>
              <p style={{textAlign:'center'}}>שפות</p> 
              {
                langData && langData.map(val => <Button variant="outlined" color="primary" style={{margin:'2px'}} value = {val.LanCode} key = {val.LanCode} onClick={(e)=>addLanguage(val.LanCode)} style={{margin:'2px', backgroundColor: langCode.includes(val.LanCode) ? 'rgb(235, 135, 218)': ''}}>{val.LanName} </Button> )
              }
            </Grid>
              <Grid style={{textAlign:'center'}} item xs={6}>
                <p style={{textAlign:'center'}}>אזורי עבודה</p>
              {
                areaData && areaData.map(val => <Button variant="outlined" color="primary" style={{margin:'2px'}} value = {val.AreaCode} key = {val.AreaCode} onClick={(e)=>addArea(val.AreaCode)} style={{margin:'2px', backgroundColor: areasCode.includes(val.AreaCode) ? 'rgb(235, 135, 218)': ''}}>{val.AreaName} </Button> )
              }
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
                value={links[linkCode-1] && links[linkCode-1].Link}
                onChange={(e) => changePath(e,val.LinkCode)}
              />
            </Grid>
            </div>
                </Popper>
                </Grid>
              )}
          </Grid>
          <div className={classes.buttons} style={{direction:"initial"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={back}
                    className={classes.button}
                  >
                    ביטול
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={next}
                    className={classes.button}
                  >
                    שמור שינויים
                  </Button>
                  </div>
    </Paper>
    </main>
    </React.Fragment>
  );
}
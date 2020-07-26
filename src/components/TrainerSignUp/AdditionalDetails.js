import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RI from '../../commons/RoundedImage';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import MailOutlineIcon from '@material-ui/icons/MailOutline';



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
  const [trainerArea, setTrainerArea] = useState([]);
  const [trainerLang, setTrainerLang] = useState([]);



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

  },[]);

const handleSubmit = async (e) => {
  e.preventDefault();
  checkOut();
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

const addArea=(Item)=>{
  let newArea = trainerArea;
  if(newArea.includes(Item))
  {
      newArea=newArea.filter(item=>item !== Item)
  }
      
  else
  {
      newArea.push(Item);   
  }
  setTrainerArea([...newArea]);
  console.log(newArea);
 
}

const addLanguage=(Item)=>{
  let newLang = trainerLang;
  if(newLang.includes(Item))
  {
      newLang=newLang.filter(item=>item !== Item)
  }
      
  else
  {
      newLang.push(Item);   
  }
  setTrainerLang([...newLang]);
  console.log(newLang);
 
}

const checkOut=()=>{
  let links = linksPath;
  let linksToDB = [];
  let areas = trainerArea;
  let areasToDB = [];
  let langs = trainerLang;
  let langsToDB = [];

  links.map(link =>{
    let trainerLinks = {
      LinkCode: link.linkCode,
      TrainerCode: trainerCode,
      Link: link.path,
      
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
  console.log("links:",linksToDB);
  console.log("areas:",areasToDB);
  console.log("lang:",langsToDB);

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

fetch("http://proj.ruppin.ac.il/igroup7/proj/api/TrainerArea",{
  method:'POST',
  headers:{
      Accept:'application/json','Content-Type':'application/json',
  },
  body:JSON.stringify(areasToDB)
})
.then((response)=>response.json())
.then((res)=>console.log("success post trainer areas"))
.catch((error)=>console.log(error));

fetch("http://proj.ruppin.ac.il/igroup7/proj/api/TrainerLanguage",{
  method:'POST',
  headers:{
      Accept:'application/json','Content-Type':'application/json',
  },
  body:JSON.stringify(langsToDB)
})
.then((response)=>response.json())
.then((res)=>console.log("success post trainer languages"))
.catch((error)=>console.log(error));

history.push("/TrainerNav");

}

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom style={{textAlign:'center',fontWeight:'bold'}}>
        פרטים נוספים
        <hr/>
      </Typography>
      <Grid container spacing={2} style={{direction:'rtl',textAlign:'right'}}>
              <Grid item xs={12} md={6}>
              <p style={{textAlign:'center'}}>שפות</p>
              {
                langData && langData.map(val => <Button variant="outlined" color="primary" style={{margin:'2px'}} value = {val.LanCode} key = {val.LanCode} onClick={(e)=>addLanguage(val.LanCode)} style={{margin:'2px', backgroundColor: trainerLang.includes(val.LanCode) ? 'rgb(235, 135, 218)': ''}}>{val.LanName} </Button> )
              }
            </Grid>
              <Grid item xs={12} md={6}>
              <p style={{textAlign:'center'}}>אזורי עבודה</p>
              {
                areaData && areaData.map(val => <Button variant="outlined" color="primary" style={{margin:'2px'}} value = {val.AreaCode} key = {val.AreaCode} onClick={(e)=>addArea(val.AreaCode)} style={{margin:'2px', backgroundColor: trainerArea.includes(val.AreaCode) ? 'rgb(235, 135, 218)': ''}}>{val.AreaName} </Button> )
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
                value={linksPath[linkCode-1] && linksPath[linkCode-1].path}
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
                   onClick={handleSubmit}
                    className={classes.button}
                  >
                    סיום
                  </Button>
                  </div>
                  <footer className="footer">
         <Typography variant="subtitle1" align="center" color="textSecondary" style={{fontWeight:'bold'}} component="p">
          sportmatch8@gmail.com <MailOutlineIcon/>
         </Typography>
       </footer>
    </React.Fragment>
  );
}
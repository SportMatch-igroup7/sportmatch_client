import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router';
import TextField from '@material-ui/core/TextField';
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
import swal from 'sweetalert'
import Modal from 'react-bootstrap/Modal';
import BranchProfile from './ChosenBranchProfile';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MailOutlineIcon from '@material-ui/icons/MailOutline';




const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
    border: 'dotted rgb(63, 81, 181)'
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

  const [branchCode, setBranchCode] = useState(0);
  const [search, setSearch] = useState("");
  const [areaData, setAreaData] = useState();
  const [branchData,setBranchData]= useState([]);
  const [areaName, setAreaName] = React.useState([]);
  const [companyData, setComapnyData] = useState();
  const [companyName, setCompanyName] = React.useState([]);

  const user = JSON.parse(localStorage["userDetails"]).Type;

  const [open, setOpen] = React.useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Branch",{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
  })
  .then((response)=>response.json())
  .then((res)=> {console.log(res); setBranchData(res)})
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

    fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Company',{
      method:'GET',
      headers:{
          Accept:'application/json','Content-Type':'application/json',
      },
      })
      .then((response)=>response.json())
      .then((res)=>{console.log(res); setComapnyData(res)})
      .catch((error)=>console.log(error))
  
 
  },[]);

  const viewProfile = (branchCode) =>{
    let branch = {
      BranchCode: branchCode
    }
    localStorage["branch"] = JSON.stringify(branch);
    //history.push("/BranchProfile");
  }

  const filterArr = (branch) => {
    let bCode = 0;
    if(user === "Branch")
      bCode = JSON.parse(localStorage["userDetails"]).BranchCode;
      
    const removeMe = branch.BranchCode !== bCode;
    const SerachRes = branch.Name.includes(search);
    const AreaRes = areaName.length === 0 ? true : areaName.includes(branch.AreaName);
    const ComapnyRes = companyName.length === 0 ? true : companyName.includes(branch.CompanyName) 

     return removeMe && SerachRes && AreaRes && ComapnyRes;
  };

  return (
    <React.Fragment >

                    <Modal
                    show={open}
                    onHide={handleClose}
                  >
                    <div className={classes.paper}>
                    <BranchProfile comp={props.comp} close={handleClose}/>
                    </div>                  
                  </Modal>

      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              מאגר מועדונים
            </Typography>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
            <div className={classes.search}>
            <TextField variant='outlined'
            fullWidth
            label='&#x1F50D;'
            on onChange={(e) => setSearch(e.target.value)}
            ></TextField>
          </div>
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
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
        
          <Grid container spacing={4}>
            {branchData.filter(filterArr).map((card) => (
              <Grid item key={card.BranchCode}  xs={6} sm={4} md={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.Logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                      {card.Name} 
                    </Typography>
                    <Typography>
                      {card.Description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>{
                          let branch = {
                            BranchCode: card.BranchCode
                          }
                          localStorage["branch"] = JSON.stringify(branch);
                          handleOpen();
                    }} size="small" color="primary">
                      צפה
                    </Button>
                    <Button onClick={()=>{
                     let branchChat = {
                     Code: card.BranchCode,
                     Name:card.Name,
                     Image:card.Logo
                      }
                    localStorage["chat"] = JSON.stringify(branchChat);
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
      <footer className="footer">
         <Typography variant="subtitle1" align="center" color="textSecondary" style={{fontWeight:'bold'}} component="p">
          sportmatch8@gmail.com <MailOutlineIcon/>
         </Typography>
       </footer>
    </React.Fragment>
  );
}


{/* <InputBase
placeholder="חיפוש"
fullWidth
style={{backgroundColor:"lightblue"}}
classes={{
  root: classes.inputRoot,
  input: classes.inputInput,
}}
inputProps={{ 'aria-label': 'search' }}
/> */}
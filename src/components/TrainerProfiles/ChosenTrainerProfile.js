import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Cell} from 'react-mdl';
import Grid2 from '@material-ui/core/Grid';
import {useHistory} from 'react-router';
import './Profiles.css';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Doc from '@material-ui/icons/Assignment';
import {FaFacebookSquare} from 'react-icons/fa';
import {FaChrome} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';
import ChatIcon from '@material-ui/icons/Chat';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TrainerRate from '../TrainerProfiles/TrainerRate';



const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },

    cardGrid: {
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
    },
  }));

export default function TrainerProfile(props) {

    const classes = useStyles();
    
    const [trainerData, setTrainerData] = useState([]);
    const [links, setLinks] = useState([]);
    const [areas, setAreas] = useState([]);
    const [quals, setQuals] = useState([]);
    const [lang, setLangs] = useState([]);
    const trainerCode = JSON.parse(localStorage["trainer"]).TrainerCode;
    const user = JSON.parse(localStorage["userDetails"]).Type;

 
  
  
    useEffect(() => {
         
        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Trainer/getTrainer/'+trainerCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log("data:",res);setTrainerData(res)})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got trainer details'))


        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/LinksTrainer/getLinksTrainer/'+trainerCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log("links:",res);setLinks(res);})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got trainer links'))


        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerArea/getTrainerArea/'+trainerCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log("areas:",res);setAreas(res)})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got trainer areas'))


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

        
        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/TrainerLanguage/getTrainerLang/'+trainerCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log("langs:",res);setLangs(res)})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got trainer langs'))
  
  
        },[]);

        const onLinkClick = href => e => {
            if (!href) {
                e.preventDefault();
            }
        }

  

        const web = (links.find((val)=>val.LinkCode === 1) || {}).Link;
        const facebook = (links.find((val)=>val.LinkCode === 2) || {}).Link;
        const instagram = (links.find((val)=>val.LinkCode === 3) || {}).Link;
        const linkedin = (links.find((val)=>val.LinkCode === 4) || {}).Link;


        return (
            <div style ={{width: '100%', margin: 'auto'}}>
                <Grid className="branch-grid" >
                    <Cell col={12} style={{float:"right"}}>
                    <HighlightOffIcon onClick={props.close}/>
                    </Cell>  
                    <Cell col={12}>
                        <img
                        src={trainerData.Image}
                        alt="avatar"
                        className="avatar-img"
                        />

                        <div className="banner-text">
                        <h1> 
                        <ChatIcon style={{color:"white"}}
                          onClick={()=>{
                            let trainerChat = {
                            Code: trainerCode,
                            Name:trainerData.FirstName +" "+ trainerData.LastName,
                            Image:trainerData.Image
                            }
                            localStorage["chat"] = JSON.stringify(trainerChat);
                            localStorage["fromProfile"] = true;
                            if(user === "Branch")
                                props.comp(8);
                            else
                                props.comp(6);
                             }}
                        /> 
                        {trainerData.FirstName} {trainerData.LastName}
                        {trainerData.Rate ? <TrainerRate Rate={trainerData.Rate}/> : null}         
                        </h1>
                        <p>גיל: {trainerData.Age}</p>      
                        <p>מייל: {trainerData.Email}</p> 
                        <p>מספר טלפון: {trainerData.Phone1}</p> 
                        <p>אזורי עבודה: {areas && areas.map((area)=>(`${area.AreaName}, `)) }</p> 
                        <p>שפות: {lang && lang.map((lang)=>(`${lang.LName}, `)) }</p>            
                            <hr className="divider"/>
                        <h3>ההכשרות שלי</h3>
                        <React.Fragment   >
                            <main>
                                <Container className={classes.cardGrid} maxWidth="md">
                                {/* End hero unit */}
                                <Grid2 container spacing={4} className="banner-text">
                                    {quals && quals.map((card) => (
                                    <Grid2 item key={card.QualificationTypeCode} xs={12} md={6}>
                                        <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                            {card.TypeName} 
                                            <hr className="dividerQual"/>
                                            </Typography>
                                            <Typography style={{color:"black", fontSize:"15px"}}>
                                            שנות ניסיון: {card.YearsOfExperience}
                                            </Typography>
                                            <Typography style={{color:"black", fontSize:"15px"}}>
                                            קהל יעד: {card.PName}
                                            </Typography>
                                            <Typography style={{color:"black", fontSize:"15px", display: "contents"}}>
                                            <a href={card.DocumentPath} target="_blank" rel="noopener noreferrer">
                                            <Doc color="secondary" />
                                                </a>
                                            </Typography>
                                        </CardContent>

                                        </Card>
                                    </Grid2>
                                    ))}
                                </Grid2>
                                </Container>
                            </main>
                            </React.Fragment>
                            <hr className="divider"/>
    
                            <div className="social-links">
                        <a href={web} target="_blank" rel="noopener noreferrer" onClick={onLinkClick(web)} >
                            <FaChrome size={30} style={{color:"white"}}/> 
                        </a>
                        <a href={facebook} target="_blank" rel="noopener noreferrer" onClick={onLinkClick(facebook)}>
                            <FaFacebookSquare size={30} style={{color:"white"}}/>
                        </a>
                        <a href={instagram} target="_blank" rel="noopener noreferrer" onClick={onLinkClick(instagram)}>
                            <FaInstagram size={30} style={{color:"white"}}/>
                        </a>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={onLinkClick(linkedin)}>
                            <FaLinkedin size={30} style={{color:"white"}}/>
                        </a>
                        </div>  
                    </div>                  
                </Cell>
                </Grid>        
            </div>

        )
    }

    // <React.Fragment >
    //   <CssBaseline />
    //   <main>
    //     <Container className={classes.cardGrid} maxWidth="md">
    //       {/* End hero unit */}
    //       <Grid container spacing={4}>
    //         {quals.map((card) => (
    //           <Grid item key={card.QualificationTypeCode} xs={6} md={3}>
    //             <Card className={classes.card}>
    //               <CardContent className={classes.cardContent}>
    //               <Typography gutterBottom variant="h5" component="h2">
    //                   {card.TypeName} 
    //                 </Typography>
    //                 <Typography gutterBottom variant="h5" component="h2">
    //                   שנות ניסיון: {card.YearsOfExperience} 
    //                 </Typography>
    //               </CardContent>
    //             </Card>
    //           </Grid>
    //         ))}
    //       </Grid>
    //     </Container>
    //   </main>
    // </React.Fragment>

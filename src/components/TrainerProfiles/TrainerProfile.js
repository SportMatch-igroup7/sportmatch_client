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
import TextField from '@material-ui/core/TextField';
import {FaFacebookSquare} from 'react-icons/fa';
import {FaChrome} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';


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

export default function TrainerProfile() {

    const classes = useStyles();
    const history = useHistory();
    
    const [trainerData, setTrainerData] = useState([]);
    const [links, setLinks] = useState([]);
    const [areas, setAreas] = useState([]);
    const [quals, setQuals] = useState([]);
    const [lang, setLangs] = useState([]);

 
  
  
    useEffect(() => {
  
        //const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;
        const trainerCode = 117;
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
        {console.log("links:",res);setLinks(res)})
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

  


        console.log(links)
        const web = links.filter((val)=>val.LinkCode === 1);
        console.log(web)
        const facebook = links.filter((val)=>val.LinkCode === 2);
        const instagram = links.filter((val)=>val.LinkCode === 3);
        const linkedin = links.filter((val)=>val.LinkCode === 4)

        const changePersonalDetails = ()=>
        {
            history.push("/TrainerDetails");
        }


        return (
            <div style ={{width: '100%', margin: 'auto'}}>
                <Grid className="branch-grid" >
                    <Cell col={12} className="back">
                        <CloseIcon/>
                    </Cell>
                    <Cell col={12}>
                        <img
                        src={trainerData.Image}
                        alt="avatar"
                        className="avatar-img"
                        />

                        <div className="banner-text">
                        <h1> {trainerData.FirstName} {trainerData.LastName} </h1>
                        <p>גיל: {trainerData.Age}</p>      
                        <p>מייל: {trainerData.Email}</p> 
                        <p>מספר טלפון: {trainerData.Phone1}</p> 
                        <p>אזורי עבודה: {areas.map((area)=>(`${area.AreaName}, `)) }</p> 
                        <p>שפות: {lang.map((lang)=>(`${lang.LName}, `)) }</p>       
                            <hr className="divider"/>
                        <h3>ההכשרות שלי</h3>
                        <React.Fragment   >
                            <main>
                                <Container className={classes.cardGrid} maxWidth="md">
                                {/* End hero unit */}
                                <Grid2 container spacing={4} className="banner-text">
                                    {quals.map((card) => (
                                    <Grid2 item key={card.QualificationTypeCode} xs={6} md={4}>
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
                        <a href={web.map((val)=>val.LinkName)} target="_blank" rel="noopener noreferrer">
                            <FaChrome size={30} style={{color:"white"}}/> 
                        </a>
                        <a href={facebook.map((val)=>val.LinkName)} target="_blank" rel="noopener noreferrer">
                            <FaFacebookSquare size={30} style={{color:"white"}}/>
                        </a>
                        <a href={instagram.map((val)=>val.LinkName)} target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} style={{color:"white"}}/>
                        </a>
                        <a href={linkedin.map((val)=>val.LinkName)} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} style={{color:"white"}}/>
                        </a>
                        </div> 
                        <hr className="divider"/>
                        <div className="social-links" style={{direction:"rtl"}}>
                        <button onClick={changePersonalDetails}>ערוך פרטים איישים</button> 
                        <button >ערוך הכשרות</button> 
                        <button >ערוך נתונים נוספים</button> 
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

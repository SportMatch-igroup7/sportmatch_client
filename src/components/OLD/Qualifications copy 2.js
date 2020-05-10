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
import QualificationForm from './QualificationForm';
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

  const [state, setState] = useState({
    qualificationDate:"",
    documentPath:"",
    isFlipped: false,
    currentQual: null,
})

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

  // qualData.map(val =>
  //   {
  //     let name = `isFlipped${val.TypeCode}`;
  //     let set = `setIsFlipped${val.TypeCode}`;
  //     const [state, sets] = useState(false);
  //   }
     
  //   )

  const handleClickPopper = (event, code) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    //setLinkCode(code);
  };


  const fileUploaded=(filePath)=>{
 
          console.log(filePath);
          setState({...state,documentPath:filePath}) 
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
    }

    const next = (e) => {
      handleSubmit(e);
      onDone();
    };

    const fillQual = (qualCode) => {
      setState({...state, 
        currentQual: qualCode,
        isFlipped: true,
      });
    };

    const fillQualDone = () => {
      setState({
        ...state,
        currentQual: null,
        isFlipped: false,
      });
    };

   // const qualList = state.dataQual.map(val => <button style={{margin:'2px'}} value = {val.TypeCode} key = {val.TypeCode} onClick={() => fillQual(val.TypeCode)}>{val.TypeName} </button> )
   // const popList = state.dataPop.map(val => <button  value = {val.Code} key = {val.Code}>{val.PName} </button> )

    const getQualificationForm = (qualCode) => {
      return qualCode ? <QualificationForm qualCode={qualCode} onDone={fillQualDone} /> : null;
    };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      הכשרות ותעודות
      </Typography>
      <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {qualData.map((card) => (
              <Grid item key={card.TypeCode} xs={6} sm={6} md={4}>
                <ReactCardFlip >
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom >
                      {card.TypeName} 
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small" color="primary" onClick={(e) => `setIsFlipped${card.TypeCode}`(true)}> */}
                    <Button size="small" color="primary">
                      בחר
                    </Button>
                  </CardActions>
                </Card>
                {/* <Button size="small" color="primary" onClick={(e) => `setIsFlipped${card.TypeCode}`(false)}> */}
                <Button size="small" color="primary" >
                      בחר
                    </Button>
                </ReactCardFlip>
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
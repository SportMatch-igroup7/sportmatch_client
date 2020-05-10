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
import {ajaxCall} from '../../commons/ajaxCall';
import swal from 'sweetalert';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { store } from '../../store/MainStore';
import ReactCardFlip from 'react-card-flip';
import QualificationForm from './QualificationForm';


const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


export default function Qualifications({onDone = () => {}}) {
  const classes = useStyles();

  const [mainState] = useContext(store);

    useEffect(() => {
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Qualification', "", successGetQualification, errorGetQualification);
        setTimeout(() => {
          console.log("initialy upload")
        }, 1000);
      },[]);

    const [state, setState] = useState({
        dataQual:[],
        dataPop:[],
        qualificationDate:"",
        documentPath:"",
        isFlipped: false,
        currentQual: null,
    })

    const fileUploaded=(filePath)=>{
 
          console.log(filePath);
          setState({...state,documentPath:filePath}) 
     
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      //validate();
    }

    const next = (e) => {
      handleSubmit(e);
      onDone();
    };

    const successGetQualification=(data)=>{
        console.log(data);
        setState({...state,dataQual:data})
        console.log(state.dataQual);

    }

    const errorGetQualification=(err)=>{
        console.log(err);
    }

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

    const qualList = state.dataQual.map(val => <button style={{margin:'2px'}} value = {val.TypeCode} key = {val.TypeCode} onClick={() => fillQual(val.TypeCode)}>{val.TypeName} </button> )
    const popList = state.dataPop.map(val => <button  value = {val.Code} key = {val.Code}>{val.PName} </button> )

    const getQualificationForm = (qualCode) => {
      return qualCode ? <QualificationForm qualCode={qualCode} onDone={fillQualDone} /> : null;
    };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      הכשרות ותעודות {mainState.trainerCode}
      </Typography>
      <Grid container spacing={3}>
        <Grid>
        <ReactCardFlip isFlipped={state.isFlipped}>
                <div>
                    
                    {qualList}
                
                </div>

                <div>
                  {getQualificationForm(state.currentQual)}
                </div>

                </ReactCardFlip><br/>
        </Grid>
      </Grid>
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
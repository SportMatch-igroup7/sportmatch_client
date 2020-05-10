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


export default function QualificationForm({qualCode, onDone = () => {}}) {
  const classes = useStyles();

  const [mainState, dispatch] = useContext(store);

  const [state, setState] = useState({
      dataPop: [],
})

  const [qualData, setQualData] = useState({
    qualCode,  
    dataPop: null,
    qualificationDate: "",
    documentPath: "",
  });

  useEffect(() => {
    const qualInfo = mainState.qualList[qualCode];

      if (qualInfo) {
        setQualData({...qualInfo});
      }
  }, []);

    useEffect(() => {
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Population", "", successGetPopulation, errorGetPopulation);
      },[]);

    const fileUploaded=(filePath)=>{
 
          console.log(filePath);
          setQualData({...qualData ,documentPath:filePath}) 
     
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      
    }

    const successGetPopulation=(data)=> {
        console.log(data);
        setState({...state,dataPop:data})
        console.log(state.dataPop)
    }

    const errorGetPopulation=(err)=> {
        console.log(err);
    }

    const saveQual = () => {
        dispatch({
            type: 'SAVE_QUAL',
            value: qualData,
        })
        onDone();
    };

    const popList = state.dataPop.map(val => <button  value = {val.Code} key = {val.Code} onClick= {(e) => setQualData({...qualData, dataPop:e.target.value})}>{val.PName} </button> )

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      הכשרות ותעודות {qualCode}
      </Typography>
      <div>
        {JSON.stringify(qualData)}
      </div>
      <Grid container spacing={3}>
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
                onChange={(e) => setQualData({...qualData, qualificationDate:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
             {popList}
            </Grid>
            <Grid item xs={12}>
            <label >תעודה</label>
            <FileUploaded path={qualData.documentPath} onFileUploaded={(filePath) => fileUploaded(filePath)}/>
            </Grid>
            <Button
                    variant="contained"
                    color="primary"
                    onClick={saveQual}
                    //className={classes.button}
                  >
                    שמור וסגור
                  </Button>
      </Grid>
    </React.Fragment>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router';

const labels = {
  0.5: 'כושל',
  1: 'גרוע',
  1.5: 'מספיק',
  2: 'סביר',
  2.5: 'בסדר',
  3: 'בינוני',
  3.5: '+ בינוני',
  4: 'טוב',
  4.5: 'טוב מאוד',
  5: 'מצויין',
};

let trainerCode = 333;
let requestCode = 333;
let RateValue;



const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  submit: {
    margin: '3px'
  }
});
export default function HoverRating(props) {
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    const history = useHistory();
    console.log(props.requestCode);
    console.log(props.trainerCode);

const handleSave = async (e) => {
    console.log("שמור");    
    RateValue=value;
    console.log(RateValue);
     let RequestTrainer={
      RequestCode : requestCode,
      TrainerCode : trainerCode,
      IsRated : "true"
};


   //שליחה לקונטרולר
   //await ajaxCall("Put", "../api/RequestTrainer/PutRequestTrainerRate", JSON.stringify(RequestTrainer), successSignInBranch, errorSignInBranch);
    props.close();
  }

  const handleCancel = async (e) => {
    console.log("בטל");
    setValue(0);
    //history.push("/BranchesProfile");
    let RequestTrainer={
      RequestCode : requestCode,
      TrainerCode : trainerCode,
      IsRated : "false"
};
  }

//new
//   let RequestTrainer={
//     trainerCode:TrainerCode,
//     rate:RateValue,
//     requestCode:RequestCode
//   };

  return (
      <div>
    <h2>  שמנו לב שבדיוק נגמר האימון - נשמח אם תדרג את המאמן</h2>
    <h4>
    <div className={classes.root}>      
      <Rating name="hover-feedback" value={value} precision={0.5} 
      onChange={(event, newValue) => {setValue(newValue);}}
      onChangeActive={(event, newHover) => {setHover(newHover);}}/>
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
    </h4>
    <div class="row">
    <Button  type="submit" fullWidth variant="contained" color="primary" 
    className={classes.submit} onClick={handleSave}> שמור </Button>
     {/* <Button  type="submit" fullWidth variant="contained" color="primary" 
    className={classes.submit} onClick={handleCancel}> בטל </Button> */}
    </div>
    </div>
  );
}
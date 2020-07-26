import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router';

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
    console.log(props);

  return (
      <div>
   
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={props.Rate || 0} readOnly />
      </Box>

    </div>
  );
}
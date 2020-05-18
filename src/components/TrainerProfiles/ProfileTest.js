import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Button from "../../template/CustomButtons/Button.js";
import GridContainer from "../../template/Grid/GridContainer.js";
import GridItem from "../../template/Grid/GridItem.js";
import NavPills from "../../template/NavPills/NavPills.js";
import Parallax from "../../template/Parallax/Parallax.js";
import profile from "../../assets/img/faces/christian.jpg";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [trainerData, setTrainerData] = useState([]);
  const [branchLinks, setBranchLinks] = useState([]);


  useEffect(() => {

      const trainerCode = 114;//JSON.parse(localStorage["userDetails"]).BranchCode;
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Trainer/getTrainer/'+trainerCode+"/",{
          method:'GET',
          headers:{
              Accept:'application/json','Content-Type':'application/json',
          },
      })
      .then((response)=>response.json())
      .then((res)=>
      {console.log(res);setTrainerData(res)})
      .catch((error)=>console.log(error))
      .finally(()=>console.log('got trainer details'))

    //   fetch('http://proj.ruppin.ac.il/igroup7/proj/api/LinksTo/getLinks/'+branchCode+"/",{
    //       method:'GET',
    //       headers:{
    //           Accept:'application/json','Content-Type':'application/json',
    //       },
    //   })
    //   .then((response)=>response.json())
    //   .then((res)=>
    //   {console.log(res);setBranchLinks(res)})
    //   .catch((error)=>console.log(error))
    //   .finally(()=>console.log('got branch links'))

    //   console.log(branchLinks[0])

      },[]);



  return (
    <div>
      <Parallax small filter image={require("../../assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={trainerData.Image} alt="..." className={imageClasses} />
                  </div>

                  <div className={classes.name}>
                    <h3 className={classes.title}>{trainerData.FirstName} {trainerData.LastName}</h3><br/>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                {trainerData.AboutMe}{" "}
              </p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

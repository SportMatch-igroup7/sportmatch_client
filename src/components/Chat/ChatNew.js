import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import './Chat.css';

  export default function Chat() {

    const [state, setState] = useState()

    useEffect(() => {

      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Area',{
              method:'GET',
              headers:{
                  Accept:'application/json','Content-Type':'application/json',
              },
          })
          .then((response)=>response.json())
          .then((res)=>{console.log(res); setAreaData({areaData,dataArea:res})})
          .catch((error)=>console.log(error))
          .finally(()=>console.log('got areas'))
  
      fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Company',{
        method:'GET',
        headers:{
            Accept:'application/json','Content-Type':'application/json',
        },
        })
        .then((response)=>response.json())
        .then((res)=>{console.log(res); setCompanyData({companyData,dataCompany:res})})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got companies'))
  
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
  
          fetch("http://proj.ruppin.ac.il/igroup7/proj/api/Parameter",{
          method:'GET',
          headers:{
              Accept:'application/json','Content-Type':'application/json',
          },
          })
          .then((response)=>response.json())
          .then((res)=>{console.log("parameters:",res); setParams([...res])})
          .catch((error)=>console.log(error))
    },[]);



    return (
      <div>
            <h2>Chat Messages</h2>
              <div className="container">
                <img src="/w3images/bandmember.jpg" alt="Avatar" style={{width:"100%"}}></img>
                <p>Hello. How are you today?</p>
                <span className="time-right">11:00</span>
              </div>

              <div className="container darker">
                <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" style={{width:"100%"}}></img>
                <p>Hey! I'm fine. Thanks for asking!</p>
                <span className="time-left">11:01</span>
              </div>

              <div className="container">
                <img src="/w3images/bandmember.jpg" alt="Avatar" style={{width:"100%"}}></img>
                <p>Sweet! So, what do you wanna do today?</p>
                <span className="time-right">11:02</span>
              </div>

              <div className="container darker">
                <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" style={{width:"100%"}}></img>
                <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
                <span className="time-left">11:05</span>
              </div>
      </div>
            
    );
  }
import React, { useState, useEffect } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router';
import './Profiles.css';
import {FaFacebookSquare} from 'react-icons/fa';
import {FaChrome} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';
import ChatIcon from '@material-ui/icons/Chat';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


export default function BranchProfile(props) {
    
    const [branchData, setBranchData] = useState([]);
    const [branchLinks, setBranchLinks] = useState([]);
    const user = JSON.parse(localStorage["userDetails"]).Type;
    const branchCode = JSON.parse(localStorage["branch"]).BranchCode;


    useEffect(() => {

        //const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;
        
        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/Branch/getBranch/'+branchCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log(res);setBranchData(res)})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got branch details'))

        fetch('http://proj.ruppin.ac.il/igroup7/proj/api/LinksTo/getLinks/'+branchCode+"/",{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=>
        {console.log(res);setBranchLinks(res)})
        .catch((error)=>console.log(error))
        .finally(()=>console.log('got branch links'))

        console.log(branchLinks[0])

        },[]);

        const onLinkClick = href => e => {
            if (!href) {
                e.preventDefault();
            }
        }


        console.log("links:",branchLinks)
        const web = (branchLinks.find((val)=>val.LinkCode === 1) || {}).LinkName;
        const facebook = (branchLinks.find((val)=>val.LinkCode === 2) || {}).LinkName;
        const instagram = (branchLinks.find((val)=>val.LinkCode === 3) || {}).LinkName;
        const linkedin = (branchLinks.find((val)=>val.LinkCode === 4) || {}).LinkName;


        return (
            <div style ={{width: '100%', margin: 'auto'}}>
                <Grid className="branch-grid" >
                    <Cell col={12} style={{float:"right"}}>
                    <HighlightOffIcon onClick={props.close}/>
                    </Cell>         
                    <Cell col={12}>
                        
                        <img
                        src={branchData.Logo}
                        alt="avatar"
                        className="avatar-img"
                        />

                        <div className="banner-text">
                        <h1>סניף {branchData.Name} 
                        <ChatIcon style={{color:"white"}}
                          onClick={()=>{
                            let branchChat = {
                            Code: branchCode,
                            Name:branchData.Name,
                            Image:branchData.Logo
                            }
                            localStorage["chat"] = JSON.stringify(branchChat);
                            localStorage["fromProfile"] = true;
                            if(user === "Branch")
                                props.comp(8);
                            else
                                props.comp(6);  }}
                        /> 
                        </h1> 
                        <p>אזור: {branchData.AreaName}</p>
                        <p>כתובת מלאה: {branchData.Address}</p>
                        <p>טלפון: {branchData.PhoneNo}</p>                   
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

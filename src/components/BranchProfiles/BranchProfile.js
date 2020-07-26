import React, { useState, useEffect } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router';
import './Profiles.css';
import {FaFacebookSquare} from 'react-icons/fa';
import {FaChrome} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';



export default function BranchProfile() {
    
    const [branchData, setBranchData] = useState([]);
    const [branchLinks, setBranchLinks] = useState([]);
    const history = useHistory();



    useEffect(() => {

        const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;
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


        console.log("links:",branchLinks)
        const web = (branchLinks.find((val)=>val.LinkCode === 1) || {}).LinkName;
        const facebook = (branchLinks.find((val)=>val.LinkCode === 2) || {}).LinkName;
        const instagram = (branchLinks.find((val)=>val.LinkCode === 3) || {}).LinkName;
        const linkedin = (branchLinks.find((val)=>val.LinkCode === 4) || {}).LinkName;

        const changeBranchDetails = ()=>
        {
            history.push("/BranchUpdateProfile");
        }

        const onLinkClick = href => e => {
            if (!href) {
                e.preventDefault();
            }
        }


        return (
            <div style ={{width: '100%', margin: 'auto'}}>
                <Grid className="branch-grid" >
                    <Cell col={12}>
                        <img
                        src={branchData.Logo}
                        alt="avatar"
                        className="avatar-img"
                        />

                        <div className="banner-text">
                        <h1>סניף {branchData.Name}</h1>
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
                        <div  style={{direction:"rtl",marginTop:'15px'}}>
                        <Button size="small" style={{backgroundColor:'rgb(235, 135, 218)', color:'white',marginBottom:'15px'}} onClick={changeBranchDetails}>ערוך פרופיל</Button> 
                        </div>
                        </div>
                        
                    </Cell>
                </Grid>
                <footer className="footer">
                    <Typography variant="subtitle1" align="center" color="textSecondary" style={{fontWeight:'bold'}} component="p">
                    sportmatch8@gmail.com <MailOutlineIcon/>
                    </Typography>
                </footer>
            </div>
        )
    }

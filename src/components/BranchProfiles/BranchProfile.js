import React, { useState, useEffect } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router';
import './Profiles.css';
import {FaFacebookSquare} from 'react-icons/fa';
import {FaChrome} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';


export default function BranchProfile() {
    
    const [branchData, setBranchData] = useState([]);
    const [branchLinks, setBranchLinks] = useState([]);



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
        const web = branchLinks.filter((val)=>val.LinkCode === 1)
        const facebook = branchLinks.filter((val)=>val.LinkCode === 2)
        const instagram = branchLinks.filter((val)=>val.LinkCode === 3);
        const linkedin = branchLinks.filter((val)=>val.LinkCode === 4)


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
                        </div>
                        
                    </Cell>
                </Grid>
            </div>
        )
    }

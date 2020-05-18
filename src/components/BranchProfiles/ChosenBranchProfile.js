import React, { useState, useEffect } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router';
import './Profiles.css';


export default function BranchProfile() {
    
    const [branchData, setBranchData] = useState([]);
    const [branchLinks, setBranchLinks] = useState([]);



    useEffect(() => {

        //const branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;
        const branchCode = JSON.parse(localStorage["branch"]).BranchCode;
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


        console.log(branchLinks)
        const web = branchLinks.filter((val)=>val.LinkCode === 1);
        console.log(web)
        const facebook = branchLinks.filter((val)=>val.LinkCode === 2);
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
                        <p>עיר: {branchData.AreaName}</p>
                        <p>כתובת: {branchData.Address}</p>
                        <p>טלפון: {branchData.PhoneNo}</p>                   
                            <hr/>

                        <div className="social-links">
                        <a href={web.LinkName} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin-square" rel="noopener noreferrer" aria-hidden="true"/>
                        </a>
                        <a href={facebook.LinkName} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin-square" rel="noopener noreferrer" aria-hidden="true"/>
                        </a>
                        <a href={instagram.LinkName} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin-square" rel="noopener noreferrer" aria-hidden="true"/>
                        </a>
                        <a href={linkedin.LinkName} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin-square" rel="noopener noreferrer" aria-hidden="true"/>
                        </a>
                        </div>
                        </div>
                        
                    </Cell>
                </Grid>
            </div>
        )
    }

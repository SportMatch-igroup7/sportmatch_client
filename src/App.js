import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import Login from './components/Login';
import BranchSignUp from './components/BranchSignUp/BranchSignUp';
import BranchNav from './components/BranchDashboard/BranchNav'
import TrainerSignUp from './components/TrainerSignUp/TrainerReg';
import { StateProvider } from './store/MainStore';
import TrainerNav from './components/TrainerDashboard/TrainerNav';
import TrainerDetails from './components/TrainerProfiles/ProfileUpdate/TrainerPersonalDetailsUpdate';
import TrainerEditQual from './components/TrainerProfiles/ProfileUpdate/TrainerEditQualifications';
import TrainerEditAdditional from './components/TrainerProfiles/ProfileUpdate/TrainerAdditionalDetailsUpdate';
import BranchUpdateProfile from './components/BranchProfiles/BranchProfileUpdate';
import AdminNav from './components/AdminDashboard/AdminNav';
import firebaseConfig from './components/Chat/FireBase';
import firebase from 'firebase';



firebase.initializeApp(firebaseConfig);


function App() {
  return (
<StateProvider>
      <div className="App">
        <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/BranchSignUp" component={BranchSignUp} />
        <Route path="/TrainerSignUp" component={TrainerSignUp} />
        <Route path="/BranchNav" component={BranchNav} />
        <Route path="/TrainerNav" component={TrainerNav} />
        <Route path="/AdminNav" component={AdminNav} />
        <Route path="/TrainerDetails" component={TrainerDetails} />
        <Route path="/TrainerEditQual" component={TrainerEditQual} />
        <Route path="/TrainerEditAdditional" component={TrainerEditAdditional} />
        <Route path="/BranchUpdateProfile" component={BranchUpdateProfile} />
      </Switch> 
      </div>
    </StateProvider>
  );
}

export default App;


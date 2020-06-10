import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import TrainersProfile from './components/TrainerProfiles/TrainersProfile';
import BranchSignUp from './components/BranchSignUp/BranchSignUp';
import BranchNav from './components/BranchDashboard/BranchNav'
import TrainerSignUp from './components/TrainerSignUp/TrainerReg';
import RequestForReplacement from './components/BranchDashboard/RequestForReplacement';
import BranchesProfile from './components/BranchProfiles/BranchesProfile';
import { StateProvider } from './store/MainStore';
import BranchParameters from './components/BranchDashboard/BranchParameter';
import BranchProfile from './components/BranchProfiles/BranchProfile';
import TrainerNav from './components/TrainerDashboard/TrainerNav';
import TrainerDetails from './components/TrainerProfiles/TrainerPersonalDetailsUpdate';
import TrainerEditQual from './components/TrainerProfiles/TrainerEditQualifications';
import TrainerEditAdditional from './components/TrainerProfiles/TrainerAdditionalDetailsUpdate';
import Calendar from './components/BranchDashboard/Calendar/Calendar';

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
        <Route path="/RequestForReplacement" component={RequestForReplacement} />
        <Route path="/TrainersProfile" component={TrainersProfile} />
        <Route path="/BranchesProfile" component={BranchesProfile} />
        <Route path="/BranchParameters" component={BranchParameters} />
        <Route path="/BranchProfile" component={BranchProfile} />
        <Route path="/TrainerDetails" component={TrainerDetails} />
        <Route path="/TrainerEditQual" component={TrainerEditQual} />
        <Route path="/TrainerEditAdditional" component={TrainerEditAdditional} />
      </Switch> 
      </div>
    </StateProvider>
  );
}

export default App;


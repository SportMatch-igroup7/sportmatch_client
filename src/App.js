import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import TrainersProfile from './components/TrainerProfiles/TrainersProfile';
import BranchSignUp from './components/BranchSignUp/BranchSignUp';
import BranchMain from './components/BranchDashboard/BranchNav'
import TrainerSignUp from './components/TrainerSignUp/TrainerReg';
import RequestForReplacement from './components/BranchDashboard/RequestForReplacement';
import PowerBI from './components/AdminDashboard/PowerBi';
import BranchesProfile from './components/BranchProfiles/BranchesProfile';
import AAA from './components/OLD/BranchSignUp copy';
import { StateProvider } from './store/MainStore';
import BranchParameters from './components/BranchDashboard/BranchParameter';
import BranchProfile from './components/BranchProfiles/BranchProfile';
import TrainerMain from './components/TrainerDashboard/TrainerNav';
import BB from './components/TrainerDashboard/TrainerMain';
import TrainerProfile from './components/TrainerProfiles/TrainerProfile';
import TrainerDetails from './components/TrainerProfiles/TrainerPersonalDetailsUpdate';
import TrainerEditQual from './components/TrainerProfiles/TrainerEditQualifications';
import TrainersMatch from './components/BranchDashboard/TrainersMatch';


function App() {
  return (
    <StateProvider>
      <div className="App">
        <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/BranchSignUp" component={BranchSignUp} />
        <Route path="/TrainerSignUp" component={TrainerSignUp} />
        <Route path="/BranchMain" component={BranchMain} />
        <Route path="/TrainerMain" component={TrainerMain} />
        <Route path="/RequestForReplacement" component={RequestForReplacement} />
        <Route path="/TrainersProfile" component={TrainersProfile} />
        <Route path="/BranchesProfile" component={BranchesProfile} />
        <Route path="/BranchParameters" component={BranchParameters} />
        <Route path="/BranchProfile" component={BranchProfile} />
        <Route path="/TrainerDetails" component={TrainerDetails} />
      </Switch> 
      </div>
    </StateProvider>
  );
}

export default App;


import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import TrainersProfile from './components/Profiles/TrainersProfile';
import BranchSignUp from './components/BranchSignUp/BranchSignUp';
import BranchMain from './components/BranchDashboard/BranchMain'
import Test from './components/Profiles/BranchProfile'
import TrainerSignUp from './components/TrainerSignUp/TrainerReg';
import RequestForReplacement from './components/BranchDashboard/RequestForReplacement';
import PowerBI from './components/AdminDashboard/PowerBi';
import BranchesProfile from './components/Profiles/BranchesProfile';
import AAA from './components/OLD/BranchSignUp copy';
import { StateProvider } from './store/MainStore';
import BranchParameters from './components/BranchDashboard/BranchParameter';
import BranchProfile from './components/Profiles/BranchProfile';
import TrainerMain from './components/TrainerDashboard/TrainerMain';



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
      </Switch> 
      </div>
    </StateProvider>
  );
}

export default App;


import React, { useState, Fragment } from "react";
import './App.css';

//komponenter
import Nav from "./components/Nav";
import CreateCompanys from "./components/CreateCompanys";
import CreatePerson from "./components/Person/CreatePerson";
import Unemployed from "./components/Unemployed";
// Ser till så att vi kan använda oss av router så vi kan redirecta från en vy till en annan.
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App () {
 
  return (
    <>
    <Router>
        <Nav/>
          <Switch>
              <Route exact path="/">    
              
              <h1 className="VälkommenTextTitel">Välkommen!</h1>
              <h2 className="VälkommenTextUndertext">I navigationsfältet ovan finns det möjligheter att skapa personer och företag</h2> 
            
              </Route>
              <Route exact path="/createperson" component={CreatePerson}>  <CreatePerson/>  </Route>
              <Route path="/createcompany" component={CreateCompanys}/>
              <Route path="/unemployed" component={Unemployed}> <Unemployed/> </Route>
          </Switch>
    </Router>
    </>
  );
};
export default App;
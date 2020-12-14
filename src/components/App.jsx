import React from "react";
import {Switch,Route} from "react-router-dom";
import AltorRider from "./AltorRider";
import Home from "./Home";
import Navbar from "./Navbar";

function App(){
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/altorrider" component={AltorRider} />
                <Route component="Error" />
            </Switch>
        </>
    );

}

export default App;

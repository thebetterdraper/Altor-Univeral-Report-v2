import React from "react";
import {Switch,Route} from "react-router-dom";
import AltorRider from "./AltorRider";
import Home from "./Home";
import Navbar from "./Navbar";

function App(){
    return (
        <>
            
                <Route path="/altorrider" component={AltorRider} />
              
        </>
    );

}

export default App;

import React from "react";
import {Switch,Route} from "react-router-dom";
import AltorRider from "./AltorRider";
import Home from "./Home";
import Navbar from "./Navbar";

function App(){
    return (

        
        <>
        <div id="toPrint">
            {/* <button onClick={convertDomToPDF}>CLICK2PRINT</button>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/altorrider" component={AltorRider} />
                <Route component="Error" />
            </Switch> */}

            <AltorRider></AltorRider>
        </div>
        </>
    );

}



export default App;

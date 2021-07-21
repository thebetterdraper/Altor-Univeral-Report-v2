import React from "react";
// import Header from "./Heading";
// import Footer from "./Footer";
import Cookie from "js-cookie";

function Home(){

    Cookie.set("report_res",{
        user_id:"4EulioOrxqQLhj2n1XDOFlBv7fQ2",
        client_id:"dominos",
        timestamp:"2021-04-23 16:00:00",
        org_id:"India.West Bengal.Kolkata.Ekdalia",
        // org_id:"South 24 Parganas.8B.JU Hostel",
        days:30
    });

    
    return( 
        <>
            <h1>Welcome to Altor Technologies</h1>
        </>
    );

}

export default Home;
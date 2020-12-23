import React from "react";
// import Header from "./Heading";
// import Footer from "./Footer";
import Cookie from "js-cookie";

function Home(){

    Cookie.set("report_res",{
        user_id:"4EulioOrxqQLhj2n1XDOFlBv7fQ2",
        client_id:"example1",
        timestamp:"2020-12-20 23:59:59",
        // org_id:"South 24 Parganas.8B.JU Hostel.Office",
        org_id:"South 24 Parganas.8B.JU Hostel.Office",
        days:30
    });

    // Cookie.set("user_id","4EulioOrxqQLhj2n1XDOFlBv7fQ2")
    // Cookie.set("client_id","example1")
    // Cookie.set("org_id","South 24 Parganas.8B.JU Hostel.Ekdalia")
    // Cookie.set("timestamp","2020-11-01 23:59:59")
    // Cookie.set("days",7)
    
    return( 
        <>
            <h1>Welcome to Altor Technologies</h1>
        </>
    );

}

export default Home;
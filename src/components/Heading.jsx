import React from "react";
import AltorLogo from "./images/AltorLogo.png";

function Header(){

    const styles = {
        "altorLogo":{
            width:"5vw",
            height:"10vh",
            display:"block",
            float:"left",
            margin:"0 20px 0 28px"
        },
        "AltorName":{
            margin: "21px 0 0 10px",
            fontSize: "25px",
            fontWeight: "700",
            color: "rgb(78, 65, 65)",
            display:"block",
            float:"left"
  
        },
        "altorHeading":{
            width:"246px",
            backgroundColor:"white",
            minHeight:"75px",
            borderRadius:"50px",
            margin:"10px 0 10px 20px",
            padding:"1px",
            boxShadow: "2px 2px 6px 2px rgba(0,0,0,0.3)",

        }
    }

    return (
            <div style={styles.altorHeading}>
                <img src={AltorLogo} alt="altorLogo" style={styles.altorLogo}></img>
                <h1 style={styles.AltorName}>
                    Altor
                </h1>
        </div>
    );

}

export default Header;
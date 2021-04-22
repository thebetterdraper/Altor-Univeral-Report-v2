import React from "react";
import AltorLogo from "./images/AltorLogo.png";

function Header(){

    const styles = {
        "altorLogo":{
            width:"70px",
            height:"70px",
            display:"block",
            float:"left",
            margin:"2px 20px 0 28px"
        },
        "AltorName":{
            margin: "18px 0 0 0px",
            fontSize: "25px",
            fontWeight: "700",
            color: "rgb(78, 65, 65)",
            display:"block",
            float:"left"
  
        },
        "altorHeading":{
            width:"212px",
            backgroundColor:"white",
            minHeight:"63px",
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
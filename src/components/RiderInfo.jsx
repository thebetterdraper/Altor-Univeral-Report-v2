import React, { useState } from "react";
import ChartData from "./ChartData"

function RiderInfo(props){

    const styles = {
        "riderInfoDiv":{

            width:"90%",
            minWidth: "1300px",
            margin:"0 10px 0 25px",
            pageBreakInside: "avoid"
        },
        "dataContent":{
            display: "block",
            float: "left",
            width: "4.5vw",
            maxWidth:"7vw",
            textAlign: "right",
            // border:"1px solid black",
            padding: "15px",
            margin: "0px 15px 0px 15px",
            fontSize: "14px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            fontWeight: "400",
            color:"#676767"
        },
        "nameAttribute":{
            width: "4vw",
            textAlign: "center",
            padding: "15px",
            margin: "0px 15px 0px 15px",
            fontSize: "20px",
            display: "block",
            float: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            fontWeight: "500",
            color:"cornflowerblue",
            outline:"none",
            background:"none",
            border:"none",
            cursor:"pointer"
        },
        "indexAttribute":{
            textAlign: "center",
            padding: "20px 25px 20px 25px",
            display: "block",
            float: "left",
            border: "none",
            margin: "0",
            width: "30px",
            height: "30px",
            left: "10px",
            color: "black",
            fontFamily: "sans-serif",
            fontSize: "25px"
        },
        "percentageColor":{
            minHeight:"15px",
            minWidth:"15px",
            
            display:"inline-block",
            marginRight:"5px"
        }

    }

    const [toggleContainer,setToggleContainer]  = useState(false);

    function handleClick(){
        console.log("clicked");
        setToggleContainer((prev)=>!prev);
    }
    return (
        <div style={styles.riderInfoDiv}>
            <span style={styles.indexAttribute}><font style={{color:"#929292"}} className="id_font">{props.id+1}
            </font></span>
            <button style={styles.nameAttribute} onClick={handleClick}>{props.name.length>13?props.name.substr(0,13)+"...":props.name}</button>
            <span style={styles.dataContent}>{props.avg_safety_score}<span 
            style={{
                minHeight:"15px",
                minWidth:"15px", 
                display:"inline-block",
                marginLeft:"5px",
                backgroundColor:props.per_change_safety>0?"#9acc68":"#ff5a5a"
                }}></span></span>           
            <span style={styles.dataContent}>{props.avg_overspeeding_score}<span style={{
                minHeight:"15px",
                minWidth:"15px", 
                display:"inline-block",
                marginLeft:"5px",
                backgroundColor:props.per_change_overspeeding<0?"#9acc68":"#ff5a5a"
                }}></span></span>    
            <span style={styles.dataContent}>{props.avg_pitstop_score}<span style={{
                minHeight:"15px",
                minWidth:"15px", 
                display:"inline-block",
                marginLeft:"5px",
                backgroundColor:props.per_change_pitstop<0?"#9acc68":"#ff5a5a"
                }}></span></span>
            <span style={styles.dataContent}>{props.avg_wear_score}<span style={{
                minHeight:"15px",
                minWidth:"15px", 
                display:"inline-block",
                marginLeft:"5px",
                backgroundColor:props.per_change_wear<0?"#9acc68":"#ff5a5a"
                }}></span></span>
            <span style={styles.dataContent}>{props.avg_store_to_store_time}<span style={{
                minHeight:"15px",
                minWidth:"15px", 
                display:"inline-block",
                marginLeft:"5px",
                backgroundColor:props.per_change_store_to_store_time<0?"#9acc68":"#ff5a5a"
                }}></span></span>
            <span style={styles.dataContent}>{props.avg_total_distance_covered}<span style={{
                minHeight:"15px",
                minWidth:"15px", 
                display:"inline-block",
                marginLeft:"5px",
                backgroundColor:props.per_change_total_distance_covered<0?"#9acc68":"#ff5a5a"
                }}></span> </span>
            <span style={styles.dataContent}>{props.avg_total_on_ride_time}<span style={{
                minHeight:"15px",
                minWidth:"15px", 
                display:"inline-block",
                marginLeft:"5px",
                backgroundColor:props.per_change_total_on_ride_time<0?"#9acc68":"#ff5a5a"
                }}></span></span>

            <ChartData 
                name = {props.name}
                phone = {props.phone}
                email = {props.email}
                image = {props.image}
                safety_score = {props.safety_score}
                overspeeding = {props.overspeeding}
                pitstop = {props.pitstop}
                wear = {props.wear}
                store_to_store_time = {props.store_to_store_time}
                total_distance_covered = {props.total_distance_covered}
                total_on_ride_time = {props.total_on_ride_time}
                toggle = {toggleContainer}
            />
        </div>

    )

}

export default RiderInfo;
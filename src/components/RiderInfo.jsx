import React from "react";
import ChartData from "./ChartData"

// const subscriptStyle = {
//     color: "green"
// }

function RiderInfo(props){
    const styles = {
        "riderInfoDiv":{

            width:"90%",
            minWidth: "1300px",
            margin:"10px 10px 0 25px",

            // padding: "10px",
            pageBreakInside: "avoid"
        },
        "dataContent":{
            display: "block",
            float: "left",
            width: "5vw",
            textAlign: "center",
            padding: "25px",
            border: "0.5px solid rgba(0,0,0,0.2)",
            boxShadow: "2px 2px 6px 2px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            margin: "0 20px 0 20px",
            fontSize: "18px",
            fontFamily: "sans-serif",
            fontWeight: "300"
        },
        "nameAttribute":{
            width: "10vw",
            textAlign: "center",
            padding: "25px",
            border: "0.5px solid rgba(0,0,0,0.2)",
            boxShadow: "2px 2px 6px 2px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            margin: "0 20px 0 20px",
            fontSize: "18px",
            display: "block",
            float: "left",
            fontFamily: "sans-serif",
            fontWeight: "400"
        },
        "indexAttribute":{
            textAlign: "center",
            padding: "25px",
            display: "block",
            float: "left",
            border: "none",
            margin: "0",
            width: "30px",
            height: "30px",
            borderRadius: "100%",
            left: "10px",
            backgroundColor: "#a9afbb",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "25px"
        },
        "percentageColor":{
            
        }

    }
    // if(document.getElementsByClassName("subscript").innerHTML<0){
    //     document.getElementsByClassName("subscript").style.color = "red";
    // }else{
    //     document.getElementsByClassName("subscript").style.color="green";
    // }
    return (
        <div style={styles.riderInfoDiv}>
            <span style={styles.indexAttribute}><font className="id_font">{props.id+1}
            </font></span>
            <span style={styles.nameAttribute}>{props.name}                     </span>
            <span style={styles.dataContent}>{props.avg_safety_score}           </span>           
            <span style={styles.dataContent}>{props.avg_overspeeding_score}     </span>    
            <span style={styles.dataContent}>{props.avg_pitstop_score}          </span>
            <span style={styles.dataContent}>{props.avg_wear_score}             </span>
            <span style={styles.dataContent}>{props.avg_store_to_store_time}    </span>
            <span style={styles.dataContent}>{props.avg_total_distance_covered} </span>
            <span style={styles.dataContent}>{props.avg_total_on_ride_time}     </span>

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
            />
        </div>

    )

}

export default RiderInfo;
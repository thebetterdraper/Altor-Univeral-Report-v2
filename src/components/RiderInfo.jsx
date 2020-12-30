import React from "react";
import ChartData from "./ChartData"

// const subscriptStyle = {
//     color: "green"
// }

function RiderInfo(props){
    // if(document.getElementsByClassName("subscript").innerHTML<0){
    //     document.getElementsByClassName("subscript").style.color = "red";
    // }else{
    //     document.getElementsByClassName("subscript").style.color="green";
    // }
    return (
        <div className="riderInfoDiv">
            <span className="index_attribute"><font className="id_font">{props.id+1}
            </font></span>
            <span className="name_attribute"> {props.name.length>20?props.name.substr(0,18)+"..":props.name}</span>
            {/* <span>{props.phone_no}</span> */}
            <span style={{color:"#f39233"}}>{props.avg_safety_score}<span className="subscript" style={props.per_change_safety>0?{color:"green"}:{color:"red"}}>{props.per_change_safety}</span></span>
            <span style={{color:"#f56a79"}}>{props.avg_overspeeding_score}<span className="subscript" style={props.per_change_overspeeding>0?{color:"green"}:{color:"red"}}>{props.per_change_overspeeding}</span></span>
            <span style={{color:"#8080ff"}}>{props.avg_pitstop_score}<span className="subscript" style={props.per_change_pitstop>0?{color:"green"}:{color:"red"}}>{props.per_change_pitstop}</span></span>
            <span style={{color:"#ffad33"}}>{props.avg_wear_score}<span className="subscript" style={props.per_change_wear>0?{color:"green"}:{color:"red"}}>{props.per_change_wear}</span></span>
            <span style={{color:"#ffad33"}}>{props.avg_store_to_store_time}<span className="subscript" style={props.per_change_store_to_store_time>0?{color:"green"}:{color:"red"}}>{props.per_change_wear}</span></span>
            <span style={{color:"#ffad33"}}>{props.avg_total_distance_covered}<span className="subscript" style={props.per_change_total_distance_covered>0?{color:"green"}:{color:"red"}}>{props.per_change_wear}</span></span>
            <span style={{color:"#ffad33"}}>{props.avg_total_on_ride_time}<span className="subscript" style={props.per_change_total_on_ride_time>0?{color:"green"}:{color:"red"}}>{props.per_change_wear}</span></span>
            <ChartData 
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
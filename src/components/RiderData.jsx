import React, { useEffect, useState } from "react";
import RiderInfo from "./RiderInfo";


function RiderData(props){

    const styles = {
        "buttonHolder":{
            width: "100%",
            minHeight: "100px",
            backgroundColor: "#5774a9",
            marginTop: "20px",
            paddingTop: "10px",
        },
        "sortingArrangement":{
            display: "block",
            float: "left",
            backgroundColor: "rgb(100 149 237)",
            minWidth: "27vw",
            fontSize: "17.5px",
            color: "white",
            padding: "10px",
            fontFamily: "sans-serif",
            borderRadius: "10px",
            boxShadow: "1.5px 7px 7px 1.5px rgba(0,0,0,0.3)",
            marginLeft: "1%",
            marginRight: "1%"
        },
        "sortBy":{
            minWidth: "47%",
            minHeight: "10%",
            borderRadius: "10px",
            padding: "10px",
            border: "1px sold white",
            boxShadow: "2px 2px 8px 4px rgba(0,0,0, 0.2)",
            fontSize: "17.5px",
            outline: "none",
            webkitAppearance: "none",
            mozAppearance: "none",
            background: "white url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right",
            backgroundPositionX: "97%" 
        },
        "sortToggler":{
            fontSize: "17.5px",
            marginLeft: "1%",
            padding: "5px 20px 5px 20px",
            borderRadius: "10px",
            outline:    "none",
            display: "inlineBlock"
        },
        "currentDate":{
            position: "relative",
            textAlign: "center",
            display: "block",
            paddingTop: "10px",
            minWidth: "141px",
            marginLeft: "40px",
            float: "left",
            backgroundColor: "rgb(100 149 237)",
            width: "9vw",
            fontSize: "17.5px",
            color: "white",
            padding: "20px",
            fontFamily: "sans-serif",
            borderRadius: "10px",
            minHeight: "22px",
            boxShadow: "1.5px 7px 7px 1.5px rgba(0,0,0,0.3)"
        },
        "riderInfoHeading":{
            marginTop: "1.5vw",
            marginLeft: "2vw",
            minWidth:   "50%",
            // float: "left",
            border: "2px solid #d3c0c0",
            // margin: 25px;
            background: "#f3f0f0",
            borderRadius: "10px",
            minHeight: "56px",
            boxShadow: "1.5px 4px 7px 1.5px rgba(0,0,0,0.15)"
        },
        "attributeTitle":{
            display: "block",
            float: "left",
            width:"6vw",
            border:"1px solid black",
            wordWrap:"breakWord",
            margin: "0 20px 0 20px",
            fontSize: "18px",
            fontFamily: "sans-serif",
            fontWeight: "300"

        }
    }

    const riderDataAPI = props.riderDataAPI;
    console.log(riderDataAPI);


    const [newRiderData,setNewRiderData] = useState([]);
    

    useEffect(()=>{

        let dataArr = [];

        function score_cal(riderDataArray){
            let length = new Date().getDate();
            let currentScore = riderDataArray[length-1].score;
            let prevCumilitiveScore = 0; //Score Add Score of(day1 to (presentDay - 1))
            for(var i=0;i<length-1;i++){
                prevCumilitiveScore+=riderDataArray[i].score;
            }
            let prevAvgScore = prevCumilitiveScore/length;
            let changePercentage = 0;
            prevAvgScore===0?changePercentage=100:changePercentage = ((currentScore-prevAvgScore)/(prevAvgScore)*100).toPrecision(4);
            return [currentScore,changePercentage]
        }

        riderDataAPI.map((rider,index)=>{

            let safety = score_cal(rider.data.safety_score);
            let overspeeding = score_cal(rider.data.overspeeding);
            let pitstop = score_cal(rider.data.pitstop);
            let wear = score_cal(rider.data.wear);
            let store_to_store_time = score_cal(rider.data.store_to_store_time);
            let total_distance_covered = score_cal(rider.data.total_distance_covered);
            let total_on_ride_time = score_cal(rider.data.total_on_ride_time);

            let new_element =  {
                "id":rider.id,
                "name":rider.name,
                "phone":rider.phone,
                "email":rider.email,
                "image":rider.image,
                "avg_safety_score":safety[0],
                "avg_safety_score_change":safety[1],
                "avg_overspeeding_score":overspeeding[0],
                "avg_overspeeding_score_change":overspeeding[1],
                "avg_pitstop":pitstop[0],
                "avg_pitstop_change":pitstop[1],
                "avg_wear":wear[0],
                "avg_wear_change":wear[1],
                "avg_store_to_store_time":store_to_store_time[0],
                "avg_store_to_store_time_change":store_to_store_time[1],
                "avg_total_distance_covered":total_distance_covered[0],
                "avg_total_distance_covered_change":total_distance_covered[1],
                "avg_total_on_ride_time":total_on_ride_time[0],
                "avg_total_on_ride_time_change":total_on_ride_time[1],                
                "safety_score":rider.data.safety_score,
                "overspeeding":rider.data.overspeeding,
                "pitstop":rider.data.pitstop,
                "wear":rider.data.wear,
                "store_to_store_time":rider.data.store_to_store_time,
                "total_distance_covered":rider.data.total_distance_covered,
                "total_on_ride_time":rider.data.total_on_ride_time

            }
            // console.log(new_element);
            dataArr.push(new_element);
            return 0;
        })
        setNewRiderData(dataArr)
    },[])

    // if(newRiderData.length===0){
    //     console.log("nothing");
    // }
    // console.log("newRiderData");
    // // console.log(newRiderData);
    // // let newAliasRiderData = newRiderData;
    // console.log(newRiderData);

    //console.log(newRiderData);

    var newArr = [];
    newRiderData.map((ele,index)=>{
        newArr.push(ele)
        return 0;
    })

    // console.log(newArr);
    // var Arr = [1,2,3]
    const [sortedRiderData,setSortedRiderData] = useState([]);

    // console.log("sortedRiderData");
    // console.log(sortedRiderData);
    // console.log("\n");
    

    const [sortConfig,setSortConfig] = useState({
        "key":null,
        "direction":null
    });
    
    // console.log("Sorted Rider Data");
    // console.log(sortedRiderData);

    function sortArray(sortingDirection,arr){
        let newSortedArray = [];
        arr.map((ele,index)=>{
            newSortedArray.push(ele);
            return 0;
        })
        if(sortingDirection==='ascending'){
            newSortedArray.sort((a,b) => (a[sortConfig.key]-b[sortConfig.key]))
        }else{
            newSortedArray.sort((a,b) => (b[sortConfig.key]-a[sortConfig.key]))
        }

        return newSortedArray
    }

    useEffect(()=>{
        
        // console.log(sortConfig.direction);
        // console.log(sortConfig.key+" Hi");
        
        setSortedRiderData(sortArray(sortConfig.direction,newRiderData));   
        // throw new Error();

    },[sortConfig.direction,sortConfig.key])

    // console.log(sortedRiderData);

    //Sort function (invoked when attribute buttons are clicked)

    function sort(event){
        var sortType = document.getElementById("SortBy").value;
        console.log(sortType);
        
        let key=sortType;
        let direction = null;       

        if(sortConfig && sortConfig.key === key && sortConfig.direction === "ascending"){
            direction = "descending";
        }else if(sortConfig && sortConfig.key === key && sortConfig.direction === "descending"){
            direction = "ascending";
        }else{
            direction = "ascending";
            
        }
        
        setSortConfig({key,direction}); 

    }

    function handleChange(){
        let key= document.getElementById("SortBy").value;
        console.log("key");
        console.log(key);
        let direction = null;
        setSortConfig({key,direction});
    }    

    // console.log(JSON.stringify(sortedRiderData)+" firstPrint")
    if(sortedRiderData.length!==0){
        // console.log(sortedRiderData);

        return ( 
            <>
                <div style={styles.buttonHolder}>
                    <div style={styles.sortingArrangement}>
                        <span style={{fontSize:"17.5px",borderRight:"2px solid black",marginRight:"13px",marginLeft:"28px",paddingRight:"8px"}}>Sort By</span>
                        <select style={styles.sortBy} id="SortBy" onChange={handleChange}>
                            <option value="avg_safety_score" selected>Safety Score</option>
                            <option value="avg_overspeeding_score">Overspeeding Score</option>
                            <option value="avg_pitstop">Pitstop</option>
                            <option value="avg_wear">Wear</option>
                            <option value="avg_store_to_store_time">Store To Store Time</option>
                            <option value="avg_total_distance_covered">Total Distance</option>
                            <option value="avg_total_on_ride_time">Total On Ride Time</option>
                        </select>
                        <button style={styles.sortToggler} onClick={sort}>{sortConfig.direction===null?"Sort":sortConfig.direction}</button>
                    </div>
                    <div style={styles.currentDate}>{new Date().toString().substring(4,7)} 1 - {new Date().toString().slice(4,16)}</div>
                </div>
                <div style={styles.riderInfoHeading}>
                    <span style={styles.attributeTitle}>Name</span>
                    <span style={styles.attributeTitle}>Safety Score</span>
                    <span style={styles.attributeTitle}>Overspeeding</span>
                    <span style={styles.attributeTitle}>Pitstops</span>
                    <span style={styles.attributeTitle}>Wear</span>
                    <span style={styles.attributeTitle}>Store-To-Store Time(min)</span>
                    <span style={styles.attributeTitle}>Total Distance (km)</span>
                    <span style={styles.attributeTitle}>Total Ride Time (min)</span>
                </div>
            
                {
                    sortedRiderData.map((rider, index) => {
                        return(
                                <RiderInfo 
                                    key = {index}
                                    id={index}
                                    name = {rider.name}
                                    phone = {rider.phone}
                                    email = {rider.email}
                                    image = {rider.image}
                                    avg_safety_score = {rider.avg_safety_score}
                                    per_change_safety = {rider.avg_safety_score_change}
                                    avg_overspeeding_score = {rider.avg_overspeeding_score}
                                    per_change_overspeeding = {rider.avg_overspeeding_score_change}
                                    avg_pitstop_score = {rider.avg_pitstop}
                                    per_change_pitstop = {rider.avg_pitstop_change}
                                    avg_wear_score = {rider.avg_wear}
                                    per_change_wear = {rider.avg_wear_change}
                                    avg_store_to_store_time = {rider.avg_store_to_store_time}
                                    per_change_store_to_store_time = {rider.avg_store_to_store_time_change}
                                    avg_total_distance_covered = {rider.avg_total_distance_covered}
                                    per_change_total_distance_covered = {rider.avg_total_distance_covered_change}
                                    avg_total_on_ride_time = {rider.avg_total_on_ride_time}
                                    per_change_total_on_ride_time = {rider.avg_total_on_ride_time_change}
                                    safety_score = {rider.safety_score}
                                    overspeeding = {rider.overspeeding}
                                    pitstop = {rider.pitstop}
                                    wear = {rider.wear}
                                    store_to_store_time = {rider.store_to_store_time}
                                    total_distance_covered = {rider.total_distance_covered}
                                    total_on_ride_time = {rider.total_on_ride_time}
                                />     
                            )
                    })
                }
            </>
        );
        
    }else{

        return ( 
            <>

                <div style={styles.buttonHolder}>
                    <div style={styles.sortingArrangement}>
                        <span style={{fontSize:"17.5px",borderRight:"2px solid black",marginRight:"13px",marginLeft:"28px",paddingRight:"8px"}}>Sort By</span>
                        <select style={styles.sortBy} id="SortBy" onChange={handleChange}>
                            <option value="avg_safety_score" selected>Safety Score</option>
                            <option value="avg_overspeeding_score">Overspeeding Score</option>
                            <option value="avg_pitstop">Pitstop</option>
                            <option value="avg_wear">Wear</option>
                            <option value="avg_store_to_store_time">Store To Store Time</option>
                            <option value="avg_total_distance_covered">Total Distance</option>
                            <option value="avg_total_on_ride_time">Total On Ride Time</option>
                        </select>
                        <button style={styles.sortToggler} onClick={sort}>{sortConfig.direction===null?"Sort":sortConfig.direction}</button>
                    </div>
                    <div style={styles.currentDate}>{new Date().toString().substring(4,7)} 1 - {new Date().toString().slice(4,16)}</div>
                </div>
                
                <div style={styles.riderInfoHeading}>
                    <span style={styles.attributeTitle}>Name</span>
                    <span style={styles.attributeTitle}>Safety Score</span>
                    <span style={styles.attributeTitle}>Overspeeding</span>
                    <span style={styles.attributeTitle}>Pitstops</span>
                    <span style={styles.attributeTitle}>Wear</span>
                    <span style={styles.attributeTitle}>Store-To-Store Time(min)</span>
                    <span style={styles.attributeTitle}>Total Distance (km)</span>
                    <span style={styles.attributeTitle}>Total Ride Time (min)</span>
                </div> 
                {
                    newRiderData.map((rider, index) => {

                        return(
                                <RiderInfo 
                                    key = {index}
                                    id={index}
                                    name = {rider.name}
                                    phone = {rider.phone}
                                    email = {rider.email}
                                    image = {rider.image}
                                    avg_safety_score = {rider.avg_safety_score}
                                    per_change_safety = {rider.avg_safety_score_change}
                                    avg_overspeeding_score = {rider.avg_overspeeding_score}
                                    per_change_overspeeding = {rider.avg_overspeeding_score_change}
                                    avg_pitstop_score = {rider.avg_pitstop}
                                    per_change_pitstop = {rider.avg_pitstop_change}
                                    avg_wear_score = {rider.avg_wear}
                                    per_change_wear = {rider.avg_wear_change}
                                    avg_store_to_store_time = {rider.avg_store_to_store_time}
                                    per_change_store_to_store_time = {rider.avg_store_to_store_time_change}
                                    avg_total_distance_covered = {rider.avg_total_distance_covered}
                                    per_change_total_distance_covered = {rider.avg_total_distance_covered_change}
                                    avg_total_on_ride_time = {rider.avg_total_on_ride_time}
                                    per_change_total_on_ride_time = {rider.avg_total_on_ride_time_change}
                                    safety_score = {rider.safety_score}
                                    overspeeding = {rider.overspeeding}
                                    pitstop = {rider.pitstop}
                                    wear = {rider.wear}
                                    store_to_store_time = {rider.store_to_store_time}
                                    total_distance_covered = {rider.total_distance_covered}
                                    total_on_ride_time = {rider.total_on_ride_time}
                                />     
                        )
                    })
                }
            </>
        );

    }
    
                
}


export default RiderData;
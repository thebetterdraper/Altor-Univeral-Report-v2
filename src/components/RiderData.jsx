import React, { useEffect, useState } from "react";
import RiderInfo from "./RiderInfo";


function RiderData(props){

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
        const {name} = event.target;
        let key=name;
        let direction = null;       

        if(sortConfig && sortConfig.key === key && sortConfig.direction === "ascending"){
            direction = "descending";
        }else if(sortConfig && sortConfig.key === key && sortConfig.direction === "descending"){
            direction = "ascending";
        }else{
            direction = "ascending";
            // console.log("I am executing!!")
        }
        // console.log(key+' '+direction);
        setSortConfig({key,direction}); 

    }
    // console.log(sortConfig);

    //function to get ascending or descending class name to add the arrow symbol

    function getClassNameFor(name){
        // if(!sortConfig){
        //     return;
        // }
        // return sortConfig.key === name ? sortConfig.direction:null;
        return null;
    }

    function getDirection(dir){
       if(dir==="ascending")
            return "Low to High";

        return "High to Low";
        
    }

    function changeCase(val){
        if(val==="avg_wear")
            return "Helmet Wear - ";
        else if(val==="avg_safety_score")
            return "Safety Score - ";
        else if(val==="avg_pitstop")
            return "Pitstops - ";
        else if(val==="avg_overspeeding_score")
            return "Overspeeding - ";
        else if(val==="avg_store_to_store_time")
            return "Store To Store Time - ";
        else if(val==="avg_total_distance_covered")
            return "Total Distance Covered - ";
        else    
            return "Total On Ride Time - ";
    }
    

    // console.log(JSON.stringify(sortedRiderData)+" firstPrint")
    if(sortedRiderData.length!==0){
        // console.log(sortedRiderData);

        return ( 
            <>
                   
                    <div className="nav_holder">
                        <div className="current_date">{new Date().toString().substring(4,7)} 1 - {new Date().toString().slice(4,16)}</div>

                        


                        <div className="riderInfoHeading">
                            <button id="sortBtn" className={"sort_buttons leftmost_button "} onClick={sort} name="avg_safety_score">SafetyScore<div className={ getClassNameFor('Safety_score')}></div></button>
                            <button id="sortBtn" className={"sort_buttons " } onClick={sort} name="avg_overspeeding_score">Overspeeding<div className={  getClassNameFor('Overspeeding')}></div></button>
                            <button id="sortBtn" className={"sort_buttons " } onClick={sort} name="avg_pitstop">Pitstop<div className={  getClassNameFor('Pitstop')}></div></button>
                            <button id="sortBtn" className={"sort_buttons "} onClick={sort} name="avg_wear">Wear<div className={getClassNameFor('Wear')}></div></button>
                            <button id="sortBtn" className={"sort_buttons "} onClick={sort} name="avg_store_to_store_time">Store To Store<div className={getClassNameFor('Store_to_store_time')}></div></button>
                            <button id="sortBtn" className={"sort_buttons "} onClick={sort} name="avg_total_distance_covered">Total Distance<div className={getClassNameFor('total_distance_covered')}></div></button>
                            <button id="sortBtn" className={"sort_buttons "} onClick={sort} name="avg_total_on_ride_time">Total On_Ride Time<div className={getClassNameFor('total_on_ride_time')}></div></button>

                        </div>
                    </div>


                    <div className="sortData">Sorted By: {changeCase(sortConfig.key)}{getDirection(sortConfig.direction)}</div>
                        
                        {
                            sortedRiderData.map((rider, index) => {
    
                                return(
                                        <RiderInfo 
                                            key = {index}
                                            id={index}
                                            name = {rider.name}
                                            // phone_no = {rider.phone_no}
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
                    {/* <div className="sortData">{sortConfig.key} {sortConfig.direction}</div> */} 
                     <div className="nav_holder">
                        <div className="current_date">{new Date().toString().substring(4,7)} 1 - {new Date().toString().slice(4,16)}</div>
                        <div className="riderInfoHeading">
                            <button className={"sort_buttons leftmost_button " + getClassNameFor('Safety_score')} onClick={sort} name="avg_safety_score">SafetyScore</button>
                            <button className={"sort_buttons " +  getClassNameFor('Overspeeding')} onClick={sort} name="avg_overspeeding_score">Overspeeding</button>
                            <button className={"sort_buttons " +  getClassNameFor('Pitstop')} onClick={sort} name="avg_pitstop">Pitstop</button>
                            <button className={"sort_buttons " +  getClassNameFor('Wear')} onClick={sort} name="avg_wear">Wear</button>
                            <button className={"sort_buttons "} onClick={sort} name="avg_store_to_store_time">Store To Store<div className={getClassNameFor('Store_to_store_time')}></div></button>
                            <button className={"sort_buttons "} onClick={sort} name="avg_total_distance_covered">Total Distance<div className={getClassNameFor('total_distance_covered')}></div></button>
                            <button className={"sort_buttons "} onClick={sort} name="avg_total_on_ride_time">Total On_Ride Time<div className={getClassNameFor('total_on_ride_time')}></div></button>
                        </div>
                    </div>  
                        {
                            newRiderData.map((rider, index) => {
    
                                return(
                                        <RiderInfo 
                                            key = {index}
                                            id={index}
                                            name = {rider.name}
                                            // phone_no = {rider.phone_no}
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
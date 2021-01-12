import React, { useEffect, useState } from "react";
import Charts from "./Charts.jsx"


function ChartData(props){
    const [safetyScoreChartData,setSafetyScoreChartData] = useState({});
    const [overspeedingChartData,setOverspeedingChartData] = useState({});
    const [pitstopChartData,setPitstopChartData] = useState({});
    const [wearChartData,setWearChartData] = useState({});
    const [store2storeChartData,setStore2storeChartData] = useState({});
    const [totDistChartData,setTotDistChartData] = useState({});
    const [totOnRideTime,setTotOnRideTime] = useState({});
    const [chartInd,setChartInd] = useState(0);

    const chartArr = [safetyScoreChartData,overspeedingChartData,pitstopChartData,wearChartData,store2storeChartData,totDistChartData,totOnRideTime];
    const [toggleClicked,setToggleClicked] = useState(false);
    

    function getScoreData(data){
        let scoreData = data.map((rider)=>rider.score);
        return scoreData;
    }

    function getColorData(data){
        let colorData = data.map((score)=>{
            if(score>=0&&score<40){
                return "red";
            }else if(score>=40&&score<60){
                return "blue";
            }else if(score>=60&&score<80){
                return "yellow";
            }else{
                return "green";
            }
        });
        return colorData
    }

    let safety_score = props.safety_score
    let overspeeding = props.overspeeding
    let pitstop = props.pitstop
    let wear = props.wear
    let store_to_store_time = props.store_to_store_time
    let total_distance_covered = props.total_distance_covered
    let total_on_ride_time = props.total_on_ride_time
    // console.log(safety_score);
    // console.log(getScoreData(safety_score));
    // console.log(getScoreData(overspeeding));

    const chart = () => {
        setSafetyScoreChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Safety Score',
                data:getScoreData(safety_score),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(safety_score)),
                borderWidht:1  
            }]
        })
        

        setOverspeedingChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'OverSpeeding',
                data:getScoreData(overspeeding),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(overspeeding)),
                borderWidht:1
            }]
        })

        setPitstopChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Pitstop',
                data:getScoreData(pitstop),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(pitstop)),
                borderWidht:1
            }]
        })

        setWearChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Wear',
                data:getScoreData(wear),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(wear)),
                borderWidht:1
            }]
        })

        setStore2storeChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Store To Store Time',
                data:getScoreData(store_to_store_time),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(store_to_store_time)),
                borderWidht:1
            }]
        })

        setTotDistChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Total Distance Covered',
                data:getScoreData(total_distance_covered),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(total_distance_covered)),
                borderWidht:1
            }]
        })

        setTotOnRideTime({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Total On_Ride Time',
                data:getScoreData(total_on_ride_time),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(total_on_ride_time)),
                borderWidht:1
            }]
        })
    }

    useEffect(()=>{
        chart();
    },[safety_score,overspeeding,pitstop,wear,store_to_store_time,total_distance_covered,total_on_ride_time])

    var height = "7px";
    var buttonText = "+"
    if(toggleClicked){
        height = "auto";
        buttonText = "-"
    }else{
        height = "0.01px";
        buttonText = "+"
    }

    function handleChange(event){
        let key1 = event.target.value;
        console.log(key1);
        // let key = document.getElementById("sortBy").value;
        setChartInd(parseInt(key1));
    }
    console.log(chartInd);
       
    return (
        <div className="chart">
            <button  className="graphToggle" onClick={()=>{setToggleClicked(!toggleClicked)}}>{buttonText}</button>
            
            <div  className="chartContainer" style={{height:height}}>
            <hr style={{marginTop:'16px'}} />
                <select className="sortBy" id="sortBy" onChange={handleChange}>
                    <option value="0" selected>Safety Score</option>
                    <option value="1">Overspeeding Score</option>
                    <option value="2">Pitstop</option>
                    <option value="3">Wear</option>
                    <option value="4">Store To Store Time</option>
                    <option value="5">Total Distance</option>
                    <option value="6">Total On Ride Time</option>
                </select>
                <div className="chartDisplay">
                    <Charts
                        data={chartArr[chartInd]}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChartData;
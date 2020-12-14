import React, { useEffect, useState } from "react";
import Charts from "./Charts.jsx"


function ChartData(props){
    const [safetyScoreChartData,setSafetyScoreChartData] = useState({});
    const [overspeedingChartData,setOverspeedingChartData] = useState({});
    const [pitstopChartData,setPitstopChartData] = useState({});
    const [wearChartData,setWearChartData] = useState({});

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
    }

    useEffect(()=>{
        chart()
    },[safety_score,overspeeding,pitstop,wear])

    var height = "7px";
    var buttonText = "+"
    if(toggleClicked){
        height = "auto";
        buttonText = "-"
    }else{
        height = "0.01px";
        buttonText = "+"
    }
       
    return<div className="chart">
            <button  className="graphToggle" onClick={()=>{setToggleClicked(!toggleClicked)}}>{buttonText}</button>
            
            <div  className="chartContainer" style={{height:height}}>
            <hr style={{marginTop:'16px'}} />
                <div className="chartDisplay">
                    <Charts 
                        data = {safetyScoreChartData}
                    />
                </div>
                <div className="chartDisplay">
                    <Charts 
                        data = {overspeedingChartData}
                    />
                </div>
                <div className="chartDisplay">
                    <Charts 
                        data = {pitstopChartData}
                    />
                </div>
                <div className="chartDisplay">
                    <Charts 
                        data = {wearChartData}
                    />
                </div>
                
            </div>
        </div>
}

export default ChartData;